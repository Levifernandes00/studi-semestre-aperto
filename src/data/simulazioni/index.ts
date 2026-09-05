import type { Materia, Question } from '../../types'
import { buildExamPaper } from '../content'

export type SimId = 'sim-1' | 'sim-2'

export const SIM_ORDER: Materia[] = ['chimica', 'fisica', 'biologia']

export const PROVA_MINUTES = 50
export const BREAK_MINUTES = 30
export const PROVA_MULTIPLA = 21
export const PROVA_FILL = 10
export const PROVA_N = PROVA_MULTIPLA + PROVA_FILL

export const SIM_META: Record<
  SimId,
  { titolo: string; descrizione: string }
> = {
  'sim-1': {
    titolo: 'Simulazione I',
    descrizione: 'Giornata d’esame: Chimica → Fisica → Biologia (formato SF).',
  },
  'sim-2': {
    titolo: 'Simulazione II',
    descrizione: 'Seconda giornata completa, stesso formato, banco diverso.',
  },
}

/** Checklist temi tipici SF → unità (calibrazione, non testo protetto). */
export const TOPIC_MAP: { tema: string; materia: Materia; unitaIds: string[] }[] = [
  { tema: 'Atomo, massa, orbitali, elettronegatività', materia: 'chimica', unitaIds: ['chim-1'] },
  { tema: 'Gas (Boyle), soluzioni, Avogadro', materia: 'chimica', unitaIds: ['chim-1', 'chim-2'] },
  { tema: 'Legami, VSEPR, ibridazione', materia: 'chimica', unitaIds: ['chim-1', 'chim-5'] },
  { tema: 'Stechiometria, equilibrio, Le Chatelier, Ksp', materia: 'chimica', unitaIds: ['chim-3'] },
  { tema: 'pH, tamponi, redox', materia: 'chimica', unitaIds: ['chim-4'] },
  { tema: 'Organica funzionale / aromaticità', materia: 'chimica', unitaIds: ['chim-5', 'chim-6'] },
  { tema: 'Biochimica (AA, lipidi, enzimi)', materia: 'chimica', unitaIds: ['chim-7'] },
  { tema: 'Meccanica, energia, urti', materia: 'fisica', unitaIds: ['fis-1', 'fis-2'] },
  { tema: 'Fluidi, Bernoulli, Poiseuille', materia: 'fisica', unitaIds: ['fis-3'] },
  { tema: 'Onde, suono', materia: 'fisica', unitaIds: ['fis-4'] },
  { tema: 'Termodinamica / gas', materia: 'fisica', unitaIds: ['fis-5'] },
  { tema: 'Elettromagnetismo / circuiti', materia: 'fisica', unitaIds: ['fis-6'] },
  { tema: 'Ottica, radiazioni, emivita', materia: 'fisica', unitaIds: ['fis-7'] },
  { tema: 'Virus, cellula, genoma', materia: 'biologia', unitaIds: ['bio-1'] },
  { tema: 'Replicazione / epigenetica', materia: 'biologia', unitaIds: ['bio-2'] },
  { tema: 'Flusso informazione / proteine', materia: 'biologia', unitaIds: ['bio-3'] },
  { tema: 'Genetica / mutazioni', materia: 'biologia', unitaIds: ['bio-4'] },
  { tema: 'Organelli / traffico / citoscheletro', materia: 'biologia', unitaIds: ['bio-5'] },
  { tema: 'Segnalazione GPCR / secondi messaggeri', materia: 'biologia', unitaIds: ['bio-6'] },
  { tema: 'Ciclo, apoptosi, oncogeni', materia: 'biologia', unitaIds: ['bio-7'] },
]

export function buildSimulazioneDay(simId: SimId): Record<Materia, Question[]> {
  const exclude: string[] = []
  const papers = {} as Record<Materia, Question[]>
  // sim-2: reshuffle by excluding nothing but calling twice would overlap —
  // exclude first paper IDs when building sim-2 from same pool after a warm call.
  for (const materia of SIM_ORDER) {
    const paper = buildExamPaper(materia, simId === 'sim-2' ? exclude : [])
    papers[materia] = paper
    if (simId === 'sim-1') {
      // collect ids so sim-2 can prefer different questions when both built in sequence
      for (const q of paper) exclude.push(q.id)
    }
  }
  if (simId === 'sim-2') {
    // rebuild with exclusions from a fresh sim-1-like draw
    const exclude2: string[] = []
    for (const materia of SIM_ORDER) {
      const first = buildExamPaper(materia, [])
      for (const q of first) exclude2.push(q.id)
    }
    for (const materia of SIM_ORDER) {
      papers[materia] = buildExamPaper(materia, exclude2)
    }
  }
  return papers
}

export function materiaLabelIt(m: Materia): string {
  if (m === 'chimica') return 'Chimica'
  if (m === 'fisica') return 'Fisica'
  return 'Biologia'
}
