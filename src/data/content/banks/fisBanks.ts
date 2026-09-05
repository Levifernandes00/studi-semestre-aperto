export type Raw =
  | { k: 'mc'; p: string; o: string[]; c: number; e: string }
  | { k: 'f'; p: string; a: string; e: string; alt?: string[] }

const mc = (p: string, o: string[], c: number, e: string): Raw => ({ k: 'mc', p, o, c, e })
const f = (p: string, a: string, e: string, alt?: string[]): Raw => ({ k: 'f', p, a, e, alt })
const num = (p: string, value: number, wrong: number[], unit: string, e: string): Raw => {
  const values = [value, ...wrong]
  const shift = [...p].reduce((s, x) => s + x.charCodeAt(0), 0) % 4
  const o = values.map((_, i) => `${values[(i + shift) % 4]}${unit}`)
  return mc(p, o, (4 - shift) % 4, e)
}

function fis1(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('Quale tra queste è un’unità fondamentale del SI?', ['newton', 'joule', 'kelvin', 'pascal'], 2, 'Il kelvin è l’unità fondamentale della temperatura termodinamica.'),
    mc('Quale grandezza è scalare?', ['accelerazione', 'forza', 'temperatura', 'spostamento'], 2, 'La temperatura ha valore ma non direzione né verso.'),
    mc('Il prefisso micro corrisponde a:', ['10⁻³', '10⁻⁶', '10⁻⁹', '10⁶'], 1, 'Il simbolo µ indica un milionesimo, cioè 10⁻⁶.'),
    mc('Il prodotto scalare tra vettori perpendicolari vale:', ['1', 'il prodotto dei moduli', '0', '−1'], 2, 'A·B = AB cos 90° = 0.'),
    mc('Il modulo di un vettore non può essere:', ['nullo', 'positivo', 'negativo', 'espresso con unità'], 2, 'Un modulo è per definizione non negativo.'),
    mc('Quale scrittura scientifica è normalizzata?', ['0,42×10⁵', '42×10³', '4,2×10⁴', '420×10²'], 2, 'La mantissa normalizzata è compresa tra 1 e 10.'),
    mc('Un newton equivale a:', ['kg·m·s⁻²', 'kg·m²·s⁻²', 'kg·m⁻¹·s⁻²', 'kg·s⁻¹'], 0, 'Dalla seconda legge di Newton, N = kg·m/s².'),
    mc('La somma di due vettori opposti e uguali è:', ['un versore', 'il vettore nullo', 'uno scalare unitario', 'un vettore doppio'], 1, 'Componenti uguali e opposte si annullano.'),
    mc('Il seno di 30° vale:', ['0', '1/2', '√2/2', '√3/2'], 1, 'È uno dei valori notevoli della trigonometria.'),
    mc('Il coseno di 180° vale:', ['1', '0', '−1', '1/2'], 2, 'Sul cerchio goniometrico l’ascissa a 180° è −1.'),
    mc('Quante cifre significative ha 0,00450?', ['2', '3', '4', '5'], 1, 'Gli zeri iniziali non contano; lo zero finale dopo la virgola sì.'),
    mc('Il prodotto vettoriale A×B ha direzione:', ['parallela ad A', 'parallela a B', 'perpendicolare al piano di A e B', 'sempre verticale'], 2, 'La regola della mano destra dà una normale al piano dei due vettori.'),
    mc('Quale relazione trigonometrica è sempre vera?', ['sin α + cos α = 1', 'sin²α + cos²α = 1', 'tan α = cos α/sin α', 'sin 2α = 2 sin²α'], 1, 'È l’identità pitagorica fondamentale.'),
    mc('Una misura 12,0 ± 0,2 cm ha incertezza relativa circa:', ['0,017', '0,20', '1,7', '6,0'], 0, '0,2/12,0 ≈ 0,0167.'),
    mc('Quale operazione tra grandezze omogenee è sempre lecita dimensionalmente?', ['somma', 'radice senza controllo', 'logaritmo di una lunghezza', 'esponenziale di un tempo'], 0, 'Si possono sommare solo grandezze della stessa dimensione.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((a) => {
    ex.push(num(`Un vettore ha componenti ${a} e ${a + 1}. Qual è il quadrato del modulo?`, a * a + (a + 1) ** 2, [2 * a + 1, a * (a + 1), 2 * a * a], '', 'Il quadrato del modulo è la somma dei quadrati delle componenti.'))
    ex.push(num(`Quanto vale ${a},0×10³ moltiplicato per 10⁻²?`, a * 10, [a, a * 100, a / 10], '', 'Si sommano gli esponenti: 10³·10⁻² = 10.'))
    ex.push(num(`Una forza di ${a * 10} N forma 60° con l’asse x. Quanto vale la componente x?`, a * 5, [a * 10, Math.round(a * 8.66), a * 20], ' N', 'Fx = F cos 60° = F/2.'))
  })
  ex.push(
    f('Completa: l’unità SI della quantità di sostanza è la ___.', 'mole', 'La mole è una delle sette unità fondamentali.', ['mol']),
    f('Scrivi in notazione scientifica normalizzata 0,00072.', '7,2×10⁻⁴', 'Si sposta la virgola di quattro posti verso destra.', ['7.2×10^-4', '7,2·10⁻⁴']),
    f('Il vettore di modulo uno usato per indicare una direzione si chiama ___.', 'versore', 'Un versore ha modulo unitario.'),
    f('La proiezione di A sull’asse x è A moltiplicato per ___ dell’angolo con x.', 'coseno', 'La componente adiacente usa il coseno.', ['cos']),
    f('L’unità SI dell’intensità luminosa è la ___.', 'candela', 'La candela è un’unità fondamentale.', ['cd']),
    f('Il simbolo del prefisso 10⁹ è ___.', 'G', 'G indica giga.'),
    f('Il risultato di A·B è una grandezza ___.', 'scalare', 'Il prodotto scalare non è un vettore.'),
    f('Due vettori con stessa direzione e verso opposto sono detti ___.', 'antiparalleli', 'Sono paralleli ma orientati in versi opposti.'),
    f('Il rapporto seno/coseno di un angolo è la sua ___.', 'tangente', 'tan α = sin α/cos α.', ['tan']),
    f('L’equazione fisica deve essere omogenea dal punto di vista ___.', 'dimensionale', 'I due membri devono avere le stesse dimensioni.')
  )
  const vf: Raw[] = []
  ;[1, 2, 3, 4, 5, 6].forEach((a) => {
    vf.push(num(`Verifica: A=(${a},${a + 2}) e B=(${a + 1},−${a}). Quanto vale A·B?`, -a, [a, 3 * a, 4 * a + 1], '', 'A·B = a(a+1)+(a+2)(−a)=−a.'))
    vf.push(num(`Verifica: una misura vale ${100 + 10 * a}±${a} mm. Qual è l’incertezza percentuale, arrotondata a 0,1%?`, Number((100 * a / (100 + 10 * a)).toFixed(1)), [a, Number((a / 10).toFixed(1)), 10 * a], '%', 'L’incertezza percentuale è Δx/x·100.'))
  })
  return { ex, vf }
}

