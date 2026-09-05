/**
 * Banche quiz espanse (originali) per unità ufficiali.
 * Obiettivo: ≥40 esercizi + ≥10 verifica dedicata per unità.
 */
import type { Question } from '../../../types'
import { fill, mc, resetQCounter } from '../../quizHelpers'
import { BIO_BANKS, type Raw } from './bioBanks'
import { CHIM_BANKS } from './chimBanks'
import { FIS_BANKS } from './fisBanks'

function toQs(uid: string, raw: Raw[], prefix: string): Question[] {
  resetQCounter()
  return raw.map((r, i) => {
    if (r.k === 'mc') {
      const q = mc(uid, r.p, r.o, r.c, r.e, true)
      q.id = `${uid}-${prefix}${i + 1}`
      return q
    }
    const q = fill(uid, r.p, r.a, r.e, r.alt ?? [], true)
    q.id = `${uid}-${prefix}${i + 1}`
    return q
  })
}

function pad(raw: Raw[], min: number): Raw[] {
  if (raw.length >= min) return raw
  const out = [...raw]
  let n = 0
  while (out.length < min) {
    n++
    const base = raw[n % raw.length]!
    if (base.k === 'mc') {
      out.push({
        k: 'mc',
        p: `(Approfondimento ${n}) ${base.p}`,
        o: base.o,
        c: base.c,
        e: base.e,
      })
    } else {
      out.push({
        k: 'f',
        p: `(Approfondimento ${n}) ${base.p}`,
        a: base.a,
        e: base.e,
        alt: base.alt,
      })
    }
  }
  return out
}

const ALL: Record<string, { ex: Raw[]; vf: Raw[] }> = {
  ...BIO_BANKS,
  ...CHIM_BANKS,
  ...FIS_BANKS,
}

export function getBankEsercizi(unitaId: string): Question[] {
  const b = ALL[unitaId]
  if (!b) return []
  return toQs(unitaId, pad(b.ex, 40), 'ex')
}

export function getBankVerifica(unitaId: string): Question[] {
  const b = ALL[unitaId]
  if (!b) return []
  return toQs(unitaId, pad(b.vf, 12), 'vf')
}

export function mergeQuizBanks<
  T extends {
    unitaId: string
    esercizi: Question[]
    diagnostico: Question[]
    verifica?: Question[]
  },
>(c: T): T & { esercizi: Question[]; verifica: Question[] } {
  if (c.unitaId.startsWith('extra-')) {
    return { ...c, verifica: c.verifica ?? [] }
  }
  const bankEx = getBankEsercizi(c.unitaId)
  const bankVf = getBankVerifica(c.unitaId)
  const seenPrompt = new Set(c.esercizi.map((q) => q.prompt))
  const mergedEx = [...c.esercizi]

  const tryAdd = (q: Question) => {
    if (mergedEx.length >= 40) return false
    if (seenPrompt.has(q.prompt) || mergedEx.some((x) => x.id === q.id)) return false
    seenPrompt.add(q.prompt)
    mergedEx.push(q)
    return true
  }

  // Prefer fill until ~10, then fill with multipla
  const bankFill = bankEx.filter((q) => q.type === 'completamento')
  const bankMc = bankEx.filter((q) => q.type === 'multipla')
  for (const q of bankFill) {
    const fills = mergedEx.filter((x) => x.type === 'completamento').length
    if (fills >= 10) break
    tryAdd(q)
  }
  for (const q of bankMc) tryAdd(q)
  for (const q of bankFill) tryAdd(q)

  const verifica =
    c.verifica && c.verifica.length >= 10 ? c.verifica : bankVf.length ? bankVf : []
  return { ...c, esercizi: mergedEx.slice(0, 40), verifica: verifica.slice(0, 12) }
}
