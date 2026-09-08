import type { TheoryRef } from '../../types'
import { ARGOMENTI, getMurUnita, getUnita, materiaLabel } from '../unita'
import { topicsFor } from './edisesTopicMap'

/** Risorse pubbliche complementari (mai Edises / banche a pagamento). */
const WIKI: Record<string, string> = {
  biologia: 'https://it.wikipedia.org/wiki/Biologia_cellulare',
  chimica: 'https://it.wikipedia.org/wiki/Chimica_generale',
  fisica: 'https://it.wikipedia.org/wiki/Fisica',
}

const KHAN_IT = 'https://it.khanacademy.org/'
const PHYLIB = 'https://it.wikipedia.org/wiki/Portale:Fisica'
const CHEMLIB = 'https://it.wikipedia.org/wiki/Portale:Chimica'
const BIOLIB = 'https://it.wikipedia.org/wiki/Portale:Biologia'

/** Link tematici mirati (Wikipedia IT / portali open) per argomenti chiave */
const TOPIC_URLS: Record<string, { label: string; url: string; detail?: string }[]> = {
  'fis-2-cinematica': [
    { label: 'Wikipedia — Cinematica', url: 'https://it.wikipedia.org/wiki/Cinematica', detail: 'Definizioni e moti tipici' },
  ],
  'fis-2-dinamica-e-forze': [
    { label: 'Wikipedia — Dinamica', url: 'https://it.wikipedia.org/wiki/Dinamica_(fisica)', detail: 'Leggi di Newton' },
  ],
  'fis-2-lavoro-ed-energia': [
    { label: 'Wikipedia — Lavoro (fisica)', url: 'https://it.wikipedia.org/wiki/Lavoro_(fisica)', detail: 'W, energia' },
  ],
  'fis-2-quantita-di-moto-centro-di-massa-e-leve': [
    { label: 'Wikipedia — Quantità di moto', url: 'https://it.wikipedia.org/wiki/Quantit%C3%A0_di_moto', detail: 'p e impulso' },
  ],
  'fis-3-bernoulli-e-circolazione': [
    { label: 'Wikipedia — Bernoulli', url: 'https://it.wikipedia.org/wiki/Equazione_di_Bernoulli', detail: 'Fluidi ideali' },
  ],
  'fis-5-primo-principio': [
    { label: 'Wikipedia — Primo principio', url: 'https://it.wikipedia.org/wiki/Primo_principio_della_termodinamica', detail: 'ΔU = Q − W' },
  ],
  'fis-5-secondo-principio-carnot-ed-entropia': [
    { label: 'Wikipedia — Secondo principio', url: 'https://it.wikipedia.org/wiki/Secondo_principio_della_termodinamica', detail: 'Carnot ed entropia' },
  ],
  'fis-6-potenziale-e-corrente-ohm-joule': [
    { label: 'Wikipedia — Legge di Ohm', url: 'https://it.wikipedia.org/wiki/Legge_di_Ohm', detail: 'V = IR' },
  ],
  'fis-7-lambert-beer': [
    { label: 'Wikipedia — Lambert–Beer', url: 'https://it.wikipedia.org/wiki/Legge_di_Lambert-Beer', detail: 'Assorbanza' },
  ],
  'chim-4-acidi-basi-e-ph': [
    { label: 'Wikipedia — pH', url: 'https://it.wikipedia.org/wiki/PH', detail: 'Scala di acidità' },
  ],
  'chim-4-soluzioni-tampone-e-sangue': [
    { label: 'Wikipedia — Soluzione tampone', url: 'https://it.wikipedia.org/wiki/Soluzione_tampone', detail: 'Henderson–Hasselbalch' },
  ],
  'chim-3-equilibrio-chimico': [
    { label: 'Wikipedia — Equilibrio chimico', url: 'https://it.wikipedia.org/wiki/Equilibrio_chimico', detail: 'K e Le Chatelier' },
  ],
  'bio-2-replicazione-del-dna': [
    { label: 'Wikipedia — Replicazione del DNA', url: 'https://it.wikipedia.org/wiki/Replicazione_del_DNA', detail: 'Forcella e enzimi' },
  ],
  'bio-7-mitosi-e-meiosi': [
    { label: 'Wikipedia — Mitosi', url: 'https://it.wikipedia.org/wiki/Mitosi', detail: 'Fasi mitotiche' },
    { label: 'Wikipedia — Meiosi', url: 'https://it.wikipedia.org/wiki/Meiosi', detail: 'Riduzione cromosomica' },
  ],
  'bio-6-gpcr-e-tirosin-chinasi': [
    { label: 'Wikipedia — GPCR', url: 'https://it.wikipedia.org/wiki/Recettore_accoppiato_a_proteine_G', detail: 'Segnalazione' },
  ],
  'bio-1-virus-e-cicli-litico-lisogenico-retrovirus': [
    { label: 'Wikipedia — Virus', url: 'https://it.wikipedia.org/wiki/Virus', detail: 'Cicli e strutture' },
  ],
}

function portalFor(materia: string): { label: string; url: string } {
  if (materia === 'fisica') return { label: 'Portale Wikipedia — Fisica', url: PHYLIB }
  if (materia === 'chimica') return { label: 'Portale Wikipedia — Chimica', url: CHEMLIB }
  return { label: 'Portale Wikipedia — Biologia', url: BIOLIB }
}

export function risorseFor(unitaId: string): TheoryRef[] {
  const u = getUnita(unitaId)
  if (!u) return []

  const refs: TheoryRef[] = []
  const mur = u.parentUnitaId ? getMurUnita(u.parentUnitaId) : undefined

  if (!u.approfondimento) {
    refs.push({
      label: `Syllabus MUR ${materiaLabel(u.materia)} 2026`,
      detail: mur
        ? `Unità ${mur.numero}: ${mur.titolo} → argomento «${u.titolo}»`
        : `Unità ${u.numero}: ${u.titolo}`,
      url: 'https://www.mur.gov.it/',
    })
  } else {
    refs.push({
      label: 'Approfondimento fuori programma 2026',
      detail: u.titolo,
    })
  }

  const topics = topicsFor(unitaId)
  if (topics.length) {
    refs.push({
      label: 'Checklist temi da coprire',
      detail: topics.slice(0, 4).join(' · '),
    })
  }

  for (const t of TOPIC_URLS[unitaId] ?? []) {
    refs.push({ label: t.label, detail: t.detail, url: t.url })
  }

  const portal = portalFor(u.materia)
  refs.push({
    label: portal.label,
    detail: 'Enciclopedia aperta per ripasso rapido (verifica sempre sul syllabus)',
    url: portal.url,
  })

  refs.push({
    label: 'Khan Academy (IT)',
    detail: 'Lezioni gratuite di scienze — seleziona il tema corrispondente',
    url: KHAN_IT,
  })

  refs.push({
    label: 'Video aula',
    detail: 'YouTube di terze parti (youtube-nocookie); controlla canale e data',
  })

  return refs
}

/** Assicura che ogni argomento ufficiale abbia almeno syllabus + portal + khan */
export function assertRisorseCoverage(): string[] {
  return ARGOMENTI.filter((a) => risorseFor(a.id).length < 3).map((a) => a.id)
}
