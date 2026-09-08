import type { PerCapireMeglio, Question, TheorySection, UnitaContent } from '../../types'
import { getArgomentiOf, getUnita } from '../unita'
import { fill, mc, resetQCounter } from '../quizHelpers'
import { topicsFor } from './edisesTopicMap'
import { getBankEsercizi, getBankVerifica } from './banks'

function expandTheory(base: TheorySection | undefined, argId: string, titolo: string): TheorySection[] {
  const topics = topicsFor(argId)
  const core: TheorySection = base
    ? {
        ...base,
        title: base.title || titolo,
        body:
          base.body +
          ` In questa cartella ci concentriamo solo su «${titolo}»: studia definizioni, relazioni e trappole tipiche senza mischiare gli altri argomenti della stessa unità MUR.`,
      }
    : {
        title: titolo,
        body: `Questo argomento («${titolo}») è una cartella autonoma dell’unità MUR. Parte dalle definizioni, collega le relazioni quantitative e chiude con applicazioni e trappole d’esame.`,
      }

  const metodo: TheorySection = {
    title: 'Metodo e relazioni chiave',
    body: `Per «${titolo}» procedi così: (1) elenca le grandezze in gioco e le unità SI; (2) scrivi le relazioni tipiche; (3) controlla i limiti di validità; (4) collega un esempio biomedico o di laboratorio. Nodi da dominare: ${topics.join('; ')}.`,
    formule: core.formule,
    attenzione: core.attenzione ?? 'Non mescolare formule di argomenti fratelli della stessa unità senza verificarne le ipotesi.',
    approfondisci: topics.map((t) => `Ripassa: ${t}`),
  }

  const esame: TheorySection = {
    title: 'Applicazioni e trappole d’esame',
    body: `Nei quiz e in simulazione su «${titolo}» conta riconoscere il modello giusto prima di calcolare. Confronta sempre le ipotesi (ideale/reale, costante/variabile, isolato/non isolato). Un errore frequente è usare una formula corretta ma fuori contesto.`,
    esempio: core.esempio ?? `Collega «${titolo}» a un caso clinico o di laboratorio che conosci dal syllabus.`,
    attenzione: 'Se due risposte sembrano vere, chiediti quale grandezza è tenuta costante nel testo.',
    approfondisci: [
      'Fai 2–3 esercizi numerici e 2 qualitativi sullo stesso concetto.',
      'Spiega l’argomento a voce come a un collega del primo anno.',
    ],
  }

  return [core, metodo, esame]
}

function expandPerCapire(parent: PerCapireMeglio, titolo: string): PerCapireMeglio {
  return {
    analogia: `${parent.analogia} Ora zoomiamo solo su «${titolo}».`,
    concetti: [
      {
        titolo: `Cos’è ${titolo}`,
        testo: `In parole semplici: è il pezzo del programma che spiega ${titolo.toLowerCase()}. Prima le idee, poi i numeri.`,
      },
      ...parent.concetti.slice(0, 2),
    ],
  }
}

function chunk<T>(arr: T[], parts: number, index: number): T[] {
  if (parts <= 0) return []
  const size = Math.ceil(arr.length / parts)
  return arr.slice(index * size, index * size + size)
}

function remapIds(qs: Question[], newUnitaId: string): Question[] {
  return qs.map((q, i) => ({
    ...q,
    id: `${newUnitaId}-p${i + 1}-${q.id.split('-').pop() ?? i}`,
  }))
}

function padDiagnostico(argId: string, titolo: string, pool: Question[]): Question[] {
  resetQCounter()
  const base = [...pool]
  const fillers: Question[] = [
    mc(argId, `Quale affermazione è più centrale per «${titolo}»?`, [
      'Conoscere definizioni, relazioni e limiti di validità',
      'Memorizzare solo date storiche',
      'Ignorare le unità di misura',
      'Usare sempre la stessa formula di un altro argomento',
    ], 0, 'Serve padronanza mirata dell’argomento.'),
    fill(argId, `Questa cartella studia in modo dedicato: ______.`, titolo, 'Titolo dell’argomento.'),
    mc(argId, 'In simulazione, le domande su questo tema sono:', [
      'Escluse dal programma',
      'Parte del programma ufficiale se examEligible',
      'Solo per approfondimenti',
      'Solo orali',
    ], 1, 'Gli argomenti ufficiali entrano nel pool d’esame.'),
  ]
  while (base.length < 5) base.push(fillers[base.length % fillers.length]!)
  return remapIds(base.slice(0, 5), argId)
}

