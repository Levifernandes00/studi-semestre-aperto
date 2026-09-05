import type { UnitaContent } from '../../types'
import { fill, mc, resetQCounter } from '../quizHelpers'
import { pack } from './pack'

export function buildBiologia(): UnitaContent[] {
  const out: UnitaContent[] = []

  resetQCounter()
  out.push(
    pack(
      'bio-1',
      [
        {
          title: 'Virus e cicli litico/lisogenico/retrovirus',
          body: `I virus sono agenti acellulari obbligati: non hanno metabolismo proprio e dipendono dalla macchina biosintetica dell’ospite. Il genoma può essere DNA o RNA, a singolo o doppio filamento, racchiuso in un capside proteico; molti virus animali aggiungono un envelope lipidico derivato dalla membrana dell’ospite, con glicoproteine di adesione ai recettori cellulari. Nei batteriofagi si distinguono il ciclo litico, con ingresso, replicazione massiva, assemblaggio e lisi della cellula, e il ciclo lisogenico, in cui il genoma virale si integra come provirus (o prophage) e si replica passivamente a ogni divisione dell’ospite fino a un’induzione (stress, UV) che lo riporta al litico. Nei virus animali l’ingresso avviene per fusione di membrane o endocitosi mediata da recettori. I retrovirus (es. HIV) usano la trascrittasi inversa per convertire RNA genomico in DNA a doppio filamento, poi lo integrano nel genoma dell’ospite: da lì si trascrivono mRNA e genomi per nuovi virioni. Capire litico vs lisogenico e il ruolo dell’integrazione è essenziale per immunologia, terapia antiretrovirale e vettori genici.`,
          esempio: 'HIV: RNA → DNA via trascrittasi inversa → integrazione → produzione di virioni.',
          attenzione: 'Non confondere provirus (integrazione lisogenica) con capside: il provirus è DNA virale nel genoma ospite.',
          approfondisci: [
            'Il ciclo litico massimizza la produzione di virioni a breve termine; il lisogenico “nasconde” il virus nella discendenza dell’ospite.',
            'L’envelope virale deriva dalla membrana dell’ospite: per questo i detergenti e l’alcool possono inattivare molti virus avvolti.',
            'La trascrittasi inversa è un bersaglio farmacologico classico (NRTI/NNRTI) nella terapia anti-HIV.',
            'Vettori lentivirali sfruttano l’integrazione per trasferire geni terapeutici in cellule quiescenti.',
          ],
          figureIds: ['bio-1-virus'],
        },
        {
          title: 'Cellula procariotica e trasferimento genico orizzontale',
          body: `La cellula procariotica (Batteri e Archaea) manca di nucleo e di organelli delimitati da membrane interne tipici degli eucarioti. Ha membrana plasmatica, spesso parete di peptidoglicano (spessa nei Gram+, sottile nei Gram− con membrana esterna e LPS), a volte capsula polisaccaridica, pili e flagelli. Il genoma è tipicamente un cromosoma circolare; i plasmidi portano geni accessori (resistenza, virulenza, metabolismo). Il trasferimento genico orizzontale spiega la diffusione rapida di resistenze antibiotiche e di tratti patogeni: trasformazione (uptake di DNA nudo da cellule competenti), coniugazione (passaggio di plasmidi via pili sessuali / tubo di coniugazione) e trasduzione (DNA veicolato da un batteriofago, generalizzata o specializzata). Questi meccanismi non richiedono riproduzione sessuale e aggirano la sola discendenza verticale. In clinica, conoscere Gram e TGO aiuta a interpretare antibiogrammi, focolai ospedalieri e l’uso di vaccini coniugati o terapie che mirano a parete e membrane. Sul piano morfologico, la colorazione di Gram resta un primo triage: influenza scelta empirica di antibiotici e interpretazione di LPS come endotossina. Capire TGO significa anche capire perché le resistenze viaggiano più velocemente della sola discendenza clonale in ospedale e in comunità.`,
          esempio: 'Un plasmide con geni di resistenza agli antibiotici può passare per coniugazione tra specie diverse.',
          attenzione: 'Gram+/Gram− distinguono la parete, non la presenza di nucleo o mitocondri.',
          approfondisci: [
            'I plasmidi R e i trasposoni mobili accelerano lo “shopping” di resistenze tra batteri diversi.',
            'La trasduzione specializzata può portare geni di tossine (es. difterite, botulino) da un ospite all’altro.',
            'Archaea condividono aspetti molecolari con gli eucarioti ma restano procarioti per organizzazione cellulare.',
            'La competenza naturale (trasformazione) è regolata: non tutti i batteri assorbono DNA in ogni momento.',
          ],
        },
        {
          title: 'Cellula eucariotica e genoma',
          body: `La cellula eucariotica compartimentalizza le funzioni: nucleo, reticolo endoplasmatico, Golgi, mitocondri, perossisomi, lisosomi e, nelle piante, cloroplasti. La membrana plasmatica (doppio strato fosfolipidico con proteine e canali) delimita il citosol e media scambi e segnali. Il genoma nucleare è organizzato in cromosomi lineari con centromero (attacco del fuso mitotico) e telomeri (protezione delle estremità). I mitocondri hanno un genoma proprio, circolare, di origine endosimbiontica batterica, ereditato tipicamente per via materna nell’uomo e che codifica poche proteine della catena respiratoria; la maggior parte delle proteine mitocondriali è invece nucleare e importata. A differenza dei procarioti, gli eucarioti hanno geni spesso interrotti da introni e un ciclo cellulare con fasi G1–S–G2–M distinte. Compartimenti e genomi multipli spiegano malattie mitocondriali, targeting di farmaci e perché la stessa cellula può avere destinazioni proteiche molto diverse. La compartimentazione consente gradienti ionici, pH acidi nei lisosomi e un ambiente nucleare separato per maturare l’RNA: senza queste “stanze” la regolazione genica e il trafficking proteico tipici degli eucarioti non sarebbero possibili. È il ponte concettuale verso membrana, organelli e ciclo cellulare delle unità successive.`,
          esempio: 'Teoria endosimbiontica: mitocondri da batteri aerobi inglobati da una cellula ancestrale.',
          attenzione: 'Cromosomi eucariotici = lineari; cromosoma batterico tipico = circolare (con eccezioni).',
          approfondisci: [
            'Il poro nucleare seleziona import/export di proteine e RNA: non è un “buco libero”.',
            'mtDNA umano: ~16 kb, codice genetico leggermente diverso, alta densità genica.',
            'Il RE rugoso e il Golgi formano la via secretoria per proteine di membrana e secrete.',
            'Piante e alghe: anche i cloroplasti hanno genoma e origine endosimbiontica.',
          ],
          figureIds: ['bio-1-membrane'],
        },
        {
          title: 'Cromatina e genoma umano',
          body: `Il DNA nucleare è impacchettato in cromatina: circa 147 bp avvolti intorno a un ottamero di istoni (H2A, H2B, H3, H4), con H1 che stabilizza la fibra di ordine superiore. Eucromatina (accessibile, spesso trascritta) ed eterocromatina (compatta, silente) riflettono stati funzionali e dipendono da modificazioni istoniche e metilazione del DNA. Il genoma umano (~3×10⁹ bp) contiene geni codificanti (una frazione minoritaria), famiglie geniche, sequenze regolative e una grande quota di DNA non codificante: ripetizioni in tandem (mini- e microsatelliti/STR) e intersperse (LINE, SINE), più retrovirus endogeni ed elementi mobili. Queste ripetizioni sono utili in genetica forense e possono causare instabilità genomica se si espandono (malattie da triplette). Capire nucleosoma, eucromatina/eterocromatina e composizione del genoma collega epigenetica, cancro, diagnostica e limiti dell’idea “un gene = una malattia”. In pratica d’esame conviene collegare nucleosoma, accessibilità e ripetizioni: domande su STR, LINE/SINE e differenza eucromatina/eterocromatina tornano spesso. Il messaggio chiave è che organizzazione 3D e stato epigenetico contano quanto la sola sequenza primaria del DNA.`,
          formule: ['Nucleosoma ≈ 147 bp DNA + ottamero istonico', 'Genoma umano ≈ 3 × 10⁹ paia di basi'],
          esempio: 'I microsatelliti (STR) sono usati nei profili DNA forensi.',
          attenzione: 'LINE/SINE sono ripetizioni intersperse, non organelli né enzimi di riparazione.',
          approfondisci: [
            'L’acetilazione istonica favorisce spesso stati aperti; certe metilazioni H3 reprimono o attivano a seconda del residuo.',
            'Gli STR forensi sfruttano alta polimorfia individuale a loci standardizzati.',
            'Espansioni di triplette (es. CAG) spiegano malattie neurodegenerative ereditarie.',
            'Solo ~1–2% del genoma umano codifica proteine; il resto include regolazione e ripetizioni.',
          ],
        },
      ],
      {
        analogia:
          'Immagina la vita come una scuola enorme. I virus sono come appunti fotocopiati che non hanno una classe propria: entrano in un’aula (la cellula) e usano i banchi e le lavagne dell’ospite per fare tante copie. A volte distruggono l’aula (ciclo litico), a volte si nascondono nel registro della scuola (ciclo lisogenico) e si copiano ogni volta che la scuola fa lezioni.',
        concetti: [
          {
            titolo: 'Virus e retrovirus',
            testo:
              'Un virus ha un pezzo di istruzioni (DNA o RNA) chiuso in una “confezione” di proteine. I retrovirus, come HIV, fanno una cosa speciale: trasformano il loro RNA in DNA e lo attaccano al DNA della cellula, come se incollassero una pagina nel libro sbagliato.',
          },
          {
            titolo: 'Batteri che si scambiano pezzi di DNA',
            testo:
              'I batteri non hanno nucleo. Possono passare pezzi di DNA tra di loro senza “fare figli”: lo raccolgono dall’ambiente, lo mandano con un tubicino, o lo fanno portare da un virus. Così una resistenza agli antibiotici può saltare da un batterio all’altro.',
          },
          {
            titolo: 'Cellule con “stanze” e DNA avvolto',
            testo:
              'Le nostre cellule hanno tante stanze (organelli). Il DNA è lungo come un filo enorme: per stare nel nucleo si avvolge intorno a bobine di proteine (istoni), come filo di lana sugli aspi. Nel genoma umano ci sono anche tante ripetizioni, come refrain di una canzone ripetuti.',
          },
        ],
      },
      [
        mc('bio-1', 'Quale ciclo virale prevede l’integrazione del genoma virale in quello batterico senza lisi immediata?', ['Litico', 'Lisogenico', 'Esocitotico', 'Apoptotico'], 1, 'Nel ciclo lisogenico il fago diventa provirus e si replica con l’ospite.'),
        mc('bio-1', 'La colorazione di Gram distingue batteri in base a:', ['La presenza di mitocondri', 'La struttura della parete cellulare', 'Il tipo di ribosomi', 'La presenza di nucleo'], 1, 'Gram+ hanno parete spessa di peptidoglicano; Gram− hanno membrana esterna.'),
        mc('bio-1', 'Quale meccanismo di trasferimento genico richiede un virus batterico?', ['Trasformazione', 'Coniugazione', 'Trasduzione', 'Meiosi'], 2, 'La trasduzione usa un batteriofago come vettore di DNA.'),
        fill('bio-1', 'I cromosomi eucariotici sono protetti alle estremità dai ______.', 'telomeri', 'I telomeri stabilizzano le estremità lineari del DNA.'),
        mc('bio-1', 'LINE e SINE sono esempi di:', ['Enzimi di riparazione', 'Sequenze ripetute intersperse', 'Organelli', 'Ormoni'], 1, 'Sono elementi ripetuti sparsi nel genoma, spesso di origine retrottrasposonica.'),
      ],
      [
        mc('bio-1', 'Un retrovirus deve necessariamente possedere:', ['DNA polimerasi DNA-dipendente', 'Trascrittasi inversa', 'Peptidoglicano', 'Cloroplasti'], 1, 'Converte RNA genomico in DNA.'),
        mc('bio-1', 'Il nucleosoma contiene tipicamente:', ['DNA + RNA polimerasi', 'DNA avvolto intorno a un ottamero di istoni', 'Solo istoni H1', 'Ribosomi'], 1, 'Circa 147 bp di DNA intorno all’ottamero istonico.'),
        fill('bio-1', 'Il passaggio di DNA nudo dall’ambiente a un batterio competente si chiama ______.', 'trasformazione', 'La trasformazione è l’uptake di DNA libero.'),
        mc('bio-1', 'I mitocondri derivano evolutivamente da:', ['Virus', 'Batteri endosimbionti', 'Perossisomi', 'Lisosomi'], 1, 'Teoria endosimbiontica.'),
        mc('bio-1', 'I microsatelliti sono:', ['Proteine del citoscheletro', 'Brevi sequenze ripetute in tandem', 'Tipi di virus', 'Recettori di membrana'], 1, 'Ripetizioni corte in tandem, usate anche in genetica forense.'),
        mc('bio-1', 'Nella coniugazione batterica il DNA passa tipicamente attraverso:', ['Flagelli', 'Pili sessuali / tubo di coniugazione', 'Porine mitocondriali', 'Giunzioni gap'], 1, 'Il plasmide F guida la coniugazione.'),
        fill('bio-1', 'I batteri con membrana esterna e poco peptidoglicano sono Gram ______.', 'negativi', 'Gram−: membrana esterna + sottile peptidoglicano.', ['negativo', '-']),
        mc('bio-1', 'Il caps ide virale è formato principalmente da:', ['Lipidi', 'Proteine', 'Peptidoglicano', 'Cellulosa'], 1, 'Subunità proteiche (capsomeri).'),
      ],
      {
        figure: [
          { id: 'bio-1-virus', kind: 'sketch', caption: 'Quaderno: cicli litico e lisogenico', alt: 'Sketch virus' },
          { id: 'bio-1-membrane', kind: 'svg', caption: 'Membrana: doppio strato e canale', alt: 'Membrana cellulare' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-2',
      [
        {
          title: 'Replicazione del DNA',
          body: `La replicazione è semiconservativa: ogni elica figlia conserva un filamento parentale e ne sintetizza uno nuovo. Parte da origini di replicazione; l’elicasi svolge la doppia elica, le proteine SSB stabilizzano i singoli filamenti, la topoisomerasi riduce i superavvolgimenti e la primasi pone un primer di RNA. Le DNA polimerasi allungano esclusivamente in direzione 5′→3′ e molte hanno proofreading 3′→5′ esonucleasico che rimuove nucleotidi errati. Il filamento leading è continuo; il lagging è discontinuo, a frammenti di Okazaki uniti da DNA ligasi dopo rimozione dei primer e riempimento dei gap. Clamp (PCNA negli eucarioti) aumentano la processività. La fedeltà della replicazione è altissima, ma errori residui, lesionati da mutageni o non riparati, alimentano mutazioni e diversità. In fase S eucariotica molte origini partono in parallelo per duplicare genomi enormi in tempi ragionevoli; errori di timing o di checkpoint favoriscono instabilità genomica. A livello di ragionamento d’esame, ogni enzima della forcella ha un “compito” distintivo: elicasi apre, primasi inizia, polimerasi allunga e corregge, ligasi chiude. Confondere questi ruoli — o attribuire proofreading all’RNA Pol — è tra gli errori più frequenti.`,
          formule: ['Sintesi DNA: sempre 5′ → 3′', 'Semiconservativa: 1 filamento vecchio + 1 nuovo per elica'],
          esempio: 'In S phase eucariotica molte origini partono in parallelo per duplicare genomi enormi.',
          attenzione: 'Proofreading è tipico delle DNA polimerasi, non dell’RNA Pol II.',
          approfondisci: [
            'Leading continuo vs lagging a Okazaki: conseguenza della polarità antiparallela e della sintesi solo 5′→3′.',
            'La ligasi chiude i nick dopo rimozione dei primer RNA: senza ligasi restano frammenti.',
            'Il proofreading riduce drasticamente il tasso di errore; i sistemi di mismatch repair lo abbassano ancora.',
            'Inibitori della topoisomerasi (chemioterapici) bloccano la progressione della forcella.',
          ],
          figureIds: ['bio-2-replicazione'],
        },
        {
          title: 'Telomeri e senescenza',
          body: `I cromosomi lineari pongono il “problema della replicazione terminale”: sul lagging, dopo rimozione dell’ultimo primer, resta un gap che le DNA polimerasi convenzionali non possono colmare senza un primer a monte. I telomeri (ripetizioni TTAGGG nell’uomo) e le proteine shelterin proteggono le estremità dal riconoscimento come rotture a doppio filamento e dall’attivazione errata di riparazione. La telomerasi, ribonucleoproteina con attività di trascrittasi inversa, estende il filamento G-ricco usando un RNA template interno, permettendo poi il completamento del filamento complementare. Nella maggior parte delle cellule somatiche umane la telomerasi è bassa o assente: i telomeri si accorciano a ogni divisione e, sotto una soglia critica, attivano checkpoint di danno al DNA che inducono senescenza replicativa o apoptosi. Cellule staminali, germinali e molte tumorali riattivano la telomerasi (o ALT) per mantenere la proliferazione. Clinicamente i telomeri collegano invecchiamento cellulare, fibrosi e oncologia. Il collegamento biomedico è diretto: tessuti ad alto turnover soffrono di più quando i telomeri sono geneticamente corti, mentre i tumori devono risolvere il problema dell’accorciamento per diventare immortali. Senescenza e telomerasi sono quindi due facce della stessa biologia delle estremità cromosomiche.`,
          esempio: 'Senescenza: telomeri corti → segnali di danno al DNA → arresto del ciclo.',
          attenzione: 'Telomerasi allunga i telomeri; non “taglia” il DNA né sostituisce la DNA ligasi.',
          approfondisci: [
            'Shelterin (TRF1/2, POT1…) maschera i telomeri e regola l’accesso della telomerasi.',
            'Sindromi da telomeri corti (es. discheratosi congenita) colpiscono tessuti ad alto turnover.',
            'Circa il 90% dei tumori riattiva la telomerasi; una minoranza usa ALT (ricombinazione).',
            'La senescenza non è solo “vecchiaia”: è un freno antitumorale che può però favorire infiammazione cronica.',
          ],
        },
        {
          title: 'Geni e regolazione',
          body: `Un gene è un’unità funzionale di informazione; l’espressione è regolata a più livelli per adattare il proteoma a tessuto, sviluppo e ambiente. Nei procarioti geni correlati spesso formano operoni trascritti in un unico mRNA policistronico (es. lac), con repressori e attivatori che rispondono a metaboliti. Negli eucarioti prevalgono geni monocistronici con promotore (TATA box e elementi core riconosciuti dai fattori generali) e sequenze cis distali: enhancer e silencer, legati da fattori di trascrizione tessuto-specifici, spesso via looping della cromatina. Il controllo può essere trascrizionale, post-trascrizionale (splicing, stabilità mRNA, miRNA), traduzionale e post-traduzionale (fosforilazione, ubiquitina). Così la stessa sequenza genomica produce profili di espressione diversi tra tessuti e fasi dello sviluppo. In patologia, mutazioni in elementi regolativi o fattori di trascrizione spiegano malattie senza alterare la sequenza codificante. Per lo studio, utile tenere una gerarchia mentale: sequenza cis → fattori di trascrizione → stato della cromatina → mRNA maturo → proteina. Cambiare un solo livello può bastare a spegnere o accendere un gene senza mutare l’ORF, concetto centrale in genetica regolativa.`,
          esempio: 'Operone lac: indotto da lattosio in assenza di glucosio preferito.',
          attenzione: 'Enhancer aumenta la trascrizione; silencer la riduce — entrambi agiscono in cis.',
          approfondisci: [
            'Operone lac: repressore LacI + CAP/cAMP (catabolite repression) coordinano l’induzione.',
            'Gli enhancer possono agire a grandi distanze grazie al looping del DNA sul promotore.',
            'miRNA e RNA binding proteins regolano stabilità e traduzione senza cambiare il DNA.',
            'Mutazioni in enhancer/promotori possono essere “regulatory disease” a fenotipo specifico di tessuto.',
          ],
        },
        {
          title: 'Epigenetica e cromatina',
          body: `L’epigenetica riguarda modifiche ereditabili (nelle divisioni mitotiche, e a volte tra generazioni) che modulano l’espressione senza alterare la sequenza del DNA. Metilazione del DNA (tipicamente CpG) e modificazioni istoniche (acetilazione, metilazione, fosforilazione, ubiquitinazione) cambiano l’accessibilità della cromatina: acetilazione favorisce spesso stati aperti; certe metilazioni istoniche possono reprimere o attivare a seconda del residuo (codice istonico). Complessi come Polycomb e Trithorax mantengono memorie di silenziamento o attivazione durante lo sviluppo. L’imprinting genomico è un caso particolare di espressione dipendente dall’origine parentale. In patologia, ipermetilazione di promotori di oncosoppressori o ipometilazione globale contribuiscono alla tumorigenesi; farmaci epigenetici (inibitori di DNMT o HDAC) mirano a questi stati. Distinguere epigenetica da mutazione evita confusione in genetica medica e oncologia molecolare. In oncologia molecolare i pattern di metilazione sono usati anche come biomarcatori (promotori silenziati, firme epigenomiche). Ricorda sempre: reversibilità relativa delle marche epigenetiche vs irreversibilità tipica di una mutazione della sequenza nucleotidica. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Isole CpG metilate nel promotore → silenziamento di un gene oncosoppressore in tumori.',
          attenzione: 'Epigenetica ≠ mutazione: la sequenza nucleotidica resta la stessa.',
          approfondisci: [
            'DNMT aggiungono metili al DNA; TET e demetilasi contribuiscono alla rimozione/ossidazione.',
            'Polycomb (PRC1/2) silenzia geni dello sviluppo; Trithorax tende a mantenerli attivi.',
            'Imprinting: es. IGF2/H19 — espressione monoallelica parentale-specifica.',
            'L’ambiente (dieta, stress, fumo) può influenzare pattern epigenetici rilevanti in epidemiologia.',
          ],
        },
      ],
      {
        analogia:
          'Copiare il DNA è come fotocopiare un libro lunghissimo a due facciate. Ogni nuova copia tiene una facciata vecchia e ne scrive una nuova (semiconservativa). Alle estremità del libro ci sono i “segnalibri” (telomeri): se si consumano troppo, la fotocopiatrice si ferma (senescenza). E non tutte le pagine del libro vengono lette allo stesso modo: alcuni segnalini dicono “leggi qui” e altri “salta questa parte”.',
        concetti: [
          {
            titolo: 'Due filamenti, due modi di scrivere',
            testo:
              'Un filamento si scrive tutto d’un fiato (leading). L’altro si scrive a pezzetti (Okazaki) perché la macchina scrive solo in una direzione. Poi i pezzetti vengono cuciti insieme. Se sbaglia una lettera, spesso la corregge subito (proofreading).',
          },
          {
            titolo: 'Telomeri come punte delle scarpe',
            testo:
              'I telomeri sono come i bordini di plastica dei lacci: impediscono che il DNA si sfilacci. La telomerasi li può allungare; in molte cellule del corpo invece si accorciano un po’ a ogni divisione, finché la cellula decide di non dividersi più.',
          },
          {
            titolo: 'Accendere e spegnere i geni',
            testo:
              'Non tutti i geni sono sempre accesi. Ci sono interruttori vicini (promotori) e lontani (enhancer/silencer). L’epigenetica è come mettere dei segnalini colorati sul libro: non cambi le parole, ma decidi quali pagine si leggono facilmente. Nei batteri tanti geni possono stare sullo stesso interruttore (operone).',
          },
        ],
      },
      [
        mc('bio-2', 'I frammenti di Okazaki appartengono al filamento:', ['Leading', 'Lagging', 'Entrambi in egual misura', 'Solo mitocondriale'], 1, 'Il lagging è sintetizzato in pezzi.'),
        mc('bio-2', 'L’attività di correzione degli errori (proofreading) è tipica di:', ['RNA polimerasi II', 'DNA polimerasi', 'Ribosomi', 'Lisosomi'], 1, 'Molte DNA polimerasi hanno attività 3′→5′ esonucleasica.'),
        fill('bio-2', 'L’enzima che allunga i telomeri è la ______.', 'telomerasi', 'La telomerasi è una ribonucleoproteina con attività di trascrittasi inversa.'),
        mc('bio-2', 'Un enhancer è:', ['Un organello', 'Un elemento regolativo in cis che aumenta la trascrizione', 'Un tipo di tRNA', 'Una pompa ionica'], 1, 'Può agire a distanza sul promotore.'),
        mc('bio-2', 'La metilazione del DNA è un meccanismo tipicamente:', ['Di splicing', 'Epigenetico', 'Di endocitosi', 'Di fosforilazione oxidativa'], 1, 'Modifica ereditabile senza cambiare la sequenza nucleotidica.'),
      ],
      [
        mc('bio-2', 'La replicazione semiconservativa produce:', ['Due eliche entrambe neosintetizzate', 'Due eliche ciascuna con un filamento parentale e uno nuovo', 'Solo RNA', 'Quattro cromatidi identici senza sintesi'], 1, 'Ogni elica figlia ha un filamento vecchio e uno nuovo.'),
        fill('bio-2', 'Il filamento sintetizzato in modo continuo si chiama ______.', 'leading', 'Leading strand / filamento continuo.', ['leading strand', 'filamento leading', 'filamento continuo']),
        mc('bio-2', 'La senescenza replicativa è collegata a:', ['Allungamento illimitato dei telomeri', 'Accorciamento dei telomeri', 'Assenza di istoni', 'Mancanza di mitocondri'], 1, 'Telomeri troppo corti attivano checkpoint di arresto.'),
        mc('bio-2', 'Negli eucarioti la TATA box è tipicamente parte del:', ['Ribosoma', 'Promotore', 'Centrosoma', 'Lisosoma'], 1, 'Elemento del core promoter riconosciuto dai fattori generali.'),
        mc('bio-2', 'Un silencer:', ['Attiva sempre la traduzione', 'Riduce la trascrizione di un gene', 'Taglia i telomeri', 'Forma vescicole'], 1, 'Elemento cis repressivo.'),
        mc('bio-2', 'L’elicasi nella replicazione:', ['Unisci frammenti di Okazaki', 'Svolge la doppia elica', 'Aggiunge capping', 'Degrada proteine'], 1, 'Apre i filamenti di DNA.'),
        fill('bio-2', 'Nei batteri, un gruppo di geni trascritti insieme da un unico promotore forma un ______.', 'operone', 'Esempio classico: operone lac.'),
        mc('bio-2', 'Le modificazioni degli istoni influenzano soprattutto:', ['La viscosità del sangue', 'Lo stato della cromatina e l’espressione genica', 'Il pH gastrico', 'La pressione osmotica'], 1, 'Acetilazione, metilazione ecc. cambiano l’accessibilità.'),
      ],
      {
        figure: [
          { id: 'bio-2-replicazione', kind: 'svg', caption: 'Forcella di replicazione', alt: 'Replicazione DNA' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-3',
      [
        {
          title: 'Trascrizione procarioti ed eucarioti',
          body: `La trascrizione copia un gene in RNA usando un filamento stampo. Nei procarioti una sola RNA polimerasi, con fattori sigma per riconoscere i promotori, sintetizza mRNA spesso policistronici; trascrizione e traduzione possono essere accoppiate nel citoplasma perché non c’è nucleo. Negli eucarioti esistono tre RNA polimerasi nucleari: Pol I (rRNA maggiori), Pol II (pre-mRNA e molti ncRNA), Pol III (tRNA, 5S, snRNA piccoli). Pol II richiede fattori generali sul promotore (TFIID/TBP e altri) e può essere regolata da enhancer e mediatori. Il trascritto primario eucariotico matura nel nucleo (capping, splicing, poliadenilazione) prima dell’export attraverso i pori. La direzione di sintesi è sempre 5′→3′, leggendo il stampo 3′→5′. Distinguere le polimerasi e il luogo della maturazione evita errori tipici d’esame e spiega perché antibiotici antibatterici non colpiscono allo stesso modo le RNA Pol eucariotiche. Confrontare procarioti ed eucarioti in una tabella mentale (una vs tre polimerasi; accoppiamento trascrizione-traduzione; presenza di splicing) risolve la maggior parte delle domande a risposta multipla su questo argomento. Il luogo della maturazione (nucleo) è il discriminante principale.`,
          esempio: 'Pol II → pre-mRNA; Pol I → rRNA 28S/18S; Pol III → tRNA.',
          attenzione: 'Nei procarioti non c’è splicing tipico degli eucarioti né nucleo separato.',
          approfondisci: [
            'Il fattore sigma riconosce sequenze −10/−35; dopo l’inizio spesso si stacca (promoter clearance).',
            'Il Mediator collega attivatori distali alla macchina di Pol II sul promotore.',
            'CTD di Pol II (ripetizioni CTD) coordina capping, splicing e terminazione via fosforilazioni.',
            'Alcuni antibiotici (rifampicina) inibiscono RNA Pol batterica, non quella umana.',
          ],
        },
        {
          title: 'Maturazione dell’RNA e regioni non tradotte',
          body: `Il pre-mRNA eucariotico riceve capping 5′ (7-metilguanosina), poliadenilazione 3′ (coda poli-A dopo clivaggio) e splicing degli introni catalizzato dallo spliceosoma (snRNA + proteine). Lo splicing alternativo genera isoforme proteiche da un unico gene, aumentando la diversità del proteoma. Le UTR 5′ e 3′ non sono tradotte ma regolano stabilità, localizzazione e efficienza traducibile; vi si legano proteine e miRNA. L’RNA interference e i miRNA reprimono o destabilizzano mRNA bersaglio, spesso nella 3′UTR. L’editing dell’RNA può cambiare basi del trascritto rispetto al DNA genomico (es. A→I). Questi passaggi spiegano perché il trascrittoma è più ricco del solo conteggio dei geni e perché mutazioni nelle splice site o nelle UTR possono essere patogene senza alterare la sequenza dell’ORF. Dal punto di vista quantitativo, splicing alternativo e regolazione via UTR spiegano come ~20.000 geni umani generino un proteoma molto più ampio. Mutazioni “sinonime” o deep-intronic possono comunque essere patogene se alterano splicing o siti di miRNA.`,
          formule: ['mRNA maturo: 5′-cap — 5′UTR — ORF — 3′UTR — poli-A'],
          esempio: 'miRNA che legano la 3′UTR e riducono traduzione o stabilità dell’mRNA.',
          attenzione: 'Le UTR non codificano proteina, ma non sono “inutili”.',
          approfondisci: [
            'Siti donatore/accettore e branch point definiscono i confini degli introni.',
            'Coda poli-A e proteine PABP influenzano emivita e inizio della traduzione.',
            'Splicing aberrante è causa frequente di malattie monogeniche e varianti tumorali.',
            'siRNA/miRNA usano Argonaute: silenziamento post-trascrizionale programmabile.',
          ],
        },
        {
          title: 'Traduzione e codice genetico',
          body: `La traduzione legge mRNA in proteina sui ribosomi (rRNA + proteine). Il codice genetico è a triplette (codon), quasi universale, degenerato/ridondante: più codon possono specificare lo stesso amminoacido. Start tipico AUG (Met); stop UAA, UAG, UGA reclutano fattori di rilascio invece di un tRNA. Gli aminoacil-tRNA sintetasi caricano i tRNA con l’amminoacido corretto; l’anticodon riconosce il codon (con wobble sulla terza base). Inizio, allungamento e terminazione coinvolgono fattori proteici specifici (eIF, EF, RF). Nei procarioti lo Shine–Dalgarno aiuta l’aggancio del 30S; negli eucarioti il capping e lo scanning dal 5′ (modello Kozak) sono centrali. Errori di lettura o codon prematuri di stop producono proteine troncate o aberranti; terapie di read-through e NMD (nonsense-mediated decay) sono temi clinici emergenti. In clinica, codon stop prematuri e frameshift convergono su proteine incomplete; la degenerazione spiega invece molte varianti silenti. Sapere che il codice è quasi ma non del tutto universale (mitocondri) evita risposte troppo assolute nei quiz.`,
          formule: ['1 codon = 3 nucleotidi → 1 amminoacido (o stop)', '64 codon → 20 aa + stop (degenerazione)'],
          esempio: 'Mutazione silente: cambia codon ma non l’amminoacido grazie alla degenerazione.',
          attenzione: 'Degenerato ≠ ambiguo: un codon specifica un solo aa (o stop), non il contrario.',
          approfondisci: [
            'Wobble: la terza base del codon può tollerare pairing non standard → meno tRNA necessari.',
            'Antibiotici (tetracicline, macrolidi) colpiscono il ribosoma batterico 70S.',
            'NMD degrada mRNA con stop prematuri: riduce proteine troncate tossiche.',
            'Codice mitocondriale umano ha piccole differenze (es. UGA = Trp).',
          ],
        },
        {
          title: 'Ripiegamento e degradazione delle proteine',
          body: `La sequenza primaria guida il folding verso una struttura nativa, ma in vivo chaperon (Hsp70, chaperonine tipo GroEL/Hsp60) assistono e prevengono aggregati tossici. Nel RE, calnexina e calreticulina controllano le glicoproteine prima dell’uscita verso il Golgi; proteine mal ripiegate possono essere ritraslocate e ubiquitinate (ERAD). Errori di ripiegamento possono aggregare (amiloidi, prioni) o attivare risposte di stress del RE (UPR). La qualità proteica passa anche dalla degradazione selettiva: catene di ubiquitina marcano proteine per il proteasoma 26S; i lisosomi degradano via autofagia e endocitosi. Regolare sintesi, folding e turnover mantiene l’omeostasi proteica (proteostasi), cruciale in neurodegenerazione, infezioni e cancro. Distinguere chaperon, proteasoma e lisosomi è un classico punto d’esame. Proteostasi = equilibrio dinamico tra sintesi, folding assistito e rimozione. Quando fallisce compaiono aggregati (neurodegenerazione) o accumuli da storage. Distinguere via ubiquitina-proteasoma (proteine individuali) da autofagia-lisosomi (organelli/aggregati) è discriminante d’esame. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Proteine regolative a emivita breve sono ubiquitinate e distrutte dal proteasoma.',
          attenzione: 'Chaperon aiutano il ripiegamento; non replicano il DNA.',
          approfondisci: [
            'Ubiquitina: catene K48 → proteasoma; altre topologie hanno ruoli di segnalazione.',
            'UPR (IRE1, PERK, ATF6) bilancia carico di folding del RE e apoptosi se lo stress persiste.',
            'Prioni: conformazione β-sheet che template-izza altre molecole della stessa proteina.',
            'Inibitori del proteasoma (bortezomib) sono usati in alcuni tumori ematologici.',
          ],
        },
      ],
      {
        analogia:
          'Il DNA è il libro di ricette della cucina. La trascrizione è copiare una ricetta su un foglietto (RNA). Poi il foglietto viene sistemato (cappuccio, coda, taglio degli “intermezzi”), portato in cucina e letto dai cuochi-ribosomi che preparano il piatto (la proteina). Se il piatto viene male, si butta via invece di servirlo.',
        concetti: [
          {
            titolo: 'Dal DNA all’RNA',
            testo:
              'Trascrivere significa copiare un pezzo di DNA in RNA. Nei batteri è più semplice; nelle nostre cellule l’RNA viene “truccato” nel nucleo: gli mettono un cappuccio, una coda e tolgono pezzi inutili (introni) prima di uscire verso i ribosomi.',
          },
          {
            titolo: 'Il codice a tre lettere',
            testo:
              'I ribosomi leggono l’RNA a gruppetti di tre lettere (codon). Ogni gruppetto dice quale mattone (amminoacido) aggiungere, oppure “basta” (stop). Più gruppetti possono dire lo stesso mattone: per questo il codice è “degenerato”, non perché sia confuso.',
          },
          {
            titolo: 'Proteine piegate bene o buttate via',
            testo:
              'Una proteina funziona solo se si piega nel modo giusto, come un origami. Delle “assistente” (chaperon) aiutano. Se è rovinata, spesso viene marchiata con ubiquitina e mandata al trituratore (proteasoma), così non fa danni.',
          },
          {
            titolo: 'UTR e miRNA',
            testo:
              'All’inizio e alla fine dell’mRNA ci sono zone non usate per costruire la proteina, ma che dicono quanto il messaggio deve durare o quanto deve essere letto. I miRNA possono spegnere o indebolire questi messaggi come un volume abbassato.',
          },
        ],
      },
      [
        mc('bio-3', 'Lo splicing dell’mRNA eucariotico avviene tipicamente nel:', ['Citosol sui ribosomi', 'Nucleo', 'Lisosoma', 'Perossisoma'], 1, 'Prima dell’export nucleare.'),
        mc('bio-3', 'Le UTR dell’mRNA:', ['Sono sempre tradotte in proteina', 'Hanno funzioni regolatorie', 'Sono solo nei batteri', 'Codificano istoni'], 1, '5′ e 3′ UTR influenzano traduzione e stabilità.'),
        fill('bio-3', 'L’aggiunta del cappuccio 5′ all’mRNA si chiama ______.', 'capping', 'Il capping protegge e favorisce l’inizio della traduzione.'),
        mc('bio-3', 'Il codice genetico è detto degenerato perché:', ['Ogni codon specifica più amminoacidi', 'Più codon possono specificare lo stesso amminoacido', 'Non esistono codon di stop', 'Solo 10 amminoacidi sono usati'], 1, 'Ridondanza dei codon.'),
        mc('bio-3', 'Il proteasoma degrada tipicamente proteine:', ['Marcate con ubiquitina', 'Solo nel nucleo', 'Di membrana senza segnale', 'Virali nel mezzo extracellulare'], 0, 'Via ubiquitina-proteasoma.'),
      ],
      [
        mc('bio-3', 'Gli snRNA partecipano principalmente a:', ['Traduzione mitocondriale', 'Splicing', 'Fagocitosi', 'Osmosi'], 1, 'Componenti dello spliceosoma.'),
        fill('bio-3', 'I ribozimi sono molecole di ______ con attività catalitica.', 'RNA', 'Esempio: peptidil-transferasi ribosomale ha carattere ribozimico.'),
        mc('bio-3', 'Le chaperon aiutano:', ['La replicazione del DNA', 'Il corretto ripiegamento delle proteine', 'La sintesi di peptidoglicano', 'L’effetto Doppler'], 1, 'Preveniscono aggregati e misfolding.'),
        mc('bio-3', 'RNA polimerasi II trascritte principalmente:', ['tRNA', 'mRNA', 'rRNA 28S e 18S', 'DNA mitocondriale'], 1, 'Pol II → pre-mRNA.'),
        mc('bio-3', 'Un codon di stop:', ['Codifica metionina', 'Termina la traduzione', 'Inizia sempre la trascrizione', 'È un enhancer'], 1, 'UAA, UAG, UGA reclutano fattori di rilascio.'),
        mc('bio-3', 'L’editing dell’RNA:', ['Cambia sequenza nucleotidica del trascritto', 'È solo nei virus litici', 'Sostituisce i telomeri', 'Elimina i mitocondri'], 0, 'Modifica basica post-trascrizionale.'),
        fill('bio-3', 'La poliadenilazione aggiunge una coda di ______ all’mRNA.', 'poli-A', 'Coda poliadenilica 3′.', ['polia', 'poli A', 'adenine', 'A']),
        mc('bio-3', 'miRNA tipicamente:', ['Attivano sempre la traduzione', 'Silenziano o destabilizzano mRNA bersaglio', 'Formano nucleosomi', 'Sostituiscono tRNA'], 1, 'RNA interference / regolazione post-trascrizionale.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-4',
      [
        {
          title: 'Mutazioni e riparazione del DNA',
          body: `Le mutazioni sono cambiamenti permanenti della sequenza: sostituzioni (silent, missense, nonsense), inserzioni/delezioni (frameshift se non multipli di 3), espansioni di ripetizioni. Cause tipiche: errori di replicazione, agenti chimici alchilanti o intercalanti, radiazioni UV (dimeri di pirimidina) e stress ossidativo (basi ossidate). Sistemi di riparazione includono excision repair (BER per basi danneggiate singole, NER per lesioni volumose come dimeri), mismatch repair (errori di copia post-replicativi) e, per rotture a doppio filamento, ricombinazione omologa (accurata in S/G2) o NHEJ non omologa (più error-prone). Se l’errore non è riparato prima della replicazione, diventa mutazione ereditabile nelle cellule figlie. Mutazioni germinali si trasmettono alla prole; quelle somatiche possono contribuire al cancro o ad altre patologie locali. Difetti di riparazione (XP, Lynch) collegano genotipo e rischio tumorale. Una mappa utile: tipo di lesione → sistema di riparo preferito → malattia se difettoso (UV/NER/XP; mismatch/MMR/Lynch; DSB/HR-NHEJ). Mutazione germinale vs somatica cambia completamente counseling e significato oncologico.`,
          esempio: 'UV → dimeri di pirimidina riparati tipicamente da NER; difetti → xeroderma pigmentoso.',
          attenzione: 'Frameshift: inserzione/delezione non multipla di 3 sfasa il frame di lettura.',
          approfondisci: [
            'Silent = stesso aa; missense = aa diverso; nonsense = stop prematuro.',
            'Lynch syndrome: difetti MMR → instabilità dei microsatelliti e rischio CRC/endometrio.',
            'HR usa la cromatide sorella come stampo; NHEJ unisce estremità spesso con indel.',
            'Mutageni chimici e radicali liberi aumentano il carico di lesioni oltre la capacità di riparo.',
          ],
        },
        {
          title: 'Alleli, dominanza, epistasi',
          body: `Alleli sono varianti dello stesso locus. Omozigosi = due alleli uguali; eterozigosi = diversi. Dominanza completa: l’eterozigote mostra il fenotipo dominante; il recessivo appare solo in omozigosi. Codominanza (AB0: A e B entrambi espressi) e dominanza incompleta producono fenotipi misti o intermedi. Poliallelia (più di due alleli nella popolazione), pleiotropia (un gene → più tratti) ed epistasi (un locus maschera l’effetto di un altro) alterano i rapporti mendeliani classici 3:1 o 9:3:3:1. Caratteri poligenici e multifattoriali dipendono da più loci e dall’ambiente (altezza, molte malattie comuni). In genetica medica queste distinzioni spiegano perché pedigree e rapporti fenotipici non sempre “tornano” con Mendel semplice e perché due mutazioni diverse possono interagire nello stesso pathway. Allenarsi a disegnare un piccolo Punnett e a chiedere “è un gene o l’interazione tra geni?” separa dominanza, epistasi e poligenia. In medicina, AB0 e molte enzimopatie recessivo-complete restano esempi classici da richiamare subito. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Gruppo AB: alleli A e B codominanti; O tipicamente recessivo.',
          attenzione: 'Epistasi = interazione tra geni; pleiotropia = un gene, più effetti fenotipici.',
          approfondisci: [
            'Dominanza incompleta: fenotipo eterozigote intermedio (es. fiori rosa da rosso×bianco).',
            'Epistasi recessiva classica: rapporti 9:3:4 invece di 9:3:3:1.',
            'Pleiotropia: mutazioni in un fattore di trascrizione colpiscono più organi.',
            'Eredità multifattoriale: soglia di rischio + ambiente (es. alcune malformazioni).',
          ],
        },
        {
          title: 'Cariotipo e alberi genealogici',
          body: `Il cariotipo descrive numero e morfologia dei cromosomi (banding, dimensioni, posizione del centromero). Aneuploidie (trisomie, monosomie) e riarrangiamenti strutturali (delezioni, duplicazioni, inversioni, traslocazioni) causano sindromi, aborti o infertilità; traslocazioni bilanciate nei genitori spiegano rischi riproduttivi senza fenotipo evidente. Gli alberi genealogici ricostruiscono modalità di trasmissione: autosomica dominante/recessiva, X-linked, Y-linked, mitocondriale (trasmissione materna del mtDNA). Pattern tipici: AD spesso in ogni generazione; AR può saltare generazioni; X-recessivo colpisce soprattutto maschi emizigoti per il cromosoma X; mitocondriale da madre a tutti i figli ma solo le figlie trasmettono oltre. L’analisi del cariotipo (e oggi anche array/NGS) e dei pedigree resta centrale in consulenza genetica prenatale e familiare. Leggere un pedigree richiede metodo: chi è affetto, trasmissione maschio-maschio (esclude X e mt), e se salta generazioni. Il cariotipo spiega meccanismi cromosomici che Mendel non cattura: aneuploidie e riarrangiamenti restano cause frequenti di infertilità e sindromi. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Trisomia 21 (sindrome di Down); traslocazione Robertsoniana bilanciata in un genitore.',
          attenzione: 'MtDNA: ereditarietà materna, non mendeliana autosomica classica.',
          approfondisci: [
            'Non-disgiunzione meiotica: causa frequente di trisomie (rischio ↑ con età materna).',
            'Traslocazione Robertsoniana 14;21: rischio di Down da traslocazione nelle gravidanze successive.',
            'X-linked: nessuna trasmissione padre→figlio maschio (il padre dà Y ai figli maschi).',
            'Eteroplasmia mitocondriale spiega severità variabile nella stessa famiglia.',
          ],
        },
        {
          title: 'Penetranza ed espressività',
          body: `Penetranza è la probabilità che un genotipo produca il fenotipo atteso: se < 100% si parla di penetranza incompleta (non tutti i portatori sono clinicamente affetti). Espressività misura quanto è variabile l’intensità o il quadro clinico tra chi manifesta il tratto (espressività variabile). Insieme a geni modificatori, fattori epigenetici e ambiente spiegano perché la stessa mutazione “patogena” può dare forme lievi, gravi o apparentemente assenti. Nell’interpretazione dei pedigree, la penetranza incompleta può far sembrare che una malattia dominante “salti” una generazione senza portatori evidenti: in realtà il genotipo può esserci senza segni clinici rilevati. Distinguere penetranza (sì/no) ed espressività (quanto) è fondamentale in counseling e nella lettura di report genetici. Nel counseling non promettere certezza fenotipica se la penetranza è incompleta: si parla di probabilità. Espressività variabile impone follow-up clinico anche in “portatori apparentemente sani” di mutazioni note in famiglia. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Mutazione AD con penetranza 70%: il 30% dei genotipi a rischio non mostra il fenotipo.',
          attenzione: 'Penetranza = sì/no del fenotipo; espressività = quanto è intenso/variabile.',
          approfondisci: [
            'Età-dipendenza: alcune malattie AD “appaiono” tardi → pedigree fuorvianti in giovani.',
            'Modificatori genetici e stile di vita modulano espressività (es. fenilchetonuria e dieta).',
            'Mosaicismi somatici/germinali possono simulare penetranza incompleta.',
            'In test predittivi: penetranza incompleta complica la stima del rischio individuale.',
          ],
        },
      ],
      {
        analogia:
          'Il DNA è come le istruzioni di un gioco in scatola. Una mutazione è un errore stampato nelle regole. A volte l’errore non si nota, a volte cambia tutto il gioco. Le famiglie trasmettono le regole come si passano i pezzi di un set: a volte bastano certe combinazioni per vedere l’effetto, altre volte serve che due pezzi uguali stiano insieme.',
        concetti: [
          {
            titolo: 'Errori e riparazioni',
            testo:
              'Quando il DNA si copia, possono nascere errori. La cellula ha squadre di riparazione. Se l’errore resta, diventa una mutazione: una lettera cambiata, una lettera in più o in meno. Se saltano lettere non a gruppi di tre, la frase successiva non ha più senso (frameshift).',
          },
          {
            titolo: 'Alleli e chi “vince”',
            testo:
              'Per ogni gene puoi avere due versioni (alleli). A volte una vince sull’altra (dominante), a volte servono due copie uguali per vedere l’effetto (recessivo), a volte si vedono entrambe (codominanza, come AB). Un gene può anche “nascondere” l’effetto di un altro (epistasi).',
          },
          {
            titolo: 'Alberi di famiglia e cromosomi',
            testo:
              'Gli alberi genealogici mostrano chi ha un tratto in famiglia. Contare i cromosomi (cariotipo) rivela se ne manca uno o ce n’è uno in più, oppure se pezzi sono scambiati. L’ereditarietà dal DNA dei mitocondri passa soprattutto dalla mamma.',
          },
          {
            titolo: 'Penetranza ed espressività',
            testo:
              'Avere la stessa “regola sbagliata” non significa avere lo stesso problema: qualcuno non lo mostra affatto (penetranza incompleta), qualcun altro lo mostra più o meno forte (espressività variabile). Ambiente e altri geni contano.',
          },
        ],
      },
      [
        mc('bio-4', 'Una mutazione frameshift è tipicamente causata da:', ['Sostituzione silente', 'Inserzione/delezione non multipla di 3', 'Crossing-over bilanciato', 'Metilazione di un istono'], 1, 'Sfasamento del frame di lettura.'),
        mc('bio-4', 'Nel sistema AB0, gli alleli A e B sono tipicamente:', ['Entrambi recessivi rispetto a O', 'Codominanti tra loro', 'Legati al cromosoma Y', 'Mitocondriali'], 1, 'Fenotipo AB esprime entrambi gli antigeni.'),
        fill('bio-4', 'La presenza di un numero anomalo di cromosomi si chiama ______.', 'aneuploidia', 'Esempio: trisomia 21.'),
        mc('bio-4', 'Un carattere X-linked recessivo si manifesta più spesso in:', ['Femmine', 'Maschi', 'Solo mitocondri', 'Solo cellule germinali'], 1, 'I maschi sono emizigoti per X.'),
        mc('bio-4', 'La penetranza incompleta significa che:', ['Il genotipo non produce mai fenotipo', 'Non tutti i portatori del genotipo mostrano il fenotipo', 'Il gene è sempre letale', 'Non esiste ereditarietà'], 1, 'Penetranza < 100%.'),
      ],
      [
        mc('bio-4', 'L’epistasi descrive:', ['Interazione tra geni che altera rapporti mendeliani', 'Solo mutazioni mitocondriali', 'Osmosi cellulare', 'Splicing alternativo obbligato'], 0, 'Un locus maschera l’effetto di un altro.'),
        fill('bio-4', 'Lo scambio di segmenti tra cromosomi non omologhi è una ______.', 'traslocazione', 'Riarrangiamento strutturale.'),
        mc('bio-4', 'L’ereditarietà mitocondriale tipicamente:', ['Segue Mendel autosomico', 'Si trasmette dalla madre', 'Si trasmette solo dal padre', 'Non esiste nell’uomo'], 1, 'MtDNA ereditato per via materna.'),
        mc('bio-4', 'La riparazione del DNA a doppio filamento può usare:', ['Solo osmosi', 'Ricombinazione omologa o NHEJ', 'Solo capping', 'Solo Gram staining'], 1, 'Due vie principali di DSB repair.'),
        mc('bio-4', 'La pleiotropia è:', ['Un gene che influenza più tratti fenotipici', 'Molti geni per un solo tratto', 'Assenza di alleli', 'Solo aneuploidia'], 0, 'Un gene → effetti multipli.'),
        mc('bio-4', 'In un albero genealogico, una malattia autosomica dominante tipicamente:', ['Salta spesso generazioni senza portatori', 'Appare in ogni generazione tra i colpiti', 'Colpisce solo maschi', 'È solo mitocondriale'], 1, 'Pattern tipico AD (con eccezioni di penetranza).'),
        fill('bio-4', 'Due alleli diversi nello stesso locus nello stesso individuo: condizione di ______.', 'eterozigosi', 'Eterozigote.'),
        mc('bio-4', 'L’imprinting genomico implica:', ['Espressione dipendente dall’origine parentale', 'Assenza di DNA', 'Solo virus', 'Solo fluidi'], 0, 'Silencing epigenetico parentale-specifico.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-5',
      [
        {
          title: 'Membrane e trasporto',
          body: `La membrana plasmatica segue il modello a mosaico fluido: doppio strato di fosfolipidi, colesterolo (modula fluidità), proteine integrali/periferiche e glicocalice. Selettività e fluidità dipendono da composizione lipidica e temperatura. Trasporto passivo: diffusione semplice (piccole molecole apolari) e facilitata (canali, carrier) lungo gradiente elettrochimico, senza consumo diretto di ATP. Trasporto attivo primario (ATPasi, pompe ABC) usa ATP direttamente; il secondario sfrutta gradienti ionici già creati (simporto/antiporto). La pompa Na+/K+ ATPasi (3 Na⁺ fuori / 2 K⁺ dentro) mantiene il potenziale di membrana e guida cotrasporti essenziali (glucosio intestinale, riassorbimento renale). Osmosi e tono influenzano il volume cellulare. Endocitosi ed esocitosi muovono macromolecole in vescicole senza attraversare il doppio strato come molecole libere. Questi concetti collegano fisiologia, farmacologia di canali e shock osmotici. Classificare ogni esempio (O₂, glucosio GLUT, pompa Na+/K+, simporto Na+-glucosio) nella griglia passivo/attivo e primario/secondario elimina la maggior parte degli errori. Volume cellulare e tonicità collegano questo capitolo alla fisiologia di liquidi e shock.`,
          formule: ['Na+/K+ ATPasi: 3 Na⁺ fuori / 2 K⁺ dentro per ATP'],
          esempio: 'Diffusione dell’O2 vs trasporto della glucosio mediato da GLUT.',
          attenzione: 'Pompa Na+/K+ = trasporto attivo primario, non diffusione semplice.',
          approfondisci: [
            'Canali gated (voltaggio, ligando, meccanici) aprono pori ionici selettivi e rapidi.',
            'Carrier (uniporto) e pompe: saturabili, con cinetica tipo Michaelis–Menten.',
            'ABC transporters (es. MDR1/P-gp) espellono farmaci → resistenza multidrug.',
            'Acquaporine facilitano il flusso d’acqua senza dissipare gradienti ionici.',
          ],
          figureIds: ['bio-5-membrane'],
        },
        {
          title: 'Nucleo, mitocondri, perossisomi',
          body: `Il nucleo ha doppia membrana e pori nucleari: importine/esportine e il ciclo di Ran-GTP regolano il traffico di proteine e RNA maturi. I mitocondri posseggono genoma proprio e membrane interna/esterna; TOM e TIM importano proteine precursore dal citosol. Sulla membrana interna avvengono catena respiratoria e fosforilazione ossidativa; fusione e fissione rimodellano continuamente la rete mitocondriale in risposta allo stress energetico. I perossisomi svolgono ossidazioni (acidi grassi a catena molto lunga) producendo H2O2, detoxificato dalla catalasi; sono anche coinvolti in sintesi di plasmalogeni. Difetti di biogenesi (Zellweger) causano patologie gravi multisistemiche. Nucleo, mitocondri e perossisomi collaborano a metabolismo, redox e risposta allo stress: errori di targeting o di import producono fenotipi clinici distinti da conoscere in patologia cellulare. Tre indirizzi di traffico da non confondere: NLS/poro (nucleo), TOM/TIM (mitocondri), PEX (perossisomi). Metabolismo energetico e detox ossidativo dipendono da mitocondri e perossisomi; il nucleo resta il centro decisionale del genoma. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Sindrome di Zellweger: perossisomi assenti/difettosi → accumulo di metaboliti tossici.',
          attenzione: 'TOM/TIM = mitocondri; non pori nucleari né lisosomi.',
          approfondisci: [
            'NLS (nuclear localization signal) e NES dirigono import/export attraverso il poro.',
            'Gradiente protonico mitocondriale: forza proton-motrice per ATP sintasi.',
            'Dinamina-related protein 1 (Drp1) è chiave nella fissione mitocondriale.',
            'Zellweger: spettro di disordini PEX con ipotonia, disfunzione epatica e anomalie craniofacciali.',
          ],
        },
        {
          title: 'Via secretoria e traffico vescicolare',
          body: `Proteine destinate a secrezione, membrana o lisosomi entrano nel RE (co-traduzionalmente via SRP e sequenza segnale), dove avviene folding e N-glicosilazione; calnexina partecipa al controllo qualità prima dell’uscita. Dal RE al Golgi (COPII) e tra cisterne Golgi avvengono modificazioni (O-glicosilazione, trimming) e sorting verso destinazioni diverse; COPI media il recupero verso il RE. Coat (clatrina, COPI/II), GTPasi Rab e SNARE dirigono budding, docking e fusione vescicolare. Idrolasi lisosomiali ricevono mannosio-6-fosfato (M6P) come “indirizzo” riconosciuto da recettori nel TGN. Endocitosi mediata da recettore (transferrina), autofagia e lisosomi chiudono il ciclo di degradazione e riciclo di membrane e cargo. Difetti di trafficking spiegano malattie da storage e alcuni errori congeniti della glicosilazione. Seguire una proteina dall’SRP al lisosoma (RE → Golgi → M6P → endosoma/lisosoma) è il filo rosso del capitolo. SNARE/Rab/coat spiegano specificità di fusione: senza indirizzo molecolare i cargo non arrivano a destinazione. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Recettore della transferrina: clatrina → endosoma → rilascio ferro → riciclo del recettore.',
          attenzione: 'SNARE mediano fusione vescicolare, non metilazione del DNA.',
          approfondisci: [
            'SRP riconosce la sequenza segnale nascente e porta il ribosoma al RE (translocone Sec61).',
            'Clatrina + adattatori selezionano cargo in endocitosi e dal TGN.',
            'Malattia di I-cell: difetto di marcatura M6P → idrolasi secrete invece che lisosomiali.',
            'Tossine batteriche e virus sfruttano vie endocitiche/retrograde per entrare in cellula.',
          ],
        },
        {
          title: 'Citoscheletro e matrice extracellulare',
          body: `Tre sistemi principali: microtubuli (tubulina; polarità +/−; chinesine verso +, dineine spesso verso −), filamenti di actina (con miosine per contrazione, citodieresi e motilità) e filamenti intermedi (cheratine, vimentina, neurofilamenti: resistenza meccanica). Il citoscheletro sostiene forma cellulare, traffico intracellulare di organelli, mitosi (fuso mitotico) e migrazione. La matrice extracellulare (collageni, proteoglicani, fibronectina, laminine) fornisce supporto strutturale e segnali biochimici. Integrine collegano MEC e citoscheletro, trasducendo forze meccaniche (meccanotrasduzione) e segnali di sopravvivenza. Desmosomi e giunzioni di ancoraggio legano cellule adiacenti al citoscheletro, essenziali in epiteli, cuore e cute; difetti causano fragilità tissutale. Farmaci antitubulinici e patologie di cheratine mostrano quanto questi “binari e corde” siano clinicamente rilevanti. Microtubuli = binari a lunga distanza; actina = bordo e contrazione; intermedi = resistenza. Integrine e desmosomi collegano meccanica e sopravvivenza: perdere adesione può attivare anoikis, rilevante in metastasi. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Integrine in adesione cellula-MEC e segnalazione di sopravvivenza.',
          attenzione: 'Chinesine tipicamente verso estremità + dei microtubuli; dineine verso −.',
          approfondisci: [
            'Farmaci come vincristina/taxani interferiscono con dinamica dei microtubuli (chemioterapia).',
            'Epidermolisi bollosa: mutazioni in cheratine o proteine di adesione → fragilità cutanea.',
            'Focal adhesion: integrine + talina/vinculina collegano actina alla MEC.',
            'Migrazione cellulare: polimerizzazione actina al leading edge + contrazione posteriore.',
          ],
        },
      ],
      {
        analogia:
          'Una cellula è come una casa con muri (membrana), stanze (organelli), corridoi con pacchi (vescicole) e travi (citoscheletro). La posta entra e esce da porte speciali, e i pacchi hanno etichette per sapere dove devono arrivare. Fuori dalla casa c’è anche un giardino di colla e fibre (matrice) che tiene tutto insieme al vicinato.',
        concetti: [
          {
            titolo: 'Il muro selettivo',
            testo:
              'La membrana lascia passare alcune cose da sole, altre solo attraverso porte e pompe. La pompa del sodio e del potassio usa energia (ATP) per tenere la casa in ordine elettrico e per far funzionare altri trasporti “in discesa”.',
          },
          {
            titolo: 'Stanze importanti',
            testo:
              'Il nucleo custodisce il DNA. I mitocondri sono le centrali elettriche. I perossisomi fanno pulizie chimiche particolari; se non funzionano bene (come nella sindrome di Zellweger) arrivano problemi gravi in tanti organi.',
          },
          {
            titolo: 'Pacchi e indirizzi',
            testo:
              'Le proteine da esportare passano dal RE al Golgi come in un ufficio postale. Vengono messe in vescicole con “adesivi” (come il mannosio-6-fosfato per i lisosomi) e fuse nel posto giusto grazie a proteine SNARE.',
          },
          {
            titolo: 'Scheletro e colla fuori',
            testo:
              'Dentro ci sono binari e corde (citoscheletro) su cui corrono motori. Fuori c’è la matrice, una rete di colla e fibre. Le integrine collegano dentro e fuori, così la cellula sente anche le forze meccaniche e decide se restare attaccata.',
          },
        ],
      },
      [
        mc('bio-5', 'Il modello a mosaico fluido descrive:', ['Il ribosoma', 'La membrana plasmatica', 'Il peptidoglicano', 'Il caps ide'], 1, 'Lipidi e proteine diffusibili nel piano della membrana.'),
        mc('bio-5', 'Le pompe Na+/K+ ATPasi sono esempio di:', ['Diffusione semplice', 'Trasporto attivo primario', 'Osmosi pura', 'Fagocitosi'], 1, 'Usano ATP direttamente.'),
        fill('bio-5', 'Il segnale di indirizzamento ai lisosomi sulle idrolasi è tipicamente il ______.', 'mannosio-6-fosfato', 'M6P marca le idrolasi lisosomiali.', ['mannosio 6 fosfato', 'M6P', 'm6p']),
        mc('bio-5', 'TOM e TIM sono traslocatori di:', ['Nucleo', 'Mitocondri', 'Lisosomi', 'Ciglia'], 1, 'Import proteico mitocondriale.'),
        mc('bio-5', 'Le SNARE mediano:', ['La fusione vescicolare', 'La metilazione del DNA', 'L’effetto Doppler', 'La sintesi di ATP nel citosol'], 0, 'Docking/fusione con membrana bersaglio.'),
      ],
      [
        mc('bio-5', 'La sindrome di Zellweger coinvolge:', ['Perossisomi', 'Solo telomeri', 'Solo flagelli batterici', 'Solo virus'], 0, 'Difetti di biogenesi perossisomiale.'),
        fill('bio-5', 'Le proteine motrici sui microtubuli verso l’estremità + sono tipicamente le ______.', 'chinesine', 'Chinesine (+); dineine spesso verso −.', ['kinesine', 'chinesina']),
        mc('bio-5', 'La calnexina partecipa al:', ['Controllo qualità nel RE', 'Ciclo di Krebs', 'Splicing', 'Gram stain'], 0, 'Folding delle glicoproteine nel RE.'),
        mc('bio-5', 'L’endocitosi della transferrina è tipicamente:', ['Fagocitosi non specifica', 'Mediata da recettore', 'Solo osmotica', 'Solo mitotica'], 1, 'Clatrina / recettore della transferrina.'),
        mc('bio-5', 'I desmosomi:', ['Sono solo nei batteri', 'Ancorano cellule adiacenti al citoscheletro', 'Sintetizzano ATP', 'Tagliano DNA'], 1, 'Giunzioni di ancoraggio.'),
        mc('bio-5', 'La fosforilazione ossidativa avviene principalmente:', ['Nel citosol', 'Nella membrana mitocondriale interna', 'Nel nucleo', 'Nei lisosomi'], 1, 'Catena respiratoria + ATP sintasi.'),
        fill('bio-5', 'SRP riconosce la sequenza segnale per l’ingresso nel ______.', 'reticolo endoplasmatico', 'Via co-traduzionale al RE.', ['RE', 'reticolo', 'ER']),
        mc('bio-5', 'Le integrine collegano tipicamente:', ['Cellula e matrice extracellulare', 'Due DNA', 'tRNA e mRNA', 'Virus e caps ide'], 0, 'Adesione e segnalazione.'),
      ],
      {
        figure: [
          { id: 'bio-5-membrane', kind: 'sketch', caption: 'Appunti: bilayer e canale proteico', alt: 'Sketch membrana' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-6',
      [
        {
          title: 'Comunicazione e giunzioni',
          body: `Le cellule comunicano per contatto diretto, in modo autocrino (su sé stesse), paracrino (vicinato), endocrino (ormoni nel sangue) o sinaptico (neurotrasmettitori nelle sinapsi chimiche). Giunzioni occludenti (tight) sigillano epiteli e controllano la barriera paracellular; aderenti e desmosomi ancorano meccanicamente cellule vicine al citoscheletro; gap junction (connexine) permettono passaggio di ioni e piccoli soluti, sincronizzando tessuti come il cuore e alcuni epiteli. Le caderine mediano adesione cellula-cellula Ca²⁺-dipendente e sono cruciali morfogenesi e mantenimento dei tessuti. Il tipo di segnale, la distanza e la durata determinano velocità, specificità e adattamento della risposta fisiologica complessiva dell’organismo. In patologia, perdita di polarità e giunzioni favorisce invasione tumorale; canali gap alterati spiegano aritmie e sordità genetiche. Scala spaziale del segnale (contatto, paracrino, endocrino, sinaptico) e tipo di giunzione (occludente, aderente, gap) sono due assi indipendenti da incrociare. Barriera epiteliale e sincronia elettrica cardiaca sono applicazioni biomediche immediate. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Segnalazione endocrina: insulina rilasciata nel sangue agisce a distanza su muscolo e fegato.',
          attenzione: 'Gap junction = canali tra cellule; non sono splicing né replicazione virale.',
          approfondisci: [
            'Tight junctions (claudine, occludina) definiscono barriere sangue–cervello e intestinali.',
            'Connexine diverse (Cx43 nel cuore) spiegano selettività e malattie da gap junction.',
            'Sinapsi chimica: ritardo sinaptico e amplificazione vs gap (elettriche) più rapide.',
            'EMT tumorale: perdita di E-caderina → meno adesione, più migrazione.',
          ],
        },
        {
          title: 'Recettori e secondi messaggeri',
          body: `I ligandi idrofili legano recettori di membrana; quelli lipidici (steroidi, tiroidei) spesso recettori intracellulari/nucleari che regolano direttamente la trascrizione genica. Recettori di membrana: ionotropici (canali), metabotropici GPCR, tirosin-chinasici e altri (serina/treonina, citochinici). I secondi messaggeri (cAMP, cGMP, IP3, DAG, Ca²⁺) amplificano e diversificano il segnale nel citosol: poche molecole di ligando possono attivare molte chinasi a valle. Cascate di chinasi fosforilano bersagli proteici; fosfatasi e degradazione dei messaggeri (fosfodiesterasi per cAMP) spengono la risposta. La desensitizzazione riduce la risposta a stimolo prolungato (internalizzazione o fosforilazione del recettore), evitando iperattivazione cronica e danno tissutale inutile. Farmacologia di agonisti/antagonisti e di PDE si basa su questi nodi. Amplificazione e spegnimento sono simmetrici: senza fosfodiesterasi o fosfatasi il segnale resterebbe acceso. Distinguere recettore di membrana vs nucleare evita di attribuire secondi messaggeri agli steroidi classici. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          formule: ['GPCR → effettore → secondo messaggero → chinasi → risposta'],
          esempio: 'Adrenalina → GPCR → adenilato ciclasi → cAMP ↑ → PKA.',
          attenzione: 'cAMP è secondo messaggero; il DNA non lo è.',
          approfondisci: [
            'IP3 apre canali Ca²⁺ del RE; DAG attiva PKC sulla membrana.',
            'NO → guanilato ciclasi → cGMP: vasodilatazione (bersaglio dei nitrati).',
            'Arrestine mediano desensitizzazione e spesso endocitosi di GPCR.',
            'Recettori nucleari: HSP, dimerizzazione e elementi di risposta sul DNA.',
          ],
        },
        {
          title: 'GPCR e tirosin-chinasi',
          body: `I GPCR attivano proteine G trimeriche: lo scambio GDP/GTP sulla subunità α (e a volte βγ) regola effettori come adenilato ciclasi e fosfolipasi C (IP3/DAG → Ca²⁺ dal RE). Le piccole GTPasi (Ras) sono accese da GEF e spente da GAP che accelerano l’idrolisi del GTP. I recettori tirosin-chinasici (RTK) tipicamente dimerizzano al legame del ligando, si autofosforilano e reclutano adattatori (Grb2-Sos): via classica Ras–Raf–MEK–ERK (MAPK) e vie PI3K–Akt. Queste cascate controllano proliferazione, sopravvivenza e differenziamento; errori di regolazione favoriscono tumori e altre patologie. Capire GEF vs GAP e dimerizzazione RTK è essenziale per interpretare oncogeni e terapie mirate (TKI, anticorpi anti-EGFR/HER2). Schema operativo: GPCR → G trimeriche → effettore; RTK → dimero → fosfotirosine → adattatori → Ras/MAPK o PI3K. GEF “on”, GAP “off” per Ras è la regola d’oro per non invertire i regolatori. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Fattore di crescita → RTK → Ras-GTP → cascata MAPK → trascrizione di geni mitogenici.',
          attenzione:
            'GEF attiva Ras (GTP); GAP accelera idrolisi GTP → off. Proteina G attiva quando α-GTP (non GDP); tipici secondi messaggeri: cAMP, IP3/DAG, Ca²⁺.',
          approfondisci: [
            'Gs stimola adenilato ciclasi; Gi la inibisce; Gq attiva PLC.',
            'Ras oncogenico spesso perde sensibilità a GAP → GTP “bloccato”.',
            'PI3K–Akt–mTOR: sopravvivenza e metabolismo; PTEN è il freno lipidico.',
            'TKI (imatinib, erlotinib) bloccano chinasi iperattive in tumori selezionati.',
          ],
        },
        {
          title: 'Oncogeni e segnalazione',
          body: `I proto-oncogeni codificano componenti normali delle vie di crescita (recettori, Ras, chinasi, fattori di trascrizione). Mutazioni, amplificazioni o traslocazioni che producono guadagno di funzione li trasformano in oncogeni: segnale “sempre acceso” indipendente dal ligando esterno. Esempi classici: RTK costitutivamente attivi, Ras insensibile a GAP, chinasi mitogeniche iperattive, traslocazioni che fondono geni (BCR-ABL). Virus oncogeni possono introdurre oncogeni virali o deregolarne di cellulari nell’ospite. Capire la segnalazione spiega terapie mirate (inibitori di tirosin-chinasi, anticorpi anti-recettore) che bloccano nodi iperattivi delle cascate mitogeniche tumorali. Distinguere oncogene (gain) da oncosoppressore (loss, vedi bio-7) evita confusione nei quiz e nella lettura di report NGS oncologici. Ogni volta che una via mitogenica resta attiva senza ligando, sospetta un oncogene. La clinica moderna seleziona terapie sul nodo molecolare (recettore, Ras, chinasi): biologia della segnalazione e farmacologia mirata sono la stessa storia. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Ras mutato bloccato in forma GTP: proliferazione indipendente dal fattore di crescita.',
          attenzione: 'Oncogene = guadagno di funzione; oncosoppressore = perdita di funzione (vedi bio-7).',
          approfondisci: [
            'Un allele mutato di oncogene può bastare (dominanza a livello cellulare).',
            'HPV E6/E7 inattivano p53/Rb: esempio di deregulation virale di oncosoppressori.',
            'Companion diagnostics: mutazione EGFR/ALK guida la scelta del TKI.',
            'Resistenza acquisita: nuove mutazioni del bersaglio o bypass pathway.',
          ],
        },
      ],
      {
        analogia:
          'Le cellule si mandano messaggi come amici con telefoni, megafoni o lettere nel sangue. Il messaggio arriva a un campanello sulla porta (recettore), poi dentro casa suonano altri campanelli più piccoli (secondi messaggeri) che dicono a tutti cosa fare. Se il campanello resta bloccato su “suona”, la casa non sta più ferma: può crescere troppo.',
        concetti: [
          {
            titolo: 'Parlare da vicine o da lontano',
            testo:
              'A volte le cellule si toccano, a volte parlano alle vicine (paracrina), a volte mandano ormoni nel sangue (endocrina). Tra una cellula e l’altra ci sono anche “finestre” (gap junction) per far passare piccole cose e sincronizzarsi.',
          },
          {
            titolo: 'Campanelli e amplificatori',
            testo:
              'Il primo messaggio può essere piccolo. Dentro la cellula si creano tanti secondi messaggeri (come cAMP o calcio) che amplificano il segnale. Se il campanello suona troppo a lungo, la cellula può “stufarsi” e rispondere di meno (desensitizzazione).',
          },
          {
            titolo: 'GPCR e tirosin-chinasi',
            testo:
              'Due grandi tipi di campanello di membrana: i GPCR usano proteine G; i recettori tirosin-chinasi si uniscono a due e si fosforilano, accendendo vie come Ras-MAPK che dicono alla cellula di crescere o di sopravvivere.',
          },
          {
            titolo: 'Quando il segnale resta acceso',
            testo:
              'Se un pezzo della catena si rompe in modo da restare sempre attivo, diventa un oncogene: la cellula cresce anche quando non dovrebbe. È come un interruttore bloccato su “on”, ed è per questo che esistono farmaci mirati.',
          },
        ],
      },
      [
        mc('bio-6', 'Un secondo messaggero tipico è:', ['Il DNA', 'Il cAMP', 'Il peptidoglicano', 'Il capside'], 1, 'cAMP media molte risposte a GPCR.'),
        mc('bio-6', 'Le proteine G trimeriche sono tipicamente attivate da:', ['Ribosomi', 'GPCR', 'Lisosomi', 'Telomerasi'], 1, 'Recettori accoppiati a proteine G.'),
        fill('bio-6', 'GEF favorisce lo scambio GDP/GTP sulle piccole GTPasi come ______.', 'Ras', 'GEF attiva Ras; GAP la spegne.', ['ras']),
        mc('bio-6', 'I recettori degli ormoni steroidei sono tipicamente:', ['Solo canali ionici', 'Intracellulari/nucleari', 'Solo lisosomiali', 'Solo virali'], 1, 'Legano ligando lipidico e regolano trascrizione.'),
        mc('bio-6', 'Una via RTK classica coinvolge:', ['Solo osmosi', 'Ras-MAP chinasi', 'Solo Gram+', 'Solo Bernoulli'], 1, 'Cascata mitogenica.'),
      ],
      [
        mc('bio-6', 'Una giunzione gap permette:', ['Passaggio di piccoli soluti tra cellule', 'Splicing', 'Replicazione virale obbligata', 'Solo adesione senza canali'], 0, 'Connexine / comunicazione diretta.'),
        fill('bio-6', 'IP3 tipicamente libera ______ dal RE.', 'calcio', 'IP3 apre canali Ca2+ del RE.', ['Ca2+', 'Ca++', 'ioni calcio']),
        mc('bio-6', 'La desensitizzazione recettoriale:', ['Aumenta sempre la risposta', 'Riduce la risposta a stimolo prolungato', 'Elimina i mitocondri', 'Crea telomeri'], 1, 'Adattamento/attenuazione del segnale.'),
        mc('bio-6', 'Le caderine mediano tipicamente:', ['Adesione cellula-cellula Ca2+-dipendente', 'Traduzione', 'Osmosi pura', 'Decibel'], 0, 'Adesione omofilica.'),
        mc('bio-6', 'Un oncogene può derivare da:', ['Un proto-oncogene mutato/iperattivo', 'Solo DNA mitocondriale normale', 'Solo rRNA', 'Solo istoni H1 non modificati'], 0, 'Guadagno di funzione nella crescita.'),
        mc('bio-6', 'La segnalazione endocrina usa tipicamente:', ['Contatto diretto obbligato', 'Ormoni nel sangue', 'Solo pili', 'Solo flagelli'], 1, 'Messaggio a distanza via circolo.'),
        fill('bio-6', 'GAP accelera l’idrolisi di ______ sulle GTPasi.', 'GTP', 'GAP → GTPasi off.'),
        mc('bio-6', 'I recettori tirosin-chinasici si attivano spesso per:', ['Dimerizzazione e autofosforilazione', 'Solo metilazione del DNA', 'Solo lisi virale', 'Solo Poiseuille'], 0, 'Legame ligando → dimeri → fosfotirosine.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'bio-7',
      [
        {
          title: 'Ciclo cellulare e checkpoint',
          body: `Il ciclo cellulare comprende G1 (crescita e preparazione), S (replicazione del DNA), G2 (preparazione alla mitosi) e M (mitosi + citodieresi); G0 è uno stato quiescente reversibile o di differenziamento. Progressione guidata da cicline e CDK: la CDK è attiva solo associata alla ciclina appropriata e spesso regolata da fosforilazioni attivanti/inibitorie e da CKI (p21, p27). Il punto di restrizione in G1 coinvolge ciclina D–CDK4/6, fosforilazione di Rb e rilascio di E2F verso geni di S. Checkpoint di danno al DNA (ATM/ATR, p53, p21) e di completezza della replicazione arrestano il ciclo per riparare o indirizzare ad apoptosi. Errori ai checkpoint favoriscono instabilità genomica e tumori; farmaci anti-CDK4/6 sfruttano proprio questo asse. Capire Rb–E2F e p53 è il nucleo concettuale di oncologia cellulare di base. Ordine mentale: ciclina giusta → CDK attiva → fosforilazione di Rb → E2F → S; se DNA danneggiato, p53/p21 frenano. I checkpoint non sono “optional”: senza di essi la cellula replica lesioni e genera genomi instabili.`,
          formule: ['Ciclina + CDK → complesso attivo', 'Rb-P → libera E2F → ingresso in S'],
          esempio: 'Danno DNA → p53 ↑ → p21 → inibizione CDK → arresto in G1.',
          attenzione: 'Rb ipofosforilata trattiene E2F e frena il ciclo; non lo attiva liberamente.',
          approfondisci: [
            'Ciclina E–CDK2 completa l’ingresso in S; ciclina A/B–CDK1 guidano G2/M.',
            'APC/C e SCF sono ubiquitin ligasi che degradano cicline e regolatori.',
            'Spindle assembly checkpoint blocca anafase finché i cinetocori non sono attaccati.',
            'Inibitori CDK4/6 (palbociclib) usati in alcuni tumori ormono-dipendenti.',
          ],
          figureIds: ['bio-7-ciclo'],
        },
        {
          title: 'Mitosi e meiosi',
          body: `Nella mitosi i cromatidi fratelli si separano in modo ordinato: profase/prometafase (condensazione, fuso, rottura dell’involucro), metafase (allineamento sulla piastra), anafase (separazione dopo APC/C, degradazione di securina e cicline, attivazione di separasi), telofase e citodieresi. La meiosi riduce la ploidia (2n → n) in due divisioni successive: in profase I avviene sinapsi e crossing-over tra omologhi; la meiosi I separa omologhi, la II i cromatidi. La non-disgiunzione causa aneuploidie nei gameti. Gametogenesi maschile e femminile differiscono per tempi e prodotti (quattro spermatozoi vs un ovocita + globuli polari; arresti meiotici prolungati nella donna). Le cellule staminali bilanciano auto-rinnovamento e differenziamento nei tessuti adulti e nell’embrione. Errori meiotici e mitotici spiegano aborti, sindromi e mosaicismi. Confronta fini e prodotti: mitosi conserva ploidia; meiosi la riduce e rimescola. Anafase ≠ metafase: allineamento prima, separazione dopo. Non-disgiunzione in meiosi spiega trisomie nei gameti; crossing-over spiega diversità. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Crossing-over in profase I aumenta diversità genetica dei gameti.',
          attenzione: 'Separazione dei cromatidi fratelli = anafase (mitosi/meiosi II), non metafase.',
          approfondisci: [
            'Coesine tengono i cromatidi; separasi le cliva in anafase dopo degradazione di securina.',
            'Crossing-over: noduli di ricombinazione e chiasmi stabilizzano i bivalenti.',
            'Età materna ↑ rischio di non-disgiunzione (specialmente meiosi I).',
            'Staminali asimmetriche: una figlia resta staminale, l’altra si differenzia.',
          ],
        },
        {
          title: 'Apoptosi e necrosi',
          body: `La necrosi è morte spesso traumatica, tossica o ischemica, con lisi e rilascio di contenuto che stimola infiammazione locale (DAMP). L’apoptosi è morte programmata ordinata: la cellula si ritira, il DNA si frammenta (ladder), i fosfatidilserina espone “eat-me” signals e i corpi apoptotici sono fagocitati senza forte infiammazione. Via estrinseca: recettori di morte (Fas, TRAIL-R) e caspasi iniziatrici (caspasi-8). Via intrinseca/mitocondriale: permeabilizzazione della membrana esterna, citocromo c, apoptosoma con Apaf-1 e caspasi-9; la famiglia BCL2 bilancia segnali pro- (Bax/Bak) e anti-apoptotici (Bcl-2, Bcl-xL). Caspasi effettrici (3, 7) eseguono il demolitore proteico finale. L’apoptosi elimina cellule danneggiate, in eccesso nello sviluppo embrionale o potenzialmente tumorali; evaderla è un hallmark del cancro. Se vedi infiammazione da lisi pensa necrosi (o altre morti lytiche); se vedi caspasi, corpi apoptotici e clearance pulita pensa apoptosi. BCL2 e citocromo c sono i cardini della via mitocondriale da saper collocare nello schema. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'Via estrinseca: Fas/TRAIL → caspasi-8 → caspasi effettrici.',
          attenzione: 'Apoptosi ≠ necrosi: programmata e tipicamente non infiammatoria vs lesione/lisi.',
          approfondisci: [
            'BH3-only proteins (Bid, Bim, Puma) attivano Bax/Bak in risposta a stress.',
            'Inibitori di Bcl-2 (venetoclax) ripristinano apoptosi in alcune leucemie.',
            'Necroptosi e piroptosi: altre forme di morte regolata con componenti infiammatorie.',
            'Clearance difettosa di corpi apoptotici può favorire autoimmunità.',
          ],
        },
        {
          title: 'Oncogeni e oncosoppressori',
          body: `Il cancro accumula alterazioni che liberano crescita e sopravvivenza e riducono i controlli di qualità genomica. Proto-oncogeni → oncogeni per guadagno di funzione (un allele mutato può bastare). Oncosoppressori (p53, Rb, PTEN, BRCA) frenano il ciclo, riparano il DNA o promuovono apoptosi: tipicamente servono due hit (perdita di entrambi gli alleli, Knudson). Virus oncogeni, instabilità genomica e microenvironment contribuiscono alla progressione neoplastica (invasione, angiogenesi, metastasi). La distinzione funzionale guida la clinica: bloccare oncogeni iperattivi o ripristinare vie di oncosoppressione e apoptosi sono strategie terapeutiche complementari moderne. Integrare ciclo, apoptosi e segnalazione (bio-6) chiude il quadro di biologia cellulare tumorale richiesto all’esame. Gain vs loss: oncogene “acceleratore bloccato”; oncosoppressore “freno rotto” (spesso due hit). p53 e Rb collegano ciclo, riparo e apoptosi: perderli è perdere i principali sportelli di sicurezza del ciclo cellulare. Ripassa anche le distinzioni più frequenti d’esame e collega il concetto agli altri capitoli della stessa unità per fissare una rete mentale coerente.`,
          esempio: 'p53 mutato: meno arresto del ciclo e meno apoptosi dopo danno al DNA.',
          attenzione: 'Oncogene: gain-of-function; oncosoppressore: loss-of-function (p53/Rb).',
          approfondisci: [
            'Knudson two-hit: retinoblastoma come modello classico di oncosoppressore.',
            'p53: “guardiano del genoma” — arresto, riparo, senescenza o apoptosi.',
            'BRCA1/2: riparazione HR; perdita → sensibilità a PARP inibitori (sintetic lethality).',
            'Hallmarks of cancer: proliferazione, evasione apoptosi, invasione, immunoesclusione…',
          ],
        },
      ],
      {
        analogia:
          'Il ciclo cellulare è come una lavatrice con programmi e sportelli di sicurezza: non passa al ciclo successivo se il bucato (il DNA) non è a posto. A volte la macchina deve spegnersi per sempre in modo ordinato (apoptosi), invece di esplodere (necrosi). Gli acceleratori e i freni di questa macchina, se si rompono, possono portare al tumore.',
        concetti: [
          {
            titolo: 'Semafori del ciclo',
            testo:
              'Cicline e CDK sono l’orologio che dice quando crescere e quando copiare il DNA. Rb e E2F sono un freno e un acceleratore: finché Rb tiene fermo E2F, non si entra facilmente nella fase S. I checkpoint controllano che tutto sia riparato.',
          },
          {
            titolo: 'Mitosi e meiosi',
            testo:
              'La mitosi fa due cellule uguali per crescere o riparare. La meiosi fa cellule con metà cromosomi (gameti) e mescola pezzi di cromosomi (crossing-over). Se i cromosomi non si separano bene, possono nascere aneuploidie come trisomie.',
          },
          {
            titolo: 'Morire in ordine o in disordine',
            testo:
              'Nell’apoptosi la cellula si spegne in modo pulito, con “forbici” chiamate caspasi, e viene ripulita senza fare tanto casino. Nella necrosi si rompe e può fare infiammazione. BCL2 aiuta a decidere se restare viva o no.',
          },
          {
            titolo: 'Oncogeni e oncosoppressori',
            testo:
              'Gli oncogeni sono acceleratori bloccati su “vai”. Gli oncosoppressori sono i freni (come p53 e Rb): se li perdi, la cellula può diventare un tumore. Servono entrambi i tipi di controllo per restare sani e riparare i danni.',
          },
        ],
      },
      [
        mc('bio-7', 'La proteina Rb ipofosforilata:', ['Attiva sempre E2F liberamente', 'Trattiene E2F e frena il ciclo', 'È un lisosoma', 'Taglia i telomeri'], 1, 'Fosforilazione di Rb libera E2F.'),
        mc('bio-7', 'APC/C nella mitosi promuove:', ['Inizio di G1 senza controlli', 'Degradazione di cicline e securina', 'Solo osmosi', 'Solo trasduzione virale'], 1, 'Permette anafase e uscita da mitosi.'),
        fill('bio-7', 'La morte cellulare programmata si chiama ______.', 'apoptosi', 'Processo ordinato con caspasi.'),
        mc('bio-7', 'Il crossing-over avviene tipicamente in:', ['Mitosi anafase', 'Meiosi (profase I)', 'Solo nel citosol', 'Solo nei virus'], 1, 'Ricombinazione tra omologhi.'),
        mc('bio-7', 'BCL2 è tipicamente:', ['Una famiglia di regolatori dell’apoptosi', 'Un tipo di peptidoglicano', 'Un’unità SI', 'Un decibel'], 0, 'Membri pro- e anti-apoptotici.'),
      ],
      [
        mc('bio-7', 'CDK richiede per essere attiva:', ['Solo DNA libero', 'Associazione a cicline', 'Solo flagelli', 'Solo Gram−'], 1, 'Complessi ciclina-CDK.'),
        fill('bio-7', 'La separazione dei cromatidi fratelli avviene in ______.', 'anafase', 'Dopo attivazione di separasi.'),
        mc('bio-7', 'Un oncosoppressore tipico è:', ['Ras sempre attivo', 'p53 / Rb', 'Una ciclina iperespressa da sola', 'Un virus litico obbligato'], 1, 'Perdita di funzione favorisce tumori.'),
        mc('bio-7', 'La meiosi produce tipicamente cellule:', ['Diploidi identiche', 'Aploide (gameti)', 'Senza DNA', 'Con parete di peptidoglicano'], 1, 'Riduzione a n cromosomi.'),
        mc('bio-7', 'La via apoptotica estrinseca coinvolge tipicamente:', ['Recettori di morte', 'Solo telomerasi', 'Solo Archimede', 'Solo Ohm'], 0, 'Ligandi di morte → caspasi iniziatrici.'),
        mc('bio-7', 'La citodieresi è:', ['La divisione del citoplasma', 'La sintesi di mRNA', 'La metilazione', 'L’ingresso virale'], 0, 'Completa la divisione cellulare.'),
        fill('bio-7', 'Le proteasi dell’apoptosi si chiamano ______.', 'caspasi', 'Caspasi iniziatrici ed effettrici.'),
        mc('bio-7', 'Il punto di restrizione in G1 decide tipicamente:', ['Se entrare in S e progredire il ciclo', 'Solo la lisi batterica', 'Solo il pH', 'Solo la portata'], 0, 'Impegno verso divisione.'),
      ],
      {
        figure: [
          { id: 'bio-7-ciclo', kind: 'svg', caption: 'Ciclo cellulare e fasi', alt: 'Ciclo cellulare' },
        ],
      },
    ),
  )

  return out
}