function fis2(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('La pendenza del grafico posizione-tempo rappresenta:', ['accelerazione', 'velocità', 'forza', 'energia'], 1, 'La derivata della posizione rispetto al tempo è la velocità.'),
    mc('Nel moto rettilineo uniforme l’accelerazione è:', ['costante non nulla', 'nulla', 'crescente', 'opposta alla velocità'], 1, 'La velocità non varia.'),
    mc('Il principio d’inerzia vale esattamente in sistemi:', ['accelerati', 'inerziali', 'rotanti', 'sempre e comunque'], 1, 'La prima legge definisce i riferimenti inerziali.'),
    mc('Azione e reazione agiscono:', ['sullo stesso corpo', 'su corpi diversi', 'solo a contatto', 'nello stesso verso'], 1, 'La terza legge riguarda una coppia di forze su corpi distinti.'),
    mc('Il lavoro di una forza perpendicolare allo spostamento è:', ['massimo', 'negativo', 'zero', 'uguale alla forza'], 2, 'W = Fs cos 90° = 0.'),
    mc('L’energia cinetica dipende:', ['linearmente dalla velocità', 'dal quadrato della velocità', 'solo dall’altezza', 'inversamente dalla massa'], 1, 'K = ½mv².'),
    mc('In assenza di forze esterne si conserva:', ['la velocità di ogni corpo', 'la quantità di moto totale', 'sempre l’energia cinetica', 'la forza interna'], 1, 'Le forze interne si compensano nel bilancio dell’impulso.'),
    mc('L’impulso di una forza è uguale alla variazione di:', ['energia potenziale', 'quantità di moto', 'massa', 'posizione'], 1, 'J = Δp.'),
    mc('Una leva di primo genere ha:', ['fulcro tra forza e resistenza', 'resistenza tra fulcro e forza', 'forza tra fulcro e resistenza', 'nessun fulcro'], 0, 'È la definizione della leva di primo genere.'),
    mc('La potenza media è:', ['lavoro per tempo', 'lavoro diviso tempo', 'forza diviso spazio', 'energia per massa'], 1, 'P = W/Δt.'),
    mc('L’attrito statico:', ['ha sempre valore μsN', 'si adatta fino a un massimo', 'è indipendente dalla normale', 'compie sempre lavoro positivo'], 1, 'Prima dello slittamento assume il valore necessario fino a μsN.'),
    mc('Alla sommità di un lancio verticale, trascurando l’aria:', ['velocità e accelerazione sono nulle', 'solo la velocità è nulla', 'solo l’accelerazione è nulla', 'entrambe sono massime'], 1, 'La velocità istantanea è zero, ma resta l’accelerazione g.'),
    mc('In un urto perfettamente anelastico i corpi:', ['rimbalzano senza perdite', 'restano uniti', 'conservano l’energia cinetica', 'hanno impulsi nulli'], 1, 'Dopo l’urto condividono la stessa velocità.'),
    mc('Il baricentro di un corpo omogeneo simmetrico coincide con:', ['un punto esterno casuale', 'il centro geometrico', 'il fulcro di ogni leva', 'il punto più basso'], 1, 'La distribuzione uniforme e la simmetria fissano il centro di massa.'),
    mc('Il teorema lavoro-energia afferma che il lavoro risultante è:', ['ΔK', 'ΔU', 'K+U', '−Δp'], 0, 'Il lavoro totale modifica l’energia cinetica.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`Un corpo parte da fermo con accelerazione ${n} m/s². Quale velocità ha dopo 4 s?`, 4 * n, [2 * n, 8 * n, n + 7], ' m/s', 'Per moto uniformemente accelerato v=at.'))
    ex.push(num(`Una massa di ${n} kg subisce una forza risultante di ${3 * n} N. Quanto vale l’accelerazione?`, 3, [n + 20, 3 * n, n / 3], ' m/s²', 'Dalla seconda legge a=F/m.'))
    ex.push(num(`Sollevando ${n} kg di 5 m con g=10 m/s², quale lavoro si compie?`, 50 * n, [5 * n, 10 * n, 500 * n], ' J', 'Il lavoro contro il peso è mgh.'))
  })
  ex.push(
    f('La velocità è la derivata della posizione rispetto al ___.', 'tempo', 'v=dx/dt.'),
    f('Nel SI la quantità di moto si misura in ___.', 'kg·m/s', 'p=mv.', ['kg m s⁻¹']),
    f('Una forza conservativa ammette un’energia ___.', 'potenziale', 'Per essa W=−ΔU.'),
    f('Il rapporto tra braccio della potenza e braccio della resistenza è il ___ meccanico.', 'vantaggio', 'Esprime l’amplificazione della forza.'),
    f('La forza diretta verso il centro in un moto circolare è detta ___.', 'centripeta', 'Produce accelerazione radiale.'),
    f('La variazione di velocità nell’unità di tempo è l’___.', 'accelerazione', 'a=Δv/Δt.'),
    f('L’unità SI della potenza è il ___.', 'watt', '1 W=1 J/s.', ['W']),
    f('In equilibrio traslazionale la somma delle forze è ___.', 'zero', 'La risultante deve annullarsi.', ['nulla']),
    f('Il momento di una forza è forza per braccio ___.', 'perpendicolare', 'Conta la distanza minima dalla linea d’azione.'),
    f('La quantità mgh è energia potenziale ___.', 'gravitazionale', 'Vale vicino alla superficie terrestre.')
  )
  const vf: Raw[] = []
  ;[2, 3, 4, 5, 6, 7].forEach((n) => {
    vf.push(num(`Verifica: da fermo un corpo accelera a ${n} m/s² per 3 s e poi procede 2 s a velocità costante. Spazio totale?`, Number((10.5 * n).toFixed(1)), [7.5 * n, 6 * n, 15 * n], ' m', 'Nel primo tratto s=½at²=4,5n; nel secondo s=vt=6n.'))
    vf.push(num(`Verifica: una leva equilibrata ha resistenza ${4 * n} N a 0,25 m dal fulcro. Con braccio motore ${n} m, quale forza serve?`, 1, [n + 1, 4 * n, 16 * n], ' N', 'Uguagliando i momenti: F·n=(4n)·0,25=n, quindi F=1 N.'))
  })
  return { ex, vf }
}