function padEsercizi(argId: string, pool: Question[], min = 12): Question[] {
  const out = remapIds(pool, argId)
  resetQCounter()
  let n = 0
  while (out.length < min) {
    n++
    out.push(
      mc(
        argId,
        `(Esercizio ${n}) Su questo argomento, il primo passo utile è:`,
        [
          'Identificare grandezze e ipotesi del modello',
          'Scegliere a caso una formula',
          'Ignorare le unità',
          'Saltare alla verifica senza teoria',
        ],
        0,
        'Metodo prima del calcolo.',
      ),
    )
    out[out.length - 1]!.id = `${argId}-pad-ex${n}`
  }
  return out.slice(0, Math.max(min, Math.min(15, out.length)))
}

function padVerifica(argId: string, pool: Question[], min = 10): Question[] {
  const out = remapIds(pool, argId)
  resetQCounter()
  let n = 0
  while (out.length < min) {
    n++
    out.push(
      mc(
        argId,
        `(Verifica ${n}) Una domanda più dura sullo stesso tema tipicamente richiede:`,
        [
          'Più passaggi o distrattori più plausibili',
          'Solo memorizzare il titolo della cartella',
          'Rispondere senza leggere il testo',
          'Usare solo approfondimenti extra-*',
        ],
        0,
        'La verifica è una variante più impegnativa.',
      ),
    )
    out[out.length - 1]!.id = `${argId}-pad-vf${n}`
  }
  return out.slice(0, min)
}

/** Spezza un pack unità MUR in N pack argomento */
export function expandParentToArgomenti(parent: UnitaContent): UnitaContent[] {
  if (parent.unitaId.startsWith('extra-')) return [parent]
  const kids = getArgomentiOf(parent.unitaId)
  if (!kids.length) return [parent]

  const n = kids.length
  const bankEx = getBankEsercizi(parent.unitaId)
  const bankVf = getBankVerifica(parent.unitaId)
  const allParentQs = [...parent.diagnostico, ...parent.esercizi]

  return kids.map((kid, i) => {
    const section = parent.theory[i] ?? parent.theory[0]
    const theory = expandTheory(section, kid.id, kid.titolo)
    const diagPool = chunk(allParentQs, n, i).slice(0, 5)
    const exPool = [
      ...chunk(parent.esercizi, n, i),
      ...chunk(bankEx, n, i),
    ]
    const vfPool = [
      ...chunk(parent.verifica?.length ? parent.verifica : bankVf, n, i),
      ...chunk(bankVf, n, i),
    ]
    const figure = parent.figure?.filter((f) => {
      const sec = parent.theory[i]
      return sec?.figureIds?.includes(f.id) || i === 0
    })

    return {
      unitaId: kid.id,
      theory,
      perCapireMeglio: expandPerCapire(parent.perCapireMeglio, kid.titolo),
      diagnostico: padDiagnostico(kid.id, kid.titolo, diagPool),
      esercizi: padEsercizi(kid.id, exPool, 12),
      verifica: padVerifica(kid.id, vfPool, 10),
      figure: figure?.length ? figure : parent.figure?.slice(0, 1),
      video: parent.video,
      riferimenti: [
        ...(parent.riferimenti ?? []),
        {
          label: `Unità MUR ${kid.numero}`,
          detail: getUnita(kid.parentUnitaId!)?.titolo,
        },
      ],
    } satisfies UnitaContent
  })
}

export function expandAllParents(parents: UnitaContent[]): UnitaContent[] {
  return parents.flatMap(expandParentToArgomenti)
}
