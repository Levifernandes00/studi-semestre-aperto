export type Raw =
  | { k: 'mc'; p: string; o: string[]; c: number; e: string }
  | { k: 'f'; p: string; a: string; e: string; alt?: string[] }

type CRow = [string, string, string, string, string, string]

const mc = (p: string, o: string[], c: number, e: string): Raw => ({ k: 'mc', p, o, c, e })
const fill = (p: string, a: string, e: string, alt?: string[]): Raw => ({ k: 'f', p, a, e, alt })
const concepts = (rows: CRow[]): Raw[] => rows.map(([p, a, b, c, d, e]) => mc(p, [a, b, c, d], 0, e))
const numberMc = (p: string, value: number, unit: string, e: string): Raw => {
  const n = (x: number) => `${Number(x.toPrecision(4))}${unit ? ` ${unit}` : ''}`
  return mc(p, [n(value), n(value * 2), n(value / 2), n(value * 10)], 0, e)
}

const chim1Atoms = [
  ['²³Na⁺', 11, 23, 1], ['³⁵Cl⁻', 17, 35, -1], ['⁴⁰Ca²⁺', 20, 40, 2], ['²⁷Al³⁺', 13, 27, 3],
  ['¹⁶O²⁻', 8, 16, -2], ['⁵⁶Fe²⁺', 26, 56, 2], ['³¹P³⁻', 15, 31, -3], ['²⁴Mg²⁺', 12, 24, 2],
  ['¹⁹F⁻', 9, 19, -1], ['⁶⁴Zn²⁺', 30, 64, 2],
] as const
const chim1Shapes = [
  ['CO₂', 'lineare', 'tetraedrica', 'angolare', 'trigonale planare', 'due domini elettronici sul C'],
  ['BF₃', 'trigonale planare', 'piramidale', 'lineare', 'tetraedrica', 'tre legami e nessun doppietto sul B'],
  ['CH₄', 'tetraedrica', 'quadrato planare', 'angolare', 'lineare', 'quattro domini di legame sul C'],
  ['NH₃', 'piramidale trigonale', 'trigonale planare', 'tetraedrica', 'lineare', 'tre legami e un doppietto su N'],
  ['H₂O', 'angolare', 'lineare', 'trigonale planare', 'tetraedrica', 'due legami e due doppietti su O'],
  ['PCl₅', 'bipiramidale trigonale', 'ottaedrica', 'tetraedrica', 'quadrato planare', 'cinque domini di legame'],
  ['SF₆', 'ottaedrica', 'bipiramidale trigonale', 'tetraedrica', 'lineare', 'sei domini di legame'],
  ['BeCl₂', 'lineare', 'angolare', 'tetraedrica', 'piramidale', 'due domini di legame'],
  ['SO₂', 'angolare', 'lineare', 'piramidale', 'tetraedrica', 'tre domini elettronici, uno non legante'],
  ['XeF₄', 'quadrato planare', 'tetraedrica', 'ottaedrica', 'piramidale', 'sei domini, con due doppietti opposti'],
] as const

const chim1Ex: Raw[] = [
  ...concepts([
    ['Quale numero identifica univocamente un elemento?', 'Numero atomico', 'Numero di massa', 'Numero di neutroni', 'Numero quantico principale', 'Il numero atomico Z è il numero di protoni.'],
    ['Quale proprietà aumenta in genere da sinistra a destra in un periodo?', 'Elettronegatività', 'Raggio atomico', 'Carattere metallico', 'Numero di gusci', 'La carica nucleare efficace cresce lungo il periodo.'],
    ['Un legame fra Na e Cl è prevalentemente:', 'ionico', 'metallico', 'covalente apolare', 'a idrogeno', 'La grande differenza di elettronegatività favorisce il trasferimento elettronico.'],
    ['Nella molecola N₂ l’ordine di legame è:', '3', '1', '2', '4', 'I due atomi di azoto condividono tre coppie elettroniche.'],
    ['Quale sistema scambia materia ed energia con l’ambiente?', 'Aperto', 'Chiuso', 'Isolato', 'Adiabatico per definizione', 'Un sistema aperto scambia sia materia sia energia.'],
    ['Una mole contiene quante entità elementari?', '6,022×10²³', '3,011×10²³', '9,81×10²³', '1,000×10²³', 'È il valore della costante di Avogadro.'],
    ['Quale orbitale ha simmetria sferica?', 's', 'p', 'd', 'f', 'Gli orbitali s dipendono radialmente ma non dalla direzione.'],
    ['Il massimo numero di elettroni in un orbitale è:', '2', '1', '4', '8', 'Il principio di Pauli ammette due spin opposti.'],
    ['Durante la fusione di una sostanza pura la temperatura:', 'resta costante a pressione costante', 'aumenta sempre', 'diminuisce sempre', 'diventa zero', 'Il calore fornito è latente finché coesistono le fasi.'],
    ['Quale interazione è presente fra molecole di acqua?', 'Legame a idrogeno', 'Legame ionico', 'Legame metallico', 'Ponte disolfuro', 'H legato a O interagisce con doppietti di altre molecole.'],
  ]),
  ...chim1Atoms.map(([s, z, a, q]) => numberMc(`Quanti elettroni possiede lo ione ${s}?`, z - q, '', `Gli elettroni sono Z−carica: ${z}−(${q})=${z - q}.`)),
  ...chim1Shapes.map(([m, a, b, c, d, why]) => mc(`Secondo VSEPR, la geometria di ${m} è:`, [a, b, c, d], 0, `La geometria deriva da ${why}.`)),
  fill('Il numero di protoni di un atomo è detto numero ___.', 'atomico', 'È indicato con Z.'),
  fill('Atomi dello stesso elemento con diverso numero di neutroni sono ___.', 'isotopi', 'Hanno uguale Z e diverso A.'),
  fill('L’orbitale descritto da n=2 e l=1 è un orbitale ___.', '2p', 'l=1 identifica il sottolivello p.', ['p']),
  fill('La regola che impone l’occupazione singola degli orbitali degeneri è la regola di ___.', 'Hund', 'Gli spin restano paralleli prima dell’appaiamento.'),
  fill('La trasformazione diretta da solido a gas si chiama ___.', 'sublimazione', 'Non passa per la fase liquida.'),
  fill('Il legame dovuto alla condivisione di una coppia elettronica è detto ___.', 'covalente', 'La coppia è condivisa fra due nuclei.'),
  fill('La quantità di sostanza SI si misura in ___.', 'mol', 'La mole è l’unità SI della quantità di sostanza.', ['mole']),
  fill('Un sistema che non scambia né materia né energia è ___.', 'isolato', 'È la definizione termodinamica di sistema isolato.'),
  fill('Gli elementi del gruppo 18 sono detti gas ___.', 'nobili', 'Hanno guscio di valenza completo.'),
  fill('L’energia necessaria per rimuovere un elettrone gassoso è energia di ___.', 'ionizzazione', 'È la prima energia di ionizzazione.'),
]

