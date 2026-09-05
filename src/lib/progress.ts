import type { AppProgress, SemaforoColore, UnitaProgress } from '../types'
import { UNITA } from '../data/unita'

const KEY = 'semestre-aperto-progress-v1'

export const DEFAULT_WEEKLY_HOURS = 28

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

/** Completato se c’è la taskKey o un id sessione legacy che la contiene */
export function isPlanTaskDone(completed: string[], key: string, sessionId?: string): boolean {
  if (completed.includes(key)) return true
  if (sessionId && completed.includes(sessionId)) return true
  // legacy: id conteneva unita-kind
  const [uid, kind] = key.split('::')
  return completed.some(
    (id) => id.includes(`${uid}-${kind}`) || id.includes(`${uid}::${kind}`),
  )
}
