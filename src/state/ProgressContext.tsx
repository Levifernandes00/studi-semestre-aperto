import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppProgress, QuizAttempt, SemaforoColore } from '../types'
import {
  clearPlanCompletionsForUnita,
  exportProgress,
  importProgress,
  loadProgress,
  saveProgress,
  taskKey,
} from '../lib/progress'
import { scoreToColore } from '../lib/semaforo'

interface ProgressCtx {
  progress: AppProgress
  setIncludeBasi: (v: boolean) => void
  setWeeklyHoursTarget: (hours: number) => void
  setPlanHoursActual: (taskKey: string, hours: number) => void
  markTheory: (unitaId: string) => void
  recordQuiz: (
    unitaId: string,
    score: number,
    total: number,
    kind: QuizAttempt['kind'],
    updateColore: boolean,
  ) => void
  addEserciziDone: (unitaId: string, n: number) => void
  /** Completa/riapri un task del piano (usa taskKey stabile) */
  togglePlanItem: (taskKeyOrId: string) => void
  /** Rimuove lo spunta e forza il rientro in coda */
  reopenPlanItem: (taskKeyOrId: string) => void
  addSimulation: (
    score: number,
    max: number,
    simId?: string,
    byMateria?: { chimica: number; fisica: number; biologia: number },
  ) => void
  resetAll: () => void
  doExport: () => string
  doImport: (json: string) => void
}

const Ctx = createContext<ProgressCtx | null>(null)

function normalizeKey(taskKeyOrId: string): string {
  return taskKeyOrId.replace(/^\d{4}-\d{2}-\d{2}::/, '').replace(/^done::/, '')
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress())

  const persist = useCallback((next: AppProgress) => {
    setProgress(next)
    saveProgress(next)
  }, [])

  const value = useMemo<ProgressCtx>(
    () => ({
      progress,
      setIncludeBasi: (v) => persist({ ...progress, includeBasi: v }),
      setWeeklyHoursTarget: (hours) =>
        persist({
          ...progress,
          weeklyHoursTarget: Math.min(60, Math.max(5, Math.round(hours * 10) / 10)),
        }),
      setPlanHoursActual: (key, hours) => {
        const next = structuredClone(progress)
        if (!next.planHoursActual) next.planHoursActual = {}
        const v = Math.max(0, Math.round(hours * 10) / 10)
        if (v === 0) delete next.planHoursActual[key]
        else next.planHoursActual[key] = v
        persist(next)
      },
      markTheory: (unitaId) => {
        const next = structuredClone(progress)
        if (!next.unita[unitaId]) {
          next.unita[unitaId] = {
            colore: 'grigio',
            attempts: [],
            theoryRead: true,
            eserciziDone: 0,
            completedSessions: [],
          }
        } else next.unita[unitaId].theoryRead = true
        const key = taskKey(unitaId, 'teoria')
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
        if (!next.planCompletedAt) next.planCompletedAt = {}
        next.planCompletedAt[key] = new Date().toISOString()
        persist(next)
      },
      recordQuiz: (unitaId, score, total, kind, updateColore) => {
        const next = structuredClone(progress)
        if (!next.unita[unitaId]) {
          next.unita[unitaId] = {
            colore: 'grigio',
            attempts: [],
            theoryRead: false,
            eserciziDone: 0,
            completedSessions: [],
          }
        }
        const u = next.unita[unitaId]
        u.attempts.push({
          date: new Date().toISOString(),
          score,
          total,
          kind,
        })
        u.lastScore = score
        if (updateColore) {
          const nuovo = scoreToColore(score, total) as SemaforoColore
          u.colore = nuovo
          // Rientro urgente: se torna rosso/giallo, riporta i task in piano
          if (nuovo === 'rosso' || nuovo === 'giallo') {
            clearPlanCompletionsForUnita(next, unitaId, [
              'teoria',
              'esercizi',
              'verifica',
              'ripasso',
            ])
            if (!next.forcedPlanItems) next.forcedPlanItems = []
            for (const k of ['teoria', 'esercizi', 'verifica'] as const) {
              const tk = taskKey(unitaId, k)
              if (!next.forcedPlanItems.includes(tk)) next.forcedPlanItems.push(tk)
            }
          }
        }
        const key = taskKey(unitaId, kind === 'diagnostico' ? 'diagnostico' : kind)
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
        if (!next.planCompletedAt) next.planCompletedAt = {}
        next.planCompletedAt[key] = new Date().toISOString()
        persist(next)
      },
      addEserciziDone: (unitaId, n) => {
        const next = structuredClone(progress)
        if (!next.unita[unitaId]) {
          next.unita[unitaId] = {
            colore: 'grigio',
            attempts: [],
            theoryRead: false,
            eserciziDone: n,
            completedSessions: [],
          }
        } else next.unita[unitaId].eserciziDone += n
        const key = taskKey(unitaId, 'esercizi')
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
        if (!next.planCompletedAt) next.planCompletedAt = {}
        next.planCompletedAt[key] = new Date().toISOString()
        persist(next)
      },
      togglePlanItem: (taskKeyOrId) => {
        const normalized = normalizeKey(taskKeyOrId)
        const next = structuredClone(progress)
        const set = new Set(next.completedPlanItems)
        if (!next.planCompletedAt) next.planCompletedAt = {}
        if (set.has(normalized)) {
          set.delete(normalized)
          delete next.planCompletedAt[normalized]
        } else {
          set.add(normalized)
          next.planCompletedAt[normalized] = new Date().toISOString()
          // togliere da forced se era forzato e ora è fatto
          next.forcedPlanItems = (next.forcedPlanItems ?? []).filter((k) => k !== normalized)
        }
        next.completedPlanItems = [...set]
        persist(next)
      },
      reopenPlanItem: (taskKeyOrId) => {
        const normalized = normalizeKey(taskKeyOrId)
        const next = structuredClone(progress)
        next.completedPlanItems = next.completedPlanItems.filter(
          (id) => id !== normalized && !id.endsWith(`::${normalized}`),
        )
        if (next.planCompletedAt) delete next.planCompletedAt[normalized]
        if (!next.forcedPlanItems) next.forcedPlanItems = []
        if (!next.forcedPlanItems.includes(normalized)) {
          next.forcedPlanItems = [...next.forcedPlanItems, normalized]
        }
        persist(next)
      },
      addSimulation: (score, max, simId, byMateria) => {
        const next = structuredClone(progress)
        next.simulationScores = [
          ...next.simulationScores,
          {
            date: new Date().toISOString(),
            score,
            max,
            simId,
            byMateria,
          },
        ]
        const key = taskKey('sim', simId === 'sim-2' ? 'simulazione2' : 'simulazione')
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
        if (!next.planCompletedAt) next.planCompletedAt = {}
        next.planCompletedAt[key] = new Date().toISOString()
        persist(next)
      },
      resetAll: () => {
        localStorage.removeItem('semestre-aperto-progress-v1')
        persist(loadProgress())
      },
      doExport: () => exportProgress(progress),
      doImport: (json) => persist(importProgress(json)),
    }),
    [progress, persist],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useProgress() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress fuori dal provider')
  return ctx
}
