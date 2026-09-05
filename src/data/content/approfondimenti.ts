import type { UnitaContent } from '../../types'
import { fill, mc, resetQCounter } from '../quizHelpers'
import { pack } from './pack'

/** Contenuti «Per capire meglio» — non examEligible nelle simulazioni */
export function buildApprofondimenti(): UnitaContent[] {
  const out: UnitaContent[] = []
  const ex = false

  resetQCounter()
  out.push(
    pack(
      'extra-derivati',
      [
        {
          title: 'Velocità e accelerazione come derivate',
          body: `In cinematica la posizione x è una funzione del tempo. La velocità istantanea è la pendenza del grafico x–t: v = dx/dt. Non serve «fare la derivata» con regole formali all’esame 2026: basta leggere se la curva sale, scende o è piatta, e confrontare pendenze in tratti diversi. Se due tratti hanno la stessa inclinazione, le velocità (in modulo e verso lungo l’asse scelto) sono confrontabili; se la curva si «inchina» di più, |v| cresce. L’accelerazione è la pendenza del grafico v–t: a = dv/dt. Se v–t è orizzontale, a = 0 (moto uniforme). Se la pendenza di v–t è positiva, v cresce nel verso scelto come positivo; se è negativa e v > 0, si sta frenando. La stessa idea vale in più dimensioni: ogni componente ha la sua derivata. In pratica, prima di calcolare, chiedi sempre cosa c’è sugli assi e in che unità: una pendenza «numerica» senza unità non dice nulla. Collegamento utile a Fisica 1–2 (grafici, vettori, Newton) e a qualunque esercizio in cui «quanto cambia in un istante» conta più del valor medio su un intervallo lungo.`,
          formule: ['v = dx/dt', 'a = dv/dt', 'a = d²x/dt²'],
          esempio:
            'ECG e spirometria: la pendenza di un tracciato tempo–ampiezza indica quanto velocemente cambia il segnale, non il valore assoluto in quel punto.',
          attenzione:
            'Pendenza negativa di v–t non significa automaticamente «si va all’indietro»: conta il segno relativo di a e v. Fuori programma le dimostrazioni formali di derivata.',
          approfondisci: [
            'Se vuoi capire anche il rapporto incrementale: Δx/Δt è la velocità media; la derivata è il limite quando Δt → 0.',
            'Su un grafico x–t curvo, la tangente in un punto è la velocità istantanea: più ripida la tangente, maggiore |v|.',
            'a = d²x/dt² ricorda solo che l’accelerazione è la «derivata della derivata»: due letture di pendenza in cascata.',
            'In 2D/3D, vx = dx/dt, vy = dy/dt: non mescolare componenti quando leggi i grafici.',
            'All’esame 2026 non ti chiedono la tabella delle derivate: ti chiedono di confrontare pendenze e segni.',
          ],
        },
        {
          title: 'Lavoro come area sotto la curva',
          body: `L’integrale, in linguaggio operativo, è «sommare pezzetti». Lo spostamento in un intervallo è l’area (con segno) sotto v–t: Δx = ∫ v dt. Il lavoro di una forza variabile lungo x è l’area sotto F–x: W = ∫ F dx. Se F è costante, l’area è un rettangolo e si riduce a F·Δx (o F·s·cosθ). In termodinamica lo stesso schema torna nel lavoro di espansione come area sotto P–V: più grande l’area, più lavoro (nel verso convenuto). Pensare «area = accumulo» collega meccanica, energia e i bilanci ΔU = Q − W senza calcoli di antiderivate all’esame. In pratica si approssima spesso con trapezi o rettangoli: non serve la primitiva, serve riconoscere quale grandezza è sull’asse verticale e quale sull’orizzontale. Un’area sotto l’asse può contare negativa: spostamento nel verso opposto, o lavoro fatto dal sistema a seconda della convenzione. Questo metodo qualitativo resta in programma anche se gli integrali formali sono fuori: è il ponte tra «integrale» e gli esercizi di meccanica e termodinamica.`,
          formule: ['Δx = ∫ v dt', 'W = ∫ F dx', 'W = ∫ P dV (gas, contesto)'],
          esempio:
            'Forza elastica F = −kx: il lavoro per stirare una molla è l’area del triangolo sotto la retta F–x, uguale a (1/2)kx².',
          attenzione:
            'Aree sotto l’asse possono contare negative (spostamento o lavoro nel verso opposto). Non confondere area sotto v–t (spostamento) con pendenza di v–t (accelerazione).',
          approfondisci: [
            'Se vuoi capire anche il segno: sopra l’asse → contributo positivo; sotto → negativo, rispetto al verso degli assi.',
            'F costante → rettangolo; F lineare → triangolo/trapezio: spesso basta geometria elementare.',
            'Su P–V, l’area del ciclo chiuso stima il lavoro netto del ciclo (motore o refrigeratore, a seconda del verso).',
            'Δx = area sotto v–t non è la stessa cosa di «spazio percorso» se v cambia segno: l’integrale può cancellarsi.',
            'All’esame ti chiedono di leggere aree, non di trovare primitive di polinomi.',
          ],
        },
        {
          title: 'Lettura di grafici',
          body: `Prima di calcolare, chiediti: cosa c’è sugli assi? Su x–t: pendenza → v; curvatura / come cambia la pendenza → a. Su v–t: pendenza → a; area → Δx. Su a–t: area → Δv. Su F–x: area → W. Un tratto orizzontale su x–t significa v = 0; su v–t significa a = 0. Un grafico lineare crescente ha pendenza costante. Parabole in x–t tipiche di a costante. Questo metodo qualitativo resta in programma anche se le derivate formali sono tagliate: è il ponte tra «integrale/derivata» e gli esercizi di meccanica e termodinamica. Controlla sempre le unità: se l’asse y è in m/s e x in s, l’area è in metri; la pendenza è in m/s². Evita di «inventare» grandezze leggendo solo i numeri senza etichette. In ambito biomedico i tracciati tempo–ampiezza (ECG, spirometria, pressione arteriosa) si leggono con la stessa logica: pendenza = quanto cambia ora; area = quanto si è accumulato. Allenati a descrivere a parole un grafico prima di scrivere formule: spesso la risposta è già lì.`,
          formule: ['pendenza ≈ Δy/Δx (rapporto incrementale)', 'area ≈ somma di strisce Δx · y'],
          esempio:
            'In un grafico pressione–volume di un ciclo respiratorio semplificato, l’area racchiusa stima il lavoro meccanico del ciclo.',
          attenzione:
            'All’esame 2026 non ti chiedono di derivare polinomi: ti chiedono di interpretare pendenze e aree. Non inventare unità sbagliate leggendo solo i numeri senza gli assi.',
          figureIds: ['extra-derivati-grafico'],
          approfondisci: [
            'Se vuoi capire anche la «checklist»: assi → pendenza o area? → unità del risultato → segno.',
            'x–t orizzontale: fermo. v–t orizzontale: a = 0. a–t orizzontale: accelerazione costante (anche zero).',
            'Curvatura di x–t: se la pendenza cresce, stai accelerando; se diminuisce, stai decelerando (nel verso scelto).',
            'Confronta due tratti: stessa area sotto v–t → stesso Δx, anche se le forme delle curve differiscono.',
            'In diagnostica, «quanto è ripido» e «quanta area» sono le due domande più utili sui tracciati.',
          ],
        },
      ],
      {
        analogia:
          'Immagina di camminare su una collina disegnata su un foglio. Quanto è ripida in un punto? Quella ripidezza è la derivata. Quanta «superficie» c’è sotto la tua strada tra due punti? Quella area è l’integrale: mette insieme tanti pezzettini di cammino.',
        concetti: [
          {
            titolo: 'Velocità = quanto sale la posizione',
            testo:
              'Se il grafico posizione–tempo è piatto, stai fermi. Se sale dritto, vai a velocità costante. Se diventa più ripido, stai accelerando.',
          },
          {
            titolo: 'Accelerazione = quanto cambia la velocità',
            testo:
              'Guarda il grafico velocità–tempo: la pendenza dice se stai spingendo o frenando. Orizzontale = non cambi velocità.',
          },
          {
            titolo: 'Lavoro = area sotto la forza',
            testo:
              'Se spingi con forza diversa in punti diversi, non basta un solo numero: sommi tanti rettangolini sotto la curva forza–spostamento. Quella somma è il lavoro.',
          },
          {
            titolo: 'Perché serve anche fuori programma',
            testo:
              'All’esame non ti fanno fare derivate complicate, ma i grafici sì. Capire pendenza e area ti salva in meccanica e in termodinamica.',
          },
        ],
      },
      [
        mc('extra-derivati', 'La pendenza di x(t) rappresenta:', ['Velocità', 'Forza', 'Carica', 'pH'], 0, 'v = dx/dt.', ex),
        mc('extra-derivati', 'L’area sotto v(t) in un intervallo è:', ['Spostamento', 'Accelerazione istantanea', 'Massa', 'Temperatura'], 0, 'Δx = ∫v dt.', ex),
        fill('extra-derivati', 'a = dv/d______.', 't', 'Accelerazione come derivata.', [], ex),
        mc('extra-derivati', 'Se la pendenza di v–t è positiva:', ['Si accelera nel verso di v crescente', 'La velocità è necessariamente zero', 'L’energia è vietata', 'P = 0'], 0, 'a > 0.', ex),
        mc('extra-derivati', 'Il lavoro come area sotto F–x vale per:', ['Forze anche variabili', 'Solo cariche elettriche', 'Solo suoni', 'Solo DNA'], 0, 'W = ∫F dx.', ex),
      ],
      [
        mc('extra-derivati', 'Un grafico x–t orizzontale indica:', ['v = 0', 'a massima', 'Forza infinita', 'Oscillazione obbligata'], 0, 'Posizione costante.', ex),
        fill('extra-derivati', 'La derivata misura la ______ locale di una curva.', 'pendenza', 'Rapporto incrementale limite.', ['inclinazione', 'slope'], ex),
        mc('extra-derivati', 'Se a = 0, v–t è:', ['Orizzontale', 'Parabola obbligatoria', 'Esponenziale', 'Verticale'], 0, 'Velocità costante.', ex),
        mc('extra-derivati', 'Integrare significa tipicamente:', ['Sommare contributi infinitesimi', 'Derivare due volte', 'Misurare solo pH', 'Contare virus'], 0, 'Area / accumulo.', ex),
        mc('extra-derivati', 'La pendenza di v–t negativa indica:', ['Rallentamento se v>0', 'Sempre moto all’indietro', 'Assenza di tempo', 'Campo nullo'], 0, 'a e v di segno opposto → frenata.', ex),
        mc('extra-derivati', 'Perché è utile prima di meccanica?', ['Collega grafici a v e a', 'Sostituisce Newton', 'Elimina le forze', 'Cambia il SI'], 0, 'Lettura quantitativa.', ex),
        fill('extra-derivati', 'W = ∫ F d______.', 'x', 'Lungo lo spostamento.', ['s', 'r'], ex),
        mc('extra-derivati', 'All’esame 2026 le derivate formali sono:', ['Fuori programma (ma i grafici restano)', 'L’unico argomento', 'Uguali al DNA', 'Obbligatorie come dimostrazioni'], 0, 'Taglio 2026.', ex),
      ],
      {
        figure: [
          {
            id: 'extra-derivati-grafico',
            kind: 'svg',
            caption: 'Pendenza = derivata; area ≈ integrale',
            alt: 'Grafico con tangente e area',
          },
        ],
      },
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-gas-reali',
      [
        {
          title: 'Quando fallisce PV = nRT',
          body: `Il gas ideale ignora il volume proprio delle molecole e le forze tra di esse. Funziona bene a basse pressioni e temperature non troppo basse rispetto alla temperatura critica. Ad alta P le molecole «occupano spazio»: il volume libero è minore di V. A bassa T le attrazioni (van der Waals) riducono la pressione sulle pareti rispetto al modello ideale. L’equazione di van der Waals (P + a/Vₘ²)(Vₘ − b) = RT corregge pressione e volume molare: «a» tiene conto delle attrazioni, «b» del volume escluso. Oltre la temperatura critica non si ottiene liquido solo comprimendo: scompare la distinzione liquido–gas per compressione isoterma. Nel 2026 i gas reali sono approfondimento; il modello ideale resta lo strumento d’esame, ma conoscere i limiti evita di assolutizzare PV = nRT. In clinica e in laboratorio, O₂ e N₂ a condizioni ambientali sono spesso «quasi ideali»; CO₂ vicino alla liquefazione o gas in bombole mostrano scostamenti. Quando un esercizio dice «gas ideale», usa PV = nRT; quando parla di liquefazione o Tc, pensa ai limiti del modello.`,
          formule: ['PV = nRT (ideale)', '(P + a/Vₘ²)(Vₘ − b) = RT', 'T > Tc → non liquefazione per sola compressione'],
          esempio:
            'O₂ o N₂ a condizioni ambientali: spesso «quasi ideali». CO₂ vicino alla liquefazione o gas compressi in bombole: scostamenti evidenti.',
          attenzione:
            '«a» → attrazioni (correzione su P); «b» → volume escluso. Non confondere temperatura critica con zero assoluto o punto di fusione dell’acqua.',
          approfondisci: [
            'Se vuoi capire anche perché a basse P il modello funziona: le molecole sono lontane, interazioni e volume proprio trascurabili.',
            'Vₘ − b: togli lo «spazio occupato»; P + a/Vₘ²: aggiungi la pressione «mancante» per le attrazioni.',
            'Tc non è 0 K né 0 °C: è la temperatura oltre cui non liquefa solo comprimendo.',
            'All’esame usa PV = nRT salvo indizi espliciti di gas reale o liquefazione.',
            'Collega a Chimica Unità 1: stati di aggregazione e limiti del modello ideale.',
          ],
        },
        {
          title: 'Teoria cinetica',
          body: `La teoria cinetica collega macroscopico e microscopico: pressione come urti elastici delle molecole sulle pareti; temperatura assoluta proporzionale all’energia cinetica media traslazionale. Per un gas ideale monoatomico ⟨Ec⟩ = (3/2) kT per molecola, o (3/2) RT per mole. k è la costante di Boltzmann (k = R/N_A). Velocità quadratiche medie crescono con √T: riscaldare a V costante aumenta la velocità media degli urti e quindi P, in accordo con Gay-Lussac / gas ideale. Questo spiega perché T è una misura dell’«agitazione» molecolare e perché a T = 0 K (limite) l’energia cinetica traslazionale del modello si annulla. Utile ponte tra Chimica (stati di aggregazione) e Fisica 5 (gas e temperatura). Non serve dimostrare la distribuzione di Maxwell: basta il messaggio ⟨Ec⟩ ∝ T e P legata a densità numerica e ⟨v²⟩. Attenzione: 0 °C non è zero assoluto; le molecole non sono «ferme» a temperatura ambiente. La teoria cinetica rafforza l’idea che pressione e temperatura non sono «magia macroscopica» ma conseguenze del moto molecolare.`,
          formule: ['⟨Ec⟩ = (3/2) kT', 'k = R/N_A', 'P ∝ n · ⟨v²⟩ / V (idea cinetica)'],
          esempio:
            'Riscaldare un gas a V costante aumenta la velocità media degli urti → sale P, in accordo con la legge di Gay-Lussac / gas ideale.',
          attenzione:
            '⟨Ec⟩ ∝ T vale nel modello ideale classico; non «dimostra» che a 0 °C le molecole sono ferme (0 °C ≠ 0 K).',
          approfondisci: [
            'Se vuoi capire anche k: è R «a livello di una molecola» (k = R/N_A).',
            'Monoatomico: (3/2)kT; gas biatomici hanno contributi rotazionali in più (cenno, non obbligatorio).',
            'P cresce se aumentano densità numerica o ⟨v²⟩: più urti o urti più energici.',
            'Zero assoluto = 0 K ≈ −273 °C: lì il modello classico prevede ⟨Ec⟩ traslazionale nulla.',
            'Collega temperatura termodinamica (kelvin) a «agitazione» senza confonderla con °C.',
          ],
        },
        {
          title: 'Calorimetria avanzata',
          body: `Calorimetria: bilancio di calore tra corpi (e eventuale calorimetro). Assenza di cambiamenti di stato: Q = m c ΔT. Con cambiamenti di stato entra il calore latente: Q = m λ (fusione, vaporizzazione). A equilibrio termico le temperature si uguagliano; in un calorimetro ideale gli scambi con l’esterno sono trascurabili, quindi la somma algebrica dei Q interni è zero. Capacità termica C = Q/ΔT; calore specifico c = C/m. Anche se alcuni dettagli sono alleggeriti nel syllabus 2026, il metodo del bilancio resta centrale negli esercizi termici e collega gas ideali, calori latenti e stati di aggregazione. In pratica: elenca chi cede e chi assorbe, scrivi i Q con segno coerente, imponi ΣQ = 0 (sistema isolato). Se c’è fusione o ebollizione a T costante, non usare mcΔT in quel tratto: usa mλ. L’equivalente in acqua del calorimetro (se dato) si tratta come massa d’acqua aggiuntiva che partecipa al bilancio. Questo schema evita errori tipici quando si mischiano metalli, liquidi e cambiamenti di stato.`,
          formule: ['Q = m c ΔT', 'Q = m λ (latente)', 'Σ Q = 0 (sistema isolato ideale)'],
          esempio:
            'Metallo caldo immerso in acqua fredda in calorimetro: il calore perso dal metallo riscalda acqua (+ equivalente in acqua del vaso).',
          attenzione:
            'Q = mcΔT non vale durante un cambiamento di stato a T costante. Segnare i segni: calore ceduto è negativo se usi la convenzione del bilancio ΣQ = 0.',
          approfondisci: [
            'Se vuoi capire anche C vs c: C è del pezzo intero; c è «per grammo» (o per kg).',
            'Durante fusione/vaporizzazione T resta costante: tutta l’energia va a rompere/costruire struttura, non a salire T.',
            'Calorimetro ideale ≈ isolamento: se c’è perdita verso l’esterno, ΣQ interni ≠ 0 e l’esercizio lo segnala.',
            'Ordine tipico: riscalda solido → fonde → riscalda liquido → evapora: spezza il percorso in tratti.',
            'Collega a stati di aggregazione e a ΔU = Q − W quando compare anche lavoro.',
          ],
        },
      ],
      {
        analogia:
          'Il gas ideale è come una classe dove i bambini sono puntini che non si urtano tra loro e non occupano banco: funziona se la stanza è grande e non troppo piena. Se li stringi in un armadio, spazio e spinte reciproche contano: ecco i gas reali.',
        concetti: [
          {
            titolo: 'Quando PV = nRT mente',
            testo:
              'Se comprimi tantissimo o raffreddi molto, le molecole si toccano e si attraggono. Allora la formula semplice non basta più.',
          },
          {
            titolo: 'Temperatura = quanto corrono',
            testo:
              'Più è alta la temperatura assoluta, più in media le molecole corrono. La pressione nasce dagli urti sulle pareti.',
          },
          {
            titolo: 'Calorimetro = bilancio di calore',
            testo:
              'Se mischi caldo e freddo in una scatola isolata, il calore perso da uno lo guadagna l’altro, finché hanno la stessa temperatura.',
          },
          {
            titolo: 'Perché tenerlo',
            testo:
              'All’esame usi ancora il gas ideale, ma sapere i limiti e saper fare i bilanci di calore ti evita errori grossolani.',
          },
        ],
      },
      [
        mc('extra-gas-reali', 'I gas reali si discostano dal modello ideale tipicamente:', ['Ad alta P e bassa T', 'Nel vuoto assoluto ideale', 'Solo a T→∞ sempre', 'Solo se neutri'], 0, 'Interazioni e volume molecolare.', ex),
        mc('extra-gas-reali', 'Nella teoria cinetica, T assoluta è legata a:', ['Energia cinetica media', 'Solo al colore', 'Solo alla carica', 'Solo al suono'], 0, '⟨Ec⟩ = (3/2)kT.', ex),
        fill('extra-gas-reali', 'L’equazione di van der Waals corregge P e ______ molare.', 'volume', 'Termini a e b.', ['V', 'v'], ex),
        mc('extra-gas-reali', 'In calorimetria, a equilibrio termico:', ['Le temperature si uguagliano', 'Le masse si annullano', 'P diventa zero', 'f raddoppia'], 0, 'Scambio di calore.', ex),
        mc('extra-gas-reali', 'Il modello ideale resta utile perché:', ['Approssima molti gas a condizioni ordinarie', 'È sempre esatto al 100%', 'Elimina T', 'Vieta P'], 0, 'Buona prima approssimazione.', ex),
      ],
      [
        mc('extra-gas-reali', 'Il termine “a” di van der Waals tiene conto tipicamente di:', ['Attrazioni molecolari', 'Spin nucleare', 'Solo del suono', 'Solo del DNA'], 0, 'Pressione corretta.', ex),
        fill('extra-gas-reali', 'Q = m c ΔT vale assente ______ di stato.', 'cambiamenti', 'Senza latente.', ['cambiamento', 'transizioni', 'passaggi'], ex),
        mc('extra-gas-reali', 'La temperatura critica è:', ['Oltre la quale non si liquefa solo comprimendo', 'Lo zero assoluto', 'Il punto di fusione del ghiaccio', 'Un decibel'], 0, 'Fine della distinzione liquido-gas per compressione.', ex),
        mc('extra-gas-reali', 'Perché collegarlo a Chimica Unità 1?', ['Stati di aggregazione e limiti del gas ideale', 'Perché è DNA', 'Perché è Doppler', 'Perché è Gram'], 0, 'Stesso ponte concettuale.', ex),
        mc('extra-gas-reali', 'k nella teoria cinetica è:', ['Costante di Boltzmann', 'Costante di Hooke', 'Sempre 9.8', 'Il pH'], 0, 'k = R/NA.', ex),
        mc('extra-gas-reali', 'Un calorimetro ideale:', ['Isola scambi con l’esterno', 'Produce lavoro infinito', 'Misura solo cariche', 'Conta virus'], 0, 'Bilancio interno.', ex),
        fill('extra-gas-reali', 'PV = nRT è l’equazione dei gas ______.', 'perfetti', 'Ideali/perfetti.', ['ideali', 'ideale'], ex),
        mc('extra-gas-reali', 'Nel programma 2026 i gas reali sono:', ['Approfondimento (tagliati)', 'Il cuore dell’esame', 'Obbligatori in biologia', 'Unità SI'], 0, 'Fuori programma ufficiale.', ex),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-fotoelettrico',
      [
        {
          title: 'Fotoni e soglia',
          body: `La luce, oltre al comportamento ondulatorio, può essere descritta come pacchetti di energia — fotoni — ciascuno con E = h f (o hν), dove h è la costante di Planck. Nell’effetto fotoelettrico, un fotone che colpisce un metallo può cedere energia a un elettrone. Esiste una frequenza di soglia f_s: se f < f_s, anche con intensità altissima (idealmente) non escono elettroni, perché un singolo fotone non raggiunge la funzione di lavoro φ. La soglia è legata da φ = h f_s. L’intensità, a frequenza fissa sopra soglia, regola soprattutto quanti fotoni arrivano per secondo, quindi quanti elettroni al secondo, non l’energia del singolo quanto. Fuori dal programma ufficiale 2026, ma essenziale per capire la quantizzazione e l’interazione luce–materia verso Fisica 7. Il messaggio storico è chiaro: non basta «più luce» se ogni pezzo è troppo piccolo; serve la frequenza giusta. Luce rossa su certi metalli non estrae elettroni; ultravioletta sì. Questo spezza l’intuizione classica dell’onda che accumula energia nel tempo e introduce i fotoni come unità discrete di scambio energetico.`,
          formule: ['E = h f', 'φ = h f_s', 'h ≈ 6,63×10⁻³⁴ J·s'],
          esempio:
            'Luce rossa su certi metalli non estrae elettroni; luce ultravioletta sì: stessa «quantità di luce» non basta se i fotoni sono troppo «morbidi».',
          attenzione:
            'Intensità ≠ energia del fotone. Più intensità (sopra soglia) → più elettroni/tempo, non Kmax illimitata.',
          approfondisci: [
            'Se vuoi capire anche E = hc/λ: frequenza alta ↔ lunghezza d’onda corta ↔ fotone più energetico.',
            'φ dipende dal materiale: metalli diversi hanno soglie diverse.',
            'Sotto soglia: zero fotoelettroni (ideale), non «Kmax negativa».',
            'Intensità = flusso di fotoni: sopra soglia regola la corrente, non Kmax.',
            'Ponte a Fisica 7: stessa logica di quanti energetici per X e γ.',
          ],
        },
        {
          title: 'Energia cinetica dei fotoelettroni',
          body: `Se hf > φ, l’elettrone può uscire con energia cinetica massima Kmax = hf − φ (equazione di Einstein per l’effetto fotoelettrico). Alla soglia hf = φ si ha Kmax = 0: emissione «al limite». Kmax dipende da frequenza e dal materiale (φ), non dall’intensità. Un fotone blu (f più alta) porta più energia di uno rosso: a parità di φ, Kmax è maggiore. Il potenziale di arresto e·V_s = Kmax è il modo sperimentale classico di misurare questa energia. Il risultato storico: la luce agisce a «porzioni», non solo come onda continua che accumula energia nel tempo. Due lampade stessa f sopra soglia, una più intensa: stessa Kmax, ma corrente fotoelettrica maggiore nella più intensa. Non confondere «più elettroni» con «elettroni più veloci». All’esame (come approfondimento) le domande tipiche ruotano su soglia, dipendenza da f e indipendenza di Kmax dall’intensità. Ricorda: sotto soglia non c’è emissione ideale; sopra soglia Kmax cresce linearmente con f.`,
          formule: ['Kmax = hf − φ', 'e V_s = Kmax'],
          esempio:
            'Due lampade stessa f sopra soglia, una più intensa: stessa Kmax, ma corrente fotoelettrica maggiore nella più intensa.',
          attenzione:
            'Kmax non cresce «senza limiti» alzando solo l’intensità a f fissa. Sotto soglia Kmax non è «negativa»: semplicemente non ci sono fotoelettroni (ideale).',
          approfondisci: [
            'Se vuoi capire anche V_s: è la tensione che ferma i fotoelettroni più energetici (eV_s = Kmax).',
            'Grafico Kmax vs f: retta con pendenza h e intercetta −φ (o soglia f_s = φ/h).',
            'Blu vs rosso: a parità di materiale, blu → Kmax maggiore se entrambi sopra soglia.',
            'Corrente fotoelettrica ∝ intensità (sopra soglia); Kmax no.',
            'Einstein fotoelettrico: un fotone → un elettrone (schema ideale a soglia).',
          ],
        },
        {
          title: 'Ponte verso le radiazioni',
          body: `L’effetto fotoelettrico introduce i fotoni e le soglie energetiche: la stessa logica torna quando si parla di raggi X, γ e interazione della radiazione elettromagnetica con la materia (assorbimento, ionizzazione). Un fotone di alta energia può liberare elettroni o innescare processi che depositano dose; l’idea «un quanto, un evento» aiuta a non trattare la luce solo come onda classica. Collegamento diretto a Fisica 7 (radiazioni, decadimenti, imaging). Non sostituisce Lambert–Beer o la dosimetria completa: è il ponte concettuale quantistico minimo. In diagnostica, fotoni X di energia sufficiente ionizzano e formano immagine; fotoni troppo «morbidi» vengono assorbiti senza contribuire utile. Capire soglia e quanto di energia evita confusioni tra intensità del fascio e penetrazione/energia dei singoli fotoni. Nel 2026 l’effetto fotoelettrico è approfondimento: non inventarlo come obbligo di simulazione, ma usalo per leggere meglio fotoni e radiazioni nei libri e nelle unità collegate. In una frase: frequenza (o energia del quanto) decide se l’evento può avvenire; intensità decide quanti eventi al secondo.`,
          formule: ['E = hc/λ (equivalente utile)', 'interazione EM: soglie e quanti'],
          esempio:
            'In diagnostica, fotoni X di energia sufficiente ionizzano e formano immagine; fotoni troppo «morbidi» vengono assorbiti senza contribuire utile.',
          attenzione:
            'Nel 2026 l’effetto fotoelettrico è approfondimento: non inventarlo come obbligo di simulazione, ma usalo per leggere meglio fotoni e radiazioni.',
          approfondisci: [
            'Se vuoi capire anche il dualismo: qui conta il quanto; altrove (interferenza) conta l’onda.',
            'Energia del fotone vs intensità del fascio: due manopole diverse in radiologia concettuale.',
            'Soglie di ionizzazione: stessa idea di «energia minima per evento».',
            'Collega a decadimento γ: fotone da nucleo, non da lampada, ma sempre E = hf.',
            'Non sostituisce dosimetria: è solo il ponte «fotone = pezzo di energia».',
          ],
        },
      ],
      {
        analogia:
          'Pensa ai fotoni come monete. Per aprire una porta (estrarre un elettrone) serve almeno una moneta da 2 euro (soglia). Dieci monete da 1 euro non aprono: non puoi sommare monete diverse sullo stesso «click». Se hai monete da 2 euro, quante porte apri al minuto dipende da quante monete arrivano (intensità), ma ogni porta aperta riceve al massimo il resto di quella moneta (energia cinetica).',
        concetti: [
          {
            titolo: 'Luce a pezzetti',
            testo:
              'Ogni fotone porta un pezzo di energia legato alla frequenza: più alta la frequenza, più «duro» il pezzo.',
          },
          {
            titolo: 'Soglia',
            testo:
              'Se il pezzo è troppo piccolo, l’elettrone non esce, anche se mandi tantissima luce. Serve superare la soglia del metallo.',
          },
          {
            titolo: 'Intensità e Kmax',
            testo:
              'Più luce sopra soglia = più elettroni che escono. Ma quanto veloci escono al massimo dipende dalla frequenza e dal metallo, non da quanto è intensa la lampada.',
          },
          {
            titolo: 'Ponte alle radiazioni',
            testo:
              'La stessa idea di «quanto di energia» torna con X e γ: aiuta a capire perché certe radiazioni interagiscono con la materia e altre no.',
          },
        ],
      },
      [
        mc('extra-fotoelettrico', 'Sotto la frequenza di soglia:', ['Non ci sono fotoelettroni (idealmente)', 'Kmax raddoppia', 'φ diventa negativa', 'λ non esiste'], 0, 'hf < φ.', ex),
        mc('extra-fotoelettrico', 'Aumentare l’intensità (f > soglia) aumenta tipicamente:', ['Il numero di elettroni/tempo', 'Kmax senza limiti', 'φ del metallo', 'h'], 0, 'Più fotoni → più eventi.', ex),
        fill('extra-fotoelettrico', 'E = h ______.', 'f', 'Energia del fotone.', ['ν', 'nu', 'frequenza'], ex),
        mc('extra-fotoelettrico', 'φ (funzione di lavoro) è:', ['Energia minima per estrarre un elettrone', 'Una forza elastica', 'Un’unità di pressione', 'Un codon'], 0, 'Soglia energetica.', ex),
        mc('extra-fotoelettrico', 'Collegamento a Fisica 7:', ['Quantizzazione e interazione EM con materia', 'Solo fluidi', 'Solo leve', 'Solo Gram'], 0, 'Ponte concettuale.', ex),
      ],
      [
        mc('extra-fotoelettrico', 'Kmax dipende da:', ['f e φ', 'Solo dall’intensità', 'Solo dalla massa del tavolo', 'Solo dal pH'], 0, 'Einstein fotoelettrico.', ex),
        fill('extra-fotoelettrico', 'h è la costante di ______.', 'Planck', 'h ≈ 6.63×10⁻³⁴ J·s.', ['planck'], ex),
        mc('extra-fotoelettrico', 'Nel 2026 l’effetto fotoelettrico è:', ['Fuori programma (approfondimento)', 'Obbligatorio in tutte le simulazioni', 'Un CFU di biologia', 'Una proprietà colligativa'], 0, 'Taglio syllabus.', ex),
        mc('extra-fotoelettrico', 'Un fotone blu ha tipicamente energia ______ rispetto al rosso:', ['Maggiore', 'Minore', 'Identica sempre', 'Nulla'], 0, 'f più alta.', ex),
        mc('extra-fotoelettrico', 'Se hf = φ:', ['Kmax = 0 (soglia)', 'Kmax massima assoluta', 'Non c’è luce', 'P = 0'], 0, 'Emissione con energia cinetica nulla.', ex),
        mc('extra-fotoelettrico', 'Perché studiarlo comunque?', ['Capire fotoni e soglie energetiche', 'Per sostituire Lambert-Beer', 'Per eliminare α', 'Per misurare π osmotica'], 0, 'Base quantistica leggera.', ex),
        fill('extra-fotoelettrico', 'Kmax = hf − ______.', 'φ', 'Funzione di lavoro.', ['phi', 'lavoro di estrazione'], ex),
        mc('extra-fotoelettrico', 'L’effetto dimostra la natura:', ['Corpuscolare della luce (fotoni)', 'Solo ondulatoria esclusiva', 'Solo gravitazionale', 'Solo sonora'], 0, 'Dualismo, ma qui conta il quanto.', ex),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-urti',
      [
        {
          title: 'Impulso e urti',
          body: `L’impulso di una forza è J = F_media · Δt (più in generale ∫ F dt) ed è uguale alla variazione di quantità di moto: J = Δp. Negli urti le forze interne sono intense e brevi: spesso si usa la conservazione di p se le forze esterne impulsive sono trascurabili (sistema isolato lungo l’asse considerato). L’impulso spiega perché allungare il tempo di collisione (airbag, flessione delle ginocchia) riduce la forza media a parità di Δp. Quantità di moto p = mv resta in programma; questo approfondimento rafforza il passaggio da F = ma integrata nel tempo a Δp, utile in meccanica (Fisica 2) e in contesti clinici di trauma. Caduta su un materasso vs pavimento rigido: stesso Δp all’incirca, Δt maggiore sul materasso → F_media minore. Attenzione: il pavimento o un vincolo possono scambiare impulso con il sistema — allora p del solo «oggetto» non si conserva. Sempre chiediti: chi è il sistema? Quali forze esterne sono impulsive? Lungo quale asse? Questa checklist evita errori tipici negli esercizi di urto unidimensionale.`,
          formule: ['J = F_media · Δt', 'J = Δp', 'p = mv'],
          esempio:
            'Caduta su un materasso vs pavimento rigido: stesso Δp all’incirca, Δt maggiore sul materasso → F_media minore.',
          attenzione:
            'Conservazione di p richiede isolamento (F_ext ≈ 0) sull’asse in esame; il pavimento o un vincolo possono scambiare impulso con il sistema.',
          approfondisci: [
            'Se vuoi capire anche J = ∫ F dt: l’area sotto F–t è l’impulso, come l’area sotto altre curve.',
            'Airbag: stesso Δp, Δt più lungo → F_media più piccola → meno lesioni.',
            'Sistema = due corpi che urtano: le forze dell’urto sono interne e si annullano nella Σp.',
            'p = mv è vettoriale: nei segni unidimensionali scegli un verso positivo e rispettalo.',
            'Collega a F = dp/dt: Newton in forma di quantità di moto.',
          ],
        },
        {
          title: 'Elastici e anelastici',
          body: `Urto elastico (ideale): si conservano quantità di moto ed energia cinetica. Urto anelastico: si conserva tipicamente p (se isolato), ma non tutta la K — parte va in deformazione, calore, suono. Caso estremo: urto completamente anelastico, i corpi restano uniti e condividono la velocità finale; la perdita di K è massima tra gli urti unidimensionali con p conservata. Il coefficiente di restituzione e (rapporto delle velocità relative) riassume elasticità: e = 1 elastico ideale, e = 0 completamente anelastico. Anche fuori programma come capitolo autonomo, chiarisce perché «conservazione di p» non implica «conservazione di K». Proiettile che si conficca in un blocco (ballistico): modello spesso completamente anelastico; poi si usa energia meccanica nella salita del pendolo. Non dire «negli urti non si conserva mai l’energia»: l’energia totale sì; l’energia cinetica macroscopica no negli anelastici. In quiz, distingui sempre cosa è conservato: p, K, entrambe, nessuna delle due (se non isolato).`,
          formule: ['elastico: p e K conservate', 'anelastico: p sì (isolato), K no', 'completamente anelastico: velocità comune finale'],
          esempio:
            'Proiettile che si conficca in un blocco (ballistico): modello spesso completamente anelastico; poi si usa energia meccanica nella salita del pendolo.',
          attenzione:
            'Non dire «negli urti non si conserva mai l’energia»: l’energia totale sì; l’energia cinetica macroscopica no negli anelastici.',
          approfondisci: [
            'Se vuoi capire anche e: rapporto delle velocità relative dopo/prima; e=1 elastico, e=0 appiccicoso.',
            'Completamente anelastico: massa totale × v_comune = somma dei p iniziali (1D isolato).',
            'Elastico ideale: oltre a p, uguaglia anche (1/2)mv² totale prima e dopo.',
            'Energia «persa» in K diventa deformazione, calore, suono — non sparisce dal bilancio totale.',
            'Nei problemi misti: urto anelastico → poi energia meccanica su vincoli senza attrito.',
          ],
        },
        {
          title: 'Moto armonico semplice',
          body: `Il MAS è il moto di un oscillatore lineare: x = A cos(ωt + φ), con velocità massima al centro (equilibrio) e accelerazione a = −ω²x massima in modulo agli estremi. Pulsazione ω = 2π/T = 2πf; frequenza f = 1/T. Energia: scambio continuo tra cinetica (max al centro) e potenziale elastica (max agli estremi) se non c’è smorzamento. Per una massa–molla ω = √(k/m). Ponte verso le onde (Fisica 4): molte onde armoniche nascono da sorgenti che oscillano. Non richiesto come capitolo autonomo nel 2026, ma fissa periodo, frequenza e il legame a ∝ −x. Oscillazioni di una corda vocale o di una membrana semplificata: frequenza legata a parametri elastici e inerziali. Attenzione tipica: a è massima dove |x| è massimo, non dove |v| è massima; non confondere f e ω. In assenza di smorzamento il moto si ripete all’infinito con ampiezza A costante; con attrito l’ampiezza cala (cenno). Questo quadro prepara la lettura di onde sinusoidali e di segnali periodici in ambito biomedico.`,
          formule: ['x = A cos(ωt + φ)', 'a = −ω²x', 'ω = 2π/T', 'f = 1/T', 'ω = √(k/m) (molla)'],
          esempio:
            'Oscillazioni di una corda vocale o di una membrana semplificata: frequenza legata a parametri elastici e inerziali del sistema.',
          attenzione:
            'a è massima dove |x| è massimo, non dove |v| è massima. ω = 2π/T è vero nel MAS; non confondere f e ω.',
          approfondisci: [
            'Se vuoi capire anche l’energia: al centro tutta K; agli estremi tutta U elastica (ideale).',
            'ω = √(k/m): molla più dura → oscillazioni più rapide; massa maggiore → più lente.',
            'T = 2π/ω; f = 1/T: tre modi di dire «quanto è frequente» il ciclo.',
            'a = −ω²x: sempre diretta verso l’equilibrio (segno meno).',
            'Collega a onde: una corda che oscilla è una sorgente armonica per Fisica 4.',
          ],
        },
      ],
      {
        analogia:
          'Un urto è come due monopattini che si scontrano: la «spinta totale» (quantità di moto) si ridistribuisce. Se rimbalzano come palle di gomma perfette, anche l’energia di movimento si conserva; se si appiccicano col chewing-gum, una parte dell’energia diventa calore e deformazione. Il moto armonico è invece l’altalena ideale: va avanti e indietro sempre con lo stesso ritmo.',
        concetti: [
          {
            titolo: 'Impulso',
            testo:
              'Una forza forte per poco tempo può cambiare la velocità come una forza debole per molto tempo. Impulso = quanto «pizzichi» la quantità di moto.',
          },
          {
            titolo: 'Elastico vs anelastico',
            testo:
              'Elastico: rimbalzo «pulito», si conserva anche l’energia di movimento. Anelastico: qualcosa si schiaccia o si scalda, e l’energia di movimento diminuisce.',
          },
          {
            titolo: 'Completamente anelastico',
            testo:
              'I due oggetti restano uniti e vanno alla stessa velocità dopo lo scontro. È il caso più «appiccicoso».',
          },
          {
            titolo: 'Moto armonico',
            testo:
              'Come una molla o un’altalena piccola: al centro corri di più, agli estremi ti fermi un attimo e l’accelerazione è massima verso il centro.',
          },
        ],
      },
      [
        mc('extra-urti', 'In un urto elastico tipicamente si conserva:', ['Quantità di moto ed energia cinetica', 'Solo la temperatura', 'Solo la carica', 'Solo il pH'], 0, 'Ideale.', ex),
        mc('extra-urti', 'Un urto anelastico:', ['Non conserva tutta la K', 'Aumenta sempre K', 'Vieta Δp', 'Elimina la massa'], 0, 'Parte di energia “persa”.', ex),
        fill('extra-urti', 'J = Δ______.', 'p', 'Impulso = variazione di quantità di moto.', ['quantita di moto', 'mv'], ex),
        mc('extra-urti', 'Nel MAS, l’accelerazione è massima quando:', ['Lo spostamento è massimo', 'v è massima al centro… no: a max agli estremi', 'Solo a x=0 a è max', 'Mai'], 0, 'a = −ω²x.', ex),
        mc('extra-urti', 'Collegato a:', ['Meccanica e onde', 'Solo chimica organica', 'Solo prioni', 'Solo Gram'], 0, 'fis-2 / fis-4.', ex),
      ],
      [
        mc('extra-urti', 'ω = 2π/T nel MAS:', ['Vero', 'Falso', 'Solo per gas', 'Solo per DNA'], 0, 'Pulsazione.', ex),
        fill('extra-urti', 'Negli urti tra due corpi isolati si conserva la quantità di ______.', 'moto', 'Se F_ext≈0.', ['momento', 'p'], ex),
        mc('extra-urti', 'Un urto completamente anelastico:', ['I corpi restano uniti', 'Conserva sempre K', 'Ha sempre e=1', 'Vieta p'], 0, 'Velocità comune finale.', ex),
        mc('extra-urti', 'L’energia potenziale elastica nel MAS è massima:', ['Agli estremi', 'All’equilibrio', 'Mai', 'Solo a t=∞'], 0, 'Massima deformazione.', ex),
        mc('extra-urti', 'Perché fuori programma ma utile?', ['Chiarisce Δp e oscillazioni', 'Sostituisce Stevino', 'Elimina Ohm', 'Cambia il SI'], 0, 'Basi.', ex),
        mc('extra-urti', 'L’impulso di una forza media è:', ['F_media · Δt', 'F/Δt', 'm/a', 'qV'], 0, 'Definizione.', ex),
        fill('extra-urti', 'Nel MAS, f = 1/______.', 'T', 'Frequenza.', [], ex),
        mc('extra-urti', 'Taglio 2026 su urti/MAS:', ['Approfondimento consigliato', 'Obbligo di dimostrazione', 'Unità bio-7', 'Proprietà colligativa'], 0, 'Non ufficiale.', ex),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-radioisotopi',
      [
        {
          title: 'Isotopi radioattivi',
          body: `Isotopi: stesso numero atomico Z (stesso elemento, stessi protoni), diverso numero di neutroni e quindi diverso numero di massa A = Z + N. Alcuni nuclei sono stabili; altri sono radioisotopi e decadono emettendo particelle o fotoni (α, β, γ — dettagli in Fisica 7). Esempi classici: ¹²C e ¹⁴C (entrambi Z = 6); ¹³¹I; ⁹⁹ᵐTc. In Chimica 2026 il capitolo esteso sui radioisotopi è ridotto: qui resta il ponte con struttura atomica (Chimica 1) e con decadimento/emivita (Fisica 7). La chimica dell’isotopo (stesse reazioni elettroniche, massa leggermente diversa) spiega traccianti e arricchimenti. ¹⁴C nel dating: stesso comportamento chimico del carbonio, ma decadimento β che permette di stimare età di resti organici. Attenzione: isotopi ≠ ioni — gli ioni differiscono per elettroni/carica; gli isotopi per neutroni. Z uguale significa stesso elemento, anche se A cambia. Capire questa distinzione evita confusioni tipiche nei quiz di struttura atomica e prepara la lettura di nuclidi in contesto clinico.`,
          formule: ['A = Z + N', 'stesso Z → stesso elemento', 'nuclei instabili → decadimento'],
          esempio:
            '¹⁴C nel dating: stesso comportamento chimico del carbonio, ma decadimento β che permette di stimare età di resti organici.',
          attenzione:
            'Isotopi ≠ ioni: gli ioni differiscono per elettroni/carica; gli isotopi per neutroni. Z uguale, non «nome diverso = elemento diverso».',
          approfondisci: [
            'Se vuoi capire anche la notazione ᴬX: A in alto, Z a volte in basso; X è il simbolo chimico.',
            'Stessa chimica elettronica ≈ stesso Z; massa e stabilità nucleare cambiano con N.',
            'Radioisotopo = isotopo instabile che decade; non tutti gli isotopi sono radioattivi.',
            'Collega a Chimica 1: protone, neutrone, elettrone e definizione di elemento.',
            'Collega a Fisica 7: tipi di decadimento e legge esponenziale.',
          ],
        },
        {
          title: 'Usi diagnostici',
          body: `In medicina nucleare i radioisotopi servono da traccianti: quantità piccole ma emissioni rilevabili (γ tipicamente) permettono imaging e studi di cinetica (captazione tiroidea con iodio, perfusioni, PET con emettitori di positroni, ecc.). Un radiofarmaco deve bilanciare emivita utile (abbastanza lunga per preparare e acquisire, abbastanza corta per limitare dose), tipo di emissione, biodistribuzione e tossicità chimica. Non è solo «radioattività»: è chimica del carrier + fisica del decadimento. Approfondimento fuori simulazione ufficiale, ma chiarisce perché Chimica 1 e Fisica 7 si parlano in diagnostica. Tecnezio-99m: emivita ~6 h, emissione γ comoda per SPECT, chimica versatile per legarlo a molecole diverse. «Tracciante» non implica dose terapeutica: diagnostica ≠ terapia radiometabolica (attività e isotopi diversi). Capire questo bilanciamento aiuta a leggere perché certi nuclidi sono scelti in ospedale e altri no, senza pretendere di diventare specialisti di medicina nucleare. In sintesi: scegli l’isotopo per fisica del decadimento e la molecola per dove deve andare nel corpo.`,
          formule: ['attività ∝ numero di nuclei · λ', 'scelta isotopo: emivita + emissione + biochimica'],
          esempio:
            'Tecnezio-99m: emivita ~6 h, emissione γ comoda per SPECT, chimica versatile per legarlo a molecole diverse.',
          attenzione:
            '«Tracciante» non implica dose terapeutica: diagnostica ≠ terapia radiometabolica (attività e isotopi diversi).',
          approfondisci: [
            'Se vuoi capire anche il tracciante: molecola «segna» il percorso; il rivelatore vede i decadimenti.',
            'Emivita troppo corta → non arrivi all’imaging; troppo lunga → dose residua inutile.',
            'γ preferita in imaging: penetra e si rivela fuori dal corpo; α restano locali (più terapia).',
            'PET vs SPECT: idee diverse di emissione, stesso principio di tracciamento.',
            'Chimica del carrier decide dove va l’isotopo (tiroide, osso, metabolismo…).',
          ],
        },
        {
          title: 'Collegamento al decadimento',
          body: `La legge di decadimento N = N₀ e^(−λt) e l’emivita t₁/₂ = ln2 / λ collegano la chimica del nucleo alla fisica delle radiazioni. γ da un nucleo eccitato è un fotone; β cambia Z e può produrre un altro elemento; α tipica dei nuclei pesanti. Studiare i radioisotopi da Chimica 1 serve a fissare Z, A e stabilità; il decadimento vero e proprio si approfondisce in Fisica 7. Nell’app queste domande restano non examEligible: sono basi extra per non restare spiazzati quando libri o cliniche nominano ⁹⁹ᵐTc o ¹⁸F. Dopo una emivita resta metà dei nuclei radioattivi (in media); dopo due emivite un quarto — utile per pianificare tempi di imaging. Emivita non è «tempo in cui tutto sparisce». Decadimento ≠ reazione chimica di combustione: è processo nucleare. Tenere distinta la scala nucleare da quella molecolare evita errori concettuali gravi quando si parla di «quanto resta» di un radiofarmaco nel tempo.`,
          formule: ['N = N₀ e^(−λt)', 't₁/₂ = ln 2 / λ', 'γ = fotone da transizione nucleare'],
          esempio:
            'Dopo una emivita resta metà dei nuclei radioattivi (in media); dopo due emivite un quarto — utile per pianificare tempi di imaging.',
          attenzione:
            'Emivita non è «tempo in cui tutto sparisce». Decadimento ≠ reazione chimica di combustione: è processo nucleare.',
          approfondisci: [
            'Se vuoi capire anche λ: costante di decadimento; più grande λ → decadimento più rapido → t₁/₂ più corta.',
            'N(t) è statistico: «metà» è valore atteso su grandi numeri di nuclei.',
            'β⁺/β⁻ cambiano Z: nasce un elemento diverso; γ di solito no.',
            'Attività A = λN: quanto «conta» al rivelatore al secondo.',
            'Badge app: approfondimento, non simulazione ufficiale — ma ponte reale Chimica↔Fisica.',
          ],
        },
      ],
      {
        analogia:
          'Gli isotopi sono fratelli dello stesso elemento: stesso numero di protoni (stessa «carta d’identità chimica»), ma zaini con neutroni diversi. Alcuni fratelli sono tranquilli; altri sono irrequieti e prima o poi «sparano» un pezzo di energia (decadono). In ospedale usiamo quelli irrequieti in dosi minute come segnalini luminosi nel corpo.',
        concetti: [
          {
            titolo: 'Stesso Z, neutroni diversi',
            testo:
              'Carbonio-12 e carbonio-14 sono entrambi carbonio. Cambiano i neutroni, non il «nome» dell’elemento.',
          },
          {
            titolo: 'Traccianti',
            testo:
              'Metti una piccola quantità di isotopo radioattivo su una molecola: dove va la molecola, il rivelatore «vede» i segnali. Così si fanno certe scintigrafie.',
          },
          {
            titolo: 'Emivita',
            testo:
              'È il tempo in cui, in media, metà dei nuclei instabili è decaduta. Serve a scegliere isotopi utili in clinica.',
          },
          {
            titolo: 'Ponte a Fisica 7',
            testo:
              'Qui capisci chi è l’isotopo; lì studi come decade e che radiazioni emette. Le due parti vanno insieme.',
          },
        ],
      },
      [
        mc('extra-radioisotopi', 'Due isotopi differiscono per:', ['Numero di neutroni', 'Numero atomico Z', 'Numero di elettroni sempre obbligatorio diverso', 'Il nome dell’elemento'], 0, 'Stesso Z.', ex),
        mc('extra-radioisotopi', 'Un tracciante radioattivo in diagnostica sfrutta tipicamente:', ['Emissioni rilevabili a basse quantità', 'Solo il sapore', 'Solo il colore del sangue', 'Solo Ohm'], 0, 'Imaging / cinetica.', ex),
        fill('extra-radioisotopi', 'Z è il numero ______.', 'atomico', 'Protoni.', ['di protoni', 'protonico'], ex),
        mc('extra-radioisotopi', 'Il decadimento vero e proprio è trattato soprattutto in:', ['Fisica delle radiazioni', 'Solo biologia molecolare', 'Solo fluidi', 'Solo alcoli'], 0, 'fis-7.', ex),
        mc('extra-radioisotopi', 'Nel syllabus Chimica 2026 i radioisotopi come capitolo esteso sono:', ['Tagliati / cenni altrove', 'Il tema centrale', 'Un CFU di 3', 'Una colligativa'], 0, 'Spostati/tagliati.', ex),
      ],
      [
        mc('extra-radioisotopi', '¹⁴C e ¹²C sono:', ['Isotopi del carbonio', 'Elementi diversi', 'Ioni Na+', 'Virus'], 0, 'Stesso Z=6.', ex),
        fill('extra-radioisotopi', 'L’emivita collega radioisotopi alla legge di ______.', 'decadimento', 'Esponenziale.', ['decadimento radioattivo'], ex),
        mc('extra-radioisotopi', 'Un radiofarmaco deve bilanciare:', ['Emivita utile e tossicità/dose', 'Solo il sapore', 'Solo la viscosità', 'Solo Gram+'], 0, 'Pratica clinica.', ex),
        mc('extra-radioisotopi', 'N (numero di massa) =:', ['Z + neutroni', 'Solo elettroni', 'Solo orbitali', 'Solo pH'], 0, 'A = Z + N.', ex),
        mc('extra-radioisotopi', 'Perché aprirlo da Chimica 1?', ['Nucleo e stabilità atomica', 'Perché è un alchene', 'Perché è un tampone', 'Perché è una lente'], 0, 'Struttura atomica.', ex),
        mc('extra-radioisotopi', 'γ emesso da un nucleo è:', ['Fotone', 'Protone', 'Neutrone lento obbligato', 'Molecola di acqua'], 0, 'Transizione nucleare.', ex),
        fill('extra-radioisotopi', 'Isotopi hanno stesso ______ atomico.', 'numero', 'Z.', ['Z'], ex),
        mc('extra-radioisotopi', 'Non entra nelle simulazioni ufficiali dell’app:', ['Vero (approfondimento)', 'Falso', 'Solo il sabato', 'Solo in bio'], 0, 'examEligible false.', ex),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-prioni',
      [
        {
          title: 'Proteina PrP',
          body: `I prioni sono agenti infettivi di natura proteica: non portano un genoma proprio di DNA o RNA. La proteina prionica cellulare normale si indica PrPᶜ (cellular); la forma patologica PrPˢᶜ (scrapie / scrapie-like) ha un ripiegamento diverso, ricco di foglietti β, resistente alla proteolisi e propensa ad aggregare. La sequenza può essere la stessa: cambia la conformazione. Malattie associate: scrapie ovina, ESB («mucca pazza»), malattia di Creutzfeldt–Jakob (CJD) umana, e varianti. Fuori dal syllabus Biologia 2026 come capitolo autonomo, ma il concetto è un caso estremo di misfolding collegato a Biologia 3 (proteine, chaperon, qualità). A differenza di un virus, non puoi «sequenziare il genoma del prione»: il messaggio patogeno è la forma 3D della proteina. Prione ≠ virus né batterio Gram. «Infettivo» qui significa capace di propagare il misfolding, non ciclo litico classico. Questo sposta l’attenzione da genoma a struttura–funzione e prepara il ponte verso aggregopatie e controllo di qualità proteica.`,
          formule: ['PrPᶜ = forma cellulare', 'PrPˢᶜ = forma patologica / scrapie', 'nessun NA proprio'],
          esempio:
            'A differenza di un virus, non puoi «sequenziare il genoma del prione»: il messaggio patogeno è la forma 3D della proteina.',
          attenzione:
            'Prione ≠ virus né batterio Gram. «Infettivo» qui significa capace di propagare il misfolding, non ciclo litico classico.',
          approfondisci: [
            'Se vuoi capire anche PrPᶜ vs PrPˢᶜ: stessa sequenza possibile, diversa struttura 3D e proprietà.',
            'Foglietti β e aggregati: la forma patologica è più «appiccicosa» e resistente.',
            'Niente DNA/RNA proprio: non è un virus camuffato.',
            'Collega a bio-3: folding, chaperon, denaturazione e qualità proteica.',
            'Badge 2026: fuori programma come unità, utile come caso estremo di misfolding.',
          ],
        },
        {
          title: 'Propagazione del misfolding',
          body: `Il modello dominante: PrPˢᶜ agisce da stampo e converte PrPᶜ in nuova PrPˢᶜ (template di misfolding). Si formano aggregati e placche che danneggiano il tessuto nervoso. La trasmissione può essere genetica (mutazioni che favoriscono la forma patologica), sporadica, o acquisita (tessuti contaminati, storicamente iatrogena, alimenti in contesti di ESB). Non c’è replicazione di acido nucleico: la «replicazione» è catalisi conformazionale. Questo sposta l’attenzione da genoma a folding — ponte diretto verso aggregopatie e controllo di qualità proteica. Una piccola «semente» di PrPˢᶜ in presenza di PrPᶜ può innescare una reazione a catena di conversione. Non tutte le malattie neurodegenerative sono prioniche in senso stretto; molte condividono però aggregazione e misfolding. Capire la differenza tra «infettività conformazionale» e patogeni con genoma evita classificazioni sbagliate nei quiz di biologia generale. In pratica: chiediti sempre se c’è un genoma proprio o solo una forma 3D che si propaga; nei prioni la seconda risposta è quella corretta.`,
          formule: ['PrPᶜ → PrPˢᶜ (indotta da PrPˢᶜ)', 'propagazione = conversione conformazionale'],
          esempio:
            'Una piccola «semente» di PrPˢᶜ in presenza di PrPᶜ può innescare una reazione a catena di conversione.',
          attenzione:
            'Non tutte le malattie neurodegenerative sono prioniche in senso stretto; molte condividono però aggregazione e misfolding.',
          approfondisci: [
            'Se vuoi capire anche il template: la forma cattiva «insegna» la geometria sbagliata alla forma buona.',
            'Tre vie: genetica, sporadica, acquisita — stesso esito di misfolding, cause diverse.',
            'Niente ciclo litico/lisogenico: non usare il vocabolario dei virus.',
            'Aggregati nel SNC: danno tipicamente neurologico grave.',
            'Ponte concettuale ad altre proteopatie (cenno), senza equipararle tutte ai prioni.',
          ],
        },
        {
          title: 'Collegamento a chaperon e malattie',
          body: `I chaperon molecolari aiutano il folding corretto e limitano aggregati; sistemi di degradazione (proteasoma, autofagia) rimuovono proteine danneggiate. Nei prioni questi sistemi sono aggirati o sopraffatti dalla forma resistente. Studiare i prioni «comunque» serve a fissare: (1) struttura → funzione; (2) misfolding → patologia; (3) differenza concettuale da patogeni con genoma. Badge app: non in programma 2026. Collegamento ufficiale: bio-3 (folding, chaperon, degradazione). Le malattie da prioni sono tipicamente neurodegenerative a carico del SNC, a decorso grave. In bio-3, quando studi ubiquitinazione e risposte a proteine misfoldate, i prioni sono il caso «estremo e infettivo» dello stesso tema. I chaperon non «replicano» prioni: contrastano il misfolding. Non collocare i prioni in fisica dei fluidi o in genetica mendeliana classica come sostituto. Questo approfondimento chiude il cerchio tra struttura proteica e patologia senza pretendere dettagli di neurologia clinica. Messaggio finale: un folding sbagliato può fare danno anche senza un virus dietro.`,
          formule: ['chaperon: folding corretto', 'aggregati: perdita di funzione + tossicità', 'SNC tipicamente colpito'],
          esempio:
            'In bio-3, quando studi ubiquitinazione e risposte a proteine misfoldate, i prioni sono il caso «estremo e infettivo» dello stesso tema.',
          attenzione:
            'I chaperon non «replicano» prioni: contrastano il misfolding. Non collocare i prioni in fisica dei fluidi o in genetica mendeliana classica come sostituto.',
          approfondisci: [
            'Se vuoi capire anche proteasoma/autofagia: vie di smaltimento delle proteine danneggiate.',
            'Forma resistente: sfugge più facilmente a proteolisi e controllo di qualità.',
            'Tre messaggi d’esame (extra): solo proteina, conversione a catena, ponte a bio-3.',
            'SNC: perché i sintomi sono neurologici e gravi.',
            'Non confondere con virus, batteri o proprietà colligative: categoria a sé.',
          ],
        },
      ],
      {
        analogia:
          'Immagina origami: la stessa striscia di carta (stessa sequenza) può diventare una gru bella (PrPᶜ) o un maglione aggrovigliato (PrPˢᶜ). Il maglione cattivo tocca le gru belle e le costringe a diventare maglioni cattivi. Non c’è un libretto di istruzioni DNA dentro il maglione: il contagio è la forma sbagliata che si copia sulla forma giusta.',
        concetti: [
          {
            titolo: 'Solo proteina',
            testo:
              'I prioni non sono virus: non hanno DNA o RNA proprio. Il problema è come è piegata la proteina.',
          },
          {
            titolo: 'Conversione a catena',
            testo:
              'La forma cattiva insegna alla forma buona a piegarsi male. Così il danno si propaga nel tessuto nervoso.',
          },
          {
            titolo: 'Chaperon',
            testo:
              'Sono gli «aiutanti» che di solito fanno piegare bene le proteine. Contro i prioni spesso non bastano.',
          },
          {
            titolo: 'Perché studiarli',
            testo:
              'Anche se fuori programma 2026, ti fanno capire folding, aggregati e malattie del cervello legate alle proteine storte.',
          },
        ],
      },
      [
        mc('extra-prioni', 'I prioni sono tipicamente:', ['Proteine misfoldate infettive', 'Virus a DNA', 'Batteri Gram+', 'RNA catalitici obbligati'], 0, 'Solo proteina.', ex),
        mc('extra-prioni', 'Propagano la patologia:', ['Convertendo PrPC → PrPSc', 'Replicando DNA proprio', 'Usando flagelli', 'Con coniugazione'], 0, 'Template di misfolding.', ex),
        fill('extra-prioni', 'La forma cellulare normale si indica spesso PrP______.', 'C', 'Cellular.', ['c'], ex),
        mc('extra-prioni', 'Collegamento a bio-3:', ['Folding e qualità proteica', 'Solo fluidi', 'Solo Ohm', 'Solo Stevino'], 0, 'Chaperon / aggregati.', ex),
        mc('extra-prioni', 'Nel 2026 i prioni nel syllabus bio sono:', ['Eliminati', 'Unità intera da 2 CFU', 'Obbligo di simulazione', 'Una colligativa'], 0, 'Taglio.', ex),
      ],
      [
        mc('extra-prioni', 'A differenza dei virus, i prioni:', ['Non hanno genoma proprio', 'Hanno sempre caps ide', 'Fanno ciclo litico batterico', 'Sono Gram−'], 0, 'Niente NA.', ex),
        fill('extra-prioni', 'PrPSc è la forma ______.', 'scrapie/patologica', 'Misfoldata.', ['patologica', 'scrapie', 'infettiva'], ex),
        mc('extra-prioni', 'Le malattie da prioni sono tipicamente:', ['Neurodegenerative', 'Solo cutanee banali', 'Solo respiratorie virali classiche', 'Solo osmotiche'], 0, 'SNC.', ex),
        mc('extra-prioni', 'I chaperon in questo contesto:', ['Aiutano il folding corretto (contrasto al misfolding)', 'Replicano prioni', 'Sono isotopi', 'Sono lenti'], 0, 'Qualità proteica.', ex),
        mc('extra-prioni', 'Perché studiarli comunque?', ['Capire aggregazione proteica', 'Perché sono in fisica 3', 'Per sostituire Mendel', 'Per misurare dB'], 0, 'Concetto biomedico.', ex),
        mc('extra-prioni', 'La trasmissione può avvenire anche per:', ['Tessuti contaminati / iatrogena (storicamente)', 'Solo aria come measles classico', 'Solo acqua osmotica', 'Solo luce UV'], 0, 'Contesto storico clinico.', ex),
        fill('extra-prioni', 'Non contengono acido ______ proprio.', 'nucleico', 'DNA/RNA assenti.', ['nucleici'], ex),
        mc('extra-prioni', 'Badge corretto nell’app:', ['non in programma 2026', 'esame obbligatorio', 'CFU 1.75', 'simulazione 31'], 0, 'Approfondimento.', ex),
      ],
    ),
  )

  resetQCounter()
  out.push(
    pack(
      'extra-contesto',
      [
        {
          title: 'Legge di Gauss (cenno)',
          body: `La legge di Gauss afferma che il flusso del campo elettrico attraverso una superficie chiusa è proporzionale alla carica elettrica racchiusa: Φ_E ∝ Q_enc (nel SI Φ_E = Q_enc/ε₀). Non è richiesta come macchina di calcolo nel 2026, ma spiega perché simmetrie (sfera, piano, cilindro) permettono di trovare E «a colpo d’occhio» nei libri. Il flusso conta le linee di campo che escono nette dalla superficie: cariche esterne possono attraversare ma il bilancio netto dipende solo dall’interno. Ponte con Coulomb e con l’idea di campo in Fisica 6. Campo di una sfera carica uniforme fuori dalla sfera: come se tutta la carica fosse al centro — conseguenza di Gauss e simmetria. Gauss non dice che il campo è ovunque lo stesso: dice che il flusso totale dipende da Q interna. Tagliato come calcolo d’esame 2026, resta utile per orientarsi quando un testo parla di «superficie gaussiana» o di simmetria sferica. In sintesi: contabile del campo elettrico, non sostituto di Coulomb in ogni problema.`,
          formule: ['Φ_E = Q_enc / ε₀ (SI)', 'flusso netto ↔ carica interna'],
          esempio:
            'Campo di una sfera carica uniforme fuori dalla sfera: come se tutta la carica fosse al centro — conseguenza di Gauss e simmetria.',
          attenzione:
            'Gauss non dice che il campo è ovunque lo stesso: dice che il flusso totale dipende da Q interna. Tagliato come calcolo d’esame 2026.',
          approfondisci: [
            'Se vuoi capire anche il flusso: «quante linee nette escono» dalla superficie chiusa.',
            'Simmetria alta → |E| costante su pezzi di superficie → E esce dall’integrale.',
            'Cariche esterne: possono attraversare, ma il flusso netto totale dipende solo da Q interna.',
            'Collega a Coulomb: stessa fisica, Gauss è comodo con simmetria.',
            'Nel 2026: cenno culturale, non macchina di calcolo d’esame.',
          ],
        },
        {
          title: 'Biot-Savart (cenno)',
          body: `Biot–Savart dà il campo magnetico dB prodotto da un elementino di corrente Idl: direzione con regola della mano destra, intensità che cade con la distanza. Serve a costruire B di fili, spire, solenoidi partendo dalla corrente. Nel programma 2026 resta più il fatto qualitativo di Oersted (correnti → effetti magnetici) che i calcoli alla Biot–Savart. Tenerlo in mente evita di credere che B «esista solo tra poli di calamite» e collega corrente, campo e forze su cariche in moto (Fisica 6). Filo rettilineo: linee di B circolari intorno al filo — coerente con Biot–Savart integrato e con la regola della mano destra. Non confondere Biot–Savart (genera B da correnti) con Lorentz (forza su carica in B). Entrambi fuori come calcoli pesanti nel taglio 2026. Il messaggio utile: magnetismo e corrente elettrica sono parenti; Oersted in programma è il ponte ufficiale, Biot–Savart è la ricetta completa nei libri. Se incontri la formula in un manuale, riconoscila come «come nasce B», senza doverla integrare all’esame.`,
          formule: ['dB ∝ I dl × r̂ / r² (idea)', 'Oersted: corrente ↔ magnetismo'],
          esempio:
            'Filo rettilineo: linee di B circolari intorno al filo — coerente con Biot–Savart integrato e con la regola della mano destra.',
          attenzione:
            'Non confondere Biot–Savart (genera B da correnti) con Lorentz (forza su carica in B). Entrambi fuori come calcoli pesanti nel taglio 2026.',
          approfondisci: [
            'Se vuoi capire anche la mano destra: pollice lungo I, dita avvolgono il senso di B intorno al filo.',
            'Oersted in programma: corrente → effetti magnetici; Biot–Savart: come calcolare B (extra).',
            'Spira e solenoide: stesse idee integrate, forme diverse di B.',
            'Lorentz ≠ Biot–Savart: una genera B, l’altra dà F su carica in B.',
            'Utile se un libro mostra la formula: riconoscila senza doverla usare all’esame.',
          ],
        },
        {
          title: 'Lenti e microscopio',
          body: `Ottica geometrica: una lente convergente può formare immagini reali (proiettabili) o virtuali (come la lente d’ingrandimento), a seconda delle distanze oggetto–lente. Il microscopio ottico combina lenti (obiettivo + oculare) per ingrandire dettagli cellulari e tissutali: contesto biomedico diretto. Equazione dei punti coniugati e ingrandimento restano utili come lettura qualitativa anche se non sono il cuore del syllabus numerico. In spazi limitati, onde riflesse possono formare onde stazionarie (nodi e ventri): cenno di interferenza utile se compare nei libri, non come capitolo d’esame. Obiettivo del microscopio forma un’immagine intermedia ingrandita; l’oculare la ingrandisce ulteriormente per l’occhio. Lente convergente ≠ «sempre immagine reale». Non confondere ottica del microscopio con Poiseuille o con prioni. Per lo studente di professioni sanitarie, il microscopio è lo strumento quotidiano: sapere che sono lenti in serie evita di trattarlo come «scatola magica» e collega Fisica delle onde/ottica al laboratorio di biologia. Schema mentale: luce piegata → immagine più grande → più dettagli utili in tipizzazione cellulare.`,
          formule: ['1/p + 1/q = 1/f (lenti sottili, segno convenzionale)', 'microscopio: obiettivo + oculare'],
          esempio:
            'Obiettivo del microscopio forma un’immagine intermedia ingrandita; l’oculare la ingrandisce ulteriormente per l’occhio.',
          attenzione:
            'Lente convergente ≠ «sempre immagine reale». Non confondere ottica del microscopio con Poiseuille o con prioni.',
          approfondisci: [
            'Se vuoi capire anche reale vs virtuale: reale si proietta su schermo; virtuale si vede «dietro» la lente.',
            'Obiettivo vicino al campione; oculare vicino all’occhio: due stadi di ingrandimento.',
            '1/p + 1/q = 1/f: cenno; i segni dipendono dalla convenzione del libro.',
            'Onde stazionarie: interferenza di onde opposte → nodi e ventri (extra di contesto).',
            'Collega laboratorio bio: quello che vedi al microscopio passa da ottica geometrica.',
          ],
        },
        {
          title: 'Modulo di Young',
          body: `Il modulo di Young E misura la rigidezza elastica lineare: stress / strain, cioè (F/A) / (ΔL/L₀). Materiali con E alto si allungano poco a parità di sforzo (acciaio vs gomma). In biomedicina dà un linguaggio per ossa, vasi, tessuti deformabili e protesi. Non va confuso con l’esperimento di Young della doppia fenditura (interferenza luminosa): omonimia storica. Scheda di contesto: orientarsi nei libri quando compare «modulo elastico», senza trasformarlo in unità ufficiale CFU. Osso compatto ha E molto maggiore di un tessuto molle: stessa forza su stessa sezione produce allungamento relativo minore. E si misura in pascal (come una pressione), ma non è «la pressione di un liquido»: è un rapporto stress/strain. Young (modulo) ≠ Young (doppia fenditura). Tenere questa scheda evita di restare bloccati su una parola tecnica nei manuali di biomeccanica o di materiali, pur restando fuori dal semaforo d’esame dell’app. In sintesi: E alto = difficile da allungare; E basso = più cedevole, a parità di sezione e forza.`,
          formule: ['E = (F/A) / (ΔL/L₀)', 'unità: Pa (come una pressione)'],
          esempio:
            'Osso compatto ha E molto maggiore di un tessuto molle: stessa forza su stessa sezione produce allungamento relativo minore.',
          attenzione:
            'Young (modulo) ≠ Young (doppia fenditura). E in pascal non è «una pressione statica di un liquido», anche se condivide l’unità.',
          approfondisci: [
            'Se vuoi capire anche stress = F/A e strain = ΔL/L₀: E = stress/strain nel tratto lineare.',
            'E alto → rigido; E basso → più deformabile a parità di stress.',
            'Unità Pa: stessa di pressione, significato diverso (rigidezza, non «peso del fluido»).',
            'Biomedicina: ossa, tendini, vasi, materiali di protesi parlano spesso di E.',
            'Omonimia: doppia fenditura di Young è ottica interferenziale, altro argomento.',
          ],
        },
      ],
      {
        analogia:
          'Gauss è il contabile del campo elettrico: conta quante «frecce» escono da una scatola e dice quanto «carica» c’è dentro. Biot–Savart è la ricetta che dice come una corrente disegna frecce magnetiche intorno a sé. Le lenti sono lupi che piegano i raggi per ingrandire; il modulo di Young dice quanto un materiale è «duro da stirare», come confrontare un elastico e un righello.',
        concetti: [
          {
            titolo: 'Gauss in una frase',
            testo:
              'Il flusso elettrico netto fuori da una superficie chiusa dipende solo dalla carica interna, non da come è sparpagliata fuori.',
          },
          {
            titolo: 'Biot–Savart in una frase',
            testo:
              'Pezi di filo percorso da corrente creano campo magnetico intorno; Oersted ti dice che il magnetismo e la corrente sono parenti.',
          },
          {
            titolo: 'Lenti e microscopio',
            testo:
              'Le lenti piegano la luce. Il microscopio mette più lenti in fila per vedere cose piccolissime, come cellule.',
          },
          {
            titolo: 'Modulo di Young',
            testo:
              'Misura quanto un materiale resiste all’allungamento elastico. Alto = rigido; basso = più «gommoso».',
          },
        ],
      },
      [
        mc('extra-contesto', 'La legge di Gauss collega flusso elettrico a:', ['Carica interna', 'Solo massa', 'Solo temperatura', 'Solo dB'], 0, 'Φ_E ∝ Q_enc.', ex),
        mc('extra-contesto', 'Biot-Savart serve a:', ['Calcolare B da correnti', 'Misurare pH', 'Contare codon', 'Trovare Kps'], 0, 'Magnetostatica.', ex),
        fill('extra-contesto', 'Il modulo di Young misura la ______ di un materiale.', 'rigidezza', 'Stress/strain elastico.', ['elasticita', 'elasticità', 'stiffness'], ex),
        mc('extra-contesto', 'Un microscopio ottico usa tipicamente:', ['Lenti', 'Solo Poiseuille', 'Solo tamponi', 'Solo prioni'], 0, 'Ottica geometrica.', ex),
        mc('extra-contesto', 'Queste schede nell’app sono:', ['Contesto breve, non d’esame', 'Simulazioni da 31', 'Unità ufficiali CFU', 'Semaforo principale'], 0, 'Approfondimento.', ex),
      ],
      [
        mc('extra-contesto', 'Un’onda stazionaria nasce da:', ['Interferenza di onde opposte', 'Solo osmosi', 'Solo Fenton', 'Solo Mendel'], 0, 'Nodi e ventri.', ex),
        fill('extra-contesto', 'Gauss e Biot-Savart nel 2026 sono stati ______ dal programma di calcolo.', 'rimossi', 'Tagliati.', ['tolti', 'eliminati', 'tagliati'], ex),
        mc('extra-contesto', 'Young (modulo) non va confuso con:', ['Esperimenti a doppia fenditura (altro Young)', 'La densità', 'Il pascal', 'Il joule'], 0, 'Omonimia storica.', ex),
        mc('extra-contesto', 'Perché tenerli?', ['Orientarsi se li incontri nei libri', 'Perché sono colligative', 'Perché sono virus', 'Perché sono tamponi'], 0, 'Cultura scientifica minima.', ex),
        mc('extra-contesto', 'Oersted (in programma) mostra che:', ['Correnti generano effetti magnetici', 'Il pH crea B', 'Il DNA è magnetico', 'I fluidi sono cariche'], 0, 'Ponte con il programma.', ex),
        mc('extra-contesto', 'Una lente convergente può:', ['Formare immagini reali o virtuali', 'Solo assorbire α', 'Solo misurare π', 'Solo fare splicing'], 0, 'Ottica.', ex),
        fill('extra-contesto', 'Il flusso elettrico attraverso una superficie chiusa dipende dalla carica ______.', 'interna', 'Gauss.', ['racchiusa', 'enclosed'], ex),
        mc('extra-contesto', 'Non entra nel semaforo d’esame:', ['Corretto', 'Falso', 'Solo se verde', 'Solo il lunedì'], 0, 'Sezione dedicata.', ex),
      ],
    ),
  )

  return out
}