const chim1Vf = concepts([
  ['Quale specie è paramagnetica allo stato fondamentale?', 'O₂', 'N₂', 'Ne', 'Zn²⁺', 'O₂ possiede due elettroni spaiati negli orbitali π*.'],
  ['Quale sequenza di raggi è corretta per le specie isoelettroniche?', 'O²⁻ > F⁻ > Na⁺ > Mg²⁺', 'Mg²⁺ > Na⁺ > F⁻ > O²⁻', 'F⁻ > O²⁻ > Mg²⁺ > Na⁺', 'Na⁺ > F⁻ > O²⁻ > Mg²⁺', 'A parità di elettroni, il raggio diminuisce all’aumentare di Z.'],
  ['In NH₄⁺ la carica formale dell’azoto è:', '+1', '0', '−1', '+2', 'N forma quattro legami e non conserva doppietti.'],
  ['Quale molecola è apolare pur avendo legami polari?', 'CO₂', 'H₂O', 'NH₃', 'SO₂', 'I dipoli C=O si annullano nella geometria lineare.'],
  ['Per n=4, quanti valori di l sono consentiti?', '4', '3', '5', '8', 'l può valere 0, 1, 2 o 3.'],
  ['Quale transizione dell’idrogeno emette il fotone più energetico?', 'n=4 → n=1', 'n=3 → n=2', 'n=2 → n=1', 'n=4 → n=3', 'L’energia emessa cresce con la differenza fra i livelli.'],
  ['In SF₄ la geometria molecolare è:', 'altalena', 'tetraedrica', 'quadrato planare', 'bipiramidale trigonale', 'Cinque domini elettronici includono un doppietto equatoriale.'],
  ['Quale solido conduce elettricità allo stato fuso ma non solido?', 'NaCl', 'grafite', 'rame', 'silicio', 'Nel fuso gli ioni diventano mobili.'],
  ['Un processo endotermico in un sistema chiuso ha:', 'q>0 per il sistema', 'q<0 per il sistema', 'ΔU sempre nullo', 'temperatura sempre crescente', 'Per convenzione il calore assorbito dal sistema è positivo.'],
  ['Quale configurazione viola Pauli?', 'Due elettroni nello stesso orbitale con uguale spin', 'Due elettroni in 2p diversi con spin parallelo', 'Un elettrone in 1s', '2p⁶', 'Due elettroni nello stesso orbitale devono avere spin opposto.'],
  ['Il punto triplo rappresenta:', 'coesistenza di tre fasi', 'fine della curva liquido-gas', 'fusione a 1 atm', 'assenza di fase solida', 'Tre fasi sono simultaneamente in equilibrio.'],
  ['Fra Cl e Cl⁻, quale ha maggiore raggio?', 'Cl⁻', 'Cl', 'Sono uguali', 'Dipende solo dalla massa', 'L’elettrone aggiunto aumenta repulsione e dimensione.'],
])

const chim2Solutions = [
  [0.10, 0.50], [0.25, 0.80], [0.40, 0.25], [0.60, 1.50], [0.75, 0.40],
  [1.20, 0.25], [1.50, 0.60], [2.00, 0.35], [2.50, 0.20], [3.00, 0.15],
] as const
const chim2Mass = [
  [5, 100], [12, 300], [18, 120], [25, 500], [8, 200],
  [15, 250], [30, 600], [4, 80], [22, 400], [9, 150],
] as const

const chim2Ex: Raw[] = [
  ...concepts([
    ['La molarità è definita come:', 'mol di soluto/L di soluzione', 'g di soluto/L di solvente', 'mol di solvente/kg di soluto', 'g di soluzione/mol di soluto', 'La molarità usa il volume finale della soluzione.'],
    ['La percentuale m/m esprime:', 'g di soluto per 100 g di soluzione', 'mol per litro', 'mL di soluto per litro', 'g per 100 mL di solvente', 'Numeratore e denominatore sono masse.'],
    ['Aggiungendo solvente a una soluzione, le moli di soluto:', 'restano costanti', 'aumentano', 'diminuiscono', 'raddoppiano', 'Una diluizione modifica volume e concentrazione, non il soluto.'],
    ['La pressione osmotica ideale segue:', 'π=iMRT', 'π=MV/R', 'π=mgh', 'π=RT/M', 'È l’equazione di van ’t Hoff.'],
    ['Un eritrocita in soluzione fortemente ipotonica tende a:', 'subire emolisi', 'crenarsi', 'restare invariato', 'perdere tutto il potassio per diffusione semplice', 'L’acqua entra osmoticamente e può rompere la membrana.'],
    ['Una soluzione ipertonica rispetto al plasma provoca inizialmente:', 'uscita di acqua dalle cellule', 'ingresso di acqua nelle cellule', 'nessun flusso', 'lisi osmotica', 'L’acqua migra verso il compartimento più concentrato.'],
    ['Quale proprietà è colligativa?', 'Abbassamento crioscopico', 'Colore', 'Viscosità', 'Densità elettronica', 'Dipende dal numero di particelle disperse.'],
    ['A pari molarità ideale, quale ha maggiore effetto osmotico?', 'CaCl₂', 'glucosio', 'urea', 'etanolo', 'CaCl₂ produce circa tre particelle per unità formula.'],
    ['L’edema può derivare da:', 'ridotta pressione oncotica plasmatica', 'aumento dell’albumina plasmatica', 'assenza di filtrazione capillare', 'riduzione della permeabilità capillare', 'Meno proteine plasmatiche riducono il richiamo di acqua.'],
    ['Una soluzione satura è in equilibrio con:', 'soluto non disciolto', 'solo solvente puro', 'gas ideale', 'membrana semipermeabile', 'Alla saturazione dissoluzione e precipitazione si compensano.'],
  ]),
  ...chim2Solutions.map(([m, v]) => numberMc(`Quante moli sono contenute in ${v} L di soluzione ${m} M?`, m * v, 'mol', `n=MV=${m}×${v}.`)),
  ...chim2Mass.map(([solute, solution]) => numberMc(`Qual è la percentuale m/m di ${solute} g di soluto in ${solution} g di soluzione?`, 100 * solute / solution, '%', 'La percentuale m/m è 100·m(soluto)/m(soluzione).')),
  fill('Nella diluizione vale la relazione M₁V₁ = ___.', 'M₂V₂', 'Le moli di soluto si conservano.'),
  fill('Il passaggio spontaneo del solvente attraverso una membrana semipermeabile è detto ___.', 'osmosi', 'Il solvente va verso il lato a maggiore attività del soluto.'),
  fill('La pressione necessaria ad arrestare l’osmosi è la pressione ___.', 'osmotica', 'È indicata con π.'),
  fill('La diminuzione del punto di congelamento è detta abbassamento ___.', 'crioscopico', 'È una proprietà colligativa.'),
  fill('La rottura osmotica degli eritrociti si chiama ___.', 'emolisi', 'Avviene in ambiente molto ipotonico.'),
  fill('La contrazione di un eritrocita in ambiente ipertonico è detta ___.', 'crenazione', 'La cellula perde acqua.'),
  fill('Una soluzione con stessa pressione osmotica del plasma è ___.', 'isotonica', 'Non produce flusso osmotico netto iniziale.'),
  fill('Le moli di soluto per kg di solvente definiscono la ___.', 'molalità', 'La molalità non dipende dalla temperatura.'),
  fill('Il principale contributo alla pressione oncotica plasmatica viene dall’___.', 'albumina', 'L’albumina è la proteina plasmatica più abbondante.'),
  fill('Per un non elettrolita ideale, il fattore di van ’t Hoff vale ___.', '1', 'Il soluto non si dissocia.'),
]

