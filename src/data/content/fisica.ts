import type { UnitaContent } from '../../types'
import { fill, mc, resetQCounter } from '../quizHelpers'
import { pack } from './pack'

export function buildFisica(): UnitaContent[] {
  const out: UnitaContent[] = []

  resetQCounter()
  out.push(
    pack(
      'fis-1',
      [
        {
          title: 'Notazione scientifica e SI',
          body: `La notazione scientifica scrive un numero come a × 10ⁿ, con 1 ≤ |a| < 10, e permette di confrontare ordini di grandezza senza perdere zeri (es. 3,0 × 10⁻³ m = 3 mm; 6,02 × 10²³ è l’ordine del numero di Avogadro). Il Sistema Internazionale fissa sette unità di base (m, kg, s, A, K, mol, cd) da cui derivano newton, pascal, joule, watt. Si distinguono grandezze estensive (massa, volume, energia: dipendono dalla quantità di materia) e intensive (densità, pressione, temperatura: a T e P date non dipendono dalla quantità). In laboratorio biomedico conversioni corrette (km/h ↔ m/s, mmHg ↔ Pa) e stima degli errori fanno parte del metodo sperimentale: un ordine di grandezza sbagliato su una dose o una pressione può invalidare l’intero ragionamento clinico.`,
          formule: ['1 km = 10³ m', 'Pa = N/m²', 'N = kg·m/s²', '1 atm ≈ 1,013 × 10⁵ Pa'],
          esempio: '36 km/h = 10 m/s (dividere per 3,6). Una pressione arteriosa ~120 mmHg va confrontata con scale in pascal solo dopo conversione.',
          attenzione: 'Kelvin (K) è la temperatura termodinamica SI; non si dice “gradi kelvin”. Zero assoluto = 0 K ≈ −273,15 °C.',
          approfondisci: [
            'Se vuoi capire anche perché si preferisce la notazione scientifica nei fogli di calcolo di laboratorio.',
            'Se vuoi capire anche la differenza operativa tra precisione (ripetibilità) e accuratezza (vicinanza al valore vero).',
            'Se vuoi capire anche come le unità derivate nascono da prodotti/quozienti di unità base.',
            'Se vuoi capire anche perché densità e pressione sono intensive mentre massa e volume no.',
          ],
        },
        {
          title: 'Grandezze scalari e vettoriali',
          body: `Uno scalare è completamente descritto da un numero e un’unità (massa, energia, temperatura, densità, carica, tempo). Un vettore richiede modulo, direzione e verso (spostamento, velocità, accelerazione, forza, quantità di moto, campo elettrico). Due vettori uguali e opposti si annullano (vettore nullo): è il caso tipico di forze in equilibrio. In fisica medica e nei quiz, confondere scalare e vettore porta a errori tipici: la massa non ha direzione; la forza sì; la pressione è scalare (forza per area) anche se nasce da una forza. Il modulo di un vettore è sempre non negativo; il segno compare quando si proietta su un asse orientato. Distinguere “intensità” (modulo) da “componente” (proiezione) evita trappole quando si sommano forze oblique sul piano.`,
          esempio: 'La densità è intensiva e scalare; la velocità è vettoriale. Due forze di 10 N opposte su un oggetto danno risultante nulla, non 20 N.',
          attenzione: '“Solo un numero” non basta per una grandezza vettoriale: servono anche direzione e verso.',
          approfondisci: [
            'Se vuoi capire anche perché lo spostamento è vettore mentre lo spazio percorso (cammino) è scalare.',
            'Se vuoi capire anche il ruolo del sistema di riferimento nella decomposizione in componenti.',
            'Se vuoi capire anche esempi clinici di forze vettoriali (trazione, peso, reazione del suolo).',
          ],
        },
        {
          title: 'Operazioni tra vettori',
          body: `Somma e differenza si ottengono per componenti cartesiane o con la regola del parallelogramma: Ax + Bx, Ay + By. Il prodotto scalare A·B = |A||B|cosθ è uno scalare: è massimo se i vettori sono paralleli e concorde, zero se perpendicolari (cos 90° = 0), negativo se formano angolo ottuso. Il prodotto vettoriale A×B è un vettore perpendicolare al piano dei due fattori (regola della mano destra); il modulo è |A||B|senθ ed è massimo a 90°. Queste operazioni tornano ovunque: lavoro W = F·Δr, potenza, momento torcente τ = r × F, flusso e campi. In ambito biomedico, capire se due forze “contribuiscono” (scalare) o generano rotazione (vettoriale) è essenziale per leve articolari e equilibrio del rachide.`,
          formule: ['A·B = |A||B|cosθ', '|A×B| = |A||B|senθ', 'A = Ax î + Ay ĵ'],
          attenzione: 'Prodotto scalare → numero; prodotto vettoriale → vettore ⊥ al piano. Non scambiarli nei quiz.',
          figureIds: ['fis-1-vettori'],
          approfondisci: [
            'Se vuoi capire anche perché il lavoro è nullo se la forza è perpendicolare allo spostamento.',
            'Se vuoi capire anche la regola della mano destra per il verso di A×B.',
            'Se vuoi capire anche come si sommano forze oblique scomponendo in Fx e Fy.',
            'Se vuoi capire anche il legame tra momento torcente e stabilità articolare.',
          ],
        },
        {
          title: 'Funzioni trigonometriche elementari',
          body: `Seno, coseno e tangente collegano angoli e componenti: se θ è misurato dall’asse x, Fx = F cosθ e Fy = F senθ. Identità fondamentale: sen²θ + cos²θ = 1. Servono a scomporre forze, spostamenti e velocità lungo assi ortogonali, e a leggere i moduli di prodotti scalari e vettoriali (cosθ e senθ). All’esame bastano valori noti (0°, 30°, 45°, 60°, 90°) e il significato geometrico — proiezione su un cateto — non dimostrazioni. Un errore classico è usare sen al posto di cos (o viceversa) quando l’angolo è definito rispetto all’orizzontale: controlla sempre da quale asse parti. Nella biomeccanica, la componente della forza muscolare lungo il braccio del momento dipende proprio da queste proiezioni.`,
          formule: ['sen²θ + cos²θ = 1', 'Fx = F cosθ', 'Fy = F senθ', 'tanθ = senθ/cosθ'],
          esempio: 'Una forza obliqua di modulo F ha componente orizzontale F cosθ e verticale F senθ se θ è dall’asse x.',
          approfondisci: [
            'Se vuoi capire anche i valori “standard” di seno e coseno a 0°, 30°, 45°, 60°, 90°.',
            'Se vuoi capire anche perché cambiare l’asse di riferimento cambia Fx e Fy ma non |F|.',
            'Se vuoi capire anche come la tangente collega pendenza e angolo in un grafico.',
          ],
        },
      ],
      {
        analogia:
          'Immagina di dare indicazioni a un’amica: «cammina 3 km» è uno scalare (solo quanto). «Cammina 3 km verso nord» è un vettore (quanto + dove). Sommare vettori è come unire due tappe sul foglio: prima a destra, poi in alto, e vedi dove finisci. Spezzare una freccia obliqua in pezzi orizzontale e verticale è come proiettare un’ombra sui lati di un rettangolo.',
        concetti: [
          {
            titolo: 'Notazione e unità',
            testo:
              'Scrivere 0,003 m come 3 × 10⁻³ m aiuta a non perdere zeri. Le unità SI sono il “linguaggio comune”: forza in newton, pressione in pascal, temperatura assoluta in kelvin.',
          },
          {
            titolo: 'Scalari vs vettori',
            testo:
              'La massa è solo un numero positivo. La forza ha anche una freccia: stesso modulo, direzione diversa → effetti diversi. Se due frecce uguali puntano in versi opposti, si cancellano.',
          },
          {
            titolo: 'Prodotti tra vettori',
            testo:
              'Il prodotto scalare “pesa” quanto due frecce sono allineate: a 90° dà zero. Il prodotto vettoriale dà una freccia nuova, in piedi sul piano delle altre due (mano destra).',
          },
          {
            titolo: 'Seno e coseno',
            testo:
              'Servono a spezzare una freccia obliqua in pezzi orizzontale e verticale, come proiettare un’ombra sui lati di un rettangolo.',
          },
        ],
      },
      [
        mc('fis-1', 'La densità è una grandezza:', ['Estensiva', 'Intensiva', 'Solo vettoriale', 'Adimensionale sempre'], 1, 'Non dipende dalla quantità di materia (a T,P date).'),
        mc('fis-1', 'Il prodotto scalare di due vettori perpendicolari è:', ['Massimo', 'Zero', 'Sempre 1', 'Uguale al vettoriale'], 1, 'cos 90° = 0.'),
        fill('fis-1', 'L’unità SI di forza è il ______.', 'newton', 'N = kg·m/s².', ['N', 'Newton']),
        mc('fis-1', '1 km = ______ m', ['10', '100', '1000', '0.001'], 2, '10³ m.'),
        mc('fis-1', 'Una grandezza vettoriale richiede:', ['Solo un numero', 'Modulo, direzione e verso', 'Solo unità arbitrarie', 'Solo colore'], 1, 'Es. velocità, forza.'),
      ],
      [
        mc('fis-1', 'Il prodotto vettoriale è perpendicolare al piano dei due vettori:', ['Vero', 'Falso sempre', 'Solo se paralleli', 'Solo in 1D'], 0, 'Regola della mano destra.'),
        fill('fis-1', 'L’unità SI di pressione è il ______.', 'pascal', 'Pa = N/m².', ['Pa', 'Pascal']),
        mc('fis-1', '3,0 × 10⁻³ m in mm vale:', ['3', '0.3', '30', '3000'], 0, '3×10⁻³ m = 3 mm.'),
        mc('fis-1', 'sen²θ + cos²θ =', ['0', '1', 'θ', '2'], 1, 'Identità fondamentale.'),
        mc('fis-1', 'La massa è tipicamente:', ['Scalare', 'Vettoriale', 'Solo un’unità di tempo', 'Un campo magnetico'], 0, 'Quantità scalare positiva.'),
        mc('fis-1', 'Convertire 36 km/h in m/s:', ['10 m/s', '36 m/s', '1 m/s', '100 m/s'], 0, 'Dividere per 3,6.'),
        fill('fis-1', 'Nel SI la temperatura termodinamica si misura in ______.', 'kelvin', 'K.', ['K', 'Kelvin']),
        mc('fis-1', 'Somma di due vettori uguali e opposti:', ['Vettore nullo', 'Doppio modulo', 'Prodotto scalare 1', 'Sempre parallelo a z'], 0, 'Cancellazione.'),
      ],
      {
        figure: [
          {
            id: 'fis-1-vettori',
            kind: 'svg',
            caption: 'Scomposizione di una forza in componenti',
            alt: 'Vettore F con Fx e Fy',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-2',
      [
        {
          title: 'Cinematica',
          body: `Posizione, spostamento, velocità e accelerazione (medie e istantanee) descrivono il moto senza chiedere perché avviene. Moto rettilineo uniforme: a = 0, v costante, Δx = vt. Uniformemente accelerato: v = v₀ + at, con relazioni note su Δx (es. Δx = v₀t + ½at²). Caduta libera e moto parabolico sono casi di accelerazione costante (g ≈ 9,8 m/s² verso il basso). Nel moto circolare uniforme il modulo di v è costante ma c’è accelerazione centripeta a_c = v²/r diretta al centro: cambia la direzione, non la “velocità scalare”. Sul grafico v–t la pendenza è l’accelerazione e l’area sotto la curva è lo spostamento: saper leggere questi grafici è competenza tipica d’esame. In fisiologia, cinematica del passo e traiettorie articolari usano gli stessi concetti di spostamento e velocità angolare.`,
          formule: ['v = v₀ + at', 'Δx = v₀t + ½at²', 'a_c = v²/r'],
          attenzione: 'a = 0 non implica v = 0: può esserci moto uniforme. Velocità costante ≠ riposo.',
          figureIds: ['fis-2-cinematica'],
          approfondisci: [
            'Se vuoi capire anche la differenza tra velocità media e istantanea sul grafico x–t.',
            'Se vuoi capire anche perché nel MCU c’è accelerazione anche con |v| costante.',
            'Se vuoi capire anche come area e pendenza di v–t danno Δx e a.',
            'Se vuoi capire anche il moto parabolico come composizione di uniforme e accelerato.',
          ],
        },
        {
          title: 'Dinamica e forze',
          body: `Le tre leggi di Newton collegano moto e interazioni: (1) inerzia — un corpo isolato mantiene v costante; (2) F = ma con F risultante; (3) azione-reazione — forze uguali e opposte su corpi diversi. Forze tipiche: peso mg, tensioni di funi, attrito statico/dinamico, Hooke F = −kx. Equilibrio traslazionale: risultante nulla ⇒ a = 0 (il corpo può ancora muoversi di moto uniforme). Distinguere “equilibrio” da “riposo assoluto” evita trappole nei quiz. In biomedicina, peso, reazione del suolo e forze muscolari si trattano come vettori: la risultante decide se un arto accelera o resta in postura. Attenzione: azione e reazione non si elidono sullo stesso corpo — agiscono su oggetti diversi.`,
          formule: ['F = ma', 'F = −kx', 'P = mg'],
          esempio: 'Se ΣF = 0, l’accelerazione è nulla anche se la velocità non lo è (moto uniforme).',
          attenzione: 'Azione-reazione: stesse intensità, versi opposti, ma su due corpi distinti.',
          approfondisci: [
            'Se vuoi capire anche la differenza tra massa inerziale e peso (forza).',
            'Se vuoi capire anche attrito statico vs dinamico e il “massimo” prima dello scivolamento.',
            'Se vuoi capire anche come si scrive il bilancio delle forze su un piano inclinato.',
          ],
        },
        {
          title: 'Lavoro ed energia',
          body: `Il lavoro di una forza costante è W = F·s·cosθ (prodotto scalare): positivo se la forza ha componente lungo lo spostamento, nullo se perpendicolare, negativo se ostacola. La potenza è lavoro nell’unità di tempo (W/t, in watt). Teorema dell’energia cinetica: il lavoro netto della risultante varia K = ½mv². Forze conservative (gravità, elastica) ammettono energia potenziale; in assenza di forze non conservative (o se il loro lavoro netto è nullo) l’energia meccanica K + U si conserva. Unità SI dell’energia: joule (J = N·m). In metabolismo e biomeccanica si parla spesso di “lavoro” e “potenza” muscolare: la fisica fissa le definizioni; la fisiologia aggiunge rendimento e calore dissipato.`,
          formule: ['W = F s cosθ', 'U_g ≈ mgh', 'K = ½ mv²', 'P = W/t'],
          attenzione: 'Conservazione meccanica solo se le forze non conservative non fanno lavoro netto (o sono assenti). Attrito → energia meccanica ↓.',
          approfondisci: [
            'Se vuoi capire anche perché la forza normale su uno spostamento orizzontale non fa lavoro.',
            'Se vuoi capire anche la differenza tra energia potenziale gravitazionale ed elastica.',
            'Se vuoi capire anche il teorema lavoro–energia cinetica come bilancio.',
            'Se vuoi capire anche potenza media vs istantanea.',
          ],
        },
        {
          title: 'Quantità di moto, centro di massa e leve',
          body: `La quantità di moto p = mv; l’impulso J = FΔt (se F media) è uguale a Δp. Nei sistemi isolati (forze esterne nulle o trascurabili) p totale si conserva: utile per urti. Il centro di massa descrive il moto “medio” del sistema come se tutta la massa fosse concentrata lì. Per il corpo rigido: momento torcente τ = r × F; equilibrio rotazionale richiede risultante dei momenti nulla oltre alla risultante delle forze. Le leve (anche nel corpo umano: atlante-occipite, piede, avambraccio) scambiano forza e braccio: aumentare il braccio riduce la forza necessaria a parità di momento. Piccoli tendini vicini all’articolazione spesso richiedono forze muscolari grandi perché il braccio della forza è corto.`,
          formule: ['p = mv', 'J = Δp', 'τ = r × F', 'equilibrio: ΣF = 0 e Στ = 0'],
          esempio: 'Nel braccio, un piccolo spostamento del tendine può bilanciare un carico grazie al braccio della forza e al momento.',
          approfondisci: [
            'Se vuoi capire anche urti elastici vs anelastici e cosa si conserva in ciascuno.',
            'Se vuoi capire anche perché il centro di massa può stare fuori dal corpo (es. anello).',
            'Se vuoi capire anche leve di I, II e III genere nel corpo umano.',
          ],
        },
      ],
      {
        analogia:
          'Pensa a una biglia su un tavolo liscio: se nessuno la spinge di lato, continua dritta (inerzia). Se la spingi, accelera (F = ma). Se la fai girare in un cerchio con un filo, la velocità “cambia direzione” verso il centro anche se non rallenta. Aprire una porta lontano dai cardini è più facile: stesso effetto rotante con meno forza.',
        concetti: [
          {
            titolo: 'Cinematica vs dinamica',
            testo:
              'La cinematica racconta come si muove (v, a, traiettorie). La dinamica spiega perché: le forze. a = 0 significa velocità costante, non necessariamente ferma.',
          },
          {
            titolo: 'Lavoro ed energia',
            testo:
              'Il lavoro è “forza che accompagna uno spostamento”. L’energia cinetica è il moto; il potenziale è energia “messata da parte” (altezza, molla compressa). Insieme formano l’energia meccanica.',
          },
          {
            titolo: 'Impulso e urti',
            testo:
              'Un colpo breve cambia la quantità di moto: impulso = Δp. Se il sistema è isolato, la somma delle p si conserva, come biglie che si urtano su un tavolo senza attrito.',
          },
          {
            titolo: 'Leve e torcente',
            testo:
              'Aprire una porta lontano dai cardini è più facile: stesso “effetto rotante” con meno forza, perché il braccio è più lungo.',
          },
        ],
      },
      [
        mc('fis-2', 'Nel moto rettilineo uniformemente accelerato, v = v0 + at. Se a = 0:', ['v cresce', 'v è costante', 'v è sempre zero', 'Lo spostamento è impossibile'], 1, 'Moto uniforme.'),
        mc('fis-2', 'La seconda legge di Newton è:', ['F = ma', 'F = mv', 'F = m/a', 'F = a/m'], 0, 'Forza risultante.'),
        fill('fis-2', 'L’unità SI di energia è il ______.', 'joule', 'J = N·m.', ['J', 'Joule']),
        mc('fis-2', 'Una leva nel braccio umano riduce tipicamente:', ['La forza necessaria aumentando il braccio', 'La massa del pianeta', 'La carica elettrica', 'Il pH'], 0, 'Momento torcente τ = F·d.'),
        mc('fis-2', 'In assenza di forze non conservative, l’energia meccanica:', ['Si conserva', 'Aumenta sempre', 'Diventa pressione', 'È nulla'], 0, 'K + U costante.'),
      ],
      [
        mc('fis-2', 'L’accelerazione centripeta in moto circolare uniforme vale:', ['v²/r', 'v/r', 'vr', 'r/v²'], 0, 'Diretta verso il centro.'),
        fill('fis-2', 'La quantità di moto p = ______.', 'mv', 'Massa × velocità.', ['m*v', 'm·v']),
        mc('fis-2', 'Il lavoro di una forza costante è:', ['F·s·cosθ', 'F/s', 'm/v', 'P·V sempre'], 0, 'Prodotto scalare F·Δr.'),
        mc('fis-2', 'La legge di Hooke: F =', ['−kx', 'kx²', 'mgh', 'qvB'], 0, 'Forza elastica.'),
        mc('fis-2', 'Se la risultante delle forze è zero, il corpo:', ['Ha accelerazione nulla (equilibrio traslazionale)', 'Ha sempre velocità nulla', 'Non può ruotare mai', 'Ha carica nulla'], 0, 'Può muoversi di moto uniforme.'),
        mc('fis-2', 'Il momento torcente dipende da:', ['Forza e braccio', 'Solo dalla massa inerziale senza geometria', 'Solo dal colore', 'Solo dal pH'], 0, 'τ = r × F.'),
        fill('fis-2', 'L’energia potenziale gravitazionale vicino alla Terra è m g ______.', 'h', 'U = mgh.', ['altezza', 'H']),
        mc('fis-2', 'L’impulso è uguale alla:', ['Variazione di quantità di moto', 'Solo energia potenziale', 'Solo potenza media', 'Solo densità'], 0, 'J = Δp.'),
      ],
      {
        figure: [
          {
            id: 'fis-2-cinematica',
            kind: 'svg',
            caption: 'Grafico v–t: pendenza = a, area = spostamento',
            alt: 'Grafico velocità-tempo',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-3',
      [
        {
          title: 'Idrostatica (Stevino, Pascal, Archimede)',
          body: `Pressione P = F/A; densità ρ = m/V. Stevino: in un fluido in quiete P = P₀ + ρgh (aumenta linearmente con la profondità). Pascal: la pressione applicata a un fluido incomprimibile si trasmette integralmente; spiega i torchi idraulici (piccola forza su piccola area → grande forza su grande area a parità di P). Archimede: la spinta è uguale al peso del fluido spostato — base del galleggiamento e della misura di densità. Manometri e barometro di Torricelli misurano pressioni relative o atmosferiche. In medicina, pressione idrostatica colonnare e pressione di perfusione usano le stesse idee: un dislivello di sangue (o di liquido cefalorachidiano) cambia la pressione misurata. Distinguere fluido in quiete (idrostatica) da fluido in moto (idrodinamica) evita di mescolare Stevino e Bernoulli.`,
          formule: ['P = P₀ + ρgh', 'ρ = m/V', 'Pa = N/m²', 'P = F/A'],
          attenzione: 'Stevino vale per fluido in quiete; non confonderlo con Bernoulli (moto).',
          approfondisci: [
            'Se vuoi capire anche perché la pressione idrostatica dipende dalla profondità e non dalla forma del recipiente.',
            'Se vuoi capire anche il vantaggio meccanico del torchio idraulico (Pascal).',
            'Se vuoi capire anche galleggiamento: spinta vs peso del corpo.',
            'Se vuoi capire anche mmHg e cmH₂O come unità cliniche di pressione.',
          ],
        },
        {
          title: 'Bernoulli e circolazione',
          body: `Per fluidi ideali incomprimibili, l’equazione di continuità impone A·v costante (portata volumetrica): restringendo la sezione, la velocità aumenta. Bernoulli collega pressione, velocità e altezza in un bilancio energetico del fluido: P + ½ρv² + ρgh ≈ costante lungo una linea di corrente. Dove v sale, P tipicamente scende. In medicina: stenosi (sezione ↓ → v ↑ → P ↓ locale); aneurisma (sezione ↑ → v ↓ → P ↑, rischio di ulteriore dilatazione). Non è una legge “magica” sulla sola pressione: vale sotto ipotesi (stazionarietà, viscosità trascurabile, densità costante). Il sangue reale è viscoso e pulsatile, ma il modello di Bernoulli resta lo schema qualitativo d’esame per stenosi e aneurismi.`,
          formule: ['A₁v₁ = A₂v₂', 'P + ½ρv² + ρgh ≈ cost.'],
          esempio: 'Nella stenosi, a portata costante la velocità aumenta e la pressione locale tende a diminuire (Bernoulli + continuità).',
          figureIds: ['fis-3-bernoulli'],
          approfondisci: [
            'Se vuoi capire anche il significato dei tre termini di Bernoulli (pressione, cinetico, gravitazionale).',
            'Se vuoi capire anche perché continuità e Bernoulli si usano insieme nella stenosi.',
            'Se vuoi capire anche i limiti del modello ideale rispetto al sangue reale.',
            'Se vuoi capire anche il rischio meccanico dell’aneurisma legato all’aumento di P.',
          ],
        },
        {
          title: 'Poiseuille e viscosità',
          body: `Nei tubi cilindrici in regime laminare, la legge di Poiseuille collega portata e caduta di pressione: la resistenza idraulica R è proporzionale a ηL/r⁴, dove η è la viscosità, L la lunghezza e r il raggio. Dimezzare il raggio moltiplica la resistenza per 16: la vasocostrizione è quindi criticamente efficace sul flusso. Il profilo di velocità laminare è tipicamente parabolico (massimo al centro, nullo a parete per la condizione di no-slip). Il numero di Reynolds indica la transizione verso la turbolenza, che rompe il profilo parabolico e aumenta le perdite. All’esame conta soprattutto la dipendenza da r⁴ e il ruolo di η: ematocrito alto → viscosità ↑ → resistenza ↑. È il ponte fisico tra calibro vasale e portata tissutale.`,
          formule: ['R ∝ ηL / r⁴', 'ΔP = R · portata (schema analogo a Ohm)'],
          attenzione: 'r alla quarta potenza: piccoli cambi di calibro → grandi effetti sulla portata.',
          approfondisci: [
            'Se vuoi capire anche perché il profilo laminare è parabolico.',
            'Se vuoi capire anche il parallelo qualitativo tra Poiseuille e la legge di Ohm.',
            'Se vuoi capire anche come ematocrito e temperatura influenzano η.',
            'Se vuoi capire anche cosa cambia in regime turbolento.',
          ],
        },
        {
          title: 'Tensione superficiale e Laplace',
          body: `La tensione superficiale tende a minimizzare l’area dell’interfaccia: le molecole in superficie sono “tirate” verso l’interno dal liquido. La legge di Laplace (forma qualitativa/esame) collega la pressione di curvatura al raggio: interfacce molto curve (piccolo r) implicano ΔP elevate — per una sfera tipicamente ΔP ∝ σ/r. È rilevante per bolle, gocce, alveoli e capillarità. In fisiologia polmonare, senza surfactante gli alveoli piccoli tenderebbero a collassare a favore dei grandi (stesso σ, r diverso → ΔP diverso). Non è una forza nucleare né una misura di pH: è meccanica dell’interfaccia liquido–aria o liquido–liquido. Capillarità e menischi nei tubicini di laboratorio discendono dallo stesso equilibrio di forze di superficie.`,
          formule: ['ΔP ∝ σ / r (schema Laplace per interfacce curve)'],
          attenzione: 'Laplace: pressione legata a curvatura/raggio, non alla sola massa inerziale.',
          approfondisci: [
            'Se vuoi capire anche il ruolo del surfactante nel ridurre σ alveolare.',
            'Se vuoi capire anche perché alveoli di raggio diverso avrebbero ΔP diverse a σ uguale.',
            'Se vuoi capire anche menisco e capillarità in un tubicino sottile.',
          ],
        },
      ],
      {
        analogia:
          'Una piscina: più scendi, più senti pressione sulle orecchie (Stevino). Un torchio idraulico è come premere un tubetto di dentifricio: la spinta si trasmette al liquido. Il sangue in un restringimento accelera come acqua in un ugello del giardino: dove corre più veloce, “spinge” meno sulle pareti (Bernoulli). Un vaso più stretto resiste moltissimo al flusso (r⁴).',
        concetti: [
          {
            titolo: 'Pressione e profondità',
            testo:
              'Nel liquido fermo la pressione cresce con ρgh. Pascal dice che un aumento di pressione si ridistribuisce in tutto il fluido incomprimibile.',
          },
          {
            titolo: 'Archimede',
            testo:
              'La spinta verso l’alto vale il peso del liquido che occupavi. Se pesi meno di quel liquido, galleggi; se pesi di più, affondi finché non sposti abbastanza volume.',
          },
          {
            titolo: 'Continuità e Bernoulli',
            testo:
              'Stessa portata in un tubo più stretto → velocità più alta. Velocità più alta → pressione spesso più bassa. Stenosi e aneurismi si leggono così.',
          },
          {
            titolo: 'Poiseuille e Laplace',
            testo:
              'Un vaso più stretto resiste moltissimo al flusso (r⁴). Sulle superfici curve, più sei “piccoli e rotondi”, più la differenza di pressione può essere grande (idea di Laplace).',
          },
        ],
      },
      [
        mc('fis-3', 'Secondo Stevino, la pressione in un liquido aumenta con:', ['La profondità', 'Solo il colore', 'Solo la carica', 'Solo il pH'], 0, 'ρgh.'),
        mc('fis-3', 'In una stenosi, a portata costante, la velocità:', ['Diminuisce', 'Aumenta', 'È nulla', 'Dipende solo dal pH'], 1, 'Continuità: sezione ↓ → v ↑.'),
        fill('fis-3', 'La legge di ______ collega portata e raggio alla quarta potenza.', 'Poiseuille', 'R ~ 1/r⁴.', ['poiseuille']),
        mc('fis-3', 'Il principio di Archimede afferma che la spinta:', ['È uguale al peso del fluido spostato', 'È sempre zero', 'Dipende solo dalla carica', 'È uguale a mv'], 0, 'Galleggiamento.'),
        mc('fis-3', 'Bernoulli implica che dove la velocità del fluido sale, la pressione:', ['Sale', 'Scende (tipicamente)', 'Diventa temperatura', 'È costante per definizione assoluta'], 1, 'Conservazione energetica del fluido ideale.'),
      ],
      [
        mc('fis-3', 'Pascal spiega tipicamente:', ['I torchi idraulici', 'Solo l’effetto fotoelettrico', 'Solo lo splicing', 'Solo Ohm'], 0, 'Pressione trasmessa in fluidi incomprimibili.'),
        fill('fis-3', 'L’unità SI di pressione è il ______.', 'pascal', 'Pa.', ['Pa']),
        mc('fis-3', 'Se il raggio del vaso dimezza, a parità di altri fattori la resistenza di Poiseuille:', ['Si dimezza', 'Diventa 16 volte', 'Resta uguale', 'Si annulla'], 1, '(1/2)⁴ = 1/16 → R ×16.'),
        mc('fis-3', 'La tensione superficiale:', ['Tende a minimizzare l’area dell’interfaccia', 'È una forza nucleare', 'Misura il pH', 'È un virus'], 0, 'Molecole in superficie.'),
        mc('fis-3', 'In regime laminare il profilo di velocità è tipicamente:', ['Parabolico', 'Uniforme piatto sempre', 'Solo sonoro', 'Solo vettoriale nullo'], 0, 'Massima al centro.'),
        mc('fis-3', 'Un aneurisma (sezione ↑) tende a:', ['Velocità ↓ e pressione ↑ (Bernoulli)', 'Velocità ↑ sempre', 'Eliminare il sangue', 'Creare DNA'], 0, 'Rischio di dilatazione.'),
        fill('fis-3', 'La densità ρ = m / ______.', 'V', 'Massa su volume.', ['volume', 'v']),
        mc('fis-3', 'La legge di Laplace (qualitativa) collega pressione a:', ['Curvatura dell’interfaccia / raggio', 'Solo alla massa inerziale', 'Solo al colore', 'Solo ai telomeri'], 0, 'Importante in alveoli/bolle (contesto).'),
      ],
      {
        figure: [
          {
            id: 'fis-3-bernoulli',
            kind: 'svg',
            caption: 'Continuità e Bernoulli in una stenosi',
            alt: 'Tubo con restringimento',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-4',
      [
        {
          title: 'Onde e oscillatore armonico',
          body: `Un’onda è la propagazione di una perturbazione senza trasporto netto di materia (in molti modelli meccanici): trasporta energia e informazione. L’oscillatore armonico è spesso la sorgente ideale: frequenza f, periodo T = 1/f, ampiezza A, lunghezza d’onda λ; relazione fondamentale v = fλ. Onde trasversali: spostamento ⊥ alla propagazione (corde, molte EM). Longitudinali: compressioni e rarefazioni // alla propagazione (suono in aria). L’ampiezza è legata all’energia/intensità trasportata: a parità di altre condizioni, maggiore A → più energia. Se f raddoppia a v costante, λ si dimezza. In diagnostica, ultrasuoni e vibrazioni meccaniche usano gli stessi parametri; capire A, f e λ è il vocabolario minimo per non confondere intensità e frequenza.`,
          formule: ['v = fλ', 'T = 1/f', 'ω = 2πf'],
          attenzione: 'Se f raddoppia a v costante, λ si dimezza. Ampiezza ≠ lunghezza d’onda.',
          figureIds: ['fis-4-onda'],
          approfondisci: [
            'Se vuoi capire anche la differenza geometrica tra onda trasversale e longitudinale.',
            'Se vuoi capire anche perché v = fλ lega tre grandezze con una sola relazione.',
            'Se vuoi capire anche il legame qualitativo tra ampiezza ed energia.',
            'Se vuoi capire anche periodo, frequenza e pulsazione ω.',
          ],
        },
        {
          title: 'Sovrapposizione e interferenza',
          body: `Il principio di sovrapposizione: in regime lineare le perturbazioni si sommano algebricamente nello stesso punto e nello stesso istante. Interferenza costruttiva: differenza di cammino multiplo intero di λ (onde in fase) → massimi di ampiezza. Distruttiva: tipicamente dispari multipli di λ/2 (sfasamento di π) → minimi. Non significa che le onde “si distruggono per sempre”: si compongono localmente e poi proseguono. Battimenti e figure di interferenza sono conseguenze della stessa idea. In acustica e ottica (Young) le condizioni di massimo/minimo sono centrali nei quiz; in ecografia e imaging si ragiona spesso su riflessioni multiple e percorsi ottici/acustici diversi che possono rafforzarsi o attenuarsi.`,
          esempio: 'Cammino differisce di nλ → massimo costruttivo (condizione ideale). Differenza λ/2 → distruttiva.',
          attenzione: 'Interferenza distruttiva è locale e temporanea nella sovrapposizione, non “cancella” le sorgenti.',
          approfondisci: [
            'Se vuoi capire anche la condizione di cammino ottico/acustico per massimi e minimi.',
            'Se vuoi capire anche cosa significa “in fase” e “in opposizione di fase”.',
            'Se vuoi capire anche il limite del regime lineare (sovrapposizione).',
          ],
        },
        {
          title: 'Onde acustiche e decibel',
          body: `Il suono in aria è un’onda longitudinale meccanica: richiede un mezzo elastico; nel vuoto non si propaga. La velocità dipende dal mezzo (aria ≈ 340 m/s, acqua e tessuti molto più rapidi — rilevante in ecografia). L’intensità I è potenza su area; il livello di intensità si esprime in decibel (dB), scala logaritmica: L = 10 log₁₀(I/I₀). 0 dB corrisponde tipicamente alla soglia uditiva di riferimento I₀, non al “silenzio assoluto termodinamico”. Un aumento di 10 dB corrisponde a un fattore 10 sull’intensità. Unità SI di frequenza: hertz (Hz = s⁻¹). In clinica, soglie audiometriche e limiti di esposizione usano proprio i dB: sapere che è una scala log evita di trattarli come percentuali lineari.`,
          formule: ['L (dB) = 10 log₁₀(I/I₀)', 'Hz = s⁻¹'],
          attenzione: 'dB non è un’unità SI “lineare” dell’intensità: confronta rapporti su scala log.',
          approfondisci: [
            'Se vuoi capire anche perché il suono non viaggia nel vuoto.',
            'Se vuoi capire anche cosa cambia nella velocità del suono tra aria e tessuti.',
            'Se vuoi capire anche perché +10 dB significa intensità ×10.',
            'Se vuoi capire anche la differenza tra intensità (W/m²) e livello in dB.',
          ],
        },
        {
          title: 'Effetto Doppler (qualitativo)',
          body: `La frequenza percepita cambia con il moto relativo tra sorgente e osservatore. Se una ambulanza (o una sonda) si avvicina, f percepita aumenta; se si allontana, diminuisce. Conta il moto relativo lungo la linea che li congiunge, non dettagli irrilevanti (colore, CFU, ecc.). All’esame 2026 basta la descrizione qualitativa, senza necessariamente le formule complete. In medicina il Doppler ecografico stima velocità del sangue dagli spostamenti di frequenza degli ultrasuoni riflessi: stesso principio fisico, applicazione diagnostica. Attenzione a non confondere Doppler con intensità o con semplice attenuazione: qui cambia la frequenza apparente, non solo “quanto è forte” il segnale.`,
          esempio: 'Ambulanza in avvicinamento → frequenza più alta (Doppler). Flusso verso la sonda → shift positivo in ecografia Doppler.',
          approfondisci: [
            'Se vuoi capire anche perché conta solo la componente del moto lungo la linea sorgente–osservatore.',
            'Se vuoi capire anche l’uso del Doppler in ecografia vascolare (idea qualitativa).',
            'Se vuoi capire anche la differenza tra cambio di frequenza (Doppler) e attenuazione.',
          ],
        },
      ],
      {
        analogia:
          'Fai onde con una corda: la corda resta lì, ma “il movimento” viaggia. Due onde che si incontrano si sommano un attimo, come due amicizie che alzano insieme le braccia (interferenza). Il clacson di un’auto che ti arriva sembra più acuto, poi più grave quando ti passa: è il Doppler. I decibel sono come una scala a “salti” logaritmici sull’intensità, non centimetri lineari.',
        concetti: [
          {
            titolo: 'Cosa è un’onda',
            testo:
              'Trasporta energia e informazione. Su una corda lo spostamento è trasversale; nel suono in aria sono strette e allargate di aria (longitudinale).',
          },
          {
            titolo: 'v = fλ',
            testo:
              'Velocità = quante onde al secondo × lunghezza di ciascuna. A velocità fissa, più frequenza significa onde più corte.',
          },
          {
            titolo: 'Decibel',
            testo:
              'Misurano quanto un suono è intenso rispetto a una soglia di riferimento. Zero decibel non è il nulla assoluto: è il riferimento dell’udito.',
          },
          {
            titolo: 'Doppler',
            testo:
              'Se la sorgente e tu vi avvicinate, senti più cicli al secondo (frequenza ↑); se vi allontanate, ne senti di meno.',
          },
        ],
      },
      [
        mc('fis-4', 'v = fλ. Se f raddoppia a v costante, λ:', ['Raddoppia', 'Si dimezza', 'Resta uguale', 'Diventa zero'], 1, 'Inversa.'),
        mc('fis-4', 'Un’onda sonora in aria è tipicamente:', ['Trasversale', 'Longitudinale', 'Elettromagnetica nel vuoto senza mezzo', 'Solo gravitazionale'], 1, 'Compressioni/rarefazioni.'),
        fill('fis-4', 'Il livello di intensità sonora si misura in ______.', 'decibel', 'dB.', ['dB', 'db']),
        mc('fis-4', 'L’interferenza costruttiva avviene quando la differenza di cammino è:', ['Multiplo intero di λ (in fase)', 'Sempre λ/2', 'Sempre zero assoluto indipendente', 'Solo 90°'], 0, 'Massimi di ampiezza.'),
        mc('fis-4', 'Se una ambulanza si avvicina, la frequenza percepita:', ['Aumenta (Doppler)', 'Diminuisce sempre', 'Diventa pressione', 'È nulla'], 0, 'Blu-shift acustico.'),
      ],
      [
        mc('fis-4', 'Il periodo T è:', ['1/f', 'f', 'λ', 'v²'], 0, 'Tempo di un ciclo.'),
        fill('fis-4', 'L’unità SI di frequenza è l’______.', 'hertz', 'Hz = s⁻¹.', ['Hz', 'Hertz']),
        mc('fis-4', 'Su una corda le onde sono tipicamente:', ['Trasversali', 'Solo longitudinali', 'Solo statiche', 'Solo magnetiche'], 0, 'Spostamento ⊥ propagazione.'),
        mc('fis-4', '0 dB corrisponde tipicamente a:', ['Soglia uditiva di riferimento', 'Silenzio assoluto termodinamico', 'Velocità della luce', '1 atm'], 0, 'I0 di riferimento.'),
        mc('fis-4', 'L’ampiezza di un’onda è legata a:', ['Energia/intensità trasportata', 'Solo alla lunghezza d’onda fissata', 'Solo al colore del mezzo', 'Solo al pH'], 0, 'Maggiore ampiezza → più energia.'),
        mc('fis-4', 'Il principio di sovrapposizione afferma che:', ['Le onde si sommano algebricamente (lineare)', 'Si distruggono sempre', 'Non possono coesistere', 'Diventano particelle sempre'], 0, 'Somma delle perturbazioni.'),
        fill('fis-4', 'La lunghezza d’onda si indica con ______.', 'λ', 'Lambda.', ['lambda', 'Lambda']),
        mc('fis-4', 'Il Doppler qualitativo dipende da:', ['Moto relativo sorgente-osservatore', 'Solo dal colore degli occhi', 'Solo dal CFU', 'Solo dal Gram'], 0, 'Frequenza apparente.'),
      ],
      {
        figure: [
          {
            id: 'fis-4-onda',
            kind: 'svg',
            caption: 'Onda: ampiezza A e lunghezza d’onda λ',
            alt: 'Onda sinusoidale',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-5',
      [
        {
          title: 'Gas perfetti e variabili di stato',
          body: `Sistema e ambiente; variabili di stato principali: pressione P, volume V, temperatura T. Per i gas perfetti PV = nRT, con T assoluta in kelvin: è l’equazione di stato che riassume il comportamento ideale a basse densità. A T costante (legge di Boyle) P e V sono inversamente proporzionali: sul piano P–V l’isoterma è un’iperbole. Le trasformazioni si classificano: isoterma (T cost.), isocora (V cost.), isobara (P cost.), adiabatica (Q = 0). Il modello ideale è un’approssimazione utile alle condizioni ordinarie; gas reali richiedono correzioni a pressioni alte. In fisiologia respiratoria, volumi e pressioni parziali si ragionano con le stesse variabili di stato (anche se miscele e vapor d’acqua complicano il quadro). Sul grafico P–V si leggono lavoro e percorsi: area sotto la curva ≈ lavoro di espansione.`,
          formule: ['PV = nRT', 'Boyle: P ∝ 1/V (T cost.)', 'T(K) = t(°C) + 273,15'],
          attenzione: 'T nell’equazione di stato è assoluta (kelvin). Zero °C ≠ zero kelvin.',
          figureIds: ['fis-5-pv'],
          approfondisci: [
            'Se vuoi capire anche perché l’isoterma di Boyle è un’iperbole sul piano P–V.',
            'Se vuoi capire anche la differenza tra isoterma, isocora, isobara e adiabatica.',
            'Se vuoi capire anche quando l’approssimazione di gas perfetto fallisce.',
            'Se vuoi capire anche il legame qualitativo tra area sul piano P–V e lavoro.',
            'Se vuoi capire anche n e R: significato di quantità di sostanza e costante dei gas.',
          ],
        },
        {
          title: 'Calore e cambiamenti di stato',
          body: `Calore Q è energia scambiata per differenza di temperatura (o in cambiamenti di fase), non “una sostanza”. Capacità termica e calore specifico: Q = mcΔT vale assenti cambiamenti di stato. Nei passaggi di fase interviene il calore latente (fusione, evaporazione, sublimazione…): a T costante finché coesistono le due fasi. Trasporto del calore: conduzione (contatto/mezzo, urti molecolari), convezione (moto macroscopico di fluido), irraggiamento (onde elettromagnetiche, anche nel vuoto). La calorimetria bilancia scambi tra corpi fino all’equilibrio termico. In clinica: evaporazione del sudore (latente), termoregolazione, ipotermia/ipertermia. Distinguere calore (processo, dipende dal percorso) da temperatura (variabile di stato) è una delle trappole più frequenti.`,
          formule: ['Q = m c ΔT', 'Q_latente = m λ', 'equilibrio termico: scambi che si bilanciano'],
          esempio: 'Fondere ghiaccio a 0 °C richiede calore latente senza variare T finché resta ghiaccio+acqua.',
          figureIds: ['fis-5-thermos'],
          approfondisci: [
            'Se vuoi capire anche la differenza tra calore specifico e calore latente.',
            'Se vuoi capire anche conduzione vs convezione vs irraggiamento con esempi corporei.',
            'Se vuoi capire anche perché durante un passaggio di fase puro T può restare costante.',
            'Se vuoi capire anche il bilancio calorimetrico tra due corpi a contatto.',
          ],
        },
        {
          title: 'Primo principio',
          body: `Il primo principio è la conservazione dell’energia per il sistema termodinamico: ΔU = Q − W (verificare sempre la convenzione del testo d’esame sul segno di W: lavoro fatto dal sistema o sul sistema). U, energia interna, è funzione di stato; Q e W dipendono dal percorso. In isocora tipicamente il lavoro di espansione ≈ 0 (ΔV = 0), quindi ΔU ≈ Q. In adiabatica ideale Q = 0, quindi ΔU è legato al solo lavoro. Un pistone che comprime un gas fa lavoro sul sistema e può alzare U e T; un’espansione contro l’esterno può raffreddare. L’immagine “thermos + pistone” aiuta: puoi scambiare calore attraverso le pareti, fare lavoro muovendo il pistone, e ciò che resta nel “conto” interno è ΔU. Nessun ciclo crea energia dal nulla: il bilancio deve chiudersi.`,
          formule: ['ΔU = Q − W (convenzione da verificare)', 'isocora: W_espansione ≈ 0', 'adiabatica: Q = 0 → ΔU = −W'],
          attenzione: 'Adiabatica ≠ isoterma: adiabatica significa Q = 0, non T costante per definizione.',
          figureIds: ['fis-5-thermos'],
          approfondisci: [
            'Se vuoi capire anche perché U è funzione di stato mentre Q e W no.',
            'Se vuoi capire anche il bilancio in isocora, isobara e adiabatica.',
            'Se vuoi capire anche come un ciclo chiuso impone ΔU = 0 sul giro completo.',
            'Se vuoi capire anche la convenzione dei segni di W nei diversi manuali.',
          ],
        },
        {
          title: 'Secondo principio, Carnot ed entropia',
          body: `Il secondo principio esprime irreversibilità e limiti delle macchine termiche: non tutto il calore assorbito da una sorgente calda si converte in lavoro in un ciclo; parte deve essere ceduta a una sorgente fredda. Il rendimento di Carnot η = 1 − T_c/T_h dipende solo dalle temperature assolute dei due serbatoi: è il limite ideale tra due T. Sul piano P–V il ciclo di Carnot è composto da due isoterme e due adiabatiche reversibili: è un riferimento, non una macchina reale. L’entropia S di un sistema isolato non diminuisce nei processi irreversibili (ΔS ≥ 0): misura la “freccia” dei processi spontanei. Carnot non è una pompa ionica né un enzima: è il ciclo termodinamico di massimo rendimento teorico. Temperature sempre in kelvin.`,
          formule: ['η_Carnot = 1 − T_c/T_h', 'ΔS ≥ 0 (isolato, irreversibile)', 'T in kelvin'],
          attenzione: 'Temperature di Carnot in kelvin. η = 1 solo se T_c = 0 K (irraggiungibile in pratica).',
          figureIds: ['fis-5-carnot'],
          approfondisci: [
            'Se vuoi capire anche perché serve una sorgente fredda in ogni macchina termica ciclica.',
            'Se vuoi capire anche la struttura del ciclo di Carnot sul piano P–V (2 isoterme + 2 adiabatiche).',
            'Se vuoi capire anche il significato qualitativo di entropia e irreversibilità.',
            'Se vuoi capire anche perché alzare T_h o abbassare T_c aumenta η_Carnot.',
            'Se vuoi capire anche la differenza tra rendimento reale e limite di Carnot.',
          ],
        },
      ],
      {
        analogia:
          'Un termos pieno di tè caldo: l’energia non scompare (primo principio), ma il tè non tornerà da solo più caldo del forno spegnendosi… le cose “si mescolano” e l’ordine utile si perde (secondo principio). Un gas in un palloncino è come tante biglie che urtano le pareti: più sono “agitati” (T alta), più spingono. Carnot è la gara ideale tra due temperature: nessuno batte quel limite senza barare sulle T.',
        concetti: [
          {
            titolo: 'Gas e PV = nRT',
            testo:
              'Pressione, volume e temperatura assoluta sono legati. A temperatura fissa, se stringi il volume la pressione sale (e viceversa). Sul grafico P–V l’isoterma è una curva a iperbole.',
          },
          {
            titolo: 'Calore e stati',
            testo:
              'Riscaldare può alzare la temperatura oppure cambiare stato (ghiaccio→acqua) a T quasi costante: lì conta il calore latente. Il calore viaggia per contatto, per moti di fluido o come luce/irraggiamento.',
          },
          {
            titolo: 'Primo principio',
            testo:
              'L’energia interna cambia se entri calore o fai lavoro. È un bilancio, non una “creazione” di energia. Thermos e pistone: Q, W e U nello stesso conto.',
          },
          {
            titolo: 'Carnot ed entropia',
            testo:
              'Nessuna macchina reale batte il limite tra due temperature. L’entropia misura quanto un processo isolato “non torna indietro” facilmente.',
          },
        ],
      },
      [
        mc('fis-5', 'Per un gas perfetto, a T costante, P e V sono:', ['Direttamente proporzionali', 'Inversamente proporzionali', 'Indipendenti', 'Sempre uguali'], 1, 'Boyle.'),
        mc('fis-5', 'Il rendimento di Carnot dipende da:', ['T_calda e T_fredda', 'Solo dal colore del pistone', 'Solo dalla massa', 'Solo dal pH'], 0, 'η = 1 − Tc/Th.'),
        fill('fis-5', 'L’equazione di stato dei gas perfetti è PV = nR______.', 'T', 'T assoluta.', ['t']),
        mc('fis-5', 'In una trasformazione adiabatica ideale tipicamente:', ['Q = 0', 'W = 0 sempre', 'ΔU = 0 sempre', 'T è costante sempre'], 0, 'Nessuno scambio di calore.'),
        mc('fis-5', 'Il calore latente interviene nei:', ['Cambiamenti di stato', 'Solo moti circolari', 'Solo DNA', 'Solo vettori'], 0, 'Fusione, evaporazione…'),
      ],
      [
        mc('fis-5', 'Conduzione termica richiede tipicamente:', ['Contatto / mezzo materiale', 'Solo il vuoto assoluto', 'Solo corrente elettrica', 'Solo suono'], 0, 'Trasporto per urti molecolari.'),
        fill('fis-5', 'L’unità SI di temperatura assoluta è il ______.', 'kelvin', 'K.', ['K']),
        mc('fis-5', 'Il secondo principio implica che:', ['Non tutto il calore si converte in lavoro in un ciclo', 'L’energia non si conserva', 'P = F/A è falso', 'I gas non esistono'], 0, 'Limiti delle macchine termiche.'),
        mc('fis-5', 'In isocora, il lavoro del gas (espansione) è tipicamente:', ['Zero (ΔV=0)', 'Massimo possibile', 'Uguale a Q sempre', 'Negativo infinito'], 0, 'W = PΔV ≈ 0.'),
        mc('fis-5', 'L’entropia di un sistema isolato in processi irreversibili:', ['Non diminuisce', 'Diminuisce sempre', 'È una forza', 'È un virus'], 0, 'ΔS ≥ 0.'),
        mc('fis-5', 'Irraggiamento trasferisce energia tramite:', ['Onde elettromagnetiche', 'Solo conduzione obbligatoria', 'Solo suono', 'Solo osmosi'], 0, 'Anche nel vuoto.'),
        fill('fis-5', 'Il calore specifico c compare in Q = m c ______.', 'ΔT', 'Variazione di temperatura.', ['dT', 'delta T', 'DT']),
        mc('fis-5', 'Una macchina di Carnot è:', ['Il limite ideale di rendimento tra due temperature', 'Una pompa ionica', 'Un enzima', 'Un vettore'], 0, 'Ciclo reversibile tra Th e Tc.'),
      ],
      {
        figure: [
          {
            id: 'fis-5-pv',
            kind: 'svg',
            caption: 'Isoterma di Boyle sul piano P–V',
            alt: 'Curva P-V',
          },
          {
            id: 'fis-5-carnot',
            kind: 'svg',
            caption: 'Ciclo di Carnot sul piano P–V',
            alt: 'Ciclo Carnot',
          },
          {
            id: 'fis-5-thermos',
            kind: 'sketch',
            caption: 'Quaderno: Q, W e energia interna U',
            alt: 'Sketch thermos e pistone',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-6',
      [
        {
          title: 'Coulomb e campo elettrico',
          body: `Cariche elettriche: omonime si respingono, opposte si attraggono. Coulomb: F ∝ q₁q₂/r² (nel vuoto, con costante 1/(4πε₀)). Il campo elettrico E è la forza per unità di carica di prova: F = qE; le linee di campo escono dalle cariche positive ed entrano in quelle negative. In campo uniforme una carica accelera lungo (o contro) il campo secondo il segno. Unità SI di carica: coulomb (C). In biologia, potenziali di membrana e flussi ionici vivono nello stesso linguaggio di campo e forza su cariche; all’esame di fisica conta soprattutto la dipendenza 1/r², il verso delle linee e il legame F = qE. Attenzione: E esiste anche in assenza di una carica di prova — è una proprietà dello spazio intorno alle sorgenti.`,
          formule: ['F ∝ q₁q₂ / r²', 'F = qE', 'E = F/q (carica di prova)'],
          attenzione: 'Le linee di E escono dal + e entrano nel −. Cariche uguali → repulsione.',
          approfondisci: [
            'Se vuoi capire anche il significato operativo di campo come forza per unità di carica.',
            'Se vuoi capire anche perché F cala con il quadrato della distanza.',
            'Se vuoi capire anche il verso dell’accelerazione di + e − in un campo uniforme.',
          ],
        },
        {
          title: 'Potenziale e corrente (Ohm, Joule)',
          body: `Il potenziale V è legato all’energia potenziale elettrica per unità di carica; la differenza di potenziale (tensione) fa muovere le cariche nei circuiti. In corrente continua, Ohm: V = IR. La resistività dipende dal materiale e dalla temperatura; la geometria del filo entra in R = ρL/A. Serie: le resistenze si sommano; parallelo: 1/Req = Σ 1/Rᵢ (due R uguali → R/2). Effetto Joule: potenza dissipata P = I²R (riscaldamento di fili e resistenze). Unità di resistenza: ohm (Ω). Il circuito elementare generatore–resistenza è lo schema base: tensione, corrente e dissipazione termica. In elettrofisiologia “corrente” e “resistenza” tornano come metafore quantitative dei canali; in fisica d’esame restano V, I, R e Joule.`,
          formule: ['V = IR', 'P = I²R', 'Req,serie = R₁+R₂', 'due R in parallelo → R/2'],
          esempio: 'Due resistenze uguali in parallelo equivalgono a R/2. Un filo percorso da I si scalda (Joule).',
          figureIds: ['fis-6-circuito'],
          attenzione:
            'Serie: stessa I, tensioni si sommano. Parallelo: stessa V, correnti si sommano. Nei quiz “due resistenze”: controlla sempre se sono in serie o in parallelo prima di calcolare Req.',
          approfondisci: [
            'Se vuoi capire anche la differenza tra resistenza e resistività.',
            'Se vuoi capire anche perché in serie scorre la stessa I e in parallelo si divide.',
            'Se vuoi capire anche le forme equivalenti della potenza: P = VI = V²/R = I²R.',
            'Se vuoi capire anche lo schema del circuito elementare V–R.',
            'Analogia idraulica (utile in simulazioni): ΔP ~ V, portata ~ I, resistenza idraulica ~ R.',
          ],
        },
        {
          title: 'Condensatori',
          body: `Capacità C = Q/V: misura quanta carica si accumula a una data differenza di potenziale. Condensatore piano: C cresce con l’area delle armature e diminuisce con la distanza; un dielettrico aumenta tipicamente C (fattore κ). Energia immagazzinata U = ½CV² (o ½QV). In serie/parallelo le regole sono duali rispetto alle resistenze: in parallelo le C si sommano. I dielettrici si polarizzano; i conduttori schermano e redistribuiscono carica (induzione elettrostatica). In defibrillatori e circuiti di filtro i condensatori accumulano e rilasciano energia elettrica: stesso C = Q/V, scale diverse. Non confondere capacità elettrica con “capacità termica”.`,
          formule: ['C = Q/V', 'U = ½ C V²', 'C = κ ε₀ A/d'],
          attenzione: 'Dielettrico → C tipicamente ↑, non “annulla Q” per definizione.',
          approfondisci: [
            'Se vuoi capire anche perché aumentare A o diminuire d alza C nel condensatore piano.',
            'Se vuoi capire anche il ruolo del dielettrico (polarizzazione, κ).',
            'Se vuoi capire anche le regole serie/parallelo duali rispetto alle resistenze.',
            'Se vuoi capire anche dove va a finire l’energia ½CV² quando si scarica.',
          ],
        },
        {
          title: 'Campo magnetico e Faraday-Lenz',
          body: `Correnti elettriche generano campo magnetico B (Oersted). Forza di Lorentz su una carica: F = qvB senθ, massima se v ⊥ B; se v ∥ B la forza magnetica è nulla. In B uniforme, v ⊥ B → moto circolare (la forza fornisce l’accelerazione centripeta). Faraday-Neumann: la fem indotta è proporzionale a −dΦ_B/dt (variazione del flusso magnetico attraverso il circuito). Lenz: la corrente indotta si oppone alla variazione di flusso (il segno meno). Non confondere fem indotta con “solo Q/t” o con ρgh: qui conta quanto velocemente cambia il flusso. Trasformatori, induzione e molte sonde magnetiche poggiano su queste idee; all’esame bastano verso, senθ e il ruolo di dΦ/dt.`,
          formule: ['F = q v B senθ', 'ε ∝ −dΦ_B/dt'],
          esempio: 'v parallela a B → forza magnetica nulla su carica (sen 0° = 0). Avvicinare un magnete a una spira può indurre corrente (Lenz).',
          approfondisci: [
            'Se vuoi capire anche perché F è massima per v ⊥ B e nulla per v ∥ B.',
            'Se vuoi capire anche il flusso magnetico Φ_B e perché conta dΦ/dt.',
            'Se vuoi capire anche il significato del segno meno di Lenz (opposizione alla variazione).',
            'Se vuoi capire anche il moto circolare di una carica in B uniforme.',
          ],
        },
      ],
      {
        analogia:
          'Cariche uguali sono come due calamite dello stesso polo che si respingono; opposte si attraggono. Il potenziale è l’“altezza elettrica”: le cariche positive “scendono” verso potenziale più basso, come biglie su un pendio. Un condensatore è un piccolo serbatoio di carica tra due piastre. Avvicinare una calamita a una spira può far nascere corrente: la natura “non gradisce” il cambiamento improvviso di campo (Lenz).',
        concetti: [
          {
            titolo: 'Campo e Coulomb',
            testo:
              'Ogni carica crea intorno a sé un campo: un’altra carica sente una forza. Più sei lontani, più la forza cala con il quadrato della distanza.',
          },
          {
            titolo: 'Circuiti e Joule',
            testo:
              'La resistenza ostacola il flusso di carica. In serie le resistenze si aggiungono; in parallelo ci sono più strade. La corrente che passa scalda il filo (I²R).',
          },
          {
            titolo: 'Condensatori',
            testo:
              'Conservano carica separata e energia elettrica. Un materiale isolante tra le armature (dielettrico) di solito permette di conservare più carica a parità di tensione.',
          },
          {
            titolo: 'Magnetismo indotto',
            testo:
              'Un campo magnetico che cambia “abbraccia” un circuito e può generare corrente. La corrente indotta cerca di contrastare quel cambiamento (Lenz).',
          },
        ],
      },
      [
        mc('fis-6', 'La legge di Coulomb: F ∝', ['q1 q2 / r²', 'q1 + q2', 'r² solo', 'm1 m2'], 0, 'Forza elettrostatica.'),
        mc('fis-6', 'Due resistenze uguali R in parallelo equivalgono a:', ['2R', 'R/2', 'R', '0'], 1, '1/Req = 1/R + 1/R.'),
        fill('fis-6', 'L’unità SI di resistenza è l’______.', 'ohm', 'Ω.', ['Ω', 'Ohm']),
        mc('fis-6', 'La legge di Lenz dice che la corrente indotta:', ['Si oppone alla variazione di flusso', 'Aumenta sempre il flusso', 'È indipendente dal flusso', 'È solo termica'], 0, 'Segno della fem.'),
        mc('fis-6', 'L’effetto Joule: potenza dissipata =', ['I²R', 'I/R', 'QV', 'mgh'], 0, 'Riscaldamento.'),
      ],
      [
        mc('fis-6', 'Il campo elettrico di una carica puntiforme punta:', ['Via dalla carica se positiva', 'Sempre verso nord', 'Solo in cerchio', 'Solo verso il centro della Terra'], 0, 'Linee uscenti da +.'),
        fill('fis-6', 'La capacità C = Q / ______.', 'V', 'Carica su potenziale.', ['v', 'ΔV', 'differenza di potenziale']),
        mc('fis-6', 'La forza di Lorentz su carica in B è massima quando v è:', ['Parallela a B', 'Perpendicolare a B', 'Nulla', 'Casuale senza regola'], 1, 'F = q v B senθ.'),
        mc('fis-6', 'Un dielettrico in un condensatore tipicamente:', ['Aumenta la capacità', 'Annulla sempre Q', 'Elimina V obbligatoriamente a zero', 'Crea DNA'], 0, 'C = κ ε0 A/d.'),
        mc('fis-6', 'Resistenze in serie:', ['Si sommano', 'Si moltiplicano sempre', 'Si annullano', 'Diventano capacità'], 0, 'Req = R1+R2+…'),
        mc('fis-6', 'Faraday: fem ∝', ['−dΦ_B / dt', 'Solo Q/t', 'Solo m a', 'Solo ρ g h'], 0, 'Variazione di flusso magnetico.'),
        fill('fis-6', 'L’unità SI di carica è il ______.', 'coulomb', 'C.', ['C', 'Coulomb']),
        mc('fis-6', 'In un campo magnetico uniforme, una carica con v ⊥ B descrive tipicamente:', ['Moto circolare', 'Moto rettilineo uniforme senza forza', 'Riposo assoluto', 'Solo oscillazioni sonore'], 0, 'Forza centripeta magnetica.'),
      ],
      {
        figure: [
          {
            id: 'fis-6-circuito',
            kind: 'svg',
            caption: 'Circuito elementare V, R e corrente',
            alt: 'Circuito Ohm',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'fis-7',
      [
        {
          title: 'Onde elettromagnetiche e spettro',
          body: `Le onde elettromagnetiche trasportano energia anche nel vuoto: sono campi E e B oscillanti che si propagano alla velocità della luce c. Radio, microonde, infrarosso, visibile, ultravioletto, X e γ differiscono per frequenza/lunghezza d’onda e quindi per energia dei fotoni (E = hf). I raggi γ sono fotoni ad alta energia (non elettroni né nuclei di elio). Lo spettro ordina penetranza e interazioni con la materia: contesto essenziale per diagnostica per immagini e radioprotezione. UV e ionizzanti (X, γ) possono danneggiare DNA; IR è tipicamente termico. Distinguere la natura della radiazione (fotone vs particella carica) è il primo passo per non confondere α, β e γ nei quiz di radioattività collegati.`,
          formule: ['c = fλ', 'E_fotone = h f'],
          attenzione: 'γ = fotoni; α = nuclei di He; β − ≈ elettroni. Non scambiare le tre.',
          approfondisci: [
            'Se vuoi capire anche l’ordine dello spettro EM da radio a γ.',
            'Se vuoi capire anche perché fotoni più energetici ionizzano più facilmente.',
            'Se vuoi capire anche il ruolo di X e γ in imaging e radioprotezione.',
            'Se vuoi capire anche la differenza tra onda EM e onda meccanica (mezzo).',
          ],
        },
        {
          title: 'Ottica geometrica di base',
          body: `Riflessione e rifrazione: passando da un mezzo a un altro la luce può cambiare direzione secondo l’indice di rifrazione n (legge di Snell, cenni: n₁ senθ₁ = n₂ senθ₂). Lenti sottili in sintesi applicativa: fuoco, potenza (diottrie) e formazione di immagini reali/virtuali. Distinguere rifrazione (cambio di direzione tra mezzi) da riflessione speculare e da assorbimento. L’occhio è un sistema ottico con cornea e cristallino; miopia e ipermetropia si correggono con lenti di potenza opportuna. Microscopi e molti strumenti di laboratorio poggiano sugli stessi principî. All’esame basta il vocabolario geometrico corretto: non confondere rifrazione con Doppler né con assorbimento totale.`,
          esempio: 'La rifrazione non è Doppler né solo assorbimento totale. Un raggio che entra in acqua dall’aria tipicamente si avvicina alla normale.',
          approfondisci: [
            'Se vuoi capire anche l’idea di indice di rifrazione e Snell.',
            'Se vuoi capire anche fuoco e potenza di una lente sottile (diottrie).',
            'Se vuoi capire anche riflessione vs rifrazione vs assorbimento.',
            'Se vuoi capire anche il ponte qualitativo verso l’ottica dell’occhio.',
          ],
        },
        {
          title: 'Lambert-Beer',
          body: `In spettrofotometria clinica la legge di Lambert-Beer afferma, nelle condizioni di validità, che l’assorbanza A = ε ℓ c, dove ε è il coefficiente di estinzione molare, ℓ il cammino ottico e c la concentrazione. A è adimensionale (in pratica legata a −log₁₀ della trasmittanza). Se ℓ raddoppia, A raddoppia; se c raddoppia, A raddoppia (linearità). Fallisce tipicamente con aggregazioni, scattering elevati o concentrazioni troppo alte (uscita dalla linearità), cuvette sporche o λ fuori banda. È la base quantitativa di molte analisi di laboratorio (enzimi, metaboliti, emoglobina…). Capire i limiti evita di “fidarsi” di una retta di calibrazione fuori range.`,
          formule: ['A = ε ℓ c', 'A = −log₁₀(T) (schema)'],
          attenzione: 'Validità a diluizioni/bande lineari; non è una legge “universale” fuori range.',
          approfondisci: [
            'Se vuoi capire anche il ruolo di ε, ℓ e c uno per uno.',
            'Se vuoi capire anche perché aggregati e scattering rompono la linearità.',
            'Se vuoi capire anche il legame tra assorbanza e trasmittanza.',
            'Se vuoi capire anche a cosa serve la retta di calibrazione in laboratorio.',
          ],
        },
        {
          title: 'Radioattività, decadimento ed emivita',
          body: `I decadimenti radioattivi principali: α (emissione di un nucleo di elio, poco penetrante), β (es. β−: elettrone; più penetrante di α), γ (fotoni ad alta energia, molto penetranti). Differiscono per natura e potere penetrante — e quindi per schermatura (foglio per α, materiali densi per γ). Attività in becquerel (Bq: decadimenti al secondo). Legge esponenziale N = N₀ e−λt; l’emivita T₁/₂ è il tempo in cui attività/quantità si dimezza. Dopo n emivite resta circa (1/2)ⁿ: dopo 2 emivite ≈ 1/4, dopo 3 ≈ 1/8. Applicazioni diagnostiche/terapeutiche (traccianti, radioterapia) usano nuclidi con T₁/₂ adatti allo scopo. Il grafico N(t) è una curva esponenziale decrescente: riconoscerla è competenze d’esame.`,
          formule: ['N = N₀ e−λt', 'dopo n emivite ≈ (1/2)ⁿ', 'Bq = s⁻¹ (attività)'],
          esempio: 'Dopo 2 emivite → circa 1/4 della quantità iniziale. α ferma da un foglio; γ richiede schermi spessi.',
          figureIds: ['fis-7-decadimento'],
          approfondisci: [
            'Se vuoi capire anche la natura di α, β e γ e il potere penetrante relativo.',
            'Se vuoi capire anche perché il decadimento è esponenziale e non lineare.',
            'Se vuoi capire anche cosa misura il becquerel.',
            'Se vuoi capire anche come si legge il grafico N(t) a 1, 2, 3 emivite.',
            'Se vuoi capire anche criteri qualitativi di scelta del nuclide in diagnostica.',
          ],
        },
      ],
      {
        analogia:
          'Lo spettro EM è come una tastiera di “vibrazioni luminose”: alcune le vedi, altre no (radio, X, γ). Uno spettrofotometro è come far passare una torcia colorata attraverso un succo: più il succo è denso (o più lunga è la vaschetta), più luce viene assorbita (Lambert-Beer). La radioattività è un dado che a ogni istante può “cadere”: metà dei dadi tipicamente è caduta dopo un’emivita.',
        concetti: [
          {
            titolo: 'Spettro e ottica',
            testo:
              'Luce e altre onde EM sono la stessa famiglia a energie diverse. Cambiare mezzo piega i raggi (rifrazione); gli specchi li rimandano indietro (riflessione).',
          },
          {
            titolo: 'Lambert-Beer',
            testo:
              'Assorbanza ≈ quanto il campione “mangia” luce a una certa lunghezza d’onda. Dipende da quanto è concentrato e da quanto è lungo il percorso nella cuvetta.',
          },
          {
            titolo: 'Tipi di decadimento',
            testo:
              'Alfa: pezzo pesante (elio). Beta meno: elettrone. Gamma: lampo di luce ad altissima energia. Penetrano in modo molto diverso.',
          },
          {
            titolo: 'Emivita',
            testo:
              'Non è “tutto sparisce a un orario fisso”: è il tempo tipico in cui resta metà. Due emivite → circa un quarto, e così via in modo esponenziale.',
          },
        ],
      },
      [
        mc('fis-7', 'Lambert-Beer collega assorbanza a:', ['Concentrazione del campione', 'Solo alla massa planetaria', 'Solo al suono', 'Solo al pH senza luce'], 0, 'A ∝ c (nelle condizioni di validità).'),
        mc('fis-7', 'L’emivita è il tempo in cui:', ['L’attività si dimezza', 'La massa raddoppia sempre', 'P diventa zero', 'f diventa zero'], 0, 'T1/2.'),
        fill('fis-7', 'Il decadimento che emette un nucleo di elio è di tipo ______.', 'alfa', 'α.', ['α', 'alpha', 'a']),
        mc('fis-7', 'I raggi γ sono tipicamente:', ['Fotoni ad alta energia', 'Elettroni', 'Nuclei di elio', 'Neutroni lenti obbligati'], 0, 'Radiazione elettromagnetica.'),
        mc('fis-7', 'La legge del decadimento è tipicamente:', ['Esponenziale', 'Lineare crescente', 'Parabolica di moto', 'Costante senza tempo'], 0, 'N = N0 e−λt.'),
      ],
      [
        mc('fis-7', 'In spettrofotometria, se il cammino ottico raddoppia, A (Lambert-Beer):', ['Si dimezza', 'Raddoppia', 'Resta uguale', 'Diventa zero'], 1, 'A ∝ ℓ.'),
        fill('fis-7', 'β− corrisponde tipicamente all’emissione di un ______.', 'elettrone', 'Decadimento beta meno.', ['e-', 'e−', 'elettroni']),
        mc('fis-7', 'L’attività radioattiva si misura in:', ['Becquerel (Bq)', 'Newton', 'Ohm', 'Pascal'], 0, 'Decadimenti al secondo.'),
        mc('fis-7', 'La rifrazione è:', ['Cambio di direzione passando di mezzo', 'Solo riflessione speculare', 'Solo assorbimento totale', 'Solo Doppler'], 0, 'Indice di rifrazione.'),
        mc('fis-7', 'Dopo 2 emivite, la quantità radioattiva residua è circa:', ['1/2', '1/4', '1/8', 'Uguale'], 1, '(1/2)².'),
        mc('fis-7', 'Lambert-Beer fallisce tipicamente se:', ['Ci sono aggregazioni / scattering elevati / concentrazioni troppo alte', 'Il campione è diluito e ideale', 'La cuvetta è pulita', 'λ è nella banda lineare'], 0, 'Limiti di linearità.'),
        fill('fis-7', 'L’assorbanza A = ε ℓ ______.', 'c', 'Concentrazione.', ['C']),
        mc('fis-7', 'α, β, γ differiscono per:', ['Natura della radiazione e potere penetrante', 'Solo il colore visibile obbligato', 'Solo la massa del paziente', 'Solo il CFU'], 0, 'α poco penetranti, γ molto.'),
      ],
      {
        figure: [
          {
            id: 'fis-7-decadimento',
            kind: 'svg',
            caption: 'Decadimento esponenziale e tempi di emivita',
            alt: 'Curva N(t)',
          },
        ],
      },
    ),
  )

  return out
}