function fis3(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('La pressione idrostatica a profondità h dipende da:', ['forma del recipiente', 'densità, g e h', 'superficie libera soltanto', 'volume totale'], 1, 'La legge di Stevino dà Δp=ρgh.'),
    mc('Il principio di Pascal riguarda la trasmissione:', ['della temperatura', 'della pressione in un fluido confinato', 'della massa', 'della viscosità'], 1, 'Una variazione di pressione si trasmette integralmente.'),
    mc('La spinta di Archimede è uguale:', ['al peso del corpo', 'al peso del fluido spostato', 'alla massa del fluido', 'alla pressione sul fondo'], 1, 'È diretta verso l’alto e vale ρfluido g Vimmerso.'),
    mc('Un corpo galleggia in equilibrio quando:', ['pesa più della spinta', 'spinta e peso si equilibrano', 'ha densità sempre nulla', 'è tutto emerso'], 1, 'La risultante verticale deve essere zero.'),
    mc('In un tubo orizzontale ideale che si restringe, la velocità:', ['diminuisce', 'aumenta', 'resta nulla', 'non dipende dalla sezione'], 1, 'Per continuità Av è costante.'),
    mc('Nello stesso restringimento, secondo Bernoulli, la pressione statica:', ['aumenta', 'diminuisce', 'resta identica', 'diventa zero'], 1, 'A quota costante maggiore velocità implica minore pressione.'),
    mc('La portata volumetrica si misura in:', ['m/s', 'm²/s', 'm³/s', 'Pa·s'], 2, 'È volume per unità di tempo.'),
    mc('Per Poiseuille la portata dipende dal raggio alla potenza:', ['1', '2', '3', '4'], 3, 'Q è proporzionale a r⁴.'),
    mc('La viscosità dinamica misura:', ['la comprimibilità', 'l’attrito interno del fluido', 'la tensione elettrica', 'la densità relativa'], 1, 'Quantifica la resistenza allo scorrimento tra strati.'),
    mc('La tensione superficiale tende a:', ['massimizzare l’area', 'minimizzare l’area libera', 'annullare la densità', 'aumentare sempre il volume'], 1, 'La superficie si comporta come una membrana tesa.'),
    mc('Per una goccia sferica con una sola interfaccia, Laplace dà Δp:', ['γ/r', '2γ/r', '4γ/r', 'γr'], 1, 'Per una superficie sferica Δp=2γ/r.'),
    mc('In un liquido che bagna il vetro il menisco è tipicamente:', ['convesso', 'concavo', 'piano per definizione', 'quadrato'], 1, 'L’adesione al vetro prevale sulla coesione.'),
    mc('La pressione assoluta è:', ['sempre la pressione relativa', 'pressione atmosferica più pressione relativa', 'sempre negativa', 'indipendente dall’atmosfera'], 1, 'pAss=pAtm+pGauge.'),
    mc('Il numero di Reynolds confronta effetti:', ['inerziali e viscosi', 'termici e chimici', 'elettrici e magnetici', 'gravitazionali e nucleari'], 0, 'Aiuta a distinguere flusso laminare e turbolento.'),
    mc('Un torchio idraulico amplifica la forza grazie a:', ['conservazione della pressione', 'creazione di energia', 'riduzione della densità', 'assenza di lavoro'], 0, 'La stessa pressione agisce su aree differenti.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`In acqua (ρ=1000 kg/m³, g=10), quale sovrapressione c’è a ${n} m?`, 10 * n, [n, 100 * n, 1000 * n], ' kPa', 'ρgh=10000n Pa=10n kPa.'))
    ex.push(num(`Un pistone di area ${n} cm² riceve ${5 * n} N. Qual è la pressione in N/cm²?`, 5, [n + 10, 5 * n, 25 + n], ' N/cm²', 'p=F/A.'))
    ex.push(num(`Un fluido attraversa ${n} cm² a 4 cm/s. Qual è la portata?`, 4 * n, [n / 4, n + 4, 8 * n], ' cm³/s', 'Q=Av.'))
  })
  ex.push(
    f('La legge p=p₀+ρgh è la legge di ___.', 'Stevino', 'Descrive l’aumento idrostatico di pressione.'),
    f('La forza per unità di lunghezza lungo una superficie liquida è la tensione ___.', 'superficiale', 'Ha unità N/m.'),
    f('Il regime ordinato a strati è detto ___.', 'laminare', 'È favorito da basso Reynolds.'),
    f('La portata resta costante lungo un tubo incomprimibile per l’equazione di ___.', 'continuità', 'A₁v₁=A₂v₂.'),
    f('L’unità SI della pressione è il ___.', 'pascal', '1 Pa=1 N/m².', ['Pa']),
    f('La spinta idrostatica è diretta verticalmente verso l’___.', 'alto', 'È opposta al peso.', ['alto']),
    f('Un corpo con densità minore del liquido tende a ___.', 'galleggiare', 'L’equilibrio si raggiunge con immersione parziale.'),
    f('Nella legge di Poiseuille la portata è inversamente proporzionale alla ___.', 'viscosità', 'Q∝1/η.'),
    f('La risalita in un capillare è favorita da un raggio più ___.', 'piccolo', 'L’altezza capillare è inversamente proporzionale al raggio.'),
    f('La somma p+½ρv²+ρgh è costante lungo una linea di ___.', 'flusso', 'È la forma di Bernoulli.', ['corrente'])
  )
  const vf: Raw[] = []
  ;[1, 2, 3, 4, 5, 6].forEach((n) => {
    vf.push(num(`Verifica: in un tubo ideale l’area passa da ${4 * n} a ${n} cm²; se v₁=2 m/s, quanto vale v₂?`, 8, [2, 4, 10 + n], ' m/s', 'Per continuità v₂=v₁A₁/A₂=8 m/s.'))
    vf.push(num(`Verifica: un vaso di raggio ${n} mm è sostituito da uno di ${2 * n} mm e Δp si dimezza. Di quale fattore cambia Q?`, 8, [2, 4, 16], ' volte', 'Per Poiseuille Q∝Δp r⁴: (1/2)·2⁴=8.'))
  })
  return { ex, vf }
}

