import type { Materia, Question, UnitaContent } from '../../types'
import { getUnita } from '../unita'
import { buildApprofondimenti } from './approfondimenti'
import { buildBiologia } from './biologia'
import { buildChimica } from './chimica'
import { buildFisica } from './fisica'
import { enrichContent } from './enrich'
import { pickExamPaper } from '../quizHelpers'

const ALL: UnitaContent[] = [
  ...buildBiologia(),
  ...buildChimica(),
  ...buildFisica(),
  ...buildApprofondimenti(),
].map(enrichContent)

const BY_ID = Object.fromEntries(ALL.map((c) => [c.unitaId, c]))

export function getContent(unitaId: string): UnitaContent | undefined {
  return BY_ID[unitaId]
}

export function getExamQuestions(): Question[] {
  return ALL.filter((c) => !c.unitaId.startsWith('extra-')).flatMap((c) => [
    ...c.diagnostico.filter((q) => q.examEligible !== false),
    ...c.esercizi.filter((q) => q.examEligible !== false),
  ])
}

export function getExamQuestionsByMateria(materia: Materia): Question[] {
  return ALL.filter((c) => {
    if (c.unitaId.startsWith('extra-')) return false
    const u = getUnita(c.unitaId)
    return u?.materia === materia
  }).flatMap((c) => [
    ...c.diagnostico.filter((q) => q.examEligible !== false),
    ...c.esercizi.filter((q) => q.examEligible !== false),
  ])
}

export function buildExamPaper(materia: Materia, excludeIds: string[] = []): Question[] {
  return pickExamPaper(getExamQuestionsByMateria(materia), 21, 10, excludeIds)
}

export { ALL as ALL_CONTENT }
