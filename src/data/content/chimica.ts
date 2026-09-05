import type { UnitaContent } from '../../types'
import { fill, mc, resetQCounter } from '../quizHelpers'
import { pack } from './pack'

export function buildChimica(): UnitaContent[] {
  const out: UnitaContent[] = []

  resetQCounter()
  out.push(
    pack(
      'chim-1',
      [
        {
          title: 'Struttura atomica e tavola periodica',
          body: `L’atomo è costituito da un nucleo compatto di protoni e neutroni e da elettroni organizzati in orbitali descritti da numeri quantici (n, ℓ, mℓ, ms). La configurazione elettronica determina la reattività: gli elettroni di valenza sono quelli che formano i legami e spiegano periodi e gruppi della tavola. Lungo un periodo il raggio atomico tende a diminuire mentre energia di ionizzazione, affinità elettronica ed elettronegatività (scala di Pauling) tendono ad aumentare, perché la carica nucleare efficace cresce a schermo quasi costante. Nei gruppi le proprietà si ripetono per configurazioni di valenza simili: i metalli alcalini cedono facilmente un elettrone; gli alogeni tendono a guadagnarlo. Isotopi differiscono per il numero di neutroni (stesso Z, A diversa); gli ioni per il numero di elettroni. Queste trend spiegano perché i non metalli attraggono elettroni di legame e i metalli li cedono, e perché molecole polari e ioni dominano la chimica biologica dell’acqua e degli elettroliti. In medicina nucleare e diagnostica, isotopi radioattivi e stabili sono usati come traccianti: la chimica di base resta quella del nucleo e della nube elettronica.`,
          formule: ['Z = n° protoni', 'numero di massa A = Z + N', 'e⁻ di valenza → gruppo (approssimato)'],
          esempio: 'Il Na+ e il K+ extracellulare/intracellulare regolano potenziale di membrana: stessa carica, raggio diverso → canali selettivi.',
          attenzione: 'Elettronegatività ≠ affinità elettronica: la prima riguarda elettroni di legame, la seconda l’atomo isolato in gas.',
          approfondisci: [
            'Ordine di riempimento (Aufbau), regola di Hund e Pauli: perché la configurazione “a metà” è spesso più stabile.',
            'Carica nucleare efficace e schermo: perché F è più elettronegativo di I.',
            'Isotopi stabili vs radioattivi: decadimento β e γ in diagnostica (cenni).',
            'Trend secondari: anomalia del Be e N nella prima ionizzazione.',
          ],
          figureIds: ['chim-1-atomo', 'chim-1-atom'],
        },
        {
          title: 'Legami chimici e geometria',
          body: `Il legame ionico nasce dal trasferimento di elettroni e dà reticoli (NaCl); il covalente dalla condivisione di coppie (polare se Δχ rilevante, apolare se la molecola è simmetrica). Il metallico spiega conducibilità e malleabilità dei metalli. La geometria molecolare si predice con VSEPR: le coppie elettroniche (leganti e non) si respingono e adottano disposizioni lineari, trigonalie planari, tetraedriche, trigonalie bipiramidali o ottaedriche. L’ibridazione (sp, sp2, sp3) collega orbitali atomici a geometrie locali tipiche del carbonio organico e dell’azoto/ossigeno. Interazioni deboli — forze di van der Waals (London, dipolo–dipolo) e legami a idrogeno — non sostituiscono i covalenti forti ma orientano piegatura di proteine, base pairing del DNA e proprietà dell’acqua. Senza H-bond non esisterebbero le strutture secondarie proteiche né la doppia elica stabile a temperatura fisiologica. In farmacologia, polarità e geometria decidono solubilità, permeazione membranaria e riconoscimento recettoriale: due enantiomeri o due isomeri cis–trans possono avere profili del tutto diversi.`,
          formule: ['Δχ alto → legame più ionico/polare', 'angoli tipici sp3 ≈ 109,5°; sp2 ≈ 120°; sp ≈ 180°'],
          esempio: 'L’acqua (sp3 sull’O, angolo ≈ 104,5°) è polare e forma una rete di H-bond: solvente universale biologico.',
          attenzione: 'VSEPR predice geometria, non “forza” del legame; due molecole isoelettroniche possono avere polarità diverse.',
          approfondisci: [
            'Momento di dipolo molecolare: perché CO2 è apolare e H2O no.',
            'Legame a idrogeno vs van der Waals: energie tipiche e effetti su T_eb.',
            'Ibridazione e orbitali molecolari: modello qualitativo σ/π.',
            'Geometrie con lone pair: perché NH3 e H2O “deviano” dagli angoli ideali.',
          ],
        },
        {
          title: 'Stati di aggregazione',
          body: `Solidi, liquidi e gas differiscono per energia cinetica media e intensità delle forze intermolecolari. Nei solidi le particelle oscillano in reticoli (ionici, covalenti, molecolari, metallici); nei liquidi restano vicine ma mobili; nei gas sono distanti e collidono elasticamente nell’ideale. I diagrammi di fase qualitativi mostrano equilibrio solido–liquido–vapore, il punto triplo e il punto critico; sublimazione e condensazione sono passaggi rilevanti in laboratorio e in fisiologia (evaporazione del sudore). La pressione di vapore cresce con T: all’ebollizione uguaglia la pressione esterna. In biologia membrane e citosol sono fasi condensate altamente organizzate: non sono “gas ideali”, ma le idee di equilibrio di fase aiutano a ragionare su solubilità, evaporazione e formazione di cristalli (es. urati, ossalati). Il calore latente spiega perché cambiare stato costa energia senza necessariamente cambiare temperatura: concetto chiave in termoregolazione e in tecniche di liofilizzazione. In ambito clinico, la volatilità di anestetici e solventi e la formazione di cristalli urinari sono esempi concreti di equilibri di fase: piccole variazioni di temperatura o composizione spostano il sistema da una regione all’altra del diagramma.`,
          formule: ['P_vapore ↑ se T ↑', 'punto di ebollizione: P_vapore = P_esterna'],
          esempio: 'L’evaporazione del sudore sottrae calore latente e raffredda la cute: passaggio liquido → vapore endotermico.',
          attenzione: '“Solido” non implica sempre ionico: il ghiaccio è molecolare tenuto da H-bond.',
          approfondisci: [
            'Diagramma di fase dell’acqua: pendenza negativa della fusione e conseguenze (ghiaccio galleggia).',
            'Calore latente vs calore specifico: quando T resta costante.',
            'Gas reale vs ideale: quando l’approssimazione fallisce (alte P, basse T).',
            'Cristalli liquidi e membrane: ordine parziale in biologia.',
          ],
        },
        {
          title: 'Termodinamica dei sistemi aperti',
          body: `Gli organismi sono sistemi aperti: scambiano materia ed energia con l’ambiente. Funzioni di stato utili: energia interna U, entalpia H (scambi di calore a P ≈ costante), entropia S (disordine/probabilità microscopica) ed energia libera di Gibbs G. ΔG < 0 indica processo spontaneo a T e P costanti; ΔG = 0 all’equilibrio; ΔG > 0 richiede accoppiamento energeticamente favorevole. La relazione ΔG = ΔH − TΔS spiega perché temperature alte favoriscono processi con ΔS > 0. In cellula, l’idrolisi dell’ATP (ΔG negativo in condizioni fisiologiche) accoppia vie anaboliche altrimenti sfavorevoli: non “crea energia dal nulla”, ma sposta il bilancio complessivo. Termodinamica dice se un processo può avvenire; la cinetica dice quanto velocemente. Nei quiz conviene distinguere sempre ΔG (spontaneità) da Ea (barriera) e da Keq (posizione dell’equilibrio). Sistemi chiusi e isolati sono modelli utili, ma il metabolismo reale è flusso stazionario lontano dall’equilibrio termodinamico globale. Per l’esame conviene allenarsi a classificare processi (endergonici/esergonici) e a riconoscere quando serve un accoppiamento: senza questo passaggio, ΔG e “velocità” vengono spesso scambiati.`,
          formule: ['ΔG = ΔH − TΔS', 'ΔG < 0 → spontaneo (a T,P costanti)', 'H ≈ U + PV'],
          esempio: 'Sintesi proteica: ΔG complessivo favorevole grazie ad accoppiamento con idrolisi di ATP/GTP.',
          attenzione: 'ΔG negativo non garantisce velocità elevata: serve catalisi (enzimi) per superare Ea.',
          approfondisci: [
            'ΔG° vs ΔG: condizioni standard e condizioni cellulari (Q ≠ 1).',
            'Accoppiamento ATP: come una reazione endergonica diventa netta esergonica.',
            'Entalpia di legame: stima qualitativa di ΔH di reazione.',
            'Secondo principio: perché gli organismi aumentano l’entropia dell’ambiente.',
          ],
        },
      ],
      {
        analogia:
          'Immagina l’atomo come un sistema solare in miniatura: il nucleo è il Sole, gli elettroni sono pianeti su “binari” chiamati orbitali. La tavola periodica è come una scuola con classi ordinate: chi siede vicino ha comportamenti simili. I legami sono strette di mano (covalente) o scambi di figurine (ionico). L’energia libera G è come il “budget” di una reazione: se resta in positivo, la reazione non parte da sola; l’ATP è la “batteria” della cellula che paga i costi.',
        concetti: [
          {
            titolo: 'Cosa c’è dentro un atomo',
            testo:
              'Protoni (+) e neutroni stanno nel nucleo; gli elettroni (−) girano intorno. Il numero di protoni dice quale elemento è. Gli elettroni esterni decidono con chi “fa amicizia” l’atomo.',
          },
          {
            titolo: 'Legami e forme',
            testo:
              'Quando due atomi condividono elettroni nasce un legame covalente; se uno li prende e l’altro li dà, è ionico. La forma della molecola (piegata, a tetraedro…) conta perché decide se è “magnete” polare o no — come l’acqua.',
          },
          {
            titolo: 'Solido, liquido, gas',
            testo:
              'Al freddo le particelle stanno ferme (solido), un po’ più calde scivolano (liquido), molto calde volano via (gas). Cambiare stato costa o libera energia, come quando sudi e ti raffreddi.',
          },
          {
            titolo: 'Sistemi aperti e ΔG',
            testo:
              'Il tuo corpo scambia cibo, aria e calore con fuori: è un sistema aperto. Se ΔG è negativo, la reazione “scende” da sola; se è positivo, serve aiuto (spesso ATP).',
          },
        ],
      },
      [
        mc('chim-1', 'L’elettronegatività misura tipicamente:', ['La massa atomica', 'La tendenza ad attrarre elettroni di legame', 'Il numero di neutroni', 'La viscosità'], 1, 'Scala di Pauling e analoghe.'),
        mc('chim-1', 'Un sistema aperto scambia con l’ambiente:', ['Solo energia', 'Materia ed energia', 'Nulla', 'Solo luce'], 1, 'Come le cellule viventi.'),
        fill('chim-1', 'Se ΔG < 0 la reazione è termodinamicamente ______.', 'spontanea', 'Spontanea (favorevole) a T e P costanti.', ['favorevole']),
        mc('chim-1', 'Il legame a idrogeno è particolarmente importante in:', ['Solo nei gas nobili', 'Acqua, DNA e proteine', 'Solo nei metalli puri', 'Solo nei solidi ionici perfetti'], 1, 'Stabilizza strutture biologiche.'),
        mc('chim-1', 'VSEPR predice principalmente:', ['Il pH', 'La geometria molecolare', 'L’emivita', 'Il CFU'], 1, 'Disposizione delle coppie elettroniche.'),
      ],
      [
        mc('chim-1', 'L’entalpia H è legata a:', ['Solo al numero di Avogadro', 'U + PV (scambi di calore a P costante)', 'Solo al potenziale di membrana', 'Solo ai virus'], 1, 'ΔH ≈ calore a pressione costante.'),
        fill('chim-1', 'NaCl solido è tenuto insieme soprattutto da legami ______.', 'ionici', 'Reticolo ionico.'),
        mc('chim-1', 'Un orbital ibrido sp3 ha geometria tipica:', ['Lineare', 'Tetraedrica', 'Ottaedrica pura senza ibridazione', 'Planare triangolare'], 1, 'Angoli ≈ 109.5°.'),
        mc('chim-1', 'L’energia di ionizzazione tipicamente lungo un periodo:', ['Diminuisce sempre drasticamente', 'Tende ad aumentare', 'È costante', 'Dipende solo dalla temperatura ambientale'], 1, 'Nucleo più efficace sugli elettroni esterni.'),
        mc('chim-1', 'ΔG = ΔH − TΔS. A T alta, un ΔS > 0:', ['Favorisce ΔG negativo', 'Impedisce sempre la reazione', 'Annulla H', 'Crea neutroni'], 0, 'Termine −TΔS diventa più negativo.'),
        mc('chim-1', 'Le forze di van der Waals sono:', ['Più forti del covalente tipico', 'Interazioni deboli a breve raggio', 'Legami peptidici', 'Solo nei gas perfetti ideali'], 1, 'Importanti in packing molecolare.'),
        fill('chim-1', 'Il numero di Avogadro vale circa 6,022 × 10^______.', '23', '6,022×10²³ mol⁻¹.'),
        mc('chim-1', 'Nei sistemi biologici l’ATP spesso:', ['Aumenta ΔG di reazioni sfavorevoli accoppiandole', 'Elimina sempre l’entropia', 'Sostituisce il DNA', 'È un gas nobile'], 0, 'Accoppiamento energeticamente favorevole.'),
      ],
      {
        figure: [
          { id: 'chim-1-atomo', kind: 'svg', caption: 'Modello atomico qualitativo', alt: 'Atomo con orbitali' },
          { id: 'chim-1-atom', kind: 'sketch', caption: 'Appunti: nucleo ed elettroni', alt: 'Sketch atomo' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-2',
      [
        {
          title: 'Soluzioni e concentrazione',
          body: `Una soluzione è una miscela omogenea di soluto in solvente. In biologia il solvente tipico è l’acqua. Le concentrazioni si esprimono come molarità M (mol/L di soluzione), molalità m (mol/kg di solvente), percentuali massa/volume e frazioni molari. La molarità dipende dalla temperatura (il volume si dilata); la molalità no, perciò è preferita in alcuni calcoli colligativi. Nelle soluzioni ideali le interazioni soluto–solvente sono confrontabili a quelle pure; nel citosol le concentrazioni elevate di ioni e macromolecole rendono le soluzioni non ideali: i coefficienti di attività si discostano da 1 e l’attività chimica, non la sola concentrazione formale, governa equilibri e velocità. Diluizioni (C1V1 = C2V2), conversioni tra unità e lettura corretta di “% m/v” vs “% m/m” sono competenze di base per laboratorio, farmacologia e fluidoterapia. Una soluzione fisiologica ≈ 0,9% NaCl (m/v) è isotonica con il plasma: usata in flebo proprio perché non altera drasticamente il volume eritrocitario. In pratica, errori di unità (mg/dL vs mmol/L, % m/v vs M) sono tra le cause più frequenti di risposte sbagliate nei quiz e di errori di preparazione in laboratorio.`,
          formule: ['M = n_soluto / V_soluzione (L)', 'm = n_soluto / kg_solvente', 'w/v % = (g soluto / mL soluzione) × 100'],
          esempio: 'Una soluzione fisiologica ≈ 0,9% NaCl (m/v) è isotonica con il plasma: usata in flebo.',
          attenzione: '1 M ≠ 1 m: molarità usa litri di soluzione, molalità chili di solvente.',
          approfondisci: [
            'Attività a = γ·c: perché nel citosol γ ≠ 1.',
            'Normalità e equivalenti: quando ancora si usano in titolazioni.',
            'Osmolarità vs osmolarità calcolata: fattori di conversione pratici.',
            'Solubilità e saturazione: curva di solubilità qualitativa.',
          ],
        },
        {
          title: 'Proprietà colligative',
          body: `Le proprietà colligative dipendono dal numero di particelle di soluto, non dalla loro identità chimica (a parità di condizioni ideali). Includono: abbassamento della tensione di vapore, innalzamento ebullioscopico, abbassamento crioscopico e pressione osmotica. Il fattore di van ’t Hoff i corregge la dissociazione: NaCl completamente dissociato dà circa due particelle (i ≈ 2), glucosio non elettrolita ha i ≈ 1; per CaCl2 i ≈ 3 in ideale. Formule tipiche: ΔTf = i Kf m, ΔTb = i Kb m. In medicina queste idee spiegano perché soluzioni concentrate abbassano il punto di congelamento e perché la tonicità non coincide sempre con l’osmolarità misurata se le membrane sono selettive. Anche la pressione di vapore di una soluzione diluita segue Raoult: il solvente “diluito” evapora meno. Contare correttamente le particelle evita errori tipici d’esame: 1 M NaCl “pesa” circa il doppio di 1 M glucosio in termini colligativi. Quando si stima l’osmolarità di un liquido endovenoso o del plasma, il conteggio corretto delle particelle (i) e la scelta tra molalità e molarità fanno la differenza tra un calcolo coerente e uno solo apparentemente giusto.`,
          formule: ['ΔTf = i Kf m', 'ΔTb = i Kb m', 'i ≈ n° particelle da 1 formula unit'],
          esempio: 'Il sale sulle strade d’inverno abbassa il punto di congelamento dell’acqua: stessa logica colligativa.',
          attenzione: 'Contano le particelle: 1 M NaCl “pesa” circa il doppio di 1 M glucosio in termini colligativi.',
          approfondisci: [
            'Legge di Raoult e abbassamento della P_vapore.',
            'Quando i è “effettivo” < teorico: associazione ionica.',
            'Osmolarità vs molalità: unità e fattori di conversione clinici.',
            'Crioscopia del siero: stima dell’osmolarità.',
          ],
        },
        {
          title: 'Pressione osmotica e membrane',
          body: `La pressione osmotica π è la pressione necessaria a fermare il flusso netto di solvente attraverso una membrana semipermeabile. Nell’approssimazione diluita di van ’t Hoff: π = iCRT, con C concentrazione molare e T assoluta. L’acqua si muove dal compartimento a minore osmolarità verso quello a maggiore (dal “più diluito” al “più concentrato” di particelle non permeanti). Membrane biologiche sono selettive: acqua (acquaporine) passa più facilmente di molti soluti. Osmolarità plasmatica, tonicità e gradienti tra liquido interstiziale e intracellulare regolano volume cellulare. Dialisi e osmometri sfruttano gli stessi principi. Distinguere tonicità da osmolarità totale è cruciale: soluti permeanti (urea) possono equilibrarsi attraverso la membrana e non cambiare il volume cellulare a lungo termine, mentre Na+ e proteine plasmatiche sì. Nei tubuli renali il riassorbimento di NaCl crea gradienti osmotici che “tirano” l’acqua verso il sangue. Clinicamente, ipo- e ipernatriemia alterano l’osmolarità efficace e quindi il volume cerebrale: ecco perché tonicità e permeabilità dei soluti non sono dettagli teorici ma criteri di sicurezza.`,
          formule: ['π ≈ i C R T', 'acqua: da ipoosmotico → iperosmotico (netto)'],
          esempio: 'Nei tubuli renali il riassorbimento di NaCl crea gradienti osmotici che “tirano” l’acqua.',
          attenzione: 'Tonicità ≠ osmolarità totale: soluti permeanti (urea) possono non cambiare volume cellulare a lungo termine.',
          approfondisci: [
            'Acquaporine: permeabilità all’acqua regolata da ADH.',
            'Osmolarità effettiva (tonicità) vs osmolarità misurata.',
            'Equazione di Starling: idrostatica vs oncotica nei capillari.',
            'Dialisi: diffusione e ultrafiltrazione a confronto.',
          ],
          figureIds: ['chim-2-osmosi'],
        },
        {
          title: 'Emolisi, edema e applicazioni biomediche',
          body: `In ambiente ipotonico l’acqua entra nell’eritrocita fino a gonfiarsi e lysare (emolisi); in ipertonico esce e la cellula si raggrinzisce (crenazione); in isotonico il volume resta stabile. L’edema è accumulo di liquido nei tessuti: può nascere da aumento della pressione idrostatica capillare, da diminuzione della pressione oncotica plasmatica (ipoalbuminemia), da aumento della permeabilità o da ostacolo linfatico. Le proteine plasmatiche trattengono acqua nel vaso (effetto oncotico). Comprensione di tonicità e colligative è essenziale per liquidi endovenosi, nutrizione parenterale e comprensione di scompenso, nefrosi e ustioni. In pratica clinica si scelgono soluzioni isotoniche, ipotoniche o ipertoniche a seconda dell’obiettivo (espansione volumica, correzione di ipernatriemia, mannitolismo osmotico). Non confondere pressione idrostatica (spinge fuori) e oncotica (trattiene nel plasma): entrambe entrano nell’equilibrio di Starling. Nella scelta del liquido di reintegrazione si valuta sempre il rischio di emolisi, di shift osmotico cerebrale e di sovraccarico idrico: la chimica colligativa guida direttamente la decisione terapeutica.`,
          formule: ['ipotonico → emolisi', 'ipertonico → crenazione', 'oncotica ↓ (albumina ↓) → edema'],
          esempio: 'Nella sindrome nefrosica si perdono proteine con le urine → oncotica bassa → edema periferico.',
          attenzione: 'Non confondere pressione idrostatica (spinge fuori) e oncotica (trattiene nel plasma).',
          approfondisci: [
            'Classificazione dei liquidi EV: cristalloidi vs colloidi (cenni).',
            'Edema polmonare: ruolo di idrostatica e permeabilità.',
            'Mannitolo: diuresi osmotica e uso neurochirurgico.',
            'Emolisi in vitro: perché i campioni “scoppiano” in acqua distillata.',
          ],
        },
      ],
      {
        analogia:
          'Pensa a una bevanda zuccherata: lo zucchero è il soluto, l’acqua il solvente. Se metti tante particelle in un bicchiere “separato” da una maglia fine che lascia passare solo l’acqua, l’acqua corre dove ci sono più particelle — come se volesse “annaffiare” il lato più affollato. Quella “voglia” di entrare è la pressione osmotica. I globuli rossi sono palloncini d’acqua: se fuori c’è poca “roba disciolta”, si riempiono troppo e scoppiano.',
        concetti: [
          {
            titolo: 'Soluto e solvente',
            testo:
              'Il solvente è il liquido che ospita (di solito acqua). Il soluto è ciò che sciogli (sale, zucchero, farmaci). La molarità dice quante “porzioni molecolari” ci sono in un litro di miscela.',
          },
          {
            titolo: 'Proprietà colligative',
            testo:
              'Alcuni effetti dipendono da quante particelle ci sono, non da chi sono: congelare più tardi, bollire più tardi, “tirare” acqua. Il sale si spezza in due ioni, quindi “conta doppio” rispetto allo zucchero.',
          },
          {
            titolo: 'Osmosi',
            testo:
              'Con una membrana che lascia passare soprattutto l’acqua, l’acqua va verso il lato più concentrato. Serve una pressione (π) per fermarla. Nei tubi del sangue e nei reni questo è importantissimo.',
          },
          {
            titolo: 'Emolisi ed edema',
            testo:
              'Troppa acqua nel globulo rosso → emolisi. Poche proteine nel sangue → l’acqua scappa nei tessuti → gonfiore (edema). Non è magia: è equilibrio di pressioni.',
          },
        ],
      },
      [
        mc('chim-2', 'Una proprietà colligativa dipende principalmente da:', ['Il colore del soluto', 'Il numero di particelle di soluto', 'Solo dalla massa molare senza particelle', 'Solo dal pH'], 1, 'Conta i (fattore di van ’t Hoff).'),
        mc('chim-2', 'In soluzione ipotonica un eritrocita tende a:', ['Raggrinzirsi', 'Gonfiarsi / emolizzare', 'Diventare Gram+', 'Produrre ATP extracellulare'], 1, 'Ingresso di acqua.'),
        fill('chim-2', 'La pressione osmotica si indica spesso con la lettera greca ______.', 'π', 'Pi greco (π).', ['pi', 'PI']),
        mc('chim-2', 'L’edema può essere favorito da:', ['Aumento della pressione oncotica plasmatica', 'Diminuzione delle proteine plasmatiche (oncotica ↓)', 'Solo da DNA mitocondriale', 'Solo da telomeri lunghi'], 1, 'Bassa albumina → liquidi nei tessuti.'),
        mc('chim-2', 'Una soluzione 1 M contiene:', ['1 mol di soluto in 1 L di soluzione', '1 mol in 1 kg di solvente sempre', '1 g/L', '1% in peso'], 0, 'Molarità = mol/L.'),
      ],
      [
        mc('chim-2', 'Il fattore i di van ’t Hoff per NaCl completamente dissociato è circa:', ['1', '2', '0', '10'], 1, 'Na+ + Cl−.'),
        fill('chim-2', 'Il solvente tipico nei sistemi biologici è l’______.', 'acqua', 'H2O.'),
        mc('chim-2', 'Una membrana semipermeabile permette tipicamente:', ['Passaggio selettivo (es. solvente più del soluto)', 'Passaggio di tutto senza limiti', 'Solo elettroni', 'Solo virus'], 0, 'Base dell’osmosi.'),
        mc('chim-2', 'L’abbassamento del punto di congelamento è:', ['Una proprietà colligativa', 'Indipendente dalla concentrazione', 'Solo un effetto quantistico', 'Un tipo di radioattività'], 0, 'ΔTf = i Kf m.'),
        mc('chim-2', 'Nel citosol le soluzioni non ideali implicano:', ['Coefficienti di attività ≠ 1', 'Assenza di ioni', 'pH sempre 14', 'Solo gas perfetti'], 0, 'Interazioni forti ad alta concentrazione.'),
        mc('chim-2', 'Crenazione degli eritrociti avviene in ambiente:', ['Ipotonico', 'Ipertonico', 'Isotonico perfetto', 'Nel vuoto assoluto'], 1, 'Uscita di acqua.'),
        fill('chim-2', 'La molalità è moli di soluto per kg di ______.', 'solvente', 'Non per litro di soluzione.'),
        mc('chim-2', 'π = iCRT: se T aumenta a C costante, π:', ['Diminuisce', 'Aumenta', 'Resta identica sempre', 'Diventa negativa'], 1, 'Proporzionale a T assoluta.'),
      ],
      {
        figure: [
          { id: 'chim-2-osmosi', kind: 'svg', caption: 'Osmosi: acqua verso il lato ipertonico', alt: 'Due compartimenti osmotici' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-3',
      [
        {
          title: 'Tipi di reazione e stechiometria',
          body: `Le reazioni chimiche si classificano in sintesi, decomposizione, scambio semplice o doppio, redox e acido–base (spesso sovrapposte). Bilanciare significa uguagliare atomi e carica netta sui due lati, rispettando la conservazione della massa. I coefficienti stechiometrici fissano i rapporti molari tra reagenti e prodotti e permettono calcoli di resa teorica, reagente limitante e purezza. In metabolismo le vie sono sequenze di reazioni bilanciate (es. glicolisi); errori di bilanciamento invalidano ogni calcolo successivo. Nelle equazioni ioniche nette si evidenziano le specie che cambiano davvero, eliminando gli ioni spettatori — utile in solubilità e titolazioni. La resa percentuale confronta prodotto ottenuto e teorico: in laboratorio e in industria raramente è 100% per reazioni collaterali, equilibrio incompleto o perdite. Distinguere stechiometria (rapporti) da cinetica (velocità) e da termodinamica (ΔG, K) evita confusione tipica d’esame. Prima di ogni calcolo di resa o di limitante conviene riscrivere l’equazione bilanciata e convertire tutto in moli: è il metodo più robusto contro errori di massa e di coefficienti.`,
          formule: ['n = m / MM', 'resa % = (resa reale / teorica) × 100', 'atomi e carica bilanciati a sinistra = a destra'],
          esempio: 'Combustione del glucosio: C6H12O6 + 6 O2 → 6 CO2 + 6 H2O (bilanciata).',
          attenzione: 'I coefficienti stechiometrici non sono automaticamente l’ordine di reazione cinetico.',
          approfondisci: [
            'Reagente limitante: schema a “porzioni molari”.',
            'Equazioni ioniche nette vs molecolari.',
            'Resa atomica e green chemistry (cenni).',
            'Stechiometria in soluzioni: da moli a volume via M.',
          ],
        },
        {
          title: 'Cinetica e catalisi enzimatica',
          body: `La velocità di reazione misura come cambiano le concentrazioni nel tempo. Dipende da concentrazione, temperatura, superficie di contatto e catalizzatori. L’ordine di reazione si ricava da dati sperimentali, non dalla sola stechiometria. L’energia di attivazione Ea è la barriera verso lo stato di transizione: più alta è, più lenta la reazione a T data. Gli enzimi (di regola proteine; a volte RNA) abbassano Ea stabilizzando lo stato di transizione, accelerando il raggiungimento dell’equilibrio senza modificare ΔG né Keq della reazione netta. Inibizione competitiva aumenta Km apparente; quella non competitiva riduce Vmax. Temperatura e pH ottimali riflettono stabilità della struttura enzimatica: oltre certi limiti si denatura. Il modello di Michaelis–Menten (cenni) collega v a [S]: a saturazione v → Vmax. In clinica, farmaci e tossici spesso agiscono proprio modulando catalisi o inibendo enzimi chiave. Nei quiz, se compare un grafico v vs [S] o un’inibizione, chiediti subito se cambia Km, Vmax o entrambe: così distingui il meccanismo senza memorizzare formule inutili.`,
          formule: ['v = k [A]^m [B]^n (legge di velocità tipica)', 'k ↑ se T ↑ (più molecole superano Ea)', 'catalizzatore: ↓ Ea, Keq invariata'],
          esempio: 'L’anidrasi carbonica accelera CO2 + H2O ⇌ H2CO3 di ordini di grandezza: vitale per trasporto CO2.',
          attenzione: 'Catalizzatore ≠ spostare l’equilibrio: accelera andata e ritorno.',
          approfondisci: [
            'Equazione di Arrhenius: dipendenza di k da T.',
            'Michaelis–Menten: Km e significato fisiologico.',
            'Inibizione competitiva vs non competitiva: Lineweaver–Burk (cenni).',
            'Cofattori e coenzimi: perché alcuni enzimi “non bastano da soli”.',
          ],
        },
        {
          title: 'Equilibrio chimico',
          body: `All’equilibrio le velocità di andata e ritorno si eguagliano e le concentrazioni (o attività) restano costanti; non significa che le quantità di reagenti e prodotti siano uguali. La costante Keq (o K) riassume il rapporto tra prodotti e reagenti all’equilibrio. Il quoziente di reazione Q confrontato con K dice la direzione spontanea verso l’equilibrio. Il principio di Le Chatelier predice lo spostamento se si varia concentrazione, pressione (gas) o temperatura: il sistema “contrasta” il disturbo. ΔG° è legato a K (ΔG° = −RT ln K): K grande implica prodotti favoriti all’equilibrio standard. In fisiologia molti equilibri (ossigeno–emoglobina, tamponi) sono dinamici e regolati da flussi continui, non da sistemi chiusi statici. Attenzione: K dipende da T; aggiungere catalizzatore non cambia K, solo il tempo per arrivarci. Distinguere Kc e Kp (gas) e ricordare che solidi puri e solvente non entrano tipicamente nell’espressione di K. Un trucco utile: calcola Q, confrontalo con K e solo dopo applica Le Chatelier; così non confondi la direzione spontanea con lo spostamento dovuto a un disturbo esterno.`,
          formule: ['K = [prodotti]^coeff / [reagenti]^coeff (omogeneo tipico)', 'Q < K → verso prodotti', 'ΔG° = −RT ln K'],
          esempio: 'Aggiungere prodotto a un equilibrio sposta il sistema verso i reagenti (Le Chatelier).',
          attenzione: 'K dipende da T; aggiungere catalizzatore non cambia K, solo il tempo per arrivarci.',
          approfondisci: [
            'Kc vs Kp e quando coincidono.',
            'Effetto della T su K: endotermiche vs esotermiche.',
            'Equilibri eterogenei: solidi e liquidi puri.',
            'Legame ΔG = ΔG° + RT ln Q: direzione spontanea.',
          ],
        },
        {
          title: 'Prodotto di solubilità e calcoli renali',
          body: `Per sali poco solubili l’equilibrio eterogeneo solido ⇌ ioni in soluzione è descritto dal prodotto di solubilità Kps. Se il prodotto ionico Q supera Kps, la soluzione è sovrasatura e tende a precipitare. A parità di stechiometria, Kps più alto indica maggiore solubilità. Nel rene, ossalato di calcio, fosfato di calcio e acido urico possono formare calcoli quando concentrazione, pH e inibitori/promotori della cristallizzazione spostano Q oltre Kps. Idratazione, dieta e pH urinario modulano il rischio: alcalinizzare l’urina aiuta per l’acido urico, mentre per alcuni fosfati la logica è diversa. Comprendere Kps collega chimica analitica e nefrolitiasi clinica. L’effetto dello ione comune riduce ulteriormente la solubilità di un sale già poco solubile: concetto utile anche in analisi qualitativa. Non interpretare “Kps alto” come “precipita di più”: significa che il sale è più solubile, a confronto corretto. In nefrolitiasi, oltre a Kps contano volume urinario, inibitori naturali (citrato) e tempo di transit: la chimica della precipitazione si intreccia con la fisiologia del tubo collettore.`,
          formule: ['Per MxAy(s) ⇌ x M + y A: Kps = [M]^x [A]^y', 'Q > Kps → precipitazione'],
          esempio: 'Calcoli di ossalato di calcio: elevate [Ca2+] e [ossalato] urinarie favoriscono Q > Kps.',
          attenzione: 'Kps alto ⇒ sale più solubile (a confronto corretto), non “più precipita”.',
          approfondisci: [
            'Effetto dello ione comune sulla solubilità.',
            'pH e solubilità di acidi deboli / basi conjugate (cenni).',
            'Calcoli di urato vs ossalato: ruolo del pH urinario.',
            'Sovrasaturazione metastabile: perché non precipita subito.',
          ],
        },
      ],
      {
        analogia:
          'Una reazione è come una gara in salita: l’energia di attivazione è la collina da superare. L’enzima è una galleria che accorcia la salita: arrivi prima, ma il punto di arrivo (equilibrio) resta lo stesso. L’equilibrio è un’altalena ferma: i bambini salgono e scendono ancora, ma i piatti restano alla stessa altezza. I calcoli renali sono sale che “piove” fuori dalla pipì quando c’è troppa roba disciolta rispetto a quanto l’acqua riesce a tenere.',
        concetti: [
          {
            titolo: 'Bilanciare le reazioni',
            testo:
              'A sinistra e a destra devono esserci gli stessi atomi (e la stessa carica). È come contare i mattoncini LEGO prima e dopo: non spariscono.',
          },
          {
            titolo: 'Velocità ed enzimi',
            testo:
              'Caldo e concentrazione aiutano le molecole a urtarsi meglio. Gli enzimi sono aiutanti che abbassano la “collina” Ea. Non cambiano chi vince alla fine (Keq), solo quanto tempo ci vuole.',
          },
          {
            titolo: 'Equilibrio e Le Chatelier',
            testo:
              'Se spingi l’altalena da un lato (aggiungi reagente o prodotto), il sistema si muove per bilanciare. K dice quanto “pesa” il lato prodotti a equilibrio raggiunto.',
          },
          {
            titolo: 'Kps e calcoli',
            testo:
              'Ogni sale ha un limite di quanto può restare sciolto. Se superi quel limite (Kps), si formano cristalli — anche nei reni.',
          },
        ],
      },
      [
        mc('chim-3', 'Un catalizzatore enzimatico:', ['Sposta Keq verso i prodotti sempre', 'Accelera il raggiungimento dell’equilibrio', 'Cambia ΔG della reazione netta', 'Elimina i reagenti'], 1, 'Cinetica, non termodinamica di equilibrio.'),
        mc('chim-3', 'Il Kps elevato indica tipicamente:', ['Sale poco solubile', 'Sale più solubile (a parità di stechiometria)', 'Acido forte', 'Gas ideale'], 1, 'Maggiore solubilità → Kps maggiore.'),
        fill('chim-3', 'Il principio di ______ predice lo spostamento dell’equilibrio se si disturba il sistema.', 'Le Chatelier', 'Le Chatelier.', ['lechatelier', 'Le Chatelier']),
        mc('chim-3', 'I calcoli renali di ossalato di calcio riguardano:', ['Equilibri di solubilità', 'Solo splicing', 'Solo onde sonore', 'Solo Gram stain'], 0, 'Precipitazione quando Q > Kps.'),
        mc('chim-3', 'L’energia di attivazione è:', ['L’energia minima per formare lo stato di transizione', 'Sempre uguale a ΔG', 'Il pH', 'Il CFU'], 0, 'Barriera cinetica.'),
      ],
      [
        mc('chim-3', 'Aumentare la temperatura tipicamente:', ['Rallenta tutte le reazioni', 'Aumenta la velocità di molte reazioni', 'Annulla Keq sempre', 'Elimina gli enzimi dalla definizione'], 1, 'Più molecole superano Ea.'),
        fill('chim-3', 'La costante di equilibrio si indica spesso con ______.', 'K', 'Keq o K.', ['Keq', 'K_eq']),
        mc('chim-3', 'Se si aggiunge prodotto a un equilibrio:', ['Si sposta verso i reagenti (Le Chatelier)', 'Si ferma per sempre', 'ΔG diventa zero sempre', 'Nasce un virus'], 0, 'Il sistema consuma prodotto.'),
        mc('chim-3', 'L’ordine di reazione si determina tipicamente da:', ['Solo stechiometria globale', 'Dati cinetici sperimentali', 'Solo dal colore', 'Solo dal nome IUPAC'], 1, 'Non sempre coincide con i coefficienti.'),
        mc('chim-3', 'Un inibitore competitivo tipicamente:', ['Aumenta Km apparente', 'Diminuisce Vmax irreversibilmente sempre', 'Cambia il DNA', 'Aumenta Kps del substrato'], 0, 'Compete per il sito attivo.'),
        mc('chim-3', 'Q > Kps implica:', ['Precipitazione (sovrasaturazione)', 'Dissoluzione completa garantita', 'pH = 7', 'Assenza di ioni'], 0, 'Si forma solido.'),
        fill('chim-3', 'Gli enzimi sono tipicamente catalizzatori di natura ______.', 'proteica', 'O RNA (ribozimi), ma classicamente proteine.', ['proteina', 'proteine']),
        mc('chim-3', 'Bilanciare una reazione significa:', ['Uguagliare atomi (e carica se ionica) dei due lati', 'Solo aggiungere acqua', 'Cambiare Keq', 'Misurare π'], 0, 'Conservazione della massa.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-4',
      [
        {
          title: 'Acidi, basi e pH',
          body: `Secondo Arrhenius, acidi liberano H+ e basi OH− in acqua; Brønsted–Lowry generalizza: acido dona protoni, base li accetta; Lewis parla di accettore/donatore di coppia elettronica. Ka e Kb misurano la forza; pKa = −log Ka. pH = −log[H+] (o [H3O+]). Acidi forti si dissociano completamente; i deboli stabiliscono equilibrio HA ⇌ H+ + A− con coppia coniugata. Indicatori e titolazioni permettono di determinare concentrazioni. In biologia il pH regola carica di proteine, attività enzimatica e trasporto di membrane. Piccole variazioni di pH ematico hanno conseguenze cliniche gravi perché molte reazioni e strutture sono pH-sensibili. Kw ≈ 10⁻¹⁴ a 25 °C collega [H+] e [OH−]: in acqua pura pH = 7, ma a T diversa Kw cambia. La zona fisiologica del sangue (~7,35–7,45) è stretta: fuori da essa enzimi e trasporto di O2/CO2 si alterano rapidamente. Per i calcoli, ricorda che pH + pOH = 14 solo a 25 °C in acqua; in sangue a 37 °C i numeri cambiano leggermente, ma la logica di Ka, pKa e forza resta identica.`,
          formule: ['pH = −log[H+]', 'pKa = −log Ka', 'Kw = [H+][OH−] ≈ 10⁻¹⁴ (25 °C)'],
          esempio: 'HCl gastrico è acido forte; l’acido acetico del vinagre è debole (equilibrio).',
          attenzione: 'Ka grande ⇒ acido più forte; non confondere Ka con concentrazione analitica.',
          approfondisci: [
            'Relazione Ka·Kb = Kw per coppie coniugate.',
            'Forza vs concentrazione: HCl diluito vs CH3COOH concentrato.',
            'Titolazioni e punto di equivalenza vs punto finale.',
            'Scala di pH: zona gastrica, urinaria e plasmatica a confronto.',
          ],
          figureIds: ['chim-4-ph'],
        },
        {
          title: 'Soluzioni tampone e sangue',
          body: `Un tampone è una miscela di acido debole e sua base coniugata (o viceversa) che resiste alle variazioni di pH. L’equazione di Henderson–Hasselbalch: pH = pKa + log([A−]/[HA]) mostra che la capacità tampone è massima vicino a pH = pKa e dipende dal rapporto base/acido. Il sangue usa soprattutto il sistema CO2/H2CO3/HCO3− (con emoglobina e proteine): la ventilazione regola CO2, il rene regola HCO3−. Acidosi metabolica abbassa il pH (eccesso di acidi o perdita di bicarbonato); alcalosi lo alza. Compensi respiratori e renali cercano di riportare il rapporto verso valori vitali (pH ≈ 7,35–7,45). Aggiungere piccole quantità di acido forte o base forte cambia poco il pH finché il tampone non è “esaurito”. Capire chi è HA e chi è A− nel sistema carbonico evita errori nella lettura dell’emogasanalisi. Leggere un’emogasanalisi significa applicare Henderson–Hasselbalch al sistema carbonico: se PCO2 sale e HCO3− non compensa, il pH scende; il contrario produce alcalosi.`,
          formule: ['pH = pKa + log([A−]/[HA])', 'CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3−'],
          esempio: 'Iperventilazione riduce PCO2 → meno H2CO3 → pH tende a salire (alcalosi respiratoria).',
          attenzione: 'Tampone ≠ rendere il pH neutro: stabilizza intorno al pKa della coppia.',
          approfondisci: [
            'Emogasanalisi: PCO2, HCO3− e gap anionico (cenni).',
            'Capacità tampone: perché il rapporto e la concentrazione totale contano.',
            'Altri tamponi: fosfato e proteine (istidina).',
            'Compenso respiratorio vs metabolico: tempi diversi.',
          ],
        },
        {
          title: 'Ossido-riduzione',
          body: `Nelle redox un elemento si ossida (perde elettroni, numero di ossidazione ↑) e un altro si riduce (guadagna elettroni, n.ox ↓). Si bilanciano atomi e carica, spesso con metodo ionico-elettronico in ambiente acido o basico. Agenti ossidanti accettano elettroni; riducenti li donano. Pile e celle galvaniche convertono energia chimica in elettrica (cenni: potenziale standard, spontaneità se E°cell > 0). In metabolismo, catene di trasporto elettronico e coenzimi (NAD+/NADH, FAD/FADH2) sono redox controllate. Bilanciare O e H con H2O e H+/OH− è competenza tipica d’esame. OIL RIG (Oxidation Is Loss, Reduction Is Gain) aiuta a non invertire i termini. In biologia, “bruciare” il cibo significa trasferire elettroni verso O2, con ATP come valuta energetica intermedia — non una semplice combustione di laboratorio, ma la stessa logica di trasferimento elettronico. Assegnare correttamente i numeri di ossidazione è il passaggio decisivo: da lì individui ossidante e riducente, bilanci gli elettroni e solo dopo chiudi atomi di O e H.`,
          formule: ['ossidazione = perdita di e−', 'riduzione = guadagno di e−', 'n.ox tipici: O spesso −2, H +1 (con eccezioni)'],
          esempio: 'Nella respirazione cellulare lo zucchero si ossida a CO2; O2 si riduce ad H2O.',
          attenzione: 'OIL RIG: Oxidation Is Loss, Reduction Is Gain (di elettroni).',
          approfondisci: [
            'Numeri di ossidazione: regole e eccezioni (perossidi, idruri).',
            'Potenziale standard e tabella di riduzione (cenni).',
            'NAD+/NADH e FAD/FADH2 come carrier di elettroni.',
            'Ambiente acido vs basico nel bilanciamento ionico-elettronico.',
          ],
        },
        {
          title: 'Fenton, Haber-Weiss e radicali',
          body: `Le specie reattive dell’ossigeno (ROS) includono superossido (O2·−), perossido di idrogeno (H2O2) e radicale idrossilico (·OH), estremamente reattivo. Nella reazione di Fenton, Fe2+ catalizza H2O2 → ·OH (+ Fe3+/OH−). Haber–Weiss collega superossido e perossido alla formazione di ·OH, spesso con catalisi del ferro. ·OH danneggia lipidi (perossidazione), proteine e DNA (rotture, basi ossidate). Antiossidanti come glutatione (GSH), tocoferolo (vit. E) e sistemi enzimatici (SOD, catalasi, perossidasi) limitano il danno. Infiammazione, ischemia-riperfusione e alcuni farmaci modulano questo stress ossidativo. Distinguere ·OH (radicale neutro) da OH− (ione ossidrile, base) è una trappola classica. La cellula non elimina del tutto i ROS: a basse dosi sono anche segnali; il problema è lo sbilancio pro-ossidante/antiossidante. In patologia, lo stress ossidativo non è solo “danno chimico”: attiva vie infiammatorie e può amplificare ischemia-riperfusione; per questo SOD, catalasi e GSH sono bersagli ricorrenti nelle spiegazioni biomediche. Distinguere sempre specie radicaliche da ioni e perossidi evita confusione nei quiz.`,
          formule: ['Fenton: Fe2+ + H2O2 → Fe3+ + ·OH + OH−', 'Haber–Weiss (netta tipica): O2·− + H2O2 → O2 + ·OH + OH−'],
          esempio: 'Il glutatione ridotto (GSH) dona elettroni e si ossida a GSSG, proteggendo tioli proteici.',
          attenzione: '·OH non è OH−: il radicale è neutro e altamente reattivo; lo ione ossidrile è base.',
          approfondisci: [
            'SOD, catalasi, GPx: chi rimuove cosa.',
            'Perossidazione lipidica: catena radicalica nelle membrane.',
            'Ischemia-riperfusione: picco di ROS al ritorno dell’O2.',
            'Antiossidanti enzimatici vs non enzimatici (vit. C/E, GSH).',
          ],
        },
      ],
      {
        analogia:
          'Il pH è come una scala da 0 a 14 che dice se una bibita è “asprissima” (acida) o “sappiosa di sapone” (basica). Un tampone è un amico che beve un po’ di acido o di base in più per non far cambiare troppo il gusto. Le redox sono scambi di figurine elettroniche: chi le perde si ossida, chi le prende si riduce. I radicali sono pezzi di molecola con un elettrone “single” furioso: urtano tutto e fanno danni, come palline da flipper.',
        concetti: [
          {
            titolo: 'Acidi, basi, pH',
            testo:
              'Acido Brønsted = dona H+. Base = lo accetta. pH basso = tanti H+. pKa dice quanto un acido è “volenteroso” a liberare il protone.',
          },
          {
            titolo: 'Tamponi e sangue',
            testo:
              'Bicarbonato e CO2 fanno da cuscinetto nel sangue. Respiri più in fretta → meno CO2 → il sangue diventa un po’ meno acido. I reni aiutano tenendo o buttando bicarbonato.',
          },
          {
            titolo: 'Redox',
            testo:
              'Ossidare = perdere elettroni; ridurre = guadagnarli. Nel cibo “bruciato” con l’ossigeno, gli elettroni viaggiano e producono energia per l’ATP.',
          },
          {
            titolo: 'Radicali pericolosi',
            testo:
              'Con ferro e acqua ossigenata può nascere ·OH, un radicale cattivissimo. Antiossidanti come il glutatione fanno da scudo.',
          },
        ],
      },
      [
        mc('chim-4', 'Un acido di Brønsted dona:', ['Elettroni', 'Protoni (H+)', 'Neutroni', 'Fotoni'], 1, 'Definizione Brønsted-Lowry.'),
        mc('chim-4', 'Il tampone bicarbonato è cruciale per:', ['Il pH del sangue', 'Solo la viscosità dell’olio', 'Solo i telomeri', 'Solo i decibel'], 0, 'Equilibrio CO2/HCO3−.'),
        fill('chim-4', 'pH = −log[______].', 'H+', 'Concentrazione di ioni idrogeno.', ['H3O+', 'h+', '[H+]']),
        mc('chim-4', 'Nella reazione di Fenton il radicale idrossilico si forma in presenza di:', ['Solo elio', 'Ferro (Fe2+) e perossido di idrogeno', 'Solo NaCl solido', 'Solo DNA polimerasi'], 1, 'Fe2+ + H2O2 → ·OH + …'),
        mc('chim-4', 'Henderson-Hasselbalch collega pH a:', ['pKa e rapporto base/acido', 'Solo alla massa molare', 'Solo all’emivita', 'Solo a Bernoulli'], 0, 'pH = pKa + log([A−]/[HA]).'),
      ],
      [
        mc('chim-4', 'Un’acidosi metabolica tende a:', ['Alzare il pH ematico', 'Abbassare il pH ematico', 'Eliminare i tamponi per definizione', 'Creare mitocondri'], 1, 'Eccesso di acidi / perdita di bicarbonato.'),
        fill('chim-4', 'La specie ·OH è il radicale ______.', 'idrossilico', 'Molto reattivo.', ['ossidrile', 'idrossile']),
        mc('chim-4', 'In una reazione redox, l’ossidazione è:', ['Perdita di elettroni', 'Guadagno di elettroni', 'Solo aumento di pH', 'Solo dissoluzione'], 0, 'OIL RIG.'),
        mc('chim-4', 'Il glutatione agisce spesso come:', ['Antiossidante (tiolo)', 'Acido nucleico', 'Unità SI', 'Vettore virale'], 0, 'GSH riduce specie ossidate.'),
        mc('chim-4', 'Ka grande indica:', ['Acido debole', 'Acido più forte', 'Base forte sempre', 'Gas ideale'], 1, 'Maggiore dissociazione.'),
        mc('chim-4', 'Haber-Weiss coinvolge tipicamente:', ['Superossido e perossido → ·OH (catalisi Fe)', 'Solo sintesi peptidica', 'Solo Gram+', 'Solo leve'], 0, 'Produzione di radicale idrossilico.'),
        fill('chim-4', 'pKa = −log(______).', 'Ka', 'Costante di acidità.'),
        mc('chim-4', 'Una soluzione tampone resiste meglio vicino a:', ['pH = pKa della coppia', 'pH = 0 sempre', 'pH = 14 sempre', 'T = 0 K'], 0, 'Capacità massima intorno a pKa.'),
      ],
      {
        figure: [
          { id: 'chim-4-ph', kind: 'svg', caption: 'Scala di pH e zona fisiologica', alt: 'Scala pH' },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-5',
      [
        {
          title: 'Ibridazione e isomeria',
          body: `Il carbonio è tetravalente: forma quattro legami covalenti. Ibridazione sp3 (tetraedrica, alcani), sp2 (planare trigonale, alcheni e aromatici) e sp (lineare, alchini) spiega geometria e reattività. Isomeri strutturali hanno stessa formula molecolare ma diversa connettività; stereoisiomeri differiscono per disposizione nello spazio. L’isomeria geometrica cis–trans (o E/Z) negli alcheni nasce dalla rigidità del doppio legame: non c’è libera rotazione. La chirilità (carbonio con quattro sostituenti diversi) genera enantiomeri, cruciali in farmacologia: spesso solo un enantiomero è attivo. Riconoscere ibridazione e tipo di isomeria è il primo passo per prevedere addizioni, sostituzioni e proprietà fisiche. Due molecole “uguali sulla carta” ma diverse nello spazio possono avere punti di fusione, solubilità e metabolismo diversi: maleico vs fumarico ne è l’esempio classico. In biologia, L-amminoacidi e D-zuccheri mostrano quanto la chirilità sia selettiva. In farmacologia, enantiomeri e diastereoisomeri possono avere potenze e tossicità diverse: riconoscere il tipo di isomeria sulla struttura è il primo filtro prima di parlare di meccanismo d’azione.`,
          formule: ['sp3 → 4 legami σ, angoli ≈ 109,5°', 'sp2 → 3 σ + 1 π', 'sp → 2 σ + 2 π'],
          esempio: 'Acido maleico (cis) e fumarico (trans): stesso C4H4O4, proprietà e metabolismo diversi.',
          attenzione: 'Cis–trans richiede sostituenti diversi sui carboni del C=C; due H sullo stesso C non bastano.',
          approfondisci: [
            'Configurazione R/S (cenni) vs D/L in biochimica.',
            'E/Z per alcheni con più di due sostituenti.',
            'Prochirality e enzimi stereospecifici.',
            'Isomeri costituzionali: catena, posizione, funzione.',
          ],
        },
        {
          title: 'Alcani, alcheni, alchini',
          body: `Alcani CnH2n+2: solo legami singoli, relativamente inerti; tipiche reazioni di combustione (→ CO2 e H2O in eccesso di O2) e sostituzione radicalica (aloalcani). Alcheni: almeno un C=C; subiscono addizione elettrofila (H–X, H2O/H+, idrogenazione catalitica). Alchini: C≡C, più lineari e acidi terminali debolmente. Insaturazione aumenta reattività verso addizioni e influenza fluidità di membrane se presente in catene lipidiche. La nomenclatura IUPAC (prefissi, desinenze -ano/-ene/-ino, numerazione del legame multiplo) è richiesta per identificare isomeri e prodotti di reazione. Regola di Markovnikov (cenni) orienta l’addizione di H–X sugli alcheni asimmetrici. L’idrogenazione di oli vegetali riduce i C=C: da liquidi a grassi più solidi (margarine). Distinguere saturazione e insaturazione aiuta anche a leggere le etichette alimentari e la fluidità delle membrane cellulari. Per l’esame, collega sempre formula generale, grado di insaturazione e reattività tipica: così distingui a colpo d’occhio un idrocarburo saturo da uno che subirà addizione elettrofila. Un esercizio tipico è passare da nome IUPAC a struttura e prevedere se la molecola darà combustione “pulita”, addizione o restará relativamente inerte.`,
          formule: ['alcano: CnH2n+2 (aciclico saturo)', 'combustione completa: CxHy + O2 → CO2 + H2O'],
          esempio: 'L’idrogenazione di oli vegetali riduce i C=C: da liquidi a grassi più solidi (margarine, cenni).',
          attenzione: 'Addizione elettrofila è tipica degli alcheni, non degli alcani saturi “inerti”.',
          approfondisci: [
            'Markovnikov e anti-Markovnikov (cenni).',
            'Radicali e alogenazione degli alcani.',
            'Grado di insaturazione: formula e significato.',
            'Acidi grassi cis vs trans: fluidità di membrana.',
          ],
        },
        {
          title: 'Aromaticità e purine/pirimidine',
          body: `Il benzene (C6H6) è il prototipo aromatico: anello planare, elettroni π delocalizzati, stabilità particolare. La regola di Hückel (cenni) richiede 4n+2 elettroni π in sistemi ciclici planari coniugati. Gli eterocicli aromatici includono piridine, pirimidine e purine. Nelle basi azotate del DNA/RNA: purine = adenina e guanina (due anelli fusi); pirimidine = citosina, timina (DNA) e uracile (RNA). L’aromaticità influenza stacking delle basi e assorbimento UV. Policiclici aromatici ambientali possono essere genotossici: rilevanza biomedica oltre la “chimica organica pura”. Lo stacking aromatico tra basi stabilizza la doppia elica insieme agli H-bond A–T e G–C. Timina è pirimidina, non purina; adenina e guanina sono purine: errore classico da evitare. La delocalizzazione spiega anche perché certe reazioni aromatiche sono di sostituzione elettrofila, non di addizione che “romperebbe” l’aromaticità. Tentare un’addizione sul benzene “come su un alchene” è un errore classico: l’aromaticità si conserva preferendo la sostituzione elettrofila, concetto che torna anche nella chimica delle basi azotate.`,
          formule: ['benzene: C6H6', 'Hückel: 4n+2 e− π (cenni)', 'purine: A, G — pirimidine: C, T, U'],
          esempio: 'Lo stacking aromatico tra basi stabilizza la doppia elica insieme agli H-bond A–T e G–C.',
          attenzione: 'Timina è pirimidina, non purina; adenina e guanina sono purine.',
          approfondisci: [
            'Sostituzione elettrofila aromatica: perché non “addizione semplice”.',
            'Eterocicli: pirrolo, imidazolo, piridina (cenni).',
            'Assorbimento UV delle basi e denaturazione del DNA.',
            'IPA (idrocarburi policiclici aromatici) e rischio mutageno.',
          ],
        },
        {
          title: 'Alogenuri alchilici',
          body: `Gli alogenuri alchilici contengono un carbonio legato a F, Cl, Br o I (gruppo C–X). Il carbonio è elettrofilo: tipiche reazioni di sostituzione nucleofila (SN1/SN2, cenni) e di eliminazione (E1/E2) che formano alcheni. Polarità e lasciabilità dell’alogenuro influenzano la velocità: I− e Br− sono migliori leaving group di F− in molti contesti. In biologia, intermedi alogenati sono meno centrali dei gruppi ossigenati, ma in farmacologia e tossicologia (solventi, anestetici storici, agenti alchilanti) il motivo C–X è ubiquo. Saper riconoscere R–X evita confusioni con eteri o alcoli. SN2 preferisce carboni primari e invertisce la configurazione; SN1 passa da carbocatione e può dare racemizzazione (cenni). Non confondere alogenuro alchilico covalente con sale ionico come NaCl: qui X è legato al carbonio. Nei meccanismi SN/E, chiediti se il carbonio è primario o terziario, quanto è buono il leaving group e se il solvente favorisce carbocationi: queste tre domande orientano SN1, SN2, E1 o E2.`,
          formule: ['R–X con X = F, Cl, Br, I', 'nucleofilo attacca Cδ+ del C–X'],
          esempio: 'Molti farmaci e pesticidi contengono alogeni aromatici o alchilici che modulano lipofilia e metabolismo.',
          attenzione: 'Alogenuro alchilico ≠ sale ionico NaCl: qui X è legato covalentemente al carbonio.',
          approfondisci: [
            'SN1 vs SN2: substrato, solvente, nucleofilo.',
            'Leaving group: perché I− è “migliore” di F− in molti casi.',
            'Eliminazione E2 e stereochimica anti (cenni).',
            'Alogeni aromatici: reattività diversa dagli alchilici.',
          ],
        },
      ],
      {
        analogia:
          'Il carbonio è un pezzo LEGO a quattro attacchi. Se li dispone a piramide (sp3) fa catene “morbide” da alcano; se usa un doppio legame (sp2) la figura diventa piatta e più reattiva; con il triplo (sp) è come un bastoncino rigido. Gli isomeri sono costruzioni diverse con gli stessi mattoncini. Il benzene è un anello magico dove gli elettroni ballano in cerchio. Le basi del DNA sono “lego aromatici” con uno o due anelli: purine grandi, pirimidine piccole.',
        concetti: [
          {
            titolo: 'Ibridazione in parole semplici',
            testo:
              'sp3 = quattro braccia verso i vertici di un tetraedro (metano). sp2 = tre braccia piatte + un doppio legame. sp = due braccia opposte + triplo legame.',
          },
          {
            titolo: 'Alcani, alcheni, alchini',
            testo:
              'Solo legami singoli → alcano (brucia bene). C’è un C=C → alchene (si possono “aggiungere” pezzi sul doppio). C≡C → alchino. Cis e trans sono due modi di mettere i pezzi sui lati del doppio legame.',
          },
          {
            titolo: 'Aromatici e basi',
            testo:
              'Benzene e amici sono stabili perché gli elettroni sono condivisi sull’anello. Adenina e guanina hanno due anelli (purine); C, T, U uno solo (pirimidine).',
          },
          {
            titolo: 'Alogenuri',
            testo:
              'Se un carbonio tiene appiccicato Cl o Br, quel punto è “affamato” di elettroni: altre molecole possono attaccare e sostituire l’alogeno.',
          },
        ],
      },
      [
        mc('chim-5', 'L’ibridazione tipica del carbonio in un alcano è:', ['sp', 'sp2', 'sp3', 'sd2'], 2, 'Tetraedrica.'),
        mc('chim-5', 'Le basi puriniche sono:', ['Adenina e guanina', 'Citosina e timina solo', 'Solo uracile', 'Solo glicina'], 0, 'A e G sono purine.'),
        fill('chim-5', 'Citosina, timina e uracile sono ______.', 'pirimidine', 'Basi pirimidiniche.', ['pirimidina']),
        mc('chim-5', 'Un alchene tipicamente:', ['Ha almeno un doppio legame C=C', 'È sempre aromatico', 'Non ha carbonio', 'È un metallo'], 0, 'Idrocarburo insaturo.'),
        mc('chim-5', 'La regola di Hückel (cenni) riguarda:', ['Aromaticità (4n+2 elettroni π)', 'Solo osmosi', 'Solo emivita', 'Solo Poiseuille'], 0, 'Sistemi aromatici planari ciclici.'),
      ],
      [
        mc('chim-5', 'L’isomeria cis-trans riguarda tipicamente:', ['Alcheni con sostituenti diversi', 'Solo alcani lineari identici', 'Solo gas nobili', 'Solo ioni Na+'], 0, 'Geometria attorno al doppio legame.'),
        fill('chim-5', 'Il benzene ha formula molecolare C__H__.', '6H6', 'C6H6.', ['C6H6', 'c6h6']),
        mc('chim-5', 'Un alogenuro alchilico contiene:', ['C-X (X = F,Cl,Br,I)', 'Solo metalli alcalini', 'Solo peptidoglicano', 'Solo RNA'], 0, 'Carbonio legato a alogeno.'),
        mc('chim-5', 'Le purine hanno struttura:', ['Un anello', 'Due anelli fusi (biciclica)', 'Tre zuccheri', 'Solo catena lineare di metano'], 1, 'Purina = pirimidina fusa a imidazolo.'),
        mc('chim-5', 'L’addizione elettrofila è tipica di:', ['Alcheni', 'Alcani saturi inerti assoluti', 'Gas nobili', 'Diamante puro'], 0, 'Doppio legame ricco di elettroni.'),
        mc('chim-5', 'Nella DNA, la timina è una:', ['Purina', 'Pirimidina', 'Esoso', 'Acido grasso'], 1, 'Base pirimidinica.'),
        fill('chim-5', 'L’ibridazione del carbonio nel benzene è ______.', 'sp2', 'Planare trigonale.'),
        mc('chim-5', 'La combustione completa di un alcano produce tipicamente:', ['CO2 e H2O', 'Solo O2', 'Solo N2', 'Solo ATP'], 0, 'In eccesso di ossigeno.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-6',
      [
        {
          title: 'Alcoli, fenoli, eteri, tioli',
          body: `Alcoli (R–OH): primari, secondari, terziari; polarità e H-bond alzano i punti di ebollizione rispetto agli idrocarburi. Ossidazione: primari → aldeidi/acidi; secondari → chetoni; terziari resistono (condizioni tipiche). I fenoli (Ar–OH) sono più acidi degli alcoli perché l’anione fenossido è stabilizzato per risonanza. Eteri (R–O–R′) sono meno reattivi e buoni solventi. Tioli (R–SH) e tioeteri: lo zolfo è centrale in cisteina e glutatione; due tioli possono ossidarsi a disolfuro (–S–S–), ponte che stabilizza proteine. Isomerie funzionali (alcol vs etere) e stereoisiomerìe su carboni chirali accompagnano questi gruppi. In farmacologia, gruppi OH e SH modulano solubilità, metabolismo di fase II e binding. Distinguere fenolo da alcol alifatico evita errori su acidità e reattività aromatica. Il glutatione usa il –SH della cisteina per tamponare lo stress ossidativo (GSH ⇌ GSSG). Classificare rapidamente il gruppo (alcol/fenolo/etere/tiolo) permette di prevedere acidità, ossidabilità e ruolo biologico: è spesso sufficiente per risolvere i quiz di riconoscimento funzionale.`,
          formule: ['alcol: R–OH', 'etere: R–O–R′', 'tiolo: R–SH', 'disolfuro: R–S–S–R′'],
          esempio: 'Il glutatione usa il –SH della cisteina per tamponare lo stress ossidativo (GSH ⇌ GSSG).',
          attenzione: 'Fenolo ≠ alcol alifatico: acidità e reattività aromatiche diverse.',
          approfondisci: [
            'Classificazione 1°/2°/3° e test di ossidazione.',
            'Acidità relativa: alcol < acqua < fenolo < acido carbossilico (ordine tipico).',
            'Eteri come solventi aprotici: perché sono “inerte”.',
            'Ponti disolfuro: folding proteico e denaturazione riducente.',
          ],
        },
        {
          title: 'Aldeidi e chetoni',
          body: `Entrambi contengono il carbonile C=O. Nelle aldeidi il carbonile è terminale (–CHO); nei chetoni è interno tra due carboni. Il carbonio carbonilico è elettrofilo: tipica addizione nucleofila (acqua → idrati, alcoli → emiacetali/acetali, rilevanti per zuccheri). Riduzione dà alcoli; ossidazione distingue spesso aldeidi (ossidabili ad acidi) da chetoni (più resistenti). La tautomeria cheto–enolica è equilibrio tra forma C=O e enolo C=C–OH, importante in isomerizzazioni e condensazioni. In biochimica, piruvato, acetone e molti intermedi metabolici sono chetoni o α-chetoacidi. Il glucosio in soluzione ciclica forma emiacetali intramolecolari: chimica carbonilica + alcolica. Riconoscere dove sta il C=O (punta vs mezzo) è il modo più rapido per non confondere aldeide e chetone nei quiz. Nei carboidrati, la stessa chimica del carbonile spiega ciclizzazione, anomeri e potere riducente: perciò aldeidi/chetoni non sono un capitolo isolato, ma la base della chimica degli zuccheri. Distinguere –CHO terminale da C=O interno e ricordare l’elettrofilia del carbonile basta spesso a risolvere riconoscimento, ossidazione e formazione di emiacetali.`,
          formule: ['aldeide: R–CHO', 'chetone: R–CO–R′', 'carbonile: C=O'],
          esempio: 'Il glucosio in soluzione ciclica forma emiacetali intramolecolari: chimica carbonilica + alcolica.',
          attenzione: 'Aldeide ha il C=O in punta; se il C=O sta in mezzo è chetone.',
          approfondisci: [
            'Emiacetali e acetali: stabilità e ruolo nei glucidi.',
            'Reattivo di Tollens/Fehling: aldeidi riducenti (cenni).',
            'Tautomeria cheto-enolica e acidità dell’α-H.',
            'Piruvato e corpi chetonici: nesso metabolico.',
          ],
        },
        {
          title: 'Acidi carbossilici e derivati',
          body: `Il gruppo carbossile –COOH è acido (pKa tipici ~4–5 per acidi alifatici diluiti): perde H+ formando carbossilato risonante. Derivati: esteri (da acido + alcol), ammidi, anidridi, alogenuri acilici (cenni). Gli esteri compaiono in trigliceridi e cere; le ammidi in proteine e molti farmaci. Reattività relativa dei derivati (alogenuro > anidride > estere > ammide, schema tipico) guida idrolisi e sintesi. In fisiologia acidi grassi, acido lattico e corpi chetonici modulano pH e metabolismo energetico. I trigliceridi sono triesteri del glicerolo con acidi grassi: riserva energetica adiposa. Non confondere –COOH con aldeide (–CHO) né con chetone: la presenza di OH sul carbonile “acido” cambia tutto. Saponificazione degli esteri è idrolisi basica che libera saponi (sali di acidi grassi). Sapere chi è più reattivo tra alogenuro acilico, anidride, estere e ammide evita errori di sintesi e di idrolisi: l’ammide proteica è stabile proprio perché sta in fondo a quella scala. In biochimica, esteri dei trigliceridi e ammidi peptidiche sono i due derivati da non confondere mai: stessa famiglia acilica, ruoli fisiologici opposti per stabilità e funzione.`,
          formule: ['acido: R–COOH', 'estere: R–COOR′', 'ammide: R–CONR2'],
          esempio: 'I trigliceridi sono triesteri del glicerolo con acidi grassi: riserva energetica adiposa.',
          attenzione: '–COOH è acido carbossilico, non aldeide (–CHO) né chetone.',
          approfondisci: [
            'Scala di reattività dei derivati acilici.',
            'Saponificazione vs idrolisi acida degli esteri.',
            'Acidi grassi saturi/insaturi e punto di fusione.',
            'Ammidi secondarie nel backbone proteico.',
          ],
        },
        {
          title: 'Ammine e ammidi',
          body: `Le ammine (primarie RNH2, secondarie R2NH, terziarie R3N) sono tipicamente basiche: l’azoto accetta un protone. Basicità dipende da sostituzione e, negli aromatici, da delocalizzazione. Le ammidi (RCONH2 e sostituite) hanno carbonile legato all’azoto: meno basiche delle ammine per risonanza che riduce disponibilità del doppietto. Il legame ammidico (peptidico) –CO–NH– è il backbone delle proteine: piano, parziale carattere di doppio legame, idrolisi enzimatica selettiva. Distinguere ammina e ammide evita errori grossolani in nomenclatura e proprietà acido–base. A pH fisiologico molte ammine biogene sono protonate (carica +), fatto che influenza trasporto e recettori. La serotonina e molte neuroammine contengono gruppi amminici che a pH fisiologico sono protonati. Se vedi C=O accanto all’N è ammide (legame peptidico); se vedi solo N con alchili è ammina basica: questa discriminazione risolve gran parte delle domande di nomenclatura e proprietà. A pH 7,4 molte ammine sono protonate mentre le ammidi restano neutre: questa differenza spiega solubilità, trasporto e perché il backbone proteico non si comporta da base forte.`,
          formule: ['ammina: RNH2 / R2NH / R3N', 'ammide: RCONH2', 'legame peptidico: –CO–NH–'],
          esempio: 'La serotonina e molte neuroammine contengono gruppi amminici che a pH fisiologico sono protonati.',
          attenzione: 'Ammide ≠ ammina: l’ammide ha C=O attaccato all’N; è il legame delle proteine.',
          approfondisci: [
            'pKa degli ioni amminio e forma prevalente a pH 7,4.',
            'Ammine aromatiche: perché sono meno basiche.',
            'Legame peptidico: planarità e isomeria cis/trans (Pro).',
            'Idrolisi enzimatica vs chimica delle ammidi.',
          ],
        },
      ],
      {
        analogia:
          'I gruppi funzionali sono “adesivi” diversi attaccati allo scheletro di carbonio: –OH come una linguetta bagnata (alcol), C=O come una presa magnetica (carbonile), –COOH come una linguetta che può perdere un H+ acido, –NH2 come una presa che afferra H+. Cambi adesivo e la molecola cambia mestiere, anche se lo scheletro resta simile. Il legame peptidico è la cerniera che unisce i vagoni-amminoacido nel treno-proteina.',
        concetti: [
          {
            titolo: 'Alcoli, fenoli, eteri, tioli',
            testo:
              'Alcol = carbonio + OH. Fenolo = OH sull’anello aromatico (più acido). Etere = ossigeno in mezzo a due carboni. Tiolo = OH ma con zolfo (SH): fa i “ponti” disolfuro nelle proteine.',
          },
          {
            titolo: 'Aldeidi e chetoni',
            testo:
              'Entrambi hanno C=O. Se sta in fondo alla catena è aldeide; se sta in mezzo è chetone. Quel carbonio attira particelle ricche di elettroni (addizione nucleofila).',
          },
          {
            titolo: 'Acidi e derivati',
            testo:
              '–COOH può mollare un H+. Se si unisce a un alcol nasce un estere (grassi). Se si unisce a un’ammina nasce un’ammide.',
          },
          {
            titolo: 'Ammine vs ammidi',
            testo:
              'Ammine = basi (prendono H+). Ammidi = pezzo con C=O–N, meno basiche; nelle proteine si chiamano legami peptidici.',
          },
        ],
      },
      [
        mc('chim-6', 'Il gruppo funzionale –COOH è:', ['Aldeide', 'Acido carbossilico', 'Etere', 'Alchino'], 1, 'Carbossile.'),
        mc('chim-6', 'Il legame peptidico è un legame:', ['Etere', 'Ammidico', 'Ionico puro senza covalenza', 'Metallico'], 1, '–CO–NH–.'),
        fill('chim-6', 'I tioli contengono il gruppo ______.', '–SH', 'Solfidrile.', ['SH', 'sulfidrile', 'tiolo']),
        mc('chim-6', 'Un’aldeide ha tipicamente il carbonile:', ['In posizione terminale', 'Sempre tra due alchili', 'Assente', 'Solo nei metalli'], 0, '–CHO.'),
        mc('chim-6', 'Le ammine alifatiche sono tipicamente:', ['Acide come HCl', 'Basiche', 'Inerti come elio', 'Solo radicali liberi'], 1, 'Accettano protoni.'),
      ],
      [
        mc('chim-6', 'L’ossidazione di un alcol primario può dare:', ['Aldeide / acido carbossilico', 'Solo alcano', 'Solo N2', 'Solo DNA'], 0, 'Dipende dalle condizioni.'),
        fill('chim-6', 'R–O–R′ è un ______.', 'etere', 'Gruppo etereo.'),
        mc('chim-6', 'I fenoli sono tipicamente più acidi degli alcoli perché:', ['L’anione è stabilizzato per risonanza', 'Hanno meno carbonio', 'Sono gas', 'Sono metalli'], 0, 'Fenossido risonante.'),
        mc('chim-6', 'Un estere deriva tipicamente da:', ['Acido + alcol', 'Solo ammina + ammina', 'Solo alcano + elio', 'Solo DNA + RNA'], 0, 'Condensazione.'),
        mc('chim-6', 'La tautomeria cheto-enolica riguarda:', ['Aldeidi/chetoni', 'Solo gas nobili', 'Solo ioni Na+', 'Solo onde'], 0, 'Equilibrio C=O ↔ enolo.'),
        mc('chim-6', 'Un’ammide primaria ha formula generica:', ['RCONH2', 'ROH', 'RSH', 'RH'], 0, '–CONH2.'),
        fill('chim-6', 'Il carbonile è il gruppo C=__.', 'O', 'C=O.', ['ossigeno']),
        mc('chim-6', 'I tioli sono importanti biologicamente perché:', ['Formano ponti disolfuro e redox (GSH)', 'Sostituiscono i cromosomi', 'Sono unità SI', 'Sono virus'], 0, 'Cys–Cys, glutatione.'),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'chim-7',
      [
        {
          title: 'Amminoacidi e proteine',
          body: `I 20 amminoacidi proteici standard hanno un carbonio α legato a –NH2, –COOH, H e catena laterale R (glicina ha due H: non chirale). A pH fisiologico esistono spesso come zwitterioni (–NH3+/–COO−). Si classificano per polarità e carica di R (idrofobi, polari, acidi, basici). Il legame peptidico unisce α-carbossile e α-ammina. Struttura primaria = sequenza; secondaria = α-elica e foglietto β (H-bond del backbone); terziaria = packing 3D (interazioni di R, disolfuri); quaternaria = più subunità. Denaturazione perde 3D senza spezzare necessariamente i peptidi. Funzioni: catalisi, trasporto, struttura, segnalazione. L’emoglobina ha struttura quaternaria (4 catene) che cooperativamente lega O2. Glicina non è chirale; gli altri aa proteici standard lo sono (L in natura). Mutazioni puntiformi che cambiano un solo R possono alterare folding e funzione (es. anemia falciforme). Per i quiz, collega sempre livello strutturale e forza che lo sostiene: sequenza covalente, H-bond di backbone, interazioni di R e eventuali subunità. Così denaturazione e perdita di funzione diventano prevedibili.`,
          formule: ['20 aa canonici', 'zwitterione a pH ~ neutro', '1° sequenza → 2° eliche/foglietti → 3° → 4°'],
          esempio: 'L’emoglobina ha struttura quaternaria (4 catene) che cooperativamente lega O2.',
          attenzione: 'Glicina non è chirale; gli altri aa proteici standard lo sono (L in natura).',
          approfondisci: [
            'Punto isoelettrico e elettroforesi degli aa.',
            'Forze che stabilizzano la terziaria: idrofobiche, ioniche, H-bond, S–S.',
            'Cooperatività dell’emoglobina e effetto Bohr (cenni).',
            'Denaturazione vs idrolisi: cosa si spezza.',
          ],
        },
        {
          title: 'Carboidrati',
          body: `Monosaccaridi (glucosio, fruttosio, galattosio) sono aldeidi o chetoni polioli; in soluzione ciclizzano ad emiacetali con anomeri α/β. Disaccaridi (maltosio, lattosio, saccarosio) e polisaccaridi (amido, glicogeno, cellulosa) sono uniti da legami glicosidici. Il glicogeno è la riserva animale di glucosio, ramificata; la cellulosa è strutturale vegetale (non digeribile dall’uomo senza simbionti). Gruppo riducente e mutarotazione sono temi classici. Glicoproteine e glicolipidi mediano riconoscimento cellulare. Ipoglicemia e diabete illustrano il controllo stretto della glicemia. Dopo un pasto, insulina favorisce deposito di glucosio come glicogeno epatico e muscolare. Saccarosio non è riducente (entrambi i carbonili impegnati); maltosio sì. Il legame α vs β decide digeribilità: amido vs cellulosa sono entrambi polimeri di glucosio ma con stereochimica diversa. Distinguere monomero, tipo di legame glicosidico e ramificazione permette di spiegare perché glicogeno rilascia glucosio rapidamente e cellulosa no: stessa chimica, stereochimica diversa. Nei quiz, se compare “riducente”, chiediti se resta un emiacetale libero; se compare “riserva”, pensa a glicogeno/amido; se “strutturale vegetale”, cellulosa β-1,4.`,
          formule: ['legame glicosidico tra monosaccaridi', 'glicogeno = polimero di glucosio (riserva)'],
          esempio: 'Dopo un pasto, insulina favorisce deposito di glucosio come glicogeno epatico e muscolare.',
          attenzione: 'Saccarosio non è riducente (entrambi i carbonili impegnati); maltosio sì.',
          approfondisci: [
            'Anomeri α/β e mutarotazione.',
            'Amido (amilopectina) vs glicogeno: ramificazioni.',
            'Lattosio e lattasi: intolleranza (cenni).',
            'Glicosilazione proteica: N- e O-linked (cenni).',
          ],
        },
        {
          title: 'Lipidi, colesterolo, vitamina D, acidi biliari',
          body: `Acidi grassi saturi/insaturi, trigliceridi di riserva, fosfolipidi anfipatici che in acqua formano bicouche (membrane). Il colesterolo modula fluidità membranaria ed è precursore di ormoni steroidei, vitamina D e acidi biliari. Gli acidi biliari emulsionano i lipidi alimentari favorendo digestione e assorbimento. Vie di sintesi e trasporto (LDL/HDL, cenni) collegano nutrizione e rischio cardiovascolare. Vitamina D, ottenuta anche da fotoconversione cutanea, regola calcio-fosforo. Stress ossidativo può perossidare lipidi di membrana: ruolo di antiossidanti lipofili (tocoferolo). In carenza di sali biliari (colestasi) si ha malassorbimento di grassi e vitamine liposolubili. Colesterolo non è solo “cattivo”: è essenziale per membrane e ormoni. Micelle e chilomicroni sono veicoli di trasporto diversi ma legati alla stessa chimica anfipatica. Anfipaticità è la parola chiave: spiega bilayer, micelle biliari e trasporto lipoproteinico. Senza di essa, digestione dei grassi e architettura di membrana restano elenchi da memorizzare. Un filo conduttore utile: ogni volta che compare “emulsione”, “bilayer” o “ormone steroideo”, stai ragionando su molecole derivate dalla stessa chimica lipidica del colesterolo e degli acidi grassi.`,
          formule: ['trigliceride = glicerolo + 3 acidi grassi', 'fosfolipidi → bilayer', 'colesterolo → acidi biliari, steroidei, vit. D'],
          esempio: 'In carenza di sali biliari (colestasi) si ha malassorbimento di grassi e vitamine liposolubili.',
          attenzione: 'Colesterolo non è solo “cattivo”: è essenziale per membrane e ormoni.',
          approfondisci: [
            'LDL vs HDL: direzione netta del colesterolo (cenni).',
            'Vitamine liposolubili A, D, E, K e bile.',
            'Fosfolipidi e curvatura di membrana.',
            'Perossidazione lipidica e ruolo della vit. E.',
          ],
        },
        {
          title: 'Nucleotidi e modificazioni non enzimatiche',
          body: `Un nucleotide = base azotata + zucchero (ribosio o deossiribosio) + fosfato. DNA usa A, G, C, T e deossiribosio; RNA usa U al posto di T e ribosio. Legami fosfodiestere formano lo scheletro; H-bond e stacking stabilizzano eliche. Oltre alle reazioni enzimatiche, avvengono modificazioni spontanee: deaminazione della citosina → uracile (rischio mutazione C→T se non riparata); danno ossidativo da ·OH su basi e zucchero; alchilazioni. Antiossidanti (tioli, tocoferolo, carotenoidi) e sistemi di riparo del DNA limitano le conseguenze. Capire queste vie collega chimica organica, stress ossidativo e genetica. La riparazione BER rimuove uracile dal DNA per evitare mutazioni da deaminazione della C. Deaminazione di C produce U, non T direttamente; la mutazione emergente tipica è C→T se U è letto/riparato male. ATP stesso è un nucleotide: ponte tra chimica e bioenergetica. Collegare deaminazione, ROS e riparo del DNA chiude il cerchio con chimica-4 (radicali) e biologia molecolare: non sono argomenti separati, ma la stessa reattività su basi e zucchero.`,
          formule: ['nucleotide = base + zucchero + P', 'DNA: deossiribosio + T; RNA: ribosio + U', 'C deamina → U'],
          esempio: 'La riparazione BER rimuove uracile dal DNA per evitare mutazioni da deaminazione della C.',
          attenzione: 'Deaminazione di C produce U, non T direttamente; la mutazione emergente tipica è C→T se U è letto male/riparato male.',
          approfondisci: [
            'Nucleotide vs nucleoside: ruolo del fosfato.',
            'BER e UDG: riparazione dell’uracile nel DNA.',
            'Danno ossidativo: 8-oxoG (cenni).',
            'ATP come moneta energetica e substrato di chinasi.',
          ],
        },
      ],
      {
        analogia:
          'Le biomolecole sono i quattro “materiali da costruzione” del corpo: proteine = operai e macchine; zuccheri = carburante e scorte (come pasta nel dispensa-glicogeno); grassi = batterie a lunga durata e mattoni delle pareti-membrana; DNA/RNA = ricettario e messaggi. Il colesterolo è un mattone speciale delle pareti e la materia prima per fare “messaggeri” ormonali e sapone biliare che spezza i grassi del pranzo in goccioline.',
        concetti: [
          {
            titolo: 'Amminoacidi e proteine',
            testo:
              'Ogni amminoacido ha una “testa” uguale e una coda R diversa. Uniti in fila fanno proteine. La fila si arriccia in eliche e foglietti, poi si piega in una forma 3D che decide il lavoro.',
          },
          {
            titolo: 'Carboidrati',
            testo:
              'Il glucosio è lo zucchero star. Si può attaccare ad altri zuccheri (legame glicosidico). Il glicogeno è una grande rete di glucosio di scorta nel fegato e nei muscoli.',
          },
          {
            titolo: 'Lipidi e colesterolo',
            testo:
              'I grassi non amano l’acqua. I fosfolipidi fanno sandwich (bicouche) per le membrane. Dal colesterolo nascono vitamina D e acidi biliari, che aiutano a digerire i grassi.',
          },
          {
            titolo: 'Nucleotidi e danni',
            testo:
              'DNA e RNA sono catene di nucleotidi (base + zucchero + fosfato). A volte la citosina perde un pezzo e diventa uracile: se non si ripara, il messaggio genetico può cambiare. I radicali possono graffiare anche DNA e grassi: servono antiossidanti.',
          },
        ],
      },
      [
        mc('chim-7', 'Gli amminoacidi proteici standard sono tipicamente:', ['20', '2', '100', '4'], 0, 'I 20 canonici.'),
        mc('chim-7', 'Il glicogeno è:', ['Un polisaccaride di riserva', 'Una base azotata', 'Un gas nobile', 'Un metallo'], 0, 'Polimero di glucosio.'),
        fill('chim-7', 'Il colesterolo è precursore anche della vitamina ______.', 'D', 'E di acidi biliari.', ['d', 'vitamina D']),
        mc('chim-7', 'La deaminazione della citosina può produrre:', ['Uracile', 'Metano', 'Fe2+', 'NaCl'], 0, 'C → U; rischio mutazione se non riparata.'),
        mc('chim-7', 'Un nucleotide contiene:', ['Base, zucchero, fosfato', 'Solo amminoacidi', 'Solo acidi grassi', 'Solo istoni'], 0, 'Unità degli acidi nucleici.'),
      ],
      [
        mc('chim-7', 'La struttura secondaria include tipicamente:', ['α-elica e foglietto β', 'Solo sequenza primaria', 'Solo il genoma virale', 'Solo il pH'], 0, 'H-bond backbone.'),
        fill('chim-7', 'I fosfolipidi formano ______ in acqua.', 'bicouche', 'Doppia membrana / bilayer.', ['bilayer', 'doppia membrana', 'micelle e bilayer', 'membrane']),
        mc('chim-7', 'Gli acidi biliari servono a:', ['Emulsionare i lipidi alimentari', 'Replicare il DNA', 'Misurare i decibel', 'Formare peptidoglicano'], 0, 'Derivati del colesterolo.'),
        mc('chim-7', 'Il tocoferolo (vitamina E) agisce come:', ['Antiossidante lipidico', 'Base del DNA', 'Enzima di restrizione', 'Unità di pressione'], 0, 'Protegge membrane da radicali.'),
        mc('chim-7', 'Il DNA differisce dall’RNA per:', ['Zucchero (deossiribosio) e timina vs uracile', 'Assenza di fosfato nel DNA', 'Solo il colore', 'Solo la massa del ribosoma'], 0, 'Differenze strutturali classiche.'),
        mc('chim-7', 'Uno zwitterione ha:', ['Cariche opposte nette spesso nulle', 'Solo gas', 'Solo elettroni liberi metallici', 'Solo luce'], 0, 'Forma tipica degli amminoacidi a pH fisiologico.'),
        fill('chim-7', 'Il legame tra monosaccaridi si chiama legame ______.', 'glicosidico', 'Acetalico/glicosidico.'),
        mc('chim-7', 'Il radicale idrossilico può danneggiare:', ['Lipidi, proteine e DNA', 'Solo l’elio', 'Solo il vuoto', 'Solo le unità SI'], 0, 'Stress ossidativo.'),
      ],
    ),
  )

  return out
}