function fis4(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('La frequenza di un’onda si misura in:', ['metri', 'hertz', 'decibel', 'watt'], 1, 'Un hertz è un’oscillazione al secondo.'),
    mc('La relazione tra velocità, frequenza e lunghezza d’onda è:', ['v=fλ', 'v=f/λ', 'v=λ/f', 'v=f+λ'], 0, 'In un periodo l’onda avanza di una lunghezza d’onda.'),
    mc('In un’onda trasversale l’oscillazione è:', ['parallela alla propagazione', 'perpendicolare alla propagazione', 'sempre circolare', 'assente'], 1, 'È la caratteristica distintiva delle onde trasversali.'),
    mc('L’interferenza costruttiva avviene con differenza di fase:', ['π', 'π/2', 'multipla di 2π', 'sempre casuale'], 2, 'Le onde arrivano in fase.'),
    mc('Due onde in opposizione di fase possono produrre:', ['interferenza distruttiva', 'rifrazione totale', 'polarizzazione sonora', 'una frequenza infinita'], 0, 'Creste e ventri tendono a cancellarsi.'),
    mc('Il suono nel vuoto:', ['viaggia più veloce', 'non si propaga', 'ha velocità 300000 km/s', 'diventa luce'], 1, 'È un’onda meccanica e richiede un mezzo.'),
    mc('L’altezza percepita di un suono dipende soprattutto dalla:', ['frequenza', 'velocità nel vuoto', 'massa della sorgente', 'fase iniziale'], 0, 'Frequenze maggiori sono percepite come suoni più acuti.'),
    mc('L’intensità sonora è potenza per unità di:', ['tempo', 'area', 'massa', 'frequenza'], 1, 'I=P/A.'),
    mc('Il livello sonoro usa una scala:', ['lineare', 'logaritmica', 'quadratica', 'vettoriale'], 1, 'β=10 log₁₀(I/I₀).'),
    mc('Un aumento di intensità di 10 volte corrisponde a:', ['1 dB', '3 dB', '10 dB', '100 dB'], 2, '10 log₁₀10=10 dB.'),
    mc('Nell’effetto Doppler, sorgente in avvicinamento implica frequenza percepita:', ['minore', 'maggiore', 'nulla', 'invariata in ogni caso'], 1, 'I fronti d’onda arrivano più ravvicinati.'),
    mc('La riflessione di un impulso a un estremo fisso avviene:', ['senza inversione', 'con inversione', 'senza ritorno', 'con velocità infinita'], 1, 'L’estremo fisso impone uno sfasamento di π.'),
    mc('In un’onda stazionaria i nodi hanno ampiezza:', ['massima', 'nulla', 'variabile nel tempo', 'doppia'], 1, 'Nei nodi l’interferenza è sempre distruttiva.'),
    mc('La diffrazione è più evidente quando l’apertura è:', ['molto maggiore di λ', 'confrontabile con λ', 'sempre infinita', 'indipendente da λ'], 1, 'L’onda si allarga sensibilmente per dimensioni dell’ordine di λ.'),
    mc('Il timbro distingue suoni con uguale altezza grazie al diverso contenuto di:', ['armoniche', 'massa', 'pressione atmosferica soltanto', 'velocità della luce'], 0, 'Lo spettro armonico caratterizza la forma d’onda.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`Un’onda ha frequenza ${n * 10} Hz e lunghezza d’onda 2 m. Qual è la velocità?`, n * 20, [n * 5, n * 10, n * 40], ' m/s', 'v=fλ.'))
    ex.push(num(`Il periodo di un’oscillazione di frequenza ${n} Hz vale quanti millisecondi?`, Math.round(1000 / n), [n * 100, 1000 * n, Math.round(500 / n)], ' ms', 'T=1/f; il risultato è arrotondato al millisecondo.'))
    ex.push(num(`Quante lunghezze d’onda percorre un fronte in ${n} periodi?`, n, [1, 2 * n, n * n + 1], '', 'In ogni periodo l’onda avanza di una λ.'))
  })
  ex.push(
    f('La distanza tra due creste successive è la lunghezza d’___.', 'onda', 'Si indica con λ.'),
    f('Il reciproco della frequenza è il ___.', 'periodo', 'T=1/f.'),
    f('L’unità del livello di intensità sonora è il ___.', 'decibel', 'Il simbolo è dB.', ['dB']),
    f('I punti immobili di un’onda stazionaria sono i ___.', 'nodi', 'In essi l’ampiezza è zero.'),
    f('La sovrapposizione di onde coerenti produce ___.', 'interferenza', 'Le ampiezze si sommano istante per istante.'),
    f('Un suono di frequenza più alta è percepito più ___.', 'acuto', 'L’altezza cresce con la frequenza.'),
    f('La velocità del suono dipende dalle proprietà del ___.', 'mezzo', 'Elasticità e densità determinano la velocità.'),
    f('L’allargamento di un’onda oltre un ostacolo è detto ___.', 'diffrazione', 'È tipico di ogni onda.'),
    f('La frequenza fondamentale è anche detta prima ___.', 'armonica', 'È il modo a frequenza più bassa.'),
    f('L’effetto dovuto al moto relativo tra sorgente e osservatore è detto ___.', 'Doppler', 'Modifica la frequenza osservata.')
  )
  const vf: Raw[] = []
  ;[1, 2, 3, 4, 5, 6].forEach((n) => {
    vf.push(num(`Verifica: due sorgenti identiche incoerenti producono ciascuna ${50 * n} W/m². Qual è l’intensità media totale?`, 100 * n, [50 * n, 2500 * n * n, 25 * n], ' W/m²', 'Per sorgenti incoerenti si sommano le intensità.'))
    vf.push(num(`Verifica: aumentando l’intensità di un fattore ${10 ** n}, di quanti dB cresce il livello?`, 10 * n, [n, 20 * n, 100 * n], ' dB', 'Δβ=10 log₁₀(10ⁿ)=10n dB.'))
  })
  return { ex, vf }
}

