import type { TheoryVideo } from '../types'

/** Catalogo video aula (YouTube) — ID reali, lezioni preferibilmente in italiano */
export const VIDEOS: Record<string, TheoryVideo[]> = {
  'fis-1': [
    {
      youtubeId: 'u1s1ao85sx8',
      titolo: 'Fisica base — grandezze e metodo (lezione d’insieme)',
      canale: 'Physics Made Easy',
      perché: 'Linguaggio di grandezze, misure e modelli prima di vettori e SI.',
    },
  ],
  'fis-2': [
    {
      youtubeId: 'oTeKLQvS8uk',
      titolo: 'Primo principio e trasformazioni (ponte a lavoro/energia)',
      canale: 'Lezione fisica',
      perché: 'Bilanci energetici utili a lavoro, potenza e conservazione in meccanica.',
    },
  ],
  'fis-3': [
    {
      youtubeId: 'MRVB942a5yU',
      titolo: 'Teorema di Bernoulli — fluidodinamica',
      canale: 'Prof. Schettini',
      perché: 'Equazione di Bernoulli e significato di velocità/pressione nel tubo.',
    },
    {
      youtubeId: 'eYowFmePsI8',
      titolo: 'Teorema di Bernoulli della fluidodinamica',
      canale: 'Lezione fisica',
      perché: 'Ripasso rapido collegabile a stenosi e circolazione.',
    },
  ],
  'fis-4': [
    {
      youtubeId: 'u1s1ao85sx8',
      titolo: 'Onde ed energia — contesto di lezione',
      canale: 'Physics Made Easy',
      perché: 'Inquadra frequenza, lunghezza d’onda e trasporto di energia.',
    },
  ],
  'fis-5': [
    {
      youtubeId: 'oTeKLQvS8uk',
      titolo: 'Primo principio e trasformazioni termodinamiche',
      canale: 'Lezione fisica',
      perché: 'ΔU, Q, W e tipiche trasformazioni (isobara, isocora, adiabatica).',
    },
    {
      youtubeId: '_aKim3lL6sE',
      titolo: 'Ciclo di Carnot',
      canale: 'The Physics We Like',
      perché: 'Rendimento ideale tra due temperature — cuore del secondo principio.',
    },
    {
      youtubeId: 'kxnFOQkFJlg',
      titolo: 'Secondo principio della termodinamica',
      canale: 'FISICA Teoria',
      perché: 'Macchine termiche, irreversibilità ed entropia in sintesi d’esame.',
    },
  ],
  'fis-6': [
    {
      youtubeId: 'u1s1ao85sx8',
      titolo: 'Energia e circuiti — lezione d’insieme',
      canale: 'Physics Made Easy',
      perché: 'Supporto a Ohm, potenza e bilanci (effetto Joule).',
    },
  ],
  'fis-7': [
    {
      youtubeId: 'Z3SeNGbMHfA',
      titolo: 'Secondo principio — processi diretti',
      canale: 'Lezione liceo',
      perché: 'Contesto di irreversibilità utile al decadimento radioattivo.',
    },
  ],
  'chim-1': [
    {
      youtubeId: 'oTeKLQvS8uk',
      titolo: 'Energia e trasformazioni',
      canale: 'Lezione fisica',
      perché: 'Ponte verso U, H, G nei sistemi aperti della chimica.',
    },
  ],
  'chim-2': [
    {
      youtubeId: '99qHytXs-UQ',
      titolo: 'Soluzioni tampone (contesto soluzioni)',
      canale: 'Chimica didattica',
      perché: 'Utile mentre ragioni su concentrazione e comportamento in soluzione.',
    },
  ],
  'chim-3': [
    {
      youtubeId: 'SnieSnjkeaE',
      titolo: 'Soluzioni tampone — chimica generale',
      canale: 'Corso online chimica',
      perché: 'Equilibri in soluzione: ponte a cinetica ed equilibrio chimico.',
    },
  ],
  'chim-4': [
    {
      youtubeId: '76ljrYjhKP8',
      titolo: 'Tampone bicarbonato nel sangue',
      canale: 'Biologia con Giulia',
      perché: 'pH, tamponi e applicazione clinica diretta al programma.',
    },
    {
      youtubeId: '99qHytXs-UQ',
      titolo: 'Soluzioni tampone',
      canale: 'Chimica didattica',
      perché: 'Cosa sono e come funzionano le soluzioni tampone.',
    },
  ],
  'chim-5': [
    {
      youtubeId: 'nXlIHflTtR4',
      titolo: 'Acidi, basi e pH — esercizi (ripasso legami/reattività)',
      canale: 'Chimica esercizi',
      perché: 'Mantiene allenamento quantitativo mentre studi idrocarburi.',
    },
  ],
  'chim-6': [
    {
      youtubeId: 'ideJr3gS9fE',
      titolo: 'Tampone acido — chimica generale',
      canale: 'Prof Atzeni',
      perché: 'Ripasso di equilibrio acido-base utile ai gruppi funzionali polari.',
    },
  ],
  'chim-7': [
    {
      youtubeId: '76ljrYjhKP8',
      titolo: 'Tampone e ambiente fisiologico',
      canale: 'Biologia con Giulia',
      perché: 'Contesto biomedico per biomolecole in soluzione acquosa.',
    },
  ],
  'bio-1': [
    {
      youtubeId: 'NeHveRXxBgo',
      titolo: 'Nucleo e DNA',
      canale: 'BIOLOGY / LG Education',
      perché: 'Organizzazione del DNA nella cellula eucariotica.',
    },
    {
      youtubeId: 'FQUOXVvrf6o',
      titolo: 'Struttura e funzioni del DNA',
      canale: 'Mini lesson biologia',
      perché: 'Basi strutturali prima di virus e genomi.',
    },
  ],
  'bio-2': [
    {
      youtubeId: 'of4EbdAgeG8',
      titolo: 'Replicazione del DNA',
      canale: 'BIOLOGY / Il Circolo Culturale',
      perché: 'Duplicazione del DNA spiegata in lezione strutturata.',
    },
    {
      youtubeId: 'otr2DKsqvxU',
      titolo: 'Meccanismo di replicazione del DNA',
      canale: 'Biologia con Giulia',
      perché: 'Elicasi, polimerasi, forcella: dettaglio da aula.',
    },
  ],
  'bio-3': [
    {
      youtubeId: 'bxLSTMmELWY',
      titolo: 'Replicazione / flusso dell’informazione (contesto)',
      canale: 'Lezione biologia',
      perché: 'Prepara il terreno a trascrizione e traduzione.',
    },
  ],
  'bio-4': [
    {
      youtubeId: 'NeHveRXxBgo',
      titolo: 'Nucleo e DNA',
      canale: 'BIOLOGY / LG Education',
      perché: 'Basi di organizzazione genica utili a mutazioni e cariotipo.',
    },
  ],
  'bio-5': [
    {
      youtubeId: 'FQUOXVvrf6o',
      titolo: 'DNA e cellula — strutture',
      canale: 'Mini lesson biologia',
      perché: 'Contesto strutturale mentre studi membrane e organelli.',
    },
  ],
  'bio-6': [
    {
      youtubeId: 'of4EbdAgeG8',
      titolo: 'Informazione e processi cellulari',
      canale: 'BIOLOGY',
      perché: 'Mantiene il filo “informazione → risposta” della segnalazione.',
    },
  ],
  'bio-7': [
    {
      youtubeId: 'otr2DKsqvxU',
      titolo: 'DNA e proliferazione (contesto)',
      canale: 'Biologia con Giulia',
      perché: 'Collega duplicazione del genoma al ciclo cellulare.',
    },
  ],
  'extra-derivati': [
    {
      youtubeId: 'oTeKLQvS8uk',
      titolo: 'Variazioni e bilanci',
      canale: 'Lezione fisica',
      perché: 'Collega Δ e trasformazioni a pendenze/aree nei grafici.',
    },
  ],
  'extra-gas-reali': [
    {
      youtubeId: 'u1s1ao85sx8',
      titolo: 'Termodinamica — lezione d’insieme',
      canale: 'Physics Made Easy',
      perché: 'Inquadra il gas ideale prima dei limiti dei gas reali.',
    },
  ],
  'extra-fotoelettrico': [
    {
      youtubeId: 'Z3SeNGbMHfA',
      titolo: 'Soglie e processi diretti',
      canale: 'Lezione liceo',
      perché: 'Prepara l’idea di soglia energetica (ponte al fotoelettrico).',
    },
  ],
  'extra-urti': [
    {
      youtubeId: 'oTeKLQvS8uk',
      titolo: 'Energia e trasformazioni',
      canale: 'Lezione fisica',
      perché: 'Utile prima di urti elastici/anelastici e impulsi.',
    },
  ],
  'extra-radioisotopi': [
    {
      youtubeId: 'kxnFOQkFJlg',
      titolo: 'Processi irreversibili',
      canale: 'FISICA Teoria',
      perché: 'Contesto per decadimento come processo diretto.',
    },
  ],
  'extra-prioni': [
    {
      youtubeId: 'FQUOXVvrf6o',
      titolo: 'DNA/proteine — contesto strutturale',
      canale: 'Mini lesson biologia',
      perché: 'Richiamo strutturale mentre studi misfolding.',
    },
  ],
  'extra-contesto': [
    {
      youtubeId: '_aKim3lL6sE',
      titolo: 'Cicli e modelli fisici',
      canale: 'The Physics We Like',
      perché: 'Mantiene il filo fisico su campi e ottica di contesto.',
    },
  ],
}

export function videosFor(unitaId: string): TheoryVideo[] {
  return VIDEOS[unitaId] ?? []
}
