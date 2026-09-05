import type { UnitaContent } from '../../types'
import { buildApprofondimenti } from './approfondimenti'
import { buildBiologia } from './biologia'
import { buildChimica } from './chimica'
import { buildFisica } from './fisica'
import { enrichContent } from './enrich'

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

export function getExamQuestions(): UnitaContent['diagnostico'] {
  return ALL.filter((c) => !c.unitaId.startsWith('extra-')).flatMap((c) => [
    ...c.diagnostico.filter((q) => q.examEligible !== false),
    ...c.esercizi.filter((q) => q.examEligible !== false),
  ])
}

export { ALL as ALL_CONTENT }
