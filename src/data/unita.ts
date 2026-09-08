import type { Materia, Unita } from '../types'

/** Unità MUR 2026 (gruppi in home — non sono cartelle di studio) */
export const MUR_UNITA: Unita[] = [
  {
    id: 'bio-1',
    materia: 'biologia',
    numero: 1,
    titolo: 'Basi dell’organizzazione biologica e molecolare della vita',
    cfu: 0.5,
    approfondimento: false,
    sottotitoli: [
      'Virus e cicli litico/lisogenico/retrovirus',
      'Cellula procariotica e trasferimento genico orizzontale',
      'Cellula eucariotica e genoma',
      'Cromatina e genoma umano',
    ],
  },
  {
    id: 'bio-2',
    materia: 'biologia',
    numero: 2,
    titolo: 'Trasmissione e controllo dell’informazione genetica ed epigenetica',
    cfu: 0.5,
    approfondimento: false,
    sottotitoli: [
      'Replicazione del DNA',
      'Telomeri e senescenza',
      'Geni e regolazione',
      'Epigenetica e cromatina',
    ],
  },
  {
    id: 'bio-3',
    materia: 'biologia',
    numero: 3,
    titolo: 'Il flusso dell’informazione',
    cfu: 1.0,
    approfondimento: false,
    sottotitoli: [
      'Trascrizione procarioti ed eucarioti',
      'Maturazione dell’RNA e regioni non tradotte',
      'Traduzione e codice genetico',
      'Ripiegamento e degradazione delle proteine',
    ],
  },
  {
    id: 'bio-4',
    materia: 'biologia',
    numero: 4,
    titolo: 'Trasmissione e controllo dei caratteri selvatici e mutati',
    cfu: 0.75,
    approfondimento: false,
    sottotitoli: [
      'Mutazioni e riparazione del DNA',
      'Alleli, dominanza, epistasi',
      'Cariotipo e alberi genealogici',
      'Penetranza ed espressività',
    ],
  },
  {
    id: 'bio-5',
    materia: 'biologia',
    numero: 5,
    titolo: 'Strutture cellulari: biogenesi, morfologia e funzioni',
    cfu: 1.75,
    approfondimento: false,
    sottotitoli: [
      'Membrane e trasporto',
      'Nucleo, mitocondri, perossisomi',
      'Via secretoria e traffico vescicolare',
      'Citoscheletro e matrice extracellulare',
    ],
  },
  {
    id: 'bio-6',
    materia: 'biologia',
    numero: 6,
    titolo: 'Segnalazione cellulare e trasduzione del segnale',
    cfu: 0.75,
    approfondimento: false,
    sottotitoli: [
      'Comunicazione e giunzioni',
      'Recettori e secondi messaggeri',
      'GPCR e tirosin-chinasi',
      'Oncogeni e segnalazione',
    ],
  },
  {
    id: 'bio-7',
    materia: 'biologia',
    numero: 7,
    titolo: 'Controllo della proliferazione e della sopravvivenza cellulare',
    cfu: 0.75,
    approfondimento: false,
    sottotitoli: [
      'Ciclo cellulare e checkpoint',
      'Mitosi e meiosi',
      'Apoptosi e necrosi',
      'Oncogeni e oncosoppressori',
    ],
  },
  {
    id: 'chim-1',
    materia: 'chimica',
    numero: 1,
    titolo: 'Atomo, legami, stati di aggregazione e termodinamica',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Struttura atomica e tavola periodica',
      'Legami chimici e geometria',
      'Stati di aggregazione',
      'Termodinamica dei sistemi aperti',
    ],
  },
  {
    id: 'chim-2',
    materia: 'chimica',
    numero: 2,
    titolo: 'Miscele, soluzioni e proprietà colligative',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Soluzioni e concentrazione',
      'Proprietà colligative',
      'Pressione osmotica e membrane',
      'Emolisi, edema e applicazioni biomediche',
    ],
  },
  {
    id: 'chim-3',
    materia: 'chimica',
    numero: 3,
    titolo: 'Reazioni negli organismi viventi: cinetica ed equilibrio',
    cfu: 0.5,
    approfondimento: false,
    sottotitoli: [
      'Tipi di reazione e stechiometria',
      'Cinetica e catalisi enzimatica',
      'Equilibrio chimico',
      'Prodotto di solubilità e calcoli renali',
    ],
  },
  {
    id: 'chim-4',
    materia: 'chimica',
    numero: 4,
    titolo: 'Acidi, basi, pH, tamponi, redox ed elettrochimica',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Acidi, basi e pH',
      'Soluzioni tampone e sangue',
      'Ossido-riduzione',
      'Fenton, Haber-Weiss e radicali',
    ],
  },
  {
    id: 'chim-5',
    materia: 'chimica',
    numero: 5,
    titolo: 'Carbonio, idrocarburi e aromatici di interesse biologico',
    cfu: 0.5,
    approfondimento: false,
    sottotitoli: [
      'Ibridazione e isomeria',
      'Alcani, alcheni, alchini',
      'Aromaticità e purine/pirimidine',
      'Alogenuri alchilici',
    ],
  },
  {
    id: 'chim-6',
    materia: 'chimica',
    numero: 6,
    titolo: 'Gruppi funzionali e isomerie',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Alcoli, fenoli, eteri, tioli',
      'Aldeidi e chetoni',
      'Acidi carbossilici e derivati',
      'Ammine e ammidi',
    ],
  },
  {
    id: 'chim-7',
    materia: 'chimica',
    numero: 7,
    titolo: 'Biomolecole: amminoacidi, carboidrati, lipidi, acidi nucleici',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Amminoacidi e proteine',
      'Carboidrati',
      'Lipidi, colesterolo, vitamina D, acidi biliari',
      'Nucleotidi e modificazioni non enzimatiche',
    ],
  },
  {
    id: 'fis-1',
    materia: 'fisica',
    numero: 1,
    titolo: 'Introduzione ai metodi della fisica',
    cfu: 0.2,
    approfondimento: false,
    sottotitoli: [
      'Notazione scientifica e SI',
      'Grandezze scalari e vettoriali',
      'Operazioni tra vettori',
      'Funzioni trigonometriche elementari',
    ],
  },
  {
    id: 'fis-2',
    materia: 'fisica',
    numero: 2,
    titolo: 'Meccanica',
    cfu: 1.4,
    approfondimento: false,
    sottotitoli: [
      'Cinematica',
      'Dinamica e forze',
      'Lavoro ed energia',
      'Quantità di moto, centro di massa e leve',
    ],
  },
  {
    id: 'fis-3',
    materia: 'fisica',
    numero: 3,
    titolo: 'Meccanica dei fluidi',
    cfu: 1.2,
    approfondimento: false,
    sottotitoli: [
      'Idrostatica (Stevino, Pascal, Archimede)',
      'Bernoulli e circolazione',
      'Poiseuille e viscosità',
      'Tensione superficiale e Laplace',
    ],
  },
  {
    id: 'fis-4',
    materia: 'fisica',
    numero: 4,
    titolo: 'Onde meccaniche',
    cfu: 0.4,
    approfondimento: false,
    sottotitoli: [
      'Onde e oscillatore armonico',
      'Sovrapposizione e interferenza',
      'Onde acustiche e decibel',
      'Effetto Doppler (qualitativo)',
    ],
  },
  {
    id: 'fis-5',
    materia: 'fisica',
    numero: 5,
    titolo: 'Termodinamica',
    cfu: 1,
    approfondimento: false,
    sottotitoli: [
      'Gas perfetti e variabili di stato',
      'Calore e cambiamenti di stato',
      'Primo principio',
      'Secondo principio, Carnot ed entropia',
    ],
  },
  {
    id: 'fis-6',
    materia: 'fisica',
    numero: 6,
    titolo: 'Elettricità e magnetismo',
    cfu: 1.2,
    approfondimento: false,
    sottotitoli: [
      'Coulomb e campo elettrico',
      'Potenziale e corrente (Ohm, Joule)',
      'Condensatori',
      'Campo magnetico e Faraday-Lenz',
    ],
  },
  {
    id: 'fis-7',
    materia: 'fisica',
    numero: 7,
    titolo: 'Fisica delle radiazioni',
    cfu: 0.6,
    approfondimento: false,
    sottotitoli: [
      'Onde elettromagnetiche e spettro',
      'Ottica geometrica di base',
      'Lambert-Beer',
      'Radioattività, decadimento ed emivita',
    ],
  },
]

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