const chim2Vf = concepts([
  ['Due soluzioni ideali 0,10 M, una di glucosio e una di NaCl, hanno π in rapporto circa:', '1:2', '2:1', '1:1', '1:3', 'NaCl idealmente dissocia in due ioni.'],
  ['Per preparare 250 mL di NaCl 0,20 M da una soluzione 1,0 M servono:', '50 mL', '20 mL', '100 mL', '200 mL', 'V₁=M₂V₂/M₁=50 mL.'],
  ['Una soluzione al 10% m/m contiene 20 g di soluto. La massa totale è:', '200 g', '180 g', '220 g', '2 g', '20/m=0,10, quindi m=200 g.'],
  ['Se π=2,46 atm a 300 K per un non elettrolita, M vale circa:', '0,100 M', '1,00 M', '0,010 M', '2,46 M', 'M=π/RT≈2,46/(0,0821·300).'],
  ['Quale soluzione ha il punto di congelamento più basso idealmente?', '0,20 m CaCl₂', '0,20 m NaCl', '0,20 m glucosio', '0,10 m CaCl₂', 'Conta i·m: circa 0,60 è il valore maggiore.'],
  ['La somministrazione rapida di acqua distillata endovena causerebbe:', 'emolisi', 'crenazione', 'edema solo extracellulare senza ingresso cellulare', 'nessun effetto osmotico', 'Il plasma diverrebbe gravemente ipotonico.'],
  ['Un aumento della pressione idrostatica capillare favorisce:', 'edema interstiziale', 'riassorbimento capillare', 'aumento della pressione oncotica', 'crenazione eritrocitaria', 'Spinge più liquido verso l’interstizio.'],
  ['Sciogliendo 0,5 mol in 2 kg di solvente, la molalità è:', '0,25 m', '1,0 m', '0,50 m', '4,0 m', 'm=n/kg solvente=0,5/2.'],
  ['Quale grandezza resta più stabile con la temperatura?', 'Molalità', 'Molarità', 'Volume percentuale', 'Densità', 'La molalità dipende da masse, non dal volume.'],
  ['Una membrana permeabile ad acqua e urea ma non a Na⁺ rende persistente soprattutto il gradiente di:', 'Na⁺', 'urea', 'acqua', 'temperatura', 'L’urea diffusibile non sostiene a lungo la tonicità.'],
  ['In una soluzione reale concentrata, i può differire dall’intero atteso perché:', 'le interazioni ioniche riducono l’indipendenza delle particelle', 'la massa scompare', 'R cambia', 'il solvente non ha molecole', 'Associazione e non idealità modificano l’effetto colligativo.'],
  ['Aggiungere NaCl a una soluzione acquosa ne causa idealmente:', 'innalzamento ebullioscopico', 'innalzamento crioscopico', 'aumento della tensione di vapore', 'riduzione delle particelle', 'Il soluto non volatile abbassa la tensione di vapore.'],
])

const chim3Stoich = [
  ['In 2 H₂ + O₂ → 2 H₂O, quante mol di H₂O si ottengono da 3 mol di H₂ con O₂ in eccesso?', 3, 'Il rapporto H₂:H₂O è 1:1.'],
  ['In N₂ + 3 H₂ → 2 NH₃, quante mol di NH₃ si ottengono da 6 mol di H₂?', 4, 'Tre mol di H₂ producono due mol di NH₃.'],
  ['In 2 KClO₃ → 2 KCl + 3 O₂, quante mol di O₂ derivano da 4 mol di KClO₃?', 6, 'Il rapporto KClO₃:O₂ è 2:3.'],
  ['In CaCO₃ → CaO + CO₂, quante mol di CO₂ derivano da 5 mol di CaCO₃?', 5, 'Il rapporto stechiometrico è 1:1.'],
  ['In 2 Na + Cl₂ → 2 NaCl, quante mol di NaCl si formano da 3 mol di Cl₂ con Na in eccesso?', 6, 'Una mole di Cl₂ produce due mol di NaCl.'],
  ['In C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O, quante mol di CO₂ derivano da 2 mol di propano?', 6, 'Una mole di propano produce tre mol di CO₂.'],
  ['In 4 Fe + 3 O₂ → 2 Fe₂O₃, quante mol di Fe₂O₃ derivano da 8 mol di Fe?', 4, 'Quattro mol di Fe producono due mol di Fe₂O₃.'],
  ['In 2 CO + O₂ → 2 CO₂, quante mol di O₂ servono per reagire con 6 mol di CO?', 3, 'Il rapporto CO:O₂ è 2:1.'],
  ['In H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O, quante mol di NaOH neutralizzano 3 mol di H₂SO₄?', 6, 'Servono due mol di NaOH per mole di H₂SO₄.'],
  ['In P₄ + 5 O₂ → P₄O₁₀, quante mol di O₂ servono per 2 mol di P₄?', 10, 'Il rapporto P₄:O₂ è 1:5.'],
] as const

const chim3Ex: Raw[] = [
  ...concepts([
    ['In una reazione chimica bilanciata si conserva sempre:', 'il numero di atomi di ogni elemento', 'il numero di molecole', 'il volume', 'la concentrazione', 'La conservazione della massa impone uguali atomi ai due lati.'],
    ['Il reagente limitante è quello che:', 'si consuma per primo', 'ha massa maggiore', 'è sempre un catalizzatore', 'resta in eccesso', 'Determina la quantità massima di prodotto.'],
    ['Un catalizzatore aumenta la velocità perché:', 'riduce l’energia di attivazione', 'aumenta ΔG della reazione', 'sposta sempre l’equilibrio', 'aumenta K', 'Offre un cammino cinetico alternativo.'],
    ['All’equilibrio dinamico:', 'le velocità diretta e inversa sono uguali', 'le concentrazioni sono tutte uguali', 'le reazioni cessano', 'K vale sempre 1', 'Le trasformazioni continuano senza variazioni macroscopiche.'],
    ['Per una reazione esotermica, aumentare T sposta l’equilibrio:', 'verso i reagenti', 'verso i prodotti', 'non lo modifica mai', 'verso il catalizzatore', 'Il calore si comporta come un prodotto.'],
    ['In Kc non compaiono normalmente:', 'solidi puri', 'soluti', 'gas', 'specie acquose', 'L’attività di un solido puro è unitaria.'],
    ['Ksp descrive l’equilibrio di:', 'dissoluzione di un sale poco solubile', 'combustione', 'fusione', 'neutralizzazione completa', 'È il prodotto di solubilità.'],
    ['Se Q<K, la reazione netta procede:', 'verso i prodotti', 'verso i reagenti', 'in nessuna direzione', 'solo con catalizzatore', 'Il sistema evolve aumentando Q fino a K.'],
    ['La velocità iniziale aumenta spesso con la concentrazione perché:', 'cresce la frequenza delle collisioni efficaci', 'diminuisce il numero di particelle', 'K diventa infinito', 'ΔH cambia segno', 'Più particelle per volume danno più collisioni.'],
    ['La resa percentuale è:', 'resa reale/resa teorica ×100', 'resa teorica/resa reale ×100', 'massa reagenti/moli ×100', 'K×100', 'Confronta prodotto ottenuto e massimo stechiometrico.'],
  ]),
  ...chim3Stoich.map(([p, value, explanation]) => numberMc(p, value, 'mol', explanation)),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => numberMc(`Per una reazione del primo ordine con k=0,0${x} s⁻¹ e [A]=0,20 M, qual è v?`, Number(`0.0${x}`) * 0.2, 'M s⁻¹', 'Per il primo ordine v=k[A].')),
  fill('La quantità massima di prodotto prevista dai coefficienti è la resa ___.', 'teorica', 'Deriva dal reagente limitante.'),
  fill('La minima energia richiesta per una collisione efficace è energia di ___.', 'attivazione', 'È indicata spesso con Eₐ.'),
  fill('La costante che descrive l’equilibrio in concentrazione è ___.', 'Kc', 'Usa le concentrazioni molari all’equilibrio.', ['K_c']),
  fill('Il principio che prevede la risposta a una perturbazione è di ___.', 'Le Chatelier', 'Il sistema contrasta la perturbazione.'),
  fill('Quando il prodotto ionico supera Ksp avviene ___.', 'precipitazione', 'La soluzione è sovrasatura rispetto al sale.'),
  fill('La somma degli esponenti nella legge cinetica è l’ordine ___.', 'globale', 'Gli ordini parziali si sommano.'),
  fill('Una sostanza che accelera una reazione senza consumarsi globalmente è un ___.', 'catalizzatore', 'Viene rigenerata nel meccanismo.'),
  fill('Il rapporto tra quantità ottenuta e teorica, in percentuale, è la ___.', 'resa percentuale', 'Misura l’efficienza del processo.', ['resa']),
  fill('Lo stato in cui velocità diretta e inversa coincidono è equilibrio ___.', 'dinamico', 'Le reazioni microscopiche continuano.'),
  fill('Il reagente presente oltre la quantità stechiometrica è in ___.', 'eccesso', 'Non viene consumato completamente.'),
]

