import type { AppProgress, SemaforoColore, UnitaProgress } from '../types'
import { UNITA } from '../data/unita'

const KEY = 'semestre-aperto-progress-v1'

export const DEFAULT_WEEKLY_HOURS = 28
export const RIPASSO_DAYS = 14

function emptyUnita(): UnitaProgress {
  return {
    colore: 'grigio',
    attempts: [],
    theoryRead: false,
    eserciziDone: 0,
    completedSessions: [],
  }
}

export function defaultProgress(): AppProgress {
  const unita: Record<string, UnitaProgress> = {}
  for (const u of UNITA) unita[u.id] = emptyUnita()
  return {
    version: 1,
    unita,
    includeBasi: false,
    completedPlanItems: [],
    planCompletedAt: {},
    forcedPlanItems: [],
    planHoursActual: {},
    weeklyHoursTarget: DEFAULT_WEEKLY_HOURS,
    simulationScores: [],
  }
}

export function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as AppProgress
    const base = defaultProgress()
    return {
      ...base,
      ...parsed,
      unita: { ...base.unita, ...parsed.unita },
      planHoursActual: { ...base.planHoursActual, ...parsed.planHoursActual },
      planCompletedAt: { ...base.planCompletedAt, ...parsed.planCompletedAt },
      forcedPlanItems: parsed.forcedPlanItems ?? [],
      weeklyHoursTarget: parsed.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS,
    }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: AppProgress) {
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function exportProgress(p: AppProgress): string {
  return JSON.stringify(p, null, 2)
}

export function importProgress(json: string): AppProgress {
  const parsed = JSON.parse(json) as AppProgress
  if (parsed.version !== 1) throw new Error('Formato non supportato')
  const base = defaultProgress()
  const merged: AppProgress = {
    ...base,
    ...parsed,
    unita: { ...base.unita, ...parsed.unita },
    planHoursActual: { ...base.planHoursActual, ...parsed.planHoursActual },
    planCompletedAt: { ...base.planCompletedAt, ...parsed.planCompletedAt },
    forcedPlanItems: parsed.forcedPlanItems ?? [],
    weeklyHoursTarget: parsed.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS,
  }
  saveProgress(merged)
  return merged
}

export function setColore(p: AppProgress, unitaId: string, colore: SemaforoColore): AppProgress {
  const next = structuredClone(p)
  if (!next.unita[unitaId]) next.unita[unitaId] = emptyUnita()
  next.unita[unitaId].colore = colore
  return next
}

export function taskKey(unitaId: string, kind: string): string {
  return `${unitaId}::${kind}`
}

export function parseTaskKey(key: string): { unitaId: string; kind: string } | null {
  const normalized = key.replace(/^\d{4}-\d{2}-\d{2}::/, '')
  const idx = normalized.indexOf('::')
  if (idx <= 0) return null
  return {
    unitaId: normalized.slice(0, idx),
    kind: normalized.slice(idx + 2),
  }
}

/** Completato se c’è la taskKey o un id sessione legacy che la contiene */
export function isPlanTaskDone(completed: string[], key: string, sessionId?: string): boolean {
  if (completed.includes(key)) return true
  if (sessionId && completed.includes(sessionId)) return true
  const [uid, kind] = key.split('::')
  return completed.some(
    (id) => id.includes(`${uid}-${kind}`) || id.includes(`${uid}::${kind}`),
  )
}

export function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA).getTime()
  const b = new Date(isoB).getTime()
  return Math.floor(Math.abs(b - a) / (1000 * 60 * 60 * 24))
}

/** Rimuove spunte calendario per i kind indicati (rientro urgente) */
export function clearPlanCompletionsForUnita(
  p: AppProgress,
  unitaId: string,
  kinds: string[],
): void {
  const drop = new Set(kinds.map((k) => taskKey(unitaId, k)))
  p.completedPlanItems = p.completedPlanItems.filter((id) => {
    const n = id.replace(/^\d{4}-\d{2}-\d{2}::/, '')
    return !drop.has(n) && ![...drop].some((d) => id.includes(d.replace('::', '-')))
  })
  if (p.planCompletedAt) {
    for (const k of drop) delete p.planCompletedAt[k]
  }
}
