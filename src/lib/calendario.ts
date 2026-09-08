import { getUnita, UNITA_APPROFONDIMENTI, UNITA_UFFICIALI } from '../data/unita'
import { colorePriority } from './semaforo'
import {
  DEFAULT_WEEKLY_HOURS,
  isPlanTaskDone,
  parseTaskKey,
  taskKey,
} from './progress'
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
  const diff = day === 0 ? -6 : 1 - day
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

function labelForTask(unitaId: string, kind: string): string {
  if (unitaId === 'sim') {
    if (kind === 'simulazione2') return 'Prova · Simulazione II (giornata)'
    if (kind === 'simulazione') return 'Prova · Simulazione I (giornata)'
    if (kind === 'ripasso') return 'Esercizi · ripasso mirato'
  }
  const u = getUnita(unitaId)
  const title = u?.titolo ?? unitaId
  const badge = u?.badge ? `${u.badge} · ` : ''
  switch (kind) {
    case 'esercizi':
      return `Esercizi · ${badge}${title}`
    case 'verifica':
      return `Prova · ${badge}${title}`
    case 'simulazione':
      return `Prova · Simulazione · ${title}`
    case 'diagnostico':
      return `Esercizi · ${title}` // legacy
    case 'teoria':
    case 'ripasso':
      return `Esercizi · ${title}` // legacy
    default:
      return `${kind} · ${title}`
  }
}

function kindHours(unitaId: string, kind: string): number {
  const u = getUnita(unitaId)
  const cfu = u?.cfu ?? 1
  switch (kind) {
    case 'verifica':
      return 0.75
    case 'esercizi':
    case 'diagnostico':
    case 'teoria':
    case 'ripasso':
      return Math.round(hoursForCfu(cfu) * 0.7 * 10) / 10
    case 'simulazione':
    case 'simulazione2':
      return 3.5
    default:
      return 1
  }
}

function toSession(
  task: Task,
  weekStart: string,
  carriedFrom: string | undefined,
  actual: Record<string, number>,
): PlanSession {
  const actualH = actual[task.taskKey] ?? 0
  return {
    id: `${weekStart}::${task.taskKey}`,
    taskKey: task.taskKey,
    unitaId: task.unitaId,
    kind: task.kind,
    label: task.label,
    hours: task.hours,
    weekStart,
    carriedFrom,
    lowHours: actualH > 0 && actualH < task.hours * 0.5,
  }
}

/** Completamenti ancora validi (legacy ripasso: non filtriamo più per scadenza spaced) */
function activeCompletedKeys(progress: AppProgress, _now: Date): string[] {
  return progress.completedPlanItems.map((raw) => raw.replace(/^\d{4}-\d{2}-\d{2}::/, ''))
}

function buildForcedTasks(progress: AppProgress, done: string[], existing: Set<string>): Task[] {
  const out: Task[] = []
  for (const key of progress.forcedPlanItems ?? []) {
    if (isPlanTaskDone(done, key)) continue
    if (existing.has(key)) continue
    const parsed = parseTaskKey(key)
    if (!parsed) continue
    // Solo esercizi / prove (verifica + simulazioni); mappa teoria/diagnostico/ripasso → esercizi
    let kind = parsed.kind
    if (kind === 'simulazione2') kind = 'simulazione'
    if (kind === 'teoria' || kind === 'diagnostico' || kind === 'ripasso') kind = 'esercizi'
    if (!['esercizi', 'verifica', 'simulazione'].includes(kind)) continue
    out.push({
      unitaId: parsed.unitaId,
      kind: kind as PlanSession['kind'],
      label: labelForTask(parsed.unitaId, kind === 'simulazione' ? parsed.kind : kind),
      hours: Math.round(kindHours(parsed.unitaId, kind) * 10) / 10,
      taskKey: key,
    })
  }
  return out
}

const ESERCIZI_SOGLIA = 8