function fis5(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('L’equazione di stato dei gas perfetti è:', ['pV=nRT', 'p/T=nRV', 'p=nR/V', 'V=nR/pT'], 0, 'Collega pressione, volume, moli e temperatura assoluta.'),
    mc('A volume costante, per un gas ideale p è proporzionale a:', ['1/T', 'T', 'V²', 'n⁻¹ sempre'], 1, 'Dalla legge di Gay-Lussac p/T è costante.'),
    mc('La temperatura assoluta si misura in:', ['°C', 'kelvin', 'joule', 'watt'], 1, 'Il kelvin è l’unità SI.'),
    mc('Durante la fusione di una sostanza pura a pressione costante, la temperatura:', ['aumenta sempre', 'resta costante', 'diminuisce a zero', 'raddoppia'], 1, 'Il calore latente cambia la fase, non la temperatura.'),
    mc('Il calore sensibile si calcola con:', ['Q=mcΔT', 'Q=mL', 'Q=pV', 'Q=TS'], 0, 'Dipende da massa, calore specifico e variazione termica.'),
    mc('Il primo principio, con lavoro W compiuto dal sistema, è:', ['ΔU=Q−W', 'ΔU=Q+W', 'ΔU=W−Q', 'ΔU=QW'], 0, 'Il calore entrante aumenta U; il lavoro uscente la riduce.'),
    mc('In un’espansione isocora il lavoro pΔV è:', ['positivo', 'negativo', 'zero', 'massimo'], 2, 'Il volume non cambia.'),
    mc('Per un gas ideale l’energia interna dipende solo dalla:', ['pressione', 'temperatura', 'forma del recipiente', 'quota'], 1, 'Nel modello ideale U è funzione di T.'),
    mc('Una trasformazione adiabatica scambia con l’esterno calore:', ['positivo', 'negativo', 'nullo', 'infinito'], 2, 'Per definizione Q=0.'),
    mc('Il rendimento di una macchina termica è sempre:', ['maggiore di 1', 'minore o uguale a 1', 'negativo per forza', 'indipendente dalle temperature'], 1, 'Non tutto il calore assorbito può diventare lavoro.'),
    mc('Il rendimento di Carnot aumenta se:', ['Tc aumenta a Th fissa', 'Tc diminuisce a Th fissa', 'Th=Tc', 'entrambe sono espresse in °C'], 1, 'η=1−Tc/Th con temperature kelvin.'),
    mc('In un sistema isolato l’entropia totale:', ['diminuisce sempre', 'non diminuisce', 'è sempre zero', 'diventa calore'], 1, 'È una formulazione del secondo principio.'),
    mc('Il calore fluisce spontaneamente:', ['dal freddo al caldo', 'dal caldo al freddo', 'solo nel vuoto', 'senza variazioni entropiche'], 1, 'Il processo inverso richiede lavoro esterno.'),
    mc('A pressione costante il calore scambiato coincide con la variazione di:', ['entalpia', 'quantità di moto', 'carica', 'volume soltanto'], 0, 'Per solo lavoro pV, Qp=ΔH.'),
    mc('L’evaporazione superficiale tende a raffreddare perché fuggono molecole con energia:', ['più bassa', 'più alta della media', 'sempre nulla', 'solo potenziale'], 1, 'La fase rimasta perde molecole più energetiche.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`Quante moli sono contenute in ${22.4 * n} L a 0 °C e 1 atm, assumendo 22,4 L/mol?`, n, [n / 2, 2 * n, 22.4], ' mol', 'Alle condizioni date una mole occupa 22,4 L.'))
    ex.push(num(`Quanta energia serve per scaldare ${n} kg d’acqua di 2 °C, con c=4,2 kJ/(kg·°C)?`, Number((8.4 * n).toFixed(1)), [4.2 * n, 2 * n, 42 * n], ' kJ', 'Q=mcΔT.'))
    ex.push(num(`Una macchina assorbe ${100 * n} J e cede ${60 * n} J. Quale lavoro produce?`, 40 * n, [60 * n, 100 * n, 160 * n], ' J', 'Su un ciclo W=Qass−Qced.'))
  })
  ex.push(
    f('Lo zero assoluto corrisponde a circa ___ °C.', '−273,15', '0 K = −273,15 °C.', ['-273,15']),
    f('Il calore necessario per un cambio di fase è detto calore ___.', 'latente', 'Q=mL.'),
    f('Una trasformazione a temperatura costante è detta ___.', 'isoterma', 'Per un gas ideale ΔU=0.'),
    f('Una trasformazione a pressione costante è detta ___.', 'isobara', 'La pressione non varia.'),
    f('La funzione di stato U è l’energia ___.', 'interna', 'Comprende le energie microscopiche.'),
    f('Il rapporto lavoro utile/calore assorbito è il ___.', 'rendimento', 'Si indica spesso con η.'),
    f('La capacità termica divisa per la massa è il calore ___.', 'specifico', 'È una proprietà intensiva.'),
    f('La temperatura della sorgente fredda di Carnot va espressa in ___.', 'kelvin', 'Il rapporto assoluto richiede la scala Kelvin.', ['K']),
    f('In un ciclo termodinamico la variazione di una funzione di stato è ___.', 'zero', 'Stato iniziale e finale coincidono.', ['nulla']),
    f('La grandezza S del secondo principio è l’___.', 'entropia', 'Per un processo reversibile dS=δQrev/T.')
  )
  const vf: Raw[] = []
  ;[2, 3, 4, 5, 6, 7].forEach((n) => {
    vf.push(num(`Verifica: un gas riceve ${50 * n} J e compie ${20 * n} J di lavoro. Quanto varia U?`, 30 * n, [20 * n, 50 * n, 70 * n], ' J', 'ΔU=Q−W.'))
    vf.push(num(`Verifica: una Carnot lavora tra ${400 + 100 * n} K e ${200 + 50 * n} K. Qual è il rendimento?`, 50, [25, 40, 75], '%', 'La temperatura fredda è metà di quella calda: η=1−1/2.'))
  })
  return { ex, vf }
}

