import type { TheoryRef, TheoryVideo, UnitaContent } from '../../types'
import { videosFor } from '../videos'
import { getUnita, materiaLabel } from '../unita'
import { mergeQuizBanks } from './banks'
import { risorseFor } from './risorse'

function defaultRiferimenti(unitaId: string): TheoryRef[] {
  const fromCatalog = risorseFor(unitaId)
  if (fromCatalog.length) return fromCatalog
  const u = getUnita(unitaId)
  const refs: TheoryRef[] = []
  if (u && !u.approfondimento) {
    refs.push({
      label: `Syllabus MUR ${materiaLabel(u.materia)} 2026`,
      detail: `Unità ${u.numero}: ${u.titolo}`,
      url: 'https://www.mur.gov.it/',
    })
  }
  return refs
}

/** Completa video/riferimenti e banche quiz se mancanti nel pack dell’unità */
export function enrichContent(c: UnitaContent): UnitaContent {
  const video: TheoryVideo[] = c.video?.length ? c.video : videosFor(c.unitaId)
  // Preferisci catalogo risorse (con URL); unisci eventuali refs già nel pack
  const catalog = defaultRiferimenti(c.unitaId)
  const existing = c.riferimenti ?? []
  const seen = new Set(catalog.map((r) => r.label))
  const riferimenti = [
    ...catalog,
    ...existing.filter((r) => !seen.has(r.label)),
  ]
  const withBanks = mergeQuizBanks({ ...c, verifica: c.verifica ?? [] })
  return { ...withBanks, video, riferimenti }
}
