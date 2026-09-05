import { getUnita, UNITA_APPROFONDIMENTI, UNITA_UFFICIALI } from '../data/unita'
import { colorePriority } from './semaforo'
import {
  DEFAULT_WEEKLY_HOURS,
  RIPASSO_DAYS,
  daysBetween,
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
    if (kind === 'simulazione2') return 'Simulazione II (giornata 3 prove)'
    if (kind === 'ripasso') return 'Ripasso mirato rossi/gialli'
    if (kind === 'simulazione') return 'Simulazione I (giornata 3 prove)'
  }
  const u = getUnita(unitaId)
  const title = u?.titolo ?? unitaId
  switch (kind) {
    case 'diagnostico':
      return `Triage · ${title}`
    case 'teoria':
      return u?.approfondimento ? `Basi · ${title}` : `Teoria · ${title}`
    case 'esercizi':
      return `Esercizi · ${title}`
    case 'verifica':
      return `Verifica · ${title}`
    case 'ripasso':
      return `Ripasso · ${title}`
    case 'simulazione':
      return `Simulazione · ${title}`
    default:
      return `${kind} · ${title}`
  }
}

function kindHours(unitaId: string, kind: string): number {
  const u = getUnita(unitaId)
  const cfu = u?.cfu ?? 1
  switch (kind) {
    case 'diagnostico':
    case 'verifica':
      return 0.5
    case 'teoria':
      return u?.approfondimento ? 1.5 : hoursForCfu(cfu) * 0.45
    case 'esercizi':
      return hoursForCfu(cfu) * 0.4
    case 'ripasso':
      return 1
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

/** Completamenti ancora validi: i ripassi scaduti dopo RIPASSO_DAYS tornano in coda */
function activeCompletedKeys(progress: AppProgress, now: Date): string[] {
  const completedAt = progress.planCompletedAt ?? {}
  const nowIso = now.toISOString()
  return progress.completedPlanItems.filter((raw) => {
    const key = raw.replace(/^\d{4}-\d{2}-\d{2}::/, '')
    const parsed = parseTaskKey(key)
    if (parsed?.kind === 'ripasso') {
      const at = completedAt[key]
      if (at && daysBetween(at, nowIso) >= RIPASSO_DAYS) return false
    }
    return true
  })
}

function buildRipassoTasks(progress: AppProgress, done: string[], now: Date): Task[] {
  const completedAt = progress.planCompletedAt ?? {}
  const nowIso = now.toISOString()
  const out: Task[] = []

  for (const u of UNITA_UFFICIALI) {
    const colore = progress.unita[u.id]?.colore ?? 'grigio'
    if (colore !== 'verde') continue
    const key = taskKey(u.id, 'ripasso')
    if (isPlanTaskDone(done, key)) continue

    const lastRipasso = completedAt[key]
    const lastAttempt = progress.unita[u.id]?.attempts.at(-1)?.date
    const last = [lastRipasso, lastAttempt].filter(Boolean).sort().at(-1)
    if (last && daysBetween(last, nowIso) < RIPASSO_DAYS) continue

    out.push({
      unitaId: u.id,
      kind: 'ripasso',
      label: `Ripasso · ${u.titolo}`,
      hours: 1,
      taskKey: key,
    })
  }
  return out
}

function buildForcedTasks(progress: AppProgress, done: string[], existing: Set<string>): Task[] {
  const out: Task[] = []
  for (const key of progress.forcedPlanItems ?? []) {
    if (isPlanTaskDone(done, key)) continue
    if (existing.has(key)) continue
    const parsed = parseTaskKey(key)
    if (!parsed) continue
    const kind = (parsed.kind === 'simulazione2' ? 'simulazione' : parsed.kind) as PlanSession['kind']
    if (
      !['diagnostico', 'teoria', 'esercizi', 'verifica', 'simulazione', 'ripasso'].includes(kind) &&
      parsed.kind !== 'simulazione2'
    ) {
      continue
    }
    out.push({
      unitaId: parsed.unitaId,
      kind: parsed.kind === 'simulazione2' ? 'simulazione' : kind,
      label: labelForTask(parsed.unitaId, parsed.kind),
      hours: Math.round(kindHours(parsed.unitaId, parsed.kind) * 10) / 10,
      taskKey: key,
    })
  }
  return out
}

function buildBacklog(progress: AppProgress, done: string[], now: Date): Task[] {
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

  for (const t of buildRipassoTasks(progress, done, now)) push(t)

  const existing = new Set(backlog.map((t) => t.taskKey))
  const forced = buildForcedTasks(progress, done, existing)
  // Priorità: forzati e ripassi in cima, poi il resto del backlog
  const ripassi = backlog.filter((t) => t.kind === 'ripasso')
  const rest = backlog.filter((t) => t.kind !== 'ripasso')
  return [...forced, ...ripassi, ...rest]
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
        label: 'Simulazione I (giornata 3 prove)',
        hours: 3.5,
        taskKey: taskKey('sim', 'simulazione'),
      },
      {
        unitaId: 'sim',
        kind: 'simulazione' as const,
        label: 'Simulazione II (giornata 3 prove)',
        hours: 3.5,
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
          ? 'Simulazioni e ripasso mirato'
          : 'Copertura unità + ripassi verdi (ogni 14 giorni)'

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
