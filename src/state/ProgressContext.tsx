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
  addSimulation: (score: number, max: number) => void
  resetAll: () => void
  doExport: () => string
  doImport: (json: string) => void
}

const Ctx = createContext<ProgressCtx | null>(null)

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
          u.colore = scoreToColore(score, total) as SemaforoColore
        }
        // Auto-completa il task triage/verifica/esercizi sul calendario
        const key = taskKey(unitaId, kind === 'diagnostico' ? 'diagnostico' : kind)
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
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
        persist(next)
      },
      togglePlanItem: (taskKeyOrId) => {
        const normalized = taskKeyOrId.replace(/^\d{4}-\d{2}-\d{2}::/, '')
        const set = new Set(progress.completedPlanItems)
        if (set.has(normalized)) set.delete(normalized)
        else set.add(normalized)
        persist({ ...progress, completedPlanItems: [...set] })
      },
      addSimulation: (score, max) => {
        const next = {
          ...progress,
          simulationScores: [
            ...progress.simulationScores,
            { date: new Date().toISOString(), score, max },
          ],
        }
        const key = taskKey('sim', 'simulazione')
        if (!next.completedPlanItems.includes(key)) {
          next.completedPlanItems = [...next.completedPlanItems, key]
        }
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