const chim3Vf = concepts([
  ['Per 2A+B→C, raddoppiando [A] la velocità quadruplica. L’ordine in A è:', '2', '1', '0', '4', '2ⁿ=4 implica n=2.'],
  ['Per una reazione del primo ordine, il tempo di dimezzamento:', 'è indipendente da [A]₀', 'raddoppia con [A]₀', 'vale sempre 1/k', 'dipende dalla stechiometria soltanto', 't½=ln2/k.'],
  ['Aggiungere un gas inerte a volume costante a un equilibrio gassoso ideale:', 'non sposta l’equilibrio', 'lo sposta sempre a destra', 'aumenta K', 'annulla Q', 'Le pressioni parziali dei reagenti non cambiano.'],
  ['Per N₂+3H₂⇌2NH₃, diminuire il volume favorisce:', 'NH₃', 'N₂ e H₂', 'nessun lato', 'la decomposizione del catalizzatore', 'Si favorisce il lato con meno moli gassose.'],
  ['Se K=10⁸, all’equilibrio sono favoriti:', 'i prodotti', 'i reagenti', 'solo i solidi', 'né prodotti né reagenti', 'Un K molto grande indica equilibrio spostato a destra.'],
  ['Per AgCl(s)⇌Ag⁺+Cl⁻, aggiungere NaCl:', 'riduce la solubilità', 'aumenta Ksp', 'aumenta la solubilità', 'non cambia [Ag⁺]', 'Lo ione comune sposta l’equilibrio a sinistra.'],
  ['Se la solubilità molare di CaF₂ è s, Ksp vale:', '4s³', 's²', '2s³', 's', '[Ca²⁺]=s e [F⁻]=2s.'],
  ['Un catalizzatore modifica:', 'la velocità con cui si raggiunge l’equilibrio', 'K', 'ΔG°', 'la composizione finale di equilibrio', 'Accelera nello stesso modo reazione diretta e inversa.'],
  ['In un passaggio elementare bimolecolare A+B, la legge attesa è:', 'v=k[A][B]', 'v=k[A]²', 'v=k[B]²', 'v=k', 'La molecolarità elementare determina gli esponenti.'],
  ['Se Q>K, il sistema evolve:', 'verso i reagenti', 'verso i prodotti', 'aumentando K', 'precipitando sempre', 'Deve ridurre Q fino al valore K.'],
  ['La pendenza di ln[A] contro t per un primo ordine è:', '−k', '+k', '1/k', '−1/k', 'La legge integrata è ln[A]=ln[A]₀−kt.'],
  ['Mescolando Ag⁺ e Cl⁻ con prodotto ionico uguale a Ksp:', 'la soluzione è appena satura', 'precipita tutto AgCl', 'il sale è infinitamente solubile', 'Ksp aumenta', 'Q=Ksp indica equilibrio di saturazione.'],
])

const chim4Acids = [
  [2, 0.01], [3, 0.001], [1, 0.1], [4, 0.0001], [5, 0.00001],
  [2.3, 10 ** -2.3], [3.3, 10 ** -3.3], [1.7, 10 ** -1.7], [4.3, 10 ** -4.3], [2.7, 10 ** -2.7],
] as const
const chim4Buffers = [
  [4.76, 1], [4.76, 10], [4.76, 0.1], [6.10, 2], [6.10, 0.5],
  [7.21, 1], [7.21, 4], [9.25, 1], [9.25, 0.2], [3.75, 5],
] as const

const chim4Ex: Raw[] = [
  ...concepts([
    ['Secondo Brønsted, un acido è una specie che:', 'cede H⁺', 'cede elettroni', 'accetta neutroni', 'libera sempre OH⁻', 'Un acido è donatore di protoni.'],
    ['A 25 °C, una soluzione neutra ha pH:', '7', '0', '14', '1', 'Kw=10⁻¹⁴ e [H⁺]=[OH⁻]=10⁻⁷ M.'],
    ['Un acido forte in acqua:', 'si ionizza praticamente completamente', 'non cede protoni', 'ha sempre pH 0', 'è necessariamente concentrato', 'Forza e concentrazione sono concetti distinti.'],
    ['Un tampone contiene tipicamente:', 'acido debole e base coniugata', 'acido forte soltanto', 'sale insolubile soltanto', 'acqua pura', 'La coppia coniugata assorbe piccole aggiunte di H⁺ o OH⁻.'],
    ['Nell’equazione di Henderson-Hasselbalch compare:', 'log([base]/[acido])', 'log([acido]/[base]) con segno positivo', '[H⁺][OH⁻]', 'solo la temperatura', 'pH=pKa+log([A⁻]/[HA]).'],
    ['L’ossidazione comporta:', 'perdita di elettroni', 'acquisto di elettroni', 'riduzione del numero di ossidazione', 'acquisto obbligatorio di H⁺', 'LEO: loss of electrons is oxidation.'],
    ['L’agente ossidante:', 'si riduce', 'si ossida', 'non scambia elettroni', 'è sempre O₂', 'Accetta elettroni dalla specie ossidata.'],
    ['Un potenziale standard di riduzione più positivo indica:', 'maggiore tendenza a ridursi', 'maggiore tendenza a ossidarsi', 'assenza di reattività', 'pH sempre maggiore', 'La semireazione di riduzione è più favorita.'],
    ['Per una pila galvanica spontanea E°cella è:', 'positivo', 'negativo', 'zero sempre', 'uguale al pH', 'ΔG°=−nFE°: spontaneità richiede E°>0.'],
    ['La base coniugata di H₂CO₃ è:', 'HCO₃⁻', 'CO₃²⁻', 'H₃CO₃⁺', 'OH⁻', 'Si ottiene rimuovendo un protone.'],
  ]),
  ...chim4Acids.map(([ph, h]) => numberMc(`Una soluzione ha [H⁺]=${Number(h.toPrecision(3))} M. Qual è circa il pH?`, ph, '', 'pH=−log₁₀[H⁺].')),
  ...chim4Buffers.map(([pka, ratio]) => numberMc(`Per un tampone con pKa=${pka} e [base]/[acido]=${ratio}, qual è il pH?`, pka + Math.log10(ratio), '', 'Si applica pH=pKa+log([base]/[acido]).')),
  fill('Il logaritmo negativo della concentrazione di H⁺ è il ___.', 'pH', 'pH=−log[H⁺].'),
  fill('Il prodotto [H⁺][OH⁻] dell’acqua è indicato con ___.', 'Kw', 'A 25 °C vale 10⁻¹⁴.', ['K_w']),
  fill('Una specie che accetta una coppia elettronica è un acido di ___.', 'Lewis', 'La definizione di Lewis è elettronica.'),
  fill('Quando [base]=[acido], Henderson-Hasselbalch dà pH = ___.', 'pKa', 'Il logaritmo del rapporto unitario è zero.', ['pK_a']),
  fill('L’acquisto di elettroni è una ___.', 'riduzione', 'Il numero di ossidazione diminuisce.'),
  fill('L’elettrodo dove avviene l’ossidazione è l’___.', 'anodo', 'AnOx: anodo-ossidazione.'),
  fill('L’elettrodo dove avviene la riduzione è il ___.', 'catodo', 'RedCat: riduzione-catodo.'),
  fill('La relazione ΔG° = −nF___ collega energia e potenziale.', 'E°', 'E° è il potenziale standard di cella.', ['E']),
  fill('Il numero di ossidazione dell’ossigeno nei perossidi è ___.', '−1', 'Il legame O−O porta a −1 per ciascun O.', ['-1']),
  fill('Il tampone extracellulare principale usa la coppia H₂CO₃/___ .', 'HCO₃⁻', 'È il sistema bicarbonato.', ['bicarbonato']),
]

