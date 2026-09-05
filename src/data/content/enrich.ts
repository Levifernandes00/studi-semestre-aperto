import type { TheoryRef, TheoryVideo, UnitaContent } from '../../types'
import { videosFor } from '../videos'
import { getUnita, materiaLabel } from '../unita'
import { mergeQuizBanks } from './banks'

function defaultRiferimenti(unitaId: string): TheoryRef[] {
  const u = getUnita(unitaId)
  const refs: TheoryRef[] = []
  if (u && !u.approfondimento) {
    refs.push({
      label: `Syllabus MUR ${materiaLabel(u.materia)} 2026`,
      detail: `Unità ${u.numero}: ${u.titolo}`,
    })
  } else if (u?.approfondimento) {
    refs.push({
      label: 'Approfondimento fuori programma 2026',
      detail: u.titolo,
    })
  }
  refs.push({
    label: 'Video aula',
    detail: 'Contenuti YouTube di terze parti (youtube-nocookie); verifica sempre sul canale ufficiale.',
  })
  return refs
}

/** Completa video/riferimenti e banche quiz se mancanti nel pack dell’unità */
export function enrichContent(c: UnitaContent): UnitaContent {
  const video: TheoryVideo[] = c.video?.length ? c.video : videosFor(c.unitaId)
  const riferimenti = c.riferimenti?.length ? c.riferimenti : defaultRiferimenti(c.unitaId)
  const withBanks = mergeQuizBanks({ ...c, verifica: c.verifica ?? [] })
  return { ...withBanks, video, riferimenti }
}
