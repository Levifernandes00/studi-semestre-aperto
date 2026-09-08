import type { AppProgress, SemaforoColore, UnitaProgress } from '../types'
import { UNITA, getArgomentiOf } from '../data/unita'

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

/** Cartella di studio (argomento/extra), non unità MUR genitore */
export function isStudyUnitaId(id: string): boolean {
  if (id === 'sim') return true
  return UNITA.some((u) => u.id === id)
}

/** Kind legacy → esercizi/verifica/simulazione usati in coda */
export function normalizePlanKind(kind: string): 'esercizi' | 'verifica' | 'simulazione' | null {
  if (kind === 'simulazione2' || kind === 'simulazione') return 'simulazione'
  if (kind === 'teoria' || kind === 'diagnostico' || kind === 'ripasso') return 'esercizi'
  if (kind === 'esercizi' || kind === 'verifica') return kind
  return null
}

/**
 * Espande chiavi piano su id MUR (bio-1, …) verso i figli-argomento.
 * Droppa chiavi che non sono cartelle di studio.
 */
export function expandForcedPlanItems(keys: string[]): string[] {
  const out: string[] = []
  const seen = new Set<string>()

  const push = (tk: string) => {
    if (seen.has(tk)) return
    seen.add(tk)
    out.push(tk)
  }

  for (const key of keys) {
    const parsed = parseTaskKey(key)
    if (!parsed) continue
    const kind = normalizePlanKind(parsed.kind)
    if (!kind) continue

    const kids = getArgomentiOf(parsed.unitaId)
    if (kids.length > 0) {
      for (const kid of kids) push(taskKey(kid.id, kind))
      continue
    }

    if (!isStudyUnitaId(parsed.unitaId)) continue

    if (parsed.unitaId === 'sim') {
      push(parsed.kind === 'simulazione2' ? taskKey('sim', 'simulazione2') : taskKey('sim', 'simulazione'))
      continue
    }

    push(taskKey(parsed.unitaId, kind))
  }
  return out
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
    const mergedUnita: Record<string, UnitaProgress> = { ...base.unita, ...parsed.unita }

    // Migrazione: colore da unità MUR legacy (bio-1, …) → argomenti figli
    for (const [id, st] of Object.entries(parsed.unita ?? {})) {
      const kids = getArgomentiOf(id)
      if (!kids.length) continue
      for (const kid of kids) {
        const cur = mergedUnita[kid.id] ?? emptyUnita()
        if (cur.colore === 'grigio' && st.colore && st.colore !== 'grigio') {
          mergedUnita[kid.id] = {
            ...cur,
            colore: st.colore,
            lastScore: st.lastScore,
            eserciziSession: undefined,
          }
        }
      }
    }

    const forcedPlanItems = expandForcedPlanItems(parsed.forcedPlanItems ?? [])
    const merged: AppProgress = {
      ...base,
      ...parsed,
      unita: mergedUnita,
      planHoursActual: { ...base.planHoursActual, ...parsed.planHoursActual },
      planCompletedAt: { ...base.planCompletedAt, ...parsed.planCompletedAt },
      forcedPlanItems,
      weeklyHoursTarget: parsed.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS,
    }
    // Persisti se c’erano chiavi MUR legacy da espandere/rimuovere
    const rawForced = parsed.forcedPlanItems ?? []
    if (
      rawForced.length !== forcedPlanItems.length ||
      rawForced.some((k, i) => k !== forcedPlanItems[i])
    ) {
      saveProgress(merged)
    }
    return merged
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
    forcedPlanItems: expandForcedPlanItems(parsed.forcedPlanItems ?? []),
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