const chim4Vf = concepts([
  ['Un acido debole HA 0,10 M con Ka=10⁻⁵ ha pH circa:', '3', '5', '1', '9', '[H⁺]≈√(KaC)=10⁻³.'],
  ['Al punto di semiequivalenza della titolazione di HA con base forte:', 'pH=pKa', 'pH=7 sempre', 'pH=pKb', '[HA]=0', 'Le concentrazioni di HA e A⁻ sono uguali.'],
  ['Diluendo dieci volte un acido forte monoprotico, il pH:', 'aumenta di 1', 'diminuisce di 1', 'non cambia', 'aumenta di 10', '[H⁺] diminuisce di un fattore 10.'],
  ['Quale coppia prepara un tampone?', 'CH₃COOH/CH₃COONa', 'HCl/NaCl', 'NaOH/KOH', 'HNO₃/HCl', 'Servono un acido debole e la sua base coniugata.'],
  ['Se pH=pKa+1, il rapporto [A⁻]/[HA] è:', '10', '1', '0,1', '2', 'Il logaritmo del rapporto vale 1.'],
  ['Nella pila Zn|Zn²⁺||Cu²⁺|Cu, gli elettroni fluiscono:', 'da Zn a Cu', 'da Cu a Zn', 'dal ponte salino a Zn', 'dal catodo al sale', 'Zn si ossida all’anodo.'],
  ['Con E°Cu²⁺/Cu=+0,34 V ed E°Zn²⁺/Zn=−0,76 V, E°cella è:', '+1,10 V', '−1,10 V', '+0,42 V', '−0,42 V', 'E°catodo−E°anodo=0,34−(−0,76).'],
  ['In MnO₄⁻, il numero di ossidazione del Mn è:', '+7', '+4', '+2', '−1', 'x+4(−2)=−1, quindi x=+7.'],
  ['Una grande capacità tamponante richiede soprattutto:', 'concentrazioni elevate di entrambe le forme', 'pH molto lontano da pKa', 'solo molto solvente', 'assenza della base coniugata', 'La capacità cresce con la quantità della coppia.'],
  ['A 25 °C, pH 9 implica pOH:', '5', '9', '14', '−5', 'pH+pOH=14.'],
  ['In una cella elettrolitica, la reazione globale è:', 'forzata da energia elettrica', 'sempre spontanea', 'priva di redox', 'a Ecell positiva senza alimentazione', 'Una sorgente esterna guida una reazione non spontanea.'],
  ['Disproporzione significa che la stessa specie:', 'si ossida e si riduce', 'agisce solo da acido', 'precipita', 'non cambia numero di ossidazione', 'Forma prodotti con numeri di ossidazione maggiore e minore.'],
])

const chim5Series = [
  [1, 'metano'], [2, 'etano'], [3, 'propano'], [4, 'butano'], [5, 'pentano'],
  [6, 'esano'], [7, 'eptano'], [8, 'ottano'], [9, 'nonano'], [10, 'decano'],
] as const
const chim5Unsat = [
  [2, 'etene'], [3, 'propene'], [4, '1-butene'], [5, '1-pentene'], [6, '1-esene'],
  [2, 'etino'], [3, 'propino'], [4, '1-butino'], [5, '1-pentino'], [6, '1-esino'],
] as const