function buildBacklog(progress: AppProgress, done: string[], _now: Date): Task[] {
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

  const push = (t: Omit<Task, 'taskKey'> & { taskKey?: string }) => {
    const key = t.taskKey ?? taskKey(t.unitaId, t.kind)
    if (isPlanTaskDone(done, key)) return
    if (backlog.some((x) => x.taskKey === key)) return
    backlog.push({ ...t, taskKey: key, hours: Math.round(t.hours * 10) / 10 })
  }

  for (const u of official) {
    const st = progress.unita[u.id]
    const colore = st?.colore ?? 'grigio'
    const needEsercizi =
      colore === 'grigio' ||
      colore === 'rosso' ||
      colore === 'giallo' ||
      (st?.eserciziDone ?? 0) < ESERCIZI_SOGLIA
    if (needEsercizi) {
      push({
        unitaId: u.id,
        kind: 'esercizi',
        label: labelForTask(u.id, 'esercizi'),
        hours: kindHours(u.id, 'esercizi'),
      })
    }

    const hasVerifica = st?.attempts.some((a) => a.kind === 'verifica') ?? false
    const needProva = colore !== 'verde' || !hasVerifica
    if (needProva) {
      push({
        unitaId: u.id,
        kind: 'verifica',
        label: labelForTask(u.id, 'verifica'),
        hours: kindHours(u.id, 'verifica'),
      })
    }
  }

  for (const u of extras) {
    push({
      unitaId: u.id,
      kind: 'esercizi',
      label: labelForTask(u.id, 'esercizi'),
      hours: 1.5,
    })
  }

  const existing = new Set(backlog.map((t) => t.taskKey))
  const forced = buildForcedTasks(progress, done, existing)
  return [...forced, ...backlog]
}

function fillWeek(
  pool: Task[],
  budget: number,
  weekStart: string,
  carriedKeys: Set<string>,
  carriedFromWeek: string | undefined,
  actual: Record<string, number>,
): { sessions: PlanSession[]; rest: Task[] } {
  const sessions: PlanSession[] = []
  const rest = [...pool]
  let hours = 0

  while (hours < budget - 0.35 && rest.length > 0) {
    const task = rest.shift()!
    const carried = carriedKeys.has(task.taskKey)
    sessions.push(
      toSession(task, weekStart, carried && carriedFromWeek ? carriedFromWeek : undefined, actual),
    )
    hours += task.hours
  }

  return { sessions, rest }
}

function buildDoneSessionsForWeek(
  progress: AppProgress,
  weekStart: string,
  weekEnd: string,
  openKeys: Set<string>,
  actual: Record<string, number>,
): PlanSession[] {
  const completedAt = progress.planCompletedAt ?? {}
  const out: PlanSession[] = []

  for (const raw of progress.completedPlanItems) {
    const key = raw.replace(/^\d{4}-\d{2}-\d{2}::/, '')
    if (openKeys.has(key)) continue
    const at = completedAt[key]
    if (!at) continue
    const day = at.slice(0, 10)
    if (day < weekStart || day > weekEnd) continue
    const parsed = parseTaskKey(key)
    if (!parsed) continue
    const kind = (
      parsed.kind === 'simulazione2' ? 'simulazione' : parsed.kind
    ) as PlanSession['kind']
    const hours = Math.round(kindHours(parsed.unitaId, parsed.kind) * 10) / 10
    const actualH = actual[key] ?? 0
    out.push({
      id: `${weekStart}::done::${key}`,
      taskKey: key,
      unitaId: parsed.unitaId,
      kind,
      label: labelForTask(parsed.unitaId, parsed.kind),
      hours,
      weekStart,
      lowHours: actualH > 0 && actualH < hours * 0.5,
    })
  }

  return out.sort((a, b) => (completedAt[b.taskKey] ?? '').localeCompare(completedAt[a.taskKey] ?? ''))
}