/** Cartelle di studio ufficiali = un sottotitolo ciascuna */
export const ARGOMENTI: Unita[] = MUR_UNITA.flatMap((parent) => {
  const n = parent.sottotitoli.length
  const cfuEach = Math.round((parent.cfu / n) * 1000) / 1000
  return parent.sottotitoli.map((titolo, i) => ({
    id: `${parent.id}-${slugify(titolo)}`,
    materia: parent.materia,
    numero: parent.numero,
    titolo,
    cfu: cfuEach,
    approfondimento: false,
    sottotitoli: [titolo],
    parentUnitaId: parent.id,
    ordine: i,
    badge: `Unità ${parent.numero}`,
  }))
})

const APPROFONDIMENTI: Unita[] = [
  {
    id: 'extra-derivati',
    materia: 'fisica',
    numero: 0,
    titolo: 'Derivate e integrali (qualitativi)',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => ['fis-1', 'fis-2', 'fis-5'].includes(a.parentUnitaId!)).map(
      (a) => a.id,
    ),
    motivoCollegamento: Object.fromEntries(
      ARGOMENTI.filter((a) => a.parentUnitaId === 'fis-2' || a.parentUnitaId === 'fis-1' || a.parentUnitaId === 'fis-5').map(
        (a) => [a.id, 'Pendenze, aree e bilanci energetici nei grafici'],
      ),
    ),
    sottotitoli: [
      'Velocità e accelerazione come derivate',
      'Lavoro come area sotto la curva',
      'Lettura di grafici',
    ],
  },
  {
    id: 'extra-gas-reali',
    materia: 'fisica',
    numero: 0,
    titolo: 'Gas reali, teoria cinetica e calorimetria',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'fis-5' || a.parentUnitaId === 'chim-1').map(
      (a) => a.id,
    ),
    sottotitoli: ['Quando fallisce PV = nRT', 'Teoria cinetica', 'Calorimetria avanzata'],
  },
  {
    id: 'extra-fotoelettrico',
    materia: 'fisica',
    numero: 0,
    titolo: 'Effetto fotoelettrico',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'fis-7').map((a) => a.id),
    sottotitoli: ['Fotoni e soglia', 'Energia cinetica dei fotoelettroni', 'Ponte verso le radiazioni'],
  },
  {
    id: 'extra-urti',
    materia: 'fisica',
    numero: 0,
    titolo: 'Urti, impulso e moto armonico',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'fis-2' || a.parentUnitaId === 'fis-4').map(
      (a) => a.id,
    ),
    sottotitoli: ['Impulso e urti', 'Elastici e anelastici', 'Moto armonico semplice'],
  },
  {
    id: 'extra-radioisotopi',
    materia: 'chimica',
    numero: 0,
    titolo: 'Radioisotopi (cenni chimici)',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'chim-1' || a.parentUnitaId === 'fis-7').map(
      (a) => a.id,
    ),
    sottotitoli: ['Isotopi radioattivi', 'Usi diagnostici', 'Collegamento al decadimento'],
  },
  {
    id: 'extra-prioni',
    materia: 'biologia',
    numero: 0,
    titolo: 'Prioni e misfolding proteico',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'bio-3').map((a) => a.id),
    sottotitoli: ['Proteina PrP', 'Propagazione del misfolding', 'Collegamento a chaperon e malattie'],
  },
  {
    id: 'extra-contesto',
    materia: 'fisica',
    numero: 0,
    titolo: 'Contesto: Gauss, Biot-Savart, ottica e Young',
    cfu: 0,
    approfondimento: true,
    badge: 'non in programma 2026',
    collegataA: ARGOMENTI.filter((a) => a.parentUnitaId === 'fis-6' || a.parentUnitaId === 'fis-7').map(
      (a) => a.id,
    ),
    sottotitoli: [
      'Legge di Gauss (cenno)',
      'Biot-Savart (cenno)',
      'Lenti e microscopio',
      'Modulo di Young',
    ],
  },
]

