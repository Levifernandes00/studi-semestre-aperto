import { UNITA_APPROFONDIMENTI, UNITA_UFFICIALI } from '../data/unita'
import { colorePriority } from './semaforo'
import { DEFAULT_WEEKLY_HOURS, isPlanTaskDone, taskKey } from './progress'
import type { AppProgress, PlanSession, SemaforoColore, WeekPlan } from '../types'

const START = new Date(2026, 8, 4) // 4 set 2026
const END = new Date(2026, 10, 30) // 30 nov 2026

function iso(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

function startOfWeek(d: Date): Date {
  const x = new Date(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day // lunedì
  x.setDate(x.getDate() + diff)
  x.setHours(0, 0, 0, 0)
  return x
}

function hoursForCfu(cfu: number): number {
  return Math.max(2, Math.round(cfu * 8))
}

type Task = {
  unitaId: string
  kind: PlanSession['kind']
  label: string
  hours: number
  taskKey: string
}

function buildBacklog(progress: AppProgress): Task[] {
  const official = [...UNITA_UFFICIALI].sort((a, b) => {
    const ca = progress.unita[a.id]?.colore ?? 'grigio'
    const cb = progress.unita[b.id]?.colore ?? 'grigio'
    const pa = colorePriority(ca as SemaforoColore)
    const pb = colorePriority(cb as SemaforoColore)
    if (pa !== pb) return pa - pb
    const order = { fisica: 0, chimica: 1, biologia: 2 }
    if (order[a.materia] !== order[b.materia]) return order[a.materia] - order[b.materia]
    return b.cfu - a.cfu
  })

  const extras = progress.includeBasi ? UNITA_APPROFONDIMENTI : []
  const backlog: Task[] = []
  const done = progress.completedPlanItems

  const push = (t: Omit<Task, 'taskKey'>) => {
    const key = taskKey(t.unitaId, t.kind)
    if (isPlanTaskDone(done, key)) return
    backlog.push({ ...t, taskKey: key, hours: Math.round(t.hours * 10) / 10 })
  }

  for (const u of official) {
    const st = progress.unita[u.id]
    const colore = st?.colore ?? 'grigio'
    if (colore === 'grigio') {
      push({
        unitaId: u.id,
        kind: 'diagnostico',
        label: `Triage · ${u.titolo}`,
        hours: 0.5,
      })
    }
    if (!st?.theoryRead || colore === 'rosso' || colore === 'giallo' || colore === 'grigio') {
      push({
        unitaId: u.id,
        kind: 'teoria',
        label: `Teoria · ${u.titolo}`,
        hours: hoursForCfu(u.cfu) * 0.45,
      })
    }
    if ((st?.eserciziDone ?? 0) < 5 || colore === 'rosso' || colore === 'giallo') {
      push({
        unitaId: u.id,
        kind: 'esercizi',
        label: `Esercizi · ${u.titolo}`,
        hours: hoursForCfu(u.cfu) * 0.4,
      })
    }
    if (colore === 'rosso' || colore === 'giallo') {
      push({
        unitaId: u.id,
        kind: 'verifica',
        label: `Verifica · ${u.titolo}`,
        hours: 0.5,
      })
    }
  }

  for (const u of extras) {
    push({
      unitaId: u.id,
      kind: 'teoria',
      label: `Basi · ${u.titolo}`,
      hours: 1.5,
    })
  }

  return backlog
}

function fillWeek(
  pool: Task[],
  budget: number,
  weekStart: string,
  carriedKeys: Set<string>,
  carriedFromWeek?: string,
): { sessions: PlanSession[]; used: Task[]; rest: Task[] } {
  const sessions: PlanSession[] = []
  const used: Task[] = []
  const rest = [...pool]
  let hours = 0

  while (hours < budget - 0.35 && rest.length > 0) {
    const task = rest.shift()!
    const carried = carriedKeys.has(task.taskKey)
    sessions.push({
      id: `${weekStart}::${task.taskKey}`,
      taskKey: task.taskKey,
      unitaId: task.unitaId,
      kind: task.kind,
      label: task.label,
      hours: task.hours,
      weekStart,
      carriedFrom: carried && carriedFromWeek ? carriedFromWeek : undefined,
    })
    used.push(task)
    hours += task.hours
  }

  return { sessions, used, rest }
}

/**
 * Calendario intelligente:
 * - pool per settimana (nessun giorno fisso)
 * - task non fatte nelle settimane passate tornano in cima dalla settimana corrente
 * - budget ore settimanale configurabile
 */
export function buildCalendar(progress: AppProgress, now = new Date()): WeekPlan[] {
  const weeklyHours = progress.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS
  const currentWeekStart = startOfWeek(now)
  const planStart = startOfWeek(START)
  const endWeek = startOfWeek(END)
  const actual = progress.planHoursActual ?? {}

  const backlog = buildBacklog(progress)

  // Simula assegnazione dalle settimane passate → ciò che resta è «in ritardo»
  const queue = [...backlog]
  const overdue: Task[] = []
  let sim = new Date(planStart)
  let lastPastWeek: string | undefined

  while (sim < currentWeekStart && queue.length > 0 && sim <= endWeek) {
    lastPastWeek = iso(sim)
    let h = 0
    while (h < weeklyHours - 0.35 && queue.length > 0) {
      const t = queue.shift()!
      overdue.push(t)
      h += t.hours
    }
    sim = addDays(sim, 7)
  }

  const carriedKeys = new Set(overdue.map((t) => t.taskKey))
  const carriedFromLabel = lastPastWeek

  // Dalla settimana corrente in poi: prima i riportati, poi il resto
  let forwardPool = [...overdue, ...queue]

  // Simulazioni nelle ultime ~2 settimane
  const lastSimWeek = addDays(endWeek, -7)
  const simTasks: Task[] = (
    [
      {
        unitaId: 'sim',
        kind: 'simulazione' as const,
        label: 'Simulazione esame (31 domande)',
        hours: 1.5,
        taskKey: taskKey('sim', 'simulazione'),
      },
      {
        unitaId: 'sim',
        kind: 'simulazione' as const,
        label: 'Simulazione esame #2',
        hours: 1.5,
        taskKey: taskKey('sim', 'simulazione2'),
      },
      {
        unitaId: 'sim',
        kind: 'ripasso' as const,
        label: 'Ripasso mirato rossi/gialli',
        hours: 4,
        taskKey: taskKey('sim', 'ripasso'),
      },
    ] satisfies Task[]
  ).filter((t) => !isPlanTaskDone(progress.completedPlanItems, t.taskKey))

  const weeks: WeekPlan[] = []
  let cursor = new Date(planStart)
  let weekIndex = 0

  // Settimane passate: ricostruzione «storica» per consultazione
  // (task che erano in coda e risultano completati, oppure ancora aperti = erano in ritardo)
  // Per semplicità mostriamo solo settimane da current-1 se utile; mostriamo tutte da START
  // ma le passate senza sessioni vive — solo riepilogo se non c’è nulla da fare.

  while (cursor <= endWeek) {
    const weekStart = iso(cursor)
    const weekEndDate = addDays(cursor, 6)
    const weekEnd = iso(weekEndDate > END ? END : weekEndDate)
    const isPast = cursor < currentWeekStart
    const isCurrent = iso(cursor) === iso(currentWeekStart)
    const isLastTwo = cursor >= lastSimWeek

    let sessions: PlanSession[] = []
    let estimatedHours = 0

    if (isPast) {
      // Passato: non assegniamo lavoro nuovo; eventuali task di questa settimana
      // sono già confluiti in overdue. Mostriamo solo un messaggio via sessions vuote
      // oppure task completati che matchano questa settimana via ore registrate.
      const completedHere = Object.keys(actual)
        .filter((k) => (actual[k] ?? 0) > 0)
        .slice(0, 0) // keep empty — past is informational via banner on current week
      void completedHere
      sessions = []
      estimatedHours = 0
    } else {
      let pool = forwardPool
      if (isLastTwo) {
        const simsLeft = simTasks.filter(
          (s) => !pool.some((p) => p.taskKey === s.taskKey) && !sessions.some((x) => x.taskKey === s.taskKey),
        )
        pool = [...simsLeft, ...pool]
      }

      const filled = fillWeek(
        pool,
        weeklyHours,
        weekStart,
        carriedKeys,
        carriedFromLabel,
      )
      sessions = filled.sessions
      forwardPool = filled.rest
      estimatedHours = Math.round(sessions.reduce((a, s) => a + s.hours, 0) * 10) / 10
    }

    const actualHours =
      Math.round(
        sessions.reduce((a, s) => a + (actual[s.taskKey] ?? 0), 0) * 10,
      ) / 10

    const goal = isPast
      ? 'Settimana conclusa — i non fatti sono stati ripianificati'
      : isCurrent
        ? overdue.length > 0
          ? `Priorità: ${overdue.length} argomenti riportati + piano della settimana`
          : 'Scegli dall’elenco cosa studiare oggi (pool della settimana)'
        : isLastTwo
          ? 'Simulazioni e ripasso mirato'
          : weekIndex < 8
            ? 'Copertura unità + esercizi (priorità triage)'
            : 'Recupero rossi/gialli'

    // Salta settimane passate vuote per non affollare (tieni solo current+future)
    if (!isPast) {
      weeks.push({
        weekStart,
        weekEnd,
        label: isCurrent ? `Questa settimana` : `Settimana ${weekIndex + 1}`,
        goal,
        sessions,
        estimatedHours,
        actualHours,
        isPast,
        isCurrent,
      })
    }

    cursor = addDays(cursor, 7)
    weekIndex++
    if (weekIndex > 22) break
  }

  // Rinumera label settimane future
  let n = 1
  for (const w of weeks) {
    if (!w.isCurrent) {
      w.label = `Settimana ${n}`
      n++
    }
  }

  return weeks
}

export function formatDay(isoDay: string): string {
  const [y, m, d] = isoDay.split('-').map(Number)
  const date = new Date(y!, m! - 1, d!)
  return date.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatWeekRange(weekStart: string, weekEnd: string): string {
  return `${formatDay(weekStart)} → ${formatDay(weekEnd)}`
}