function fis6(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('La forza di Coulomb tra due cariche puntiformi varia con la distanza come:', ['r', '1/r', '1/r²', 'r²'], 2, 'F=k|q₁q₂|/r².'),
    mc('Due cariche dello stesso segno:', ['si attraggono', 'si respingono', 'non interagiscono', 'si annullano'], 1, 'La forza elettrica è repulsiva.'),
    mc('Il campo elettrico è definito come:', ['Fq', 'F/q di prova positiva', 'q/F', 'energia per tempo'], 1, 'E=F/q.'),
    mc('Le linee di campo elettrico escono dalle cariche:', ['negative', 'positive', 'neutre', 'magnetiche'], 1, 'Sono orientate dal positivo al negativo.'),
    mc('Il potenziale elettrico è una grandezza:', ['vettoriale', 'scalare', 'senza unità', 'sempre positiva'], 1, 'È energia potenziale per unità di carica.'),
    mc('La legge di Ohm per un resistore è:', ['V=RI', 'V=R/I', 'I=RV', 'R=VI'], 0, 'La tensione è proporzionale alla corrente.'),
    mc('Due resistenze in serie hanno resistenza equivalente:', ['somma', 'prodotto', 'minore di entrambe', 'sempre zero'], 0, 'La stessa corrente attraversa entrambe e le cadute si sommano.'),
    mc('Due resistenze in parallelo hanno la stessa:', ['corrente', 'differenza di potenziale', 'potenza', 'resistenza'], 1, 'Sono collegate agli stessi due nodi.'),
    mc('La potenza dissipata per effetto Joule è:', ['VI', 'V/I', 'I/R', 'VR'], 0, 'P=VI=I²R=V²/R.'),
    mc('La capacità di un condensatore è:', ['Q/V', 'QV', 'V/Q', 'Q²/V'], 0, 'C=Q/ΔV.'),
    mc('Inserire un dielettrico in un condensatore isolato aumenta:', ['la capacità', 'la carica libera', 'sempre la tensione', 'la distanza'], 0, 'C cresce del fattore dielettrico.'),
    mc('La forza magnetica su una carica ferma è:', ['massima', 'nulla', 'parallela a B', 'sempre attrattiva'], 1, 'F=qv×B e v=0.'),
    mc('La forza magnetica su una carica in moto è perpendicolare:', ['solo a v', 'solo a B', 'sia a v sia a B', 'a nulla'], 2, 'È un prodotto vettoriale.'),
    mc('Una variazione di flusso magnetico induce:', ['massa', 'forza elettromotrice', 'temperatura assoluta', 'carica magnetica'], 1, 'È la legge di Faraday-Neumann.'),
    mc('La legge di Lenz stabilisce il verso che:', ['favorisce la variazione di flusso', 'si oppone alla variazione di flusso', 'annulla ogni campo', 'segue la gravità'], 1, 'È conseguenza della conservazione dell’energia.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`Un resistore da ${n} Ω è attraversato da 3 A. Qual è la tensione?`, 3 * n, [n / 3, n + 3, 6 * n], ' V', 'V=RI.'))
    ex.push(num(`Un dispositivo funziona a ${10 * n} V e assorbe 2 A. Quale potenza usa?`, 20 * n, [5 * n, 10 * n, 200 * n], ' W', 'P=VI.'))
    ex.push(num(`Un condensatore da ${n} µF è a 4 V. Quale carica accumula?`, 4 * n, [n / 4, n + 4, 8 * n], ' µC', 'Q=CV; µF·V=µC.'))
  })
  ex.push(
    f('L’unità SI della carica elettrica è il ___.', 'coulomb', 'Il simbolo è C.', ['C']),
    f('L’unità SI della differenza di potenziale è il ___.', 'volt', '1 V=1 J/C.', ['V']),
    f('Il moto ordinato di cariche costituisce una corrente ___.', 'elettrica', 'I=dQ/dt.'),
    f('Il reciproco della resistenza è la ___.', 'conduttanza', 'Si misura in siemens.'),
    f('L’energia immagazzinata da un condensatore vale ½C___².', 'V', 'U=½CV².'),
    f('Il polo magnetico isolato non è stato osservato: i magneti sono ___.', 'dipoli', 'Ogni magnete presenta nord e sud.'),
    f('L’unità SI del campo magnetico è il ___.', 'tesla', 'Il simbolo è T.', ['T']),
    f('Il prodotto B·A·cosθ è il flusso ___.', 'magnetico', 'Misura il campo concatenato.'),
    f('In un nodo la somma algebrica delle correnti è ___.', 'zero', 'È la prima legge di Kirchhoff.', ['nulla']),
    f('La corrente indotta nasce quando cambia il ___ magnetico concatenato.', 'flusso', 'La f.e.m. è −dΦ/dt.')
  )
  const vf: Raw[] = []
  ;[2, 3, 4, 5, 6, 7].forEach((n) => {
    vf.push(num(`Verifica: due resistori uguali da ${2 * n} Ω sono in parallelo e poi in serie con ${n} Ω. Req?`, 2 * n, [n, 3 * n, 5 * n], ' Ω', 'Il parallelo vale n Ω; aggiungendo n Ω si ottiene 2n Ω.'))
    vf.push(num(`Verifica: il flusso in una spira cambia uniformemente di ${3 * n} mWb in ${n} ms. Modulo della f.e.m.?`, 3, [n + 20, 3 * n, 0.003], ' V', '|ε|=|ΔΦ/Δt|; mWb/ms equivale a volt.'))
  })
  return { ex, vf }
}

