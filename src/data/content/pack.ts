import type { Question, UnitaContent } from '../../types'

type PackExtras = Pick<UnitaContent, 'figure' | 'video' | 'riferimenti'>

export function pack(
  unitaId: string,
  theory: UnitaContent['theory'],
  perCapireMeglio: UnitaContent['perCapireMeglio'],
  diagnostico: UnitaContent['diagnostico'],
  esercizi: UnitaContent['esercizi'],
  extras?: PackExtras,
  verifica: Question[] = [],
): UnitaContent {
  return {
    unitaId,
    theory,
    perCapireMeglio,
    diagnostico,
    esercizi,
    verifica,
    ...extras,
  }
}
