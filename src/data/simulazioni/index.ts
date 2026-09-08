import type { Materia, Question } from '../../types'
import { buildExamPaper } from '../content'
import { getArgomentiOf } from '../unita'

export type SimId = 'sim-1' | 'sim-2'

export const SIM_ORDER: Materia[] = ['chimica', 'fisica', 'biologia']

export const PROVA_MINUTES = 50
export const BREAK_MINUTES = 30
export const PROVA_MULTIPLA = 21
export const PROVA_FILL = 10
export const PROVA_N = PROVA_MULTIPLA + PROVA_FILL

export const SIM_META: Record<SimId, { titolo: string; descrizione: string }> = {
  'sim-1': {
    titolo: 'Simulazione I',
    descrizione: 'Giornata d’esame: Chimica → Fisica → Biologia (formato SF).',
  },
  'sim-2': {
    titolo: 'Simulazione II',
    descrizione: 'Seconda giornata completa, stesso formato, banco diverso.',
  },
}

function argsOf(...parents: string[]) {
  return parents.flatMap((p) => getArgomentiOf(p).map((a) => a.id))
}

/** Checklist temi tipici SF → id argomenti */
export const TOPIC_MAP: { tema: string; materia: Materia; unitaIds: string[] }[] = [
  { tema: 'Atomo, massa, orbitali, elettronegatività', materia: 'chimica', unitaIds: argsOf('chim-1') },
  { tema: 'Gas, soluzioni, Avogadro', materia: 'chimica', unitaIds: argsOf('chim-1', 'chim-2') },
  { tema: 'Legami, VSEPR, ibridazione', materia: 'chimica', unitaIds: argsOf('chim-1', 'chim-5') },
  { tema: 'Stechiometria, equilibrio, Ksp', materia: 'chimica', unitaIds: argsOf('chim-3') },
  { tema: 'pH, tamponi, redox', materia: 'chimica', unitaIds: argsOf('chim-4') },
  { tema: 'Organica funzionale', materia: 'chimica', unitaIds: argsOf('chim-5', 'chim-6') },
  { tema: 'Biomolecole', materia: 'chimica', unitaIds: argsOf('chim-7') },
  { tema: 'Meccanica', materia: 'fisica', unitaIds: argsOf('fis-1', 'fis-2') },
  { tema: 'Fluidi', materia: 'fisica', unitaIds: argsOf('fis-3') },
  { tema: 'Onde', materia: 'fisica', unitaIds: argsOf('fis-4') },
  { tema: 'Termodinamica', materia: 'fisica', unitaIds: argsOf('fis-5') },
  { tema: 'Elettromagnetismo', materia: 'fisica', unitaIds: argsOf('fis-6') },
  { tema: 'Radiazioni', materia: 'fisica', unitaIds: argsOf('fis-7') },
  { tema: 'Virus e cellula', materia: 'biologia', unitaIds: argsOf('bio-1') },
  { tema: 'Replicazione / epigenetica', materia: 'biologia', unitaIds: argsOf('bio-2') },
  { tema: 'Flusso informazione', materia: 'biologia', unitaIds: argsOf('bio-3') },
  { tema: 'Genetica', materia: 'biologia', unitaIds: argsOf('bio-4') },
  { tema: 'Organelli', materia: 'biologia', unitaIds: argsOf('bio-5') },
  { tema: 'Segnalazione', materia: 'biologia', unitaIds: argsOf('bio-6') },
  { tema: 'Ciclo e apoptosi', materia: 'biologia', unitaIds: argsOf('bio-7') },
]

export function buildSimulazioneDay(simId: SimId): Record<Materia, Question[]> {
  const papers = {} as Record<Materia, Question[]>
  if (simId === 'sim-1') {
    for (const materia of SIM_ORDER) {
      papers[materia] = buildExamPaper(materia, [])
    }
    return papers
  }
  const exclude: string[] = []
  for (const materia of SIM_ORDER) {
    for (const q of buildExamPaper(materia, [])) exclude.push(q.id)
  }
  for (const materia of SIM_ORDER) {
    papers[materia] = buildExamPaper(materia, exclude)
  }
  return papers
}

export function materiaLabelIt(m: Materia): string {
  if (m === 'chimica') return 'Chimica'
  if (m === 'fisica') return 'Fisica'
  return 'Biologia'
}