const chim5Ex: Raw[] = [
  ...concepts([
    ['Un carbonio sp³ ha geometria:', 'tetraedrica', 'lineare', 'trigonale planare', 'ottaedrica', 'Quattro orbitali ibridi equivalenti puntano ai vertici di un tetraedro.'],
    ['Un carbonio sp² forma tipicamente angoli di:', '120°', '109,5°', '180°', '90°', 'La geometria è trigonale planare.'],
    ['Un carbonio sp ha geometria:', 'lineare', 'angolare', 'tetraedrica', 'piramidale', 'I due orbitali ibridi sono opposti.'],
    ['Gli enantiomeri sono:', 'immagini speculari non sovrapponibili', 'isomeri costituzionali identici', 'conformeri sempre achirali', 'molecole con formula diversa', 'Hanno configurazione opposta in tutti i centri stereogenici.'],
    ['La rotazione attorno a C=C è impedita soprattutto dal legame:', 'π', 'σ', 'a idrogeno', 'ionico', 'La rotazione romperebbe la sovrapposizione laterale p.'],
    ['Il benzene è aromatico perché possiede:', '6 elettroni π delocalizzati', '4 elettroni π', 'solo legami singoli', 'carboni sp³', 'Rispetta la regola 4n+2 con n=1.'],
    ['La formula generale degli alcani aciclici è:', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ', 'Sono idrocarburi saturi aciclici.'],
    ['L’addizione di Br₂ a un alchene:', 'consuma il doppio legame', 'produce sempre un alcano senza bromo', 'è una sostituzione nucleofila', 'non avviene', 'Si forma un dialogenuro vicinale.'],
    ['Un alogenuro alchilico contiene il gruppo:', 'C−X', 'O−H', 'C=O', 'N−H soltanto', 'X è F, Cl, Br o I.'],
    ['Nella regola di Markovnikov, H si addiziona al carbonio:', 'già più ricco di H', 'più sostituito', 'aromatico soltanto', 'con carica negativa finale', 'Si forma l’intermedio carbocationico più stabile.'],
  ]),
  ...chim5Series.map(([n, name]) => mc(`Qual è il nome dell’alcano lineare C${n}H${2 * n + 2}?`, [name, `${name}ne`, `${name}olo`, `${name}ale`], 0, `L’alcano lineare con ${n} atomi di carbonio è ${name}.`)),
  ...chim5Unsat.map(([n, name], i) => {
    const formula = i < 5 ? `C${n}H${2 * n}` : `C${n}H${2 * n - 2}`
    return mc(`Quale nome corrisponde all’idrocarburo ${formula} della serie indicata?`, [name, `${name}ano`, `${name}olo`, 'benzene'], 0, `${formula} appartiene alla serie di ${name}.`)
  }),
  fill('L’ibridazione dei carboni nel benzene è ___.', 'sp²', 'Ogni carbonio è trigonale planare.', ['sp2']),
  fill('Isomeri che differiscono per connettività sono isomeri ___.', 'costituzionali', 'Hanno la stessa formula molecolare ma legami diversi.', ['di struttura']),
  fill('Una miscela 1:1 di due enantiomeri è detta ___.', 'racemica', 'La rotazione ottica netta si annulla.', ['racemo']),
  fill('Il legame formato per sovrapposizione laterale di orbitali p è ___.', 'π', 'È il legame pi greco.', ['pi']),
  fill('La reazione tipica degli alcani con alogeni è una sostituzione ___.', 'radicalica', 'È avviata da luce o calore.'),
  fill('La perdita di HX da un alogenuro forma spesso un ___.', 'alchene', 'È una eliminazione.'),
  fill('La regola 4n+2 per l’aromaticità è attribuita a ___.', 'Hückel', 'Conta gli elettroni π del ciclo planare coniugato.', ['Huckel']),
  fill('Il gruppo C=C caratterizza gli ___.', 'alcheni', 'Sono idrocarburi insaturi con doppio legame.'),
  fill('Il gruppo C≡C caratterizza gli ___.', 'alchini', 'Contengono un triplo legame.'),
  fill('Un carbonio legato a quattro sostituenti diversi è un centro ___.', 'stereogenico', 'Può originare una coppia di enantiomeri.', ['chirale']),
]

const chim5Vf = concepts([
  ['Quanti legami σ e π contiene HC≡CH?', '3 σ e 2 π', '1 σ e 2 π', '2 σ e 3 π', '5 σ e 0 π', 'Il C≡C ha 1σ+2π e vi sono due C−H σ.'],
  ['Il 2-butene cis e trans sono:', 'diastereoisomeri', 'enantiomeri', 'conformeri identici', 'isomeri costituzionali', 'Non sono immagini speculari e differiscono nella geometria del doppio legame.'],
  ['Quale carbocatione è più stabile in condizioni ordinarie?', 'terziario', 'metilico', 'primario', 'vinilico', 'I gruppi alchilici stabilizzano per iperconiugazione ed effetto induttivo.'],
  ['Una reazione SN2 è favorita da:', 'substrato metilico e nucleofilo forte', 'substrato terziario ingombrato', 'carbocatione libero', 'nucleofilo molto debole soltanto', 'L’attacco concertato risente dell’ingombro sterico.'],
  ['La stereochimica al carbonio attaccato in SN2 subisce:', 'inversione', 'racemizzazione completa', 'ritenzione obbligatoria', 'nessun cambiamento mai', 'L’attacco avviene dal lato opposto al gruppo uscente.'],
  ['Quale specie è antiaromatica se planare?', 'ciclobutadiene', 'benzene', 'catione ciclopropenile', 'anione ciclopentadienile', 'Ha 4 elettroni π, cioè 4n.'],
  ['L’idrogenazione completa di un alchino richiede per mole:', '2 mol H₂', '1 mol H₂', '3 mol H₂', '0,5 mol H₂', 'Il triplo legame viene ridotto fino all’alcano.'],
  ['L’addizione di HBr al propene senza perossidi dà soprattutto:', '2-bromopropano', '1-bromopropano', '1,2-dibromopropano', 'propano', 'L’addizione segue Markovnikov.'],
  ['Quale composto può mostrare isomeria E/Z?', '2-pentene', 'propene', '2-metilpropene', 'etano', 'Ciascun carbonio del doppio legame ha due sostituenti diversi.'],
  ['Nel cicloesano la conformazione più stabile è:', 'sedia', 'barca', 'planare', 'quadrato planare', 'La sedia minimizza tensioni angolari e torsionali.'],
  ['Il gruppo uscente migliore fra gli alogenuri è in genere:', 'I⁻', 'F⁻', 'Cl⁻', 'Br⁻', 'I⁻ è la base più debole e polarizzabile della serie.'],
  ['Il naftalene possiede quanti elettroni π?', '10', '6', '8', '12', 'Il sistema aromatico fuso rispetta 4n+2 con n=2.'],
])

const chim6Groups = [
  ['CH₃OH', 'alcol', 'etere', 'aldeide', 'ammina'], ['C₆H₅OH', 'fenolo', 'alcol terziario', 'chetone', 'ammide'],
  ['CH₃OCH₃', 'etere', 'estere', 'alcol', 'tiolo'], ['CH₃SH', 'tiolo', 'solfuro inorganico', 'ammina', 'aldeide'],
  ['CH₃CHO', 'aldeide', 'chetone', 'acido', 'estere'], ['CH₃COCH₃', 'chetone', 'aldeide', 'etere', 'ammide'],
  ['CH₃COOH', 'acido carbossilico', 'estere', 'alcol', 'chetone'], ['CH₃COOCH₃', 'estere', 'etere', 'ammide', 'anidride'],
  ['CH₃NH₂', 'ammina', 'ammide', 'nitrile', 'tiolo'], ['CH₃CONH₂', 'ammide', 'ammina', 'estere', 'aldeide'],
] as const
const chim6Products = [
  ['etanolo ossidato blandamente', 'etanale', 'etano', 'etene', 'etere dietilico'],
  ['2-propanolo ossidato', 'propanone', 'propanale', 'acido propanoico', 'propene'],
  ['aldeide ossidata', 'acido carbossilico', 'chetone', 'etere', 'ammina'],
  ['chetone ridotto', 'alcol secondario', 'alcol primario', 'acido', 'estere'],
  ['acido + alcol', 'estere + acqua', 'ammide + H₂', 'aldeide + O₂', 'etere + CO₂'],
  ['estere idrolizzato', 'acido e alcol', 'due chetoni', 'ammina e alcano', 'solo acqua'],
  ['acil cloruro + ammina', 'ammide', 'etere', 'chetone', 'tiolo'],
  ['aldeide ridotta', 'alcol primario', 'alcol secondario', 'acido', 'ammide'],
  ['nitrile idrolizzato completamente', 'acido carbossilico', 'alchene', 'etere', 'tiolo'],
  ['ammide idrolizzata', 'acido carbossilico e specie ammoniacale', 'aldeide e H₂', 'chetone soltanto', 'alcol e etere'],
] as const

const chim6Ex: Raw[] = [
  ...concepts([
    ['Il gruppo funzionale degli alcoli è:', '−OH', '−CHO', '−COOH', '−NH₂ soltanto', 'Negli alcoli OH è legato a un carbonio saturo.'],
    ['I fenoli sono più acidi degli alcoli alifatici perché:', 'il fenossido è stabilizzato per risonanza', 'hanno meno ossigeno', 'sono sempre ionici', 'il benzene dona protoni', 'La carica negativa si delocalizza nell’anello.'],
    ['Gli eteri hanno formula funzionale:', 'R−O−R′', 'R−CO−R′', 'R−S−H', 'R−NH−CO−R′', 'L’ossigeno collega due gruppi carboniosi.'],
    ['L’ossidazione di due tioli può formare:', 'un disolfuro', 'un estere', 'un acetale', 'un nitrile', 'Due gruppi −SH formano R−S−S−R.'],
    ['Un’aldeide possiede il gruppo:', '−CHO', '−CO− interno', '−COOH', '−CONH₂', 'Il carbonile aldeidico porta almeno un H.'],
    ['Un chetone ha il carbonile legato a:', 'due gruppi carboniosi', 'un H e un OH', 'due ossigeni', 'un azoto soltanto', 'La forma generale è R−CO−R′.'],
    ['Gli acidi carbossilici formano spesso dimeri tramite:', 'legami a idrogeno', 'legami metallici', 'legami ionici obbligatori', 'ponti disolfuro', 'Due gruppi carbossilici possono formare due legami a H.'],
    ['Un’ammide deriva formalmente da:', 'acido carbossilico e ammina', 'alcano e alchene', 'etere e tiolo', 'chetone e metallo', 'OH acilico è sostituito da un gruppo amminico.'],
    ['Le ammine sono basi perché l’azoto:', 'possiede un doppietto libero', 'ha sempre carica positiva', 'cede sempre OH⁻', 'non lega H', 'Il doppietto può accettare H⁺.'],
    ['La saponificazione è:', 'idrolisi basica di esteri', 'riduzione di aldeidi', 'ossidazione di ammine', 'formazione di eteri', 'Produce carbossilato e alcol.'],
  ]),
  ...chim6Groups.map(([formula, a, b, c, d]) => mc(`A quale classe appartiene ${formula}?`, [a, b, c, d], 0, `${formula} contiene il gruppo caratteristico della classe ${a}.`)),
  ...chim6Products.map(([start, a, b, c, d]) => mc(`Il prodotto principale di “${start}” è:`, [a, b, c, d], 0, `La trasformazione funzionale porta a ${a}.`)),
  fill('Il gruppo −SH caratterizza i ___.', 'tioli', 'Sono analoghi solforati degli alcoli.'),
  fill('Il carbonile terminale −CHO caratterizza le ___.', 'aldeidi', 'Il carbonio carbonilico è legato a H.'),
  fill('Il gruppo −COOH è detto gruppo ___.', 'carbossilico', 'Unisce carbonile e ossidrile.'),
  fill('La reazione fra acido carbossilico e alcol è una ___.', 'esterificazione', 'Produce estere e acqua.'),
  fill('L’idrolisi basica di un estere è detta ___.', 'saponificazione', 'Forma un sale carbossilato.'),
  fill('Il legame −CO−NH− è un legame ___.', 'ammidico', 'Nelle proteine è detto anche peptidico.', ['peptidico']),
  fill('Due tioli ossidati formano un ponte ___.', 'disolfuro', 'Il legame prodotto è S−S.'),
  fill('La riduzione di un chetone produce un alcol ___.', 'secondario', 'Il carbonio con OH resta legato a due carboni.'),
  fill('Il derivato carbossilico più reattivo fra estere e cloruro acilico è il ___.', 'cloruro acilico', 'Cl⁻ è un buon gruppo uscente.'),
  fill('La protonazione di un’ammina genera uno ione ___.', 'ammonio', 'Il doppietto dell’azoto lega H⁺.'),
]

const chim6Vf = concepts([
  ['Quale composto dà positivo al reattivo di Tollens?', 'Etanale', 'Propanone', 'Etere dietilico', 'Etanolo terziario', 'Le aldeidi riducono Ag⁺ formando lo specchio d’argento.'],
  ['L’acidità relativa corretta è:', 'fenolo > etanolo', 'etanolo > fenolo', 'etere > fenolo', 'metano > fenolo', 'Il fenossido è stabilizzato per risonanza.'],
  ['La riduzione di un’ammide con LiAlH₄ porta tipicamente a:', 'ammina', 'acido carbossilico', 'estere', 'alchene', 'Il carbonile ammidico viene ridotto a metilene.'],
  ['Quale derivato acilico è più reattivo verso sostituzione nucleofila?', 'Cloruro acilico', 'Ammide', 'Carbossilato', 'Estere', 'Il cloruro è il miglior gruppo uscente fra quelli elencati.'],
  ['Un emiacetale contiene sullo stesso carbonio:', '−OH e −OR', 'due −OR', '−NH₂ e −COOH', 'due carbonili', 'È il primo prodotto di addizione di un alcol a un carbonile.'],
  ['L’idrolisi di un’ammide è più lenta di quella di un estere perché:', 'il legame C−N ha carattere parzialmente doppio', 'N è un alogeno', 'l’ammide non ha carbonile', 'l’estere è ionico', 'La risonanza stabilizza fortemente l’ammide.'],
  ['Quale ammina è meno basica in acqua?', 'Anilina', 'Metilammina', 'Dimetilammina', 'Etilammina', 'Nell’anilina il doppietto è delocalizzato nell’anello.'],
  ['L’ossidazione completa di un alcol primario dà:', 'acido carbossilico', 'chetone', 'etere', 'ammina', 'Passa attraverso l’aldeide.'],
  ['Quale composto non può ossidarsi a carbonile senza rompere legami C−C?', 'Alcol terziario', 'Alcol primario', 'Alcol secondario', 'Emiacetale', 'Il carbonio ossidrilico terziario non porta H.'],
  ['La formazione di un’ammide da acido e ammina richiede spesso attivazione perché:', 'si forma inizialmente un sale ammonio-carbossilato', 'l’azoto non ha doppietto', 'l’acido è un ossidante', 'manca carbonio', 'La semplice miscela favorisce una reazione acido-base.'],
  ['Un tioestere differisce da un estere perché contiene:', 'S al posto dell’O alcossilico', 'N al posto del carbonile', 'due gruppi OH', 'un triplo legame', 'La forma è R−CO−S−R′.'],
  ['A pH acido un’ammina alifatica è prevalentemente:', 'protonata', 'neutra', 'deprotonata sull’azoto', 'ossidata', 'L’equilibrio favorisce RNH₃⁺.'],
])

const chim7Biomolecules = [
  ['glicina', 'amminoacido', 'monosaccaride', 'sterolo', 'purina'],
  ['lisina', 'amminoacido basico', 'acido grasso', 'chetoso', 'pirimidina'],
  ['glucosio', 'aldoesoso', 'amminoacido', 'trigliceride', 'nucleotide'],
  ['fruttosio', 'chetoesoso', 'aldopentoso', 'proteina', 'fosfolipide'],
  ['ribosio', 'aldopentoso', 'chetoesoso', 'sterolo', 'peptide'],
  ['colesterolo', 'sterolo', 'trigliceride', 'amminoacido', 'disaccaride'],
  ['adenina', 'base purinica', 'base pirimidinica', 'zucchero', 'acido grasso'],
  ['citosina', 'base pirimidinica', 'base purinica', 'amminoacido', 'sterolo'],
  ['trioleina', 'triacilglicerolo', 'fosfolipide', 'nucleotide', 'proteina'],
  ['fosfatidilcolina', 'fosfolipide', 'monosaccaride', 'purina', 'peptide'],
] as const
const chim7Links = [
  ['due amminoacidi', 'legame peptidico', 'legame glicosidico', 'legame fosfodiestere', 'legame estere lipidico'],
  ['due monosaccaridi', 'legame glicosidico', 'legame peptidico', 'ponte disolfuro', 'legame metallico'],
  ['glicerolo e acido grasso', 'legame estere', 'legame peptidico', 'legame N-glicosidico', 'legame ionico obbligatorio'],
  ['nucleotidi nello stesso filamento', 'legame fosfodiestere', 'legame peptidico', 'legame disolfuro', 'legame emiacetalico'],
  ['base azotata e pentoso', 'legame N-glicosidico', 'legame fosfodiestere', 'legame peptidico', 'legame estere'],
  ['due cisteine ossidate', 'ponte disolfuro', 'legame glicosidico', 'legame fosfoanidridico', 'legame estere'],
  ['basi complementari del DNA', 'legami a idrogeno', 'legami peptidici', 'legami estere', 'legami metallici'],
  ['fosfati adiacenti dell’ATP', 'legami fosfoanidridici', 'legami peptidici', 'legami glicosidici', 'ponti disolfuro'],
  ['colesterolo e acido grasso', 'legame estere', 'legame ammidico', 'legame fosfodiestere', 'legame acetale'],
  ['catene laterali ionizzate di segno opposto', 'ponte salino', 'ponte disolfuro', 'legame glicosidico', 'legame fosfoanidridico'],
] as const

const chim7Ex: Raw[] = [
  ...concepts([
    ['Gli amminoacidi proteici sono prevalentemente:', 'α-amminoacidi', 'β-chetoacidi', 'steroli', 'nucleosidi', 'NH₂ e COOH sono legati al carbonio α.'],
    ['A pH fisiologico un amminoacido senza catena ionizzabile è spesso:', 'zwitterione', 'solo catione', 'solo anione', 'radicale', 'Porta simultaneamente NH₃⁺ e COO⁻.'],
    ['La struttura primaria di una proteina è:', 'la sequenza amminoacidica', 'il ripiegamento globale', 'l’associazione di subunità', 'solo le α-eliche', 'Descrive l’ordine covalente dei residui.'],
    ['L’α-elica è stabilizzata soprattutto da:', 'legami a idrogeno dello scheletro', 'ponti disolfuro fra ogni residuo', 'legami glicosidici', 'legami metallici', 'C=O e N−H dello scheletro formano legami a H regolari.'],
    ['Il glicogeno è:', 'un polisaccaride ramificato di glucosio', 'una proteina', 'uno sterolo', 'un acido nucleico', 'È la riserva glucidica animale.'],
    ['I triacilgliceroli sono formati da:', 'glicerolo e tre acidi grassi', 'ribosio e basi', 'tre amminoacidi', 'colesterolo e DNA', 'Tre legami estere uniscono gli acidi grassi al glicerolo.'],
    ['I fosfolipidi di membrana sono:', 'anfipatici', 'solo idrofili', 'solo apolari', 'proteine', 'Hanno testa polare e code idrofobiche.'],
    ['Il colesterolo modula nelle membrane:', 'fluidità e permeabilità', 'sequenza del DNA', 'legami peptidici', 'pressione osmotica soltanto', 'Si inserisce fra le code lipidiche.'],
    ['Un nucleotide contiene:', 'base, pentoso e fosfato', 'base e pentoso soltanto', 'amminoacido e fosfato', 'glicerolo e tre acidi grassi', 'Il nucleoside acquista uno o più fosfati.'],
    ['Nel DNA, adenina si appaia con:', 'timina', 'citosina', 'uracile', 'guanina', 'A−T forma due legami a idrogeno.'],
  ]),
  ...chim7Biomolecules.map(([x, a, b, c, d]) => mc(`Come si classifica “${x}”?`, [a, b, c, d], 0, `${x} appartiene alla classe: ${a}.`)),
  ...chim7Links.map(([parts, a, b, c, d]) => mc(`Quale interazione unisce principalmente ${parts}?`, [a, b, c, d], 0, `L’unione indicata coinvolge ${a}.`)),
  fill('Il legame tra il carbossile di un amminoacido e l’amminico di un altro è ___.', 'peptidico', 'È un legame ammidico con perdita di acqua.', ['ammidico']),
  fill('Il pH al quale un amminoacido ha carica netta zero è il punto ___.', 'isoelettrico', 'È indicato con pI.'),
  fill('La perdita della struttura secondaria e terziaria è detta ___.', 'denaturazione', 'La sequenza primaria in genere resta intatta.'),
  fill('Il disaccaride formato da glucosio e fruttosio è il ___.', 'saccarosio', 'Il saccarosio è glucosio-fruttosio.'),
  fill('Il polisaccaride strutturale vegetale con legami β(1→4) è la ___.', 'cellulosa', 'L’uomo non possiede cellulasi.'),
  fill('Un acido grasso senza doppi legami è ___.', 'saturo', 'Ha il massimo numero di idrogeni.'),
  fill('La base presente nell’RNA al posto della timina è l’___.', 'uracile', 'L’uracile si appaia con adenina.'),
  fill('Base più pentoso, senza fosfato, forma un ___.', 'nucleoside', 'Con il fosfato diventa nucleotide.'),
  fill('Il pentoso del DNA è il ___.', 'desossiribosio', 'Manca l’OH in posizione 2′.', ['2-desossiribosio']),
  fill('I lipidi con testa polare e code apolari sono detti ___.', 'anfipatici', 'La doppia natura guida la formazione del doppio strato.', ['anfifilici']),
]

const chim7Vf = concepts([
  ['A pH molto superiore al pI, un amminoacido ha carica netta tendenzialmente:', 'negativa', 'positiva', 'sempre zero', 'non definibile', 'La deprotonazione prevale ad alto pH.'],
  ['Quale residuo può formare ponti disolfuro?', 'Cisteina', 'Glicina', 'Alanina', 'Valina', 'Il gruppo tiolico della cisteina si ossida.'],
  ['La prolina tende a interrompere un’α-elica perché:', 'vincola lo scheletro e non offre un N−H ammidico', 'ha due carbossili', 'è aromatica', 'forma tre ponti disolfuro', 'La sua struttura ciclica altera geometria e rete di legami H.'],
  ['Quale zucchero è non riducente?', 'Saccarosio', 'Maltosio', 'Lattosio', 'Glucosio', 'Nel saccarosio entrambi i carboni anomerici sono impegnati.'],
  ['La ramificazione del glicogeno avviene con legami:', 'α(1→6)', 'β(1→4)', 'α(1→2) soltanto', 'fosfodiestere', 'Le catene α(1→4) si ramificano in α(1→6).'],
  ['Un doppio legame cis in un acido grasso di membrana tende a:', 'aumentare la fluidità', 'ridurre sempre la fluidità', 'creare un peptide', 'eliminare l’anfipaticità', 'Introduce una piega che ostacola l’impacchettamento.'],
  ['Quale lipoproteina trasporta soprattutto colesterolo ai tessuti periferici?', 'LDL', 'HDL', 'Albumina', 'Chilomicrone residuo soltanto', 'LDL consegna colesterolo tramite il recettore LDL.'],
  ['Guanina e citosina formano:', 'tre legami a idrogeno', 'due legami a idrogeno', 'un legame covalente', 'quattro legami peptidici', 'La coppia G−C ha tre legami a H.'],
  ['Il legame fosfodiestere del DNA collega:', '3′-OH e 5′-fosfato', 'due basi direttamente', 'due gruppi amminici', '1′-OH e 2′-fosfato', 'Forma lo scheletro zucchero-fosfato 3′→5′.'],
  ['La denaturazione proteica normalmente non rompe:', 'i legami peptidici', 'i legami a idrogeno', 'le interazioni idrofobiche', 'i ponti salini', 'La struttura primaria covalente è generalmente conservata.'],
  ['ATP e GTP differiscono per:', 'la base azotata', 'il numero di fosfati', 'il tipo di pentoso', 'la presenza di legami fosfoanidridici', 'Contengono rispettivamente adenina e guanina.'],
  ['Il colesterolo è precursore di:', 'ormoni steroidei', 'glicogeno', 'DNA', 'tutti gli amminoacidi', 'Lo scheletro steroideo dà origine a corticosteroidi e ormoni sessuali.'],
])

export const CHIM_BANKS: Record<string, { ex: Raw[]; vf: Raw[] }> = {
  'chim-1': { ex: chim1Ex, vf: chim1Vf },
  'chim-2': { ex: chim2Ex, vf: chim2Vf },
  'chim-3': { ex: chim3Ex, vf: chim3Vf },
  'chim-4': { ex: chim4Ex, vf: chim4Vf },
  'chim-5': { ex: chim5Ex, vf: chim5Vf },
  'chim-6': { ex: chim6Ex, vf: chim6Vf },
  'chim-7': { ex: chim7Ex, vf: chim7Vf },
}