function fis7(): { ex: Raw[]; vf: Raw[] } {
  const ex: Raw[] = [
    mc('Nel vuoto tutte le onde elettromagnetiche hanno:', ['stessa frequenza', 'stessa velocità', 'stessa energia', 'stessa lunghezza d’onda'], 1, 'Si propagano alla velocità c.'),
    mc('Tra radio e microonde, hanno frequenza maggiore:', ['le onde radio lunghe', 'le microonde', 'sono sempre uguali', 'dipende dal mezzo soltanto'], 1, 'Le microonde seguono le radio nello spettro verso frequenze crescenti.'),
    mc('L’energia di un fotone è:', ['hc/λ', 'hλ/c', 'cλ/h', 'h/cλ'], 0, 'E=hν=hc/λ.'),
    mc('Una lente convergente è più spessa:', ['ai bordi', 'al centro', 'uniformemente', 'solo a sinistra'], 1, 'In aria una lente convessa converge raggi paralleli.'),
    mc('Un raggio parallelo all’asse di una lente convergente emerge passando per:', ['il centro ottico soltanto', 'il fuoco immagine', 'il vertice', 'l’infinito'], 1, 'È uno dei raggi notevoli.'),
    mc('L’immagine di uno specchio piano è:', ['reale e capovolta', 'virtuale, diritta e uguale', 'reale e ingrandita', 'virtuale e capovolta'], 1, 'Appare dietro lo specchio alla stessa distanza.'),
    mc('La rifrazione è descritta dalla legge:', ['n₁sinθ₁=n₂sinθ₂', 'n₁θ₁=n₂θ₂ sempre', 'θ₁+θ₂=90°', 'n₁cosθ₁=0'], 0, 'È la legge di Snell.'),
    mc('Passando a un mezzo con indice maggiore, il raggio si avvicina:', ['alla superficie', 'alla normale', 'sempre all’asse ottico', 'al fuoco'], 1, 'La velocità diminuisce e l’angolo rispetto alla normale si riduce.'),
    mc('La riflessione totale può avvenire andando:', ['da indice minore a maggiore', 'da indice maggiore a minore', 'solo nel vuoto', 'a incidenza normale'], 1, 'Serve inoltre un angolo maggiore di quello critico.'),
    mc('La legge di Lambert-Beer lega assorbanza e concentrazione in modo:', ['inverso', 'lineare', 'quadratico', 'logaritmico negativo senza coefficienti'], 1, 'A=εℓc.'),
    mc('L’assorbanza è definita come:', ['log₁₀(I/I₀)', 'log₁₀(I₀/I)', 'I₀/I senza log', 'I/I₀'], 1, 'Poiché T=I/I₀, A=−log₁₀T.'),
    mc('Nel decadimento radioattivo il numero di nuclei segue una legge:', ['lineare', 'esponenziale', 'sinusoidale', 'costante'], 1, 'N=N₀e⁻λt.'),
    mc('Dopo una emivita resta la frazione:', ['1/4', '1/2', '1/e²', 'zero'], 1, 'Per definizione il numero di nuclei si dimezza.'),
    mc('Una particella alfa è costituita da:', ['un elettrone', 'due protoni e due neutroni', 'un fotone', 'un neutrone'], 1, 'È un nucleo di elio-4.'),
    mc('La radiazione gamma è:', ['un nucleo di elio', 'un elettrone', 'un fotone molto energetico', 'un protone'], 2, 'È radiazione elettromagnetica ionizzante.'),
  ]
  ;[2, 3, 4, 5, 6].forEach((n) => {
    ex.push(num(`Una radiazione ha frequenza ${n}×10¹⁴ Hz. Usando c=3×10⁸ m/s, λ vale quanti nm?`, Math.round(3000 / n), [Math.round(300 / n), 3 * n, 300 * n], ' nm', 'λ=c/f=(3×10⁸)/(n×10¹⁴) m=3000/n nm.'))
    ex.push(num(`Una lente ha distanza focale ${10 * n} cm. Qual è il potere diottrico?`, Number((10 / n).toFixed(2)), [n / 10, 10 * n, 100 / n], ' D', 'P=1/f con f in metri.'))
    ex.push(num(`Dopo ${n} emivite, quale percentuale di nuclei resta, arrotondata a 0,1%?`, Number((100 / 2 ** n).toFixed(1)), [Number((100 / n).toFixed(1)), Number((100 / 2 ** (n + 1)).toFixed(1)), Number((100 / (n + 1)).toFixed(1))], '%', 'La frazione residua è (1/2)ⁿ.'))
  })
  ex.push(
    f('La velocità della luce nel vuoto si indica con la lettera ___.', 'c', 'Vale circa 3×10⁸ m/s.'),
    f('Il punto in cui convergono raggi inizialmente paralleli è il ___.', 'fuoco', 'La sua distanza dalla lente è la focale.'),
    f('Il rapporto c/v definisce l’indice di ___.', 'rifrazione', 'n=c/v.'),
    f('Una lente che allarga un fascio parallelo è detta ___.', 'divergente', 'Ha distanza focale negativa.'),
    f('A=εℓc è la legge di Lambert-___.', 'Beer', 'Descrive l’assorbimento in soluzione.'),
    f('Il tempo in cui l’attività si dimezza è l’___.', 'emivita', 'È T½=ln2/λ.'),
    f('Il numero di decadimenti per secondo è l’___.', 'attività', 'Si misura in becquerel.'),
    f('L’unità SI dell’attività radioattiva è il ___.', 'becquerel', '1 Bq=1 s⁻¹.', ['Bq']),
    f('La radiazione beta meno consiste nell’emissione di un ___.', 'elettrone', 'Nel nucleo un neutrone si trasforma in protone.'),
    f('Le radiazioni capaci di strappare elettroni sono dette ___.', 'ionizzanti', 'Producono ioni nella materia.')
  )
  const vf: Raw[] = []
  ;[1, 2, 3, 4, 5, 6].forEach((n) => {
    vf.push(num(`Verifica: una soluzione con A=${n} viene diluita a volume doppio. Quale assorbanza ideale si ottiene?`, n / 2, [2 * n, n, n / 4], '', 'Lambert-Beer: A∝c; raddoppiare il volume dimezza la concentrazione.'))
    vf.push(num(`Verifica: un campione parte da ${160 * n} Bq e trascorrono 3 emivite. Qual è l’attività?`, 20 * n, [40 * n, 80 * n, 10 * n], ' Bq', 'Dopo tre emivite resta 1/8 dell’attività iniziale.'))
  })
  return { ex, vf }
}

export const FIS_BANKS: Record<string, { ex: Raw[]; vf: Raw[] }> = {
  'fis-1': fis1(),
  'fis-2': fis2(),
  'fis-3': fis3(),
  'fis-4': fis4(),
  'fis-5': fis5(),
  'fis-6': fis6(),
  'fis-7': fis7(),
}