/** Completati fuori dalla settimana corrente — per «Rimetti in piano» */
export function listRecentCompleted(
  progress: AppProgress,
  limit = 30,
): { taskKey: string; label: string; completedAt: string }[] {
  const completedAt = progress.planCompletedAt ?? {}
  const seen = new Set<string>()
  const rows: { taskKey: string; label: string; completedAt: string }[] = []

  for (const raw of [...progress.completedPlanItems].reverse()) {
    const key = raw.replace(/^\d{4}-\d{2}-\d{2}::/, '')
    if (seen.has(key)) continue
    seen.add(key)
    const parsed = parseTaskKey(key)
    if (!parsed) continue
    rows.push({
      taskKey: key,
      label: labelForTask(parsed.unitaId, parsed.kind),
      completedAt: completedAt[key] ?? '',
    })
    if (rows.length >= limit) break
  }
  return rows
}

export function buildCalendar(progress: AppProgress, now = new Date()): WeekPlan[] {
  const weeklyHours = progress.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS
  const currentWeekStart = startOfWeek(now)
  const planStart = startOfWeek(START)
  const endWeek = startOfWeek(END)
  const actual = progress.planHoursActual ?? {}

  const done = activeCompletedKeys(progress, now)
  const backlog = buildBacklog(progress, done, now)

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
  let forwardPool = [...overdue, ...queue]

  const lastSimWeek = addDays(endWeek, -7)
  const simTasks: Task[] = (
    [
      {
        unitaId: 'sim',
        kind: 'simulazione' as const,
        label: 'Prova · Simulazione I (giornata)',
        hours: 3.5,
        taskKey: taskKey('sim', 'simulazione'),
      },
      {
        unitaId: 'sim',
        kind: 'simulazione' as const,
        label: 'Prova · Simulazione II (giornata)',
        hours: 3.5,
        taskKey: taskKey('sim', 'simulazione2'),
      },
    ] satisfies Task[]
  ).filter((t) => !isPlanTaskDone(done, t.taskKey))

  const weeks: WeekPlan[] = []
  let cursor = new Date(planStart)
  let weekIndex = 0

  while (cursor <= endWeek) {
    const weekStart = iso(cursor)
    const weekEndDate = addDays(cursor, 6)
    const weekEnd = iso(weekEndDate > END ? END : weekEndDate)
    const isPast = cursor < currentWeekStart
    const isCurrent = iso(cursor) === iso(currentWeekStart)
    const isLastTwo = cursor >= lastSimWeek

    let sessions: PlanSession[] = []
    let doneSessions: PlanSession[] = []
    let estimatedHours = 0

    if (!isPast) {
      let pool = forwardPool
      if (isLastTwo) {
        const simsLeft = simTasks.filter((s) => !pool.some((p) => p.taskKey === s.taskKey))
        pool = [...simsLeft, ...pool]
      }

      const filled = fillWeek(pool, weeklyHours, weekStart, carriedKeys, carriedFromLabel, actual)
      sessions = filled.sessions
      forwardPool = filled.rest
      estimatedHours = Math.round(sessions.reduce((a, s) => a + s.hours, 0) * 10) / 10

      if (isCurrent) {
        doneSessions = buildDoneSessionsForWeek(
          progress,
          weekStart,
          weekEnd,
          new Set(sessions.map((s) => s.taskKey)),
          actual,
        )
      }
    }

    const allForActual = [...sessions, ...doneSessions]
    const actualHours =
      Math.round(allForActual.reduce((a, s) => a + (actual[s.taskKey] ?? 0), 0) * 10) / 10

    const goal = isPast
      ? 'Settimana conclusa — i non fatti sono stati ripianificati'
      : isCurrent
        ? overdue.length > 0
          ? `Priorità: ${overdue.length} riportati · spunta = fatto (reversibile)`
          : 'Scegli dal pool · i fatti restano qui sotto per annullare'
        : isLastTwo
          ? 'Prove: simulazioni d’esame'
          : 'Esercizi e Prove sugli argomenti'

    if (!isPast) {
      weeks.push({
        weekStart,
        weekEnd,
        label: isCurrent ? `Questa settimana` : `Settimana ${weekIndex + 1}`,
        goal,
        sessions,
        doneSessions,
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
