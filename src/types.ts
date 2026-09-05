export type Materia = 'biologia' | 'chimica' | 'fisica'

export type SemaforoColore = 'grigio' | 'rosso' | 'giallo' | 'verde'

export type QuestionType = 'multipla' | 'completamento'

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  /** Per multipla: opzioni. Per completamento: non usato. */
  options?: string[]
  /** Indice corretto (multipla) oppure testo esatto accettato (completamento, case-insensitive). */
  answer: number | string
  /** Risposte alternative accettate per completamento */
  acceptedAnswers?: string[]
  explanation: string
  /** Se true, usabile nelle simulazioni d'esame (solo unità ufficiali) */
  examEligible?: boolean
}

export interface TheoryFigure {
  id: string
  kind: 'svg' | 'sketch'
  caption: string
  alt: string
}

export interface TheoryVideo {
  youtubeId: string
  titolo: string
  canale: string
  perché: string
}

export interface TheoryRef {
  label: string
  detail?: string
}

export interface TheorySection {
  title: string
  body: string
  /** Formule chiave (testo plain) */
  formule?: string[]
  /** Esempio biomedico o applicativo */
  esempio?: string
  /** Trappola d'esame / attenzione */
  attenzione?: string
  /** Elenco «spiegazioni possibili» / passi in più */
  approfondisci?: string[]
  /** ID di TheoryFigure in UnitaContent.figure */
  figureIds?: string[]
}

export interface PerCapireMeglio {
  /** Analogia di apertura, tono da 12 anni */
  analogia: string
  /** Concetti spiegati in linguaggio semplice */
  concetti: { titolo: string; testo: string }[]
}

export interface Unita {
  id: string
  materia: Materia
  numero: number
  titolo: string
  cfu: number
  sottotitoli: string[]
  /** Se true: non in programma 2026, basi extra */
  approfondimento: boolean
  /** ID unità ufficiali collegate (solo sugli extra) */
  collegataA?: string[]
  /** Perché questo extra appare in quella unità ufficiale */
  motivoCollegamento?: Record<string, string>
  badge?: string
}

export interface UnitaContent {
  unitaId: string
  theory: TheorySection[]
  perCapireMeglio: PerCapireMeglio
  diagnostico: Question[]
  esercizi: Question[]
  /** Pool dedicato verifica (varianti più dure); in UI se ne pescano 8 */
  verifica: Question[]
  figure?: TheoryFigure[]
  video?: TheoryVideo[]
  riferimenti?: TheoryRef[]
}

export interface QuizAttempt {
  date: string
  score: number
  total: number
  kind: 'diagnostico' | 'verifica' | 'esercizi'
}

export interface UnitaProgress {
  colore: SemaforoColore
  lastScore?: number
  attempts: QuizAttempt[]
  theoryRead: boolean
  eserciziDone: number
  completedSessions: string[]
}

export interface AppProgress {
  version: 1
  unita: Record<string, UnitaProgress>
  includeBasi: boolean
  /** Chiavi task completate: `${unitaId}::${kind}` (accetta anche id sessione legacy) */
  completedPlanItems: string[]
  /** Quando è stato spuntato (ISO) — per undo settimanale e ripasso spaced */
  planCompletedAt?: Record<string, string>
  /** Task che l’utente ha rimesso in piano anche se il syllabus li avrebbe nascosti */
  forcedPlanItems?: string[]
  /** Ore realmente studiate per taskKey */
  planHoursActual?: Record<string, number>
  /** Ore obiettivo a settimana (default 28) */
  weeklyHoursTarget?: number
  simulationScores: SimulationScore[]
}

export interface SimulationScore {
  date: string
  score: number
  max: number
  /** sim-1 | sim-2 */
  simId?: string
  /** Punteggi per prova (chimica, fisica, biologia) */
  byMateria?: { chimica: number; fisica: number; biologia: number }
}

export interface PlanSession {
  id: string
  /** Chiave stabile per completamento e ore: unitaId::kind */
  taskKey: string
  unitaId: string
  kind: 'diagnostico' | 'teoria' | 'esercizi' | 'verifica' | 'simulazione' | 'ripasso'
  label: string
  /** Ore pianificate */
  hours: number
  /** Inizio settimana di appartenenza (YYYY-MM-DD, lunedì) */
  weekStart: string
  /** Se riportato da una settimana precedente non completata */
  carriedFrom?: string
  /** Ore reali < 50% del piano */
  lowHours?: boolean
}

export interface WeekPlan {
  weekStart: string
  weekEnd: string
  label: string
  goal: string
  /** Task ancora da fare in questa settimana */
  sessions: PlanSession[]
  /** Task spuntati che restano visibili (undo) — tipicamente settimana corrente */
  doneSessions: PlanSession[]
  estimatedHours: number
  /** Ore reali già registrate sui task di questa settimana */
  actualHours: number
  /** true = settimana già passata (solo consultazione / completamenti in ritardo) */
  isPast: boolean
  /** true = settimana corrente */
  isCurrent: boolean
}
