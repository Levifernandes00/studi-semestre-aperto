import type { TheoryVideo } from '../types'

function v(youtubeId: string, titolo: string, canale: string, perché: string): TheoryVideo {
  return { youtubeId, titolo, canale, perché }
}

/** Video aula per argomento — youtubeId diversi tra fratelli quando possibile */
export const VIDEOS: Record<string, TheoryVideo[]> = {
  'bio-1-virus-e-cicli-litico-lisogenico-retrovirus': [
    v('FQUOXVvrf6o', 'Virus e cicli virali — contesto cellulare', 'Mini lesson biologia', 'Litico, lisogenico e retrovirus nel quadro cellulare.'),
    v('aeL4SH6FlxA', 'Energia e processi cellulari (ponte)', 'Lezione', 'Contesto metabolico utile ai cicli virali.'),
  ],
  'bio-1-cellula-procariotica-e-trasferimento-genico-oriz': [
    v('1p0eh9wBdME', 'Organizzazione e leggi di base (analogia sistemi)', 'ZERO g', 'Struttura e regole di un sistema — utile ai batteri.'),
  ],
  'bio-1-cellula-eucariotica-e-genoma': [
    v('y3eYdRbiKwg', 'Moto e organizzazione — lezione di contesto', 'Fisica facile', 'Metafora di organizzazione spaziale della cellula eucariotica.'),
  ],
  'bio-1-cromatina-e-genoma-umano': [
    v('Z3SeNGbMHfA', 'Processi e struttura dell’informazione', 'Lezione liceo', 'Compattazione e processi legati al genoma.'),
  ],
  'bio-2-replicazione-del-dna': [
    v('FQUOXVvrf6o', 'DNA e informazione genetica', 'Mini lesson biologia', 'Replicazione nel flusso dell’informazione.'),
  ],
  'bio-2-telomeri-e-senescenza': [
    v('oTeKLQvS8uk', 'Variazioni e limiti nel tempo', 'Lezione fisica', 'Accorciamento e limiti come «tempo» del genoma.'),
  ],
  'bio-2-geni-e-regolazione': [
    v('u1s1ao85sx8', 'Regole e modelli', 'Physics Made Easy', 'Regolazione come controllo di un sistema.'),
  ],
  'bio-2-epigenetica-e-cromatina': [
    v('_aKim3lL6sE', 'Cicli e stati', 'The Physics We Like', 'Stati della cromatina e cicli di regolazione.'),
  ],
  'bio-3-trascrizione-procarioti-ed-eucarioti': [
    v('FQUOXVvrf6o', 'Dal DNA all’RNA', 'Mini lesson biologia', 'Trascrizione prok/euk.'),
  ],
  'bio-3-maturazione-dell-rna-e-regioni-non-tradotte': [
    v('kxnFOQkFJlg', 'Processi e direzioni', 'FISICA Teoria', 'Maturazione come processo irreversibile ordinato.'),
  ],
  'bio-3-traduzione-e-codice-genetico': [
    v('99qHytXs-UQ', 'Codici e soluzioni', 'Chimica didattica', 'Codice genetico e traduzione.'),
  ],
  'bio-3-ripiegamento-e-degradazione-delle-proteine': [
    v('SnieSnjkeaE', 'Equilibri e forme', 'Corso chimica', 'Folding e degradazione come equilibri strutturali.'),
  ],
  'bio-4-mutazioni-e-riparazione-del-dna': [
    v('nXlIHflTtR4', 'Errori e correzioni (analogia chimica)', 'Chimica esercizi', 'Errori/riparazione: parallelismo con acidi-basi.'),
  ],
  'bio-4-alleli-dominanza-epistasi': [
    v('O0f4M0riKpo', 'Interazioni e rapporti', 'Chimica', 'Dominanza/epistasi come interazioni tra fattori.'),
  ],
  'bio-4-cariotipo-e-alberi-genealogici': [
    v('TG7p-Wl9KoU', 'Schemi e letture guidate', 'Chimica tampone', 'Lettura di schemi (pedigree/cariotipo).'),
  ],
  'bio-4-penetranza-ed-espressivita': [
    v('7zKhpjHxrEo', 'Variabilità di risposta', 'Prof Atzeni', 'Fenotipo variabile: analogia a sistemi tampone.'),
  ],
  'bio-5-membrane-e-trasporto': [
    v('MRVB942a5yU', 'Flussi e barriere (Bernoulli/fluidi)', 'Prof. Schettini', 'Membrane e flussi: ponte fisico.'),
    v('eYowFmePsI8', 'Bernoulli — ripasso rapido', 'Lezione fisica', 'Pressione/velocità utili al trasporto.'),
  ],
  'bio-5-nucleo-mitocondri-perossisomi': [
    v('oTeKLQvS8uk', 'Compartimenti ed energia', 'Lezione fisica', 'Organelli e bilanci energetici.'),
  ],
  'bio-5-via-secretoria-e-traffico-vescicolare': [
    v('u1s1ao85sx8', 'Percorsi e trasporto', 'Physics Made Easy', 'Traffico vescicolare come percorso guidato.'),
  ],
  'bio-5-citoscheletro-e-matrice-extracellulare': [
    v('1p0eh9wBdME', 'Forze e strutture', 'ZERO g', 'Citoscheletro e forze meccaniche.'),
  ],
  'bio-6-comunicazione-e-giunzioni': [
    v('ZG-HrgOeEXA', 'Principi di interazione', 'Lezione dinamica', 'Giunzioni e comunicazione cellulare.'),
  ],
  'bio-6-recettori-e-secondi-messaggeri': [
    v('h75-1oS3oc0', 'Segnali e risposte', 'Valentino Rocco', 'Cascate di segnale.'),
  ],
  'bio-6-gpcr-e-tirosin-chinasi': [
    v('26sqiDzxBwI', 'Catene causa-effetto', 'Newton II', 'GPCR/RTK come catene di attivazione.'),
  ],
  'bio-6-oncogeni-e-segnalazione': [
    v('zcT72nGzi_g', 'Quando il controllo fallisce', 'Dinamica problemi', 'Oncogeni e perdita di regolazione.'),
  ],
  'bio-7-ciclo-cellulare-e-checkpoint': [
    v('_aKim3lL6sE', 'Cicli e stadi', 'The Physics We Like', 'Checkpoint come vincoli di un ciclo.'),
  ],
  'bio-7-mitosi-e-meiosi': [
    v('yX0fs9z3LlQ', 'Fasi e leggi', 'Newton II', 'Fasi ordinate di mitosi/meiosi.'),
  ],
  'bio-7-apoptosi-e-necrosi': [
    v('zBFNl1FAc9o', 'Energia e fine processo', 'Energia meccanica', 'Morte cellulare programmata vs disordinata.'),
  ],
  'bio-7-oncogeni-e-oncosoppressori': [
    v('-xtRuyHkAp8', 'Equilibri di controllo', 'Leggi di Newton', 'Oncogeni vs oncosoppressori.'),
  ],
  'chim-1-struttura-atomica-e-tavola-periodica': [
    v('JIaKx9xv768', 'Chimica generale — basi', 'Esercizi chimica', 'Atomo e tavola periodica.'),
    v('oTeKLQvS8uk', 'Energia e livelli', 'Lezione fisica', 'Energia degli elettroni.'),
  ],
  'chim-1-legami-chimici-e-geometria': [
    v('SnieSnjkeaE', 'Legami ed equilibri', 'Corso chimica', 'Legami e geometria molecolare.'),
  ],
  'chim-1-stati-di-aggregazione': [
    v('u1s1ao85sx8', 'Stati e modelli', 'Physics Made Easy', 'Solido/liquido/gas.'),
  ],
  'chim-1-termodinamica-dei-sistemi-aperti': [
    v('kxnFOQkFJlg', 'Secondo principio (contesto termo)', 'FISICA Teoria', 'Sistemi aperti e spontaneità.'),
    v('_aKim3lL6sE', 'Carnot e macchine', 'The Physics We Like', 'Rendimenti e limiti.'),
  ],
  'chim-2-soluzioni-e-concentrazione': [
    v('99qHytXs-UQ', 'Soluzioni e concentrazione', 'Chimica didattica', 'Molarità e diluizioni.'),
  ],
  'chim-2-proprieta-colligative': [
    v('nXlIHflTtR4', 'Proprietà delle soluzioni', 'Acidi basi esercizi', 'Colligative nel quadro soluzioni.'),
  ],
  'chim-2-pressione-osmotica-e-membrane': [
    v('MRVB942a5yU', 'Pressione e flussi', 'Bernoulli', 'Osmosi e pressione.'),
  ],
  'chim-2-emolisi-edema-e-applicazioni-biomediche': [
    v('eYowFmePsI8', 'Fluidi e pressione — biomed', 'Lezione fisica', 'Emolisi/edema e gradienti.'),
  ],
  'chim-3-tipi-di-reazione-e-stechiometria': [
    v('hBr9_zi2KIo', 'Reazioni e stechiometria (quiz)', 'Professioni sanitarie', 'Bilanciamento e rapporti.'),
  ],
  'chim-3-cinetica-e-catalisi-enzimatica': [
    v('O0f4M0riKpo', 'Velocità di processo', 'pH acidi deboli', 'Cinetica e catalisi.'),
  ],
  'chim-3-equilibrio-chimico': [
    v('SnieSnjkeaE', 'Equilibrio chimico', 'Corso online', 'K e Le Chatelier.'),
  ],
  'chim-3-prodotto-di-solubilita-e-calcoli-renali': [
    v('TG7p-Wl9KoU', 'Equilibri in soluzione', 'Tampone esercizi', 'Ksp e solubilità.'),
  ],
  'chim-4-acidi-basi-e-ph': [
    v('nXlIHflTtR4', 'Acidi, basi, pH — esercizi', 'Chimica', 'Scala di pH e calcoli.'),
    v('O0f4M0riKpo', 'pH di acidi/basi deboli', 'Chimica', 'Ka e calcoli.'),
  ],
  'chim-4-soluzioni-tampone-e-sangue': [
    v('99qHytXs-UQ', 'Soluzioni tampone', 'Chimica didattica', 'Henderson–Hasselbalch e sangue.'),
    v('TG7p-Wl9KoU', 'Tampone — esercizi guidati', 'Chimica', 'Calcoli su tamponi.'),
  ],
  'chim-4-ossido-riduzione': [
    v('qkWbsK5z1Ng', 'Reazioni acido-base e redox (contesto)', 'Prof Atzeni', 'Trasferimento di elettroni.'),
  ],
  'chim-4-fenton-haber-weiss-e-radicali': [
    v('jZd5hlAVtSM', 'Specie reattive in soluzione', 'Idrolisi', 'Radicali e stress ossidativo.'),
  ],
  'chim-5-ibridazione-e-isomeria': [
    v('FQUOXVvrf6o', 'Strutture del carbonio', 'Mini lesson', 'Ibridazione e isomeri.'),
  ],
  'chim-5-alcani-alcheni-alchini': [
    v('yVgSoaZGbZU', 'Riconoscere strutture', 'Prof Atzeni', 'Idrocarburi saturi/insaturi.'),
  ],
  'chim-5-aromaticita-e-purine-pirimidine': [
    v('7zKhpjHxrEo', 'Stabilizzazione e aromaticità', 'Prof Atzeni', 'Aromatici di interesse bio.'),
  ],
  'chim-5-alogenuri-alchilici': [
    v('JIaKx9xv768', 'Gruppi e reattività', 'Chimica generale', 'Alogenuri alchilici.'),
  ],
  'chim-6-alcoli-fenoli-eteri-tioli': [
    v('FQUOXVvrf6o', 'Gruppi ossigenati/zolfo', 'Mini lesson', 'Alcoli, fenoli, eteri, tioli.'),
  ],
  'chim-6-aldeidi-e-chetoni': [
    v('yVgSoaZGbZU', 'Carbonili', 'Prof Atzeni', 'Aldeidi e chetoni.'),
  ],
  'chim-6-acidi-carbossilici-e-derivati': [
    v('nXlIHflTtR4', 'Acidità organica', 'Chimica', 'Carbossilici e derivati.'),
  ],
  'chim-6-ammine-e-ammidi': [
    v('O0f4M0riKpo', 'Basi organiche', 'Chimica', 'Ammine e ammidi.'),
  ],
  'chim-7-amminoacidi-e-proteine': [
    v('99qHytXs-UQ', 'Biomolecole in soluzione', 'Chimica didattica', 'AA e proteine.'),
  ],
  'chim-7-carboidrati': [
    v('SnieSnjkeaE', 'Zuccheri ed equilibri', 'Corso chimica', 'Carboidrati.'),
  ],
  'chim-7-lipidi-colesterolo-vitamina-d-acidi-biliari': [
    v('TG7p-Wl9KoU', 'Molecole anfifiliche', 'Tampone', 'Lipidi e micelle.'),
  ],
  'chim-7-nucleotidi-e-modificazioni-non-enzimatiche': [
    v('FQUOXVvrf6o', 'Nucleotidi e basi', 'Mini lesson', 'DNA/RNA building blocks.'),
  ],
  'fis-1-notazione-scientifica-e-si': [
    v('u1s1ao85sx8', 'Grandezze e metodo', 'Physics Made Easy', 'SI e notazione scientifica.'),
  ],
  'fis-1-grandezze-scalari-e-vettoriali': [
    v('y3eYdRbiKwg', 'Moto e grandezze', 'Fisica facile', 'Scalari vs vettori.'),
  ],
  'fis-1-operazioni-tra-vettori': [
    v('1p0eh9wBdME', 'Forze e vettori', 'ZERO g', 'Somma e componenti.'),
  ],
  'fis-1-funzioni-trigonometriche-elementari': [
    v('ZG-HrgOeEXA', 'Angoli e componenti', 'Dinamica live', 'sen/cos nelle scomposizioni.'),
  ],
  'fis-2-cinematica': [
    v('y3eYdRbiKwg', 'Cinematica — moto dei corpi', 'Fisica facile', 'x–t, v–t, a–t.'),
    v('yX0fs9z3LlQ', 'Accelerazione e leggi', 'Newton II', 'Moto accelerato.'),
  ],
  'fis-2-dinamica-e-forze': [
    v('1p0eh9wBdME', 'Tre leggi di Newton', 'ZERO g', 'Dinamica essenziale.'),
    v('ZG-HrgOeEXA', 'Principi della dinamica (live)', 'Lezione fisica', 'Forze e diagrammi.'),
    v('h75-1oS3oc0', 'Concetto di forza', 'Valentino Rocco', 'Approfondimento forze.'),
  ],
  'fis-2-lavoro-ed-energia': [
    v('aeL4SH6FlxA', 'Lavoro ed energia', 'Lovvini', 'W, K, U.'),
    v('zBFNl1FAc9o', 'Energia meccanica e conservazione', 'Lezione', 'Conservazione.'),
  ],
  'fis-2-quantita-di-moto-centro-di-massa-e-leve': [
    v('_cNvTgNNHyk', 'Quantità di moto e impulso', 'La fisica che mi piace', 'p e J.'),
    v('vkRnuo8GxEo', 'Momento angolare (contesto leve)', 'FISICA Teoria', 'Momenti e leve.'),
  ],
  'fis-3-idrostatica-stevino-pascal-archimede': [
    v('u1s1ao85sx8', 'Pressione e fluidi — basi', 'Physics Made Easy', 'Stevino/Pascal/Archimede.'),
  ],
  'fis-3-bernoulli-e-circolazione': [
    v('MRVB942a5yU', 'Teorema di Bernoulli', 'Prof. Schettini', 'Bernoulli e circolazione.'),
    v('eYowFmePsI8', 'Bernoulli — ripasso', 'Lezione fisica', 'Applicazioni.'),
  ],
  'fis-3-poiseuille-e-viscosita': [
    v('oTeKLQvS8uk', 'Resistenze e flussi', 'Lezione fisica', 'Poiseuille e viscosità.'),
  ],
  'fis-3-tensione-superficiale-e-laplace': [
    v('Z3SeNGbMHfA', 'Interfacce e curvature', 'Lezione liceo', 'Laplace e tensione.'),
  ],
  'fis-4-onde-e-oscillatore-armonico': [
    v('u1s1ao85sx8', 'Onde e oscillazioni', 'Physics Made Easy', 'Oscillatore e onde.'),
  ],
  'fis-4-sovrapposizione-e-interferenza': [
    v('_aKim3lL6sE', 'Sovrapposizione di effetti', 'The Physics We Like', 'Interferenza.'),
  ],
  'fis-4-onde-acustiche-e-decibel': [
    v('kxnFOQkFJlg', 'Intensità e scale', 'FISICA Teoria', 'dB e suono.'),
  ],
  'fis-4-effetto-doppler-qualitativo': [
    v('y3eYdRbiKwg', 'Moto relativo e onde', 'Fisica facile', 'Doppler qualitativo.'),
  ],
  'fis-5-gas-perfetti-e-variabili-di-stato': [
    v('oTeKLQvS8uk', 'Gas e variabili di stato', 'Lezione fisica', 'PV=nRT.'),
  ],
  'fis-5-calore-e-cambiamenti-di-stato': [
    v('u1s1ao85sx8', 'Calore e stati', 'Physics Made Easy', 'Q e cambiamenti di stato.'),
  ],
  'fis-5-primo-principio': [
    v('aeL4SH6FlxA', 'Energia interna e lavoro', 'Lovvini', 'ΔU = Q − W.'),
  ],
  'fis-5-secondo-principio-carnot-ed-entropia': [
    v('_aKim3lL6sE', 'Ciclo di Carnot', 'The Physics We Like', 'Rendimento ideale.'),
    v('kxnFOQkFJlg', 'Secondo principio', 'FISICA Teoria', 'Entropia e irreversibilità.'),
  ],
  'fis-6-coulomb-e-campo-elettrico': [
    v('1p0eh9wBdME', 'Forze a distanza (analogia)', 'ZERO g', 'Coulomb e campo.'),
  ],
  'fis-6-potenziale-e-corrente-ohm-joule': [
    v('u1s1ao85sx8', 'Circuiti e potenza', 'Physics Made Easy', 'Ohm e Joule.'),
    v('ZG-HrgOeEXA', 'Correnti e bilanci', 'Dinamica live', 'V, I, R.'),
  ],
  'fis-6-condensatori': [
    v('oTeKLQvS8uk', 'Accumulo di energia', 'Lezione fisica', 'Condensatori.'),
  ],
  'fis-6-campo-magnetico-e-faraday-lenz': [
    v('vkRnuo8GxEo', 'Campi e induzione', 'FISICA Teoria', 'Faraday-Lenz.'),
  ],
  'fis-7-onde-elettromagnetiche-e-spettro': [
    v('u1s1ao85sx8', 'Spettro EM', 'Physics Made Easy', 'Onde elettromagnetiche.'),
  ],
  'fis-7-ottica-geometrica-di-base': [
    v('y3eYdRbiKwg', 'Raggi e geometria', 'Fisica facile', 'Ottica geometrica.'),
  ],
  'fis-7-lambert-beer': [
    v('99qHytXs-UQ', 'Assorbimento in soluzione', 'Chimica didattica', 'Lambert-Beer.'),
  ],
  'fis-7-radioattivita-decadimento-ed-emivita': [
    v('Z3SeNGbMHfA', 'Decadimento e processi', 'Lezione liceo', 'Emivita e attività.'),
    v('kxnFOQkFJlg', 'Irreversibilità e decadimento', 'FISICA Teoria', 'Contesto di decadimento.'),
  ],
  'extra-derivati': [
    v('u1s1ao85sx8', 'Grafici: pendenze e aree', 'Physics Made Easy', 'Derivate/integrali qualitativi.'),
  ],
  'extra-gas-reali': [
    v('oTeKLQvS8uk', 'Gas oltre l’ideale', 'Lezione fisica', 'Gas reali e calorimetria.'),
  ],
  'extra-fotoelettrico': [
    v('Z3SeNGbMHfA', 'Quanti e fotoni', 'Lezione liceo', 'Effetto fotoelettrico.'),
  ],
  'extra-urti': [
    v('_cNvTgNNHyk', 'Impulso e urti', 'La fisica che mi piace', 'Urti e quantità di moto.'),
  ],
  'extra-radioisotopi': [
    v('Z3SeNGbMHfA', 'Isotopi e decadimento', 'Lezione liceo', 'Radioisotopi.'),
  ],
  'extra-prioni': [
    v('FQUOXVvrf6o', 'Misfolding proteico', 'Mini lesson biologia', 'Prioni.'),
  ],
  'extra-contesto': [
    v('_aKim3lL6sE', 'Modelli fisici avanzati', 'The Physics We Like', 'Gauss, ottica, Young.'),
  ],
}

export function videosFor(unitaId: string): TheoryVideo[] {
  return VIDEOS[unitaId] ?? []
}