/** Studio: argomenti ufficiali + approfondimenti */
export const UNITA: Unita[] = [...ARGOMENTI, ...APPROFONDIMENTI]
export const UNITA_UFFICIALI = ARGOMENTI
export const UNITA_APPROFONDIMENTI = APPROFONDIMENTI

export function getUnita(id: string): Unita | undefined {
  return UNITA.find((u) => u.id === id) ?? MUR_UNITA.find((u) => u.id === id)
}

export function getMurUnita(id: string): Unita | undefined {
  return MUR_UNITA.find((u) => u.id === id)
}

export function getArgomentiOf(parentUnitaId: string): Unita[] {
  return ARGOMENTI.filter((a) => a.parentUnitaId === parentUnitaId)
}

export function parentIdOf(unitaId: string): string | undefined {
  const u = getUnita(unitaId)
  return u?.parentUnitaId ?? (MUR_UNITA.some((m) => m.id === unitaId) ? unitaId : undefined)
}

export function materiaLabel(m: string): string {
  if (m === 'biologia') return 'Biologia'
  if (m === 'chimica') return 'Chimica'
  if (m === 'fisica') return 'Fisica'
  return m
}

export function murGroupsForMateria(materia: Materia | 'tutte'): Unita[] {
  if (materia === 'tutte') return MUR_UNITA
  return MUR_UNITA.filter((u) => u.materia === materia)
}
