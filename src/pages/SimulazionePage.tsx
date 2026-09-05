import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isAnswerCorrect } from '../data/quizHelpers'
import {
  BREAK_MINUTES,
  PROVA_MINUTES,
  PROVA_N,
  SIM_META,
  SIM_ORDER,
  buildSimulazioneDay,
  materiaLabelIt,
  type SimId,
} from '../data/simulazioni'
import { useProgress } from '../state/ProgressContext'
import type { Materia, Question } from '../types'

type Phase =
  | { kind: 'lobby' }
  | { kind: 'prova'; materiaIndex: number }
  | { kind: 'break'; afterIndex: number }
  | { kind: 'done' }

function isSimId(v: string | null): v is SimId {
  return v === 'sim-1' || v === 'sim-2'
}

function scorePaper(questions: Question[], answers: (string | number | null)[]) {
  let points = 0
  let correct = 0
  let wrong = 0
  let blank = 0
  questions.forEach((q, i) => {
    const a = answers[i]
    if (a === null || a === '') {
      blank++
      return
    }
    if (isAnswerCorrect(q, a)) {
      points += 1
      correct++
    } else {
      points -= 0.1
      wrong++
    }
  })
  return { points: Math.round(points * 10) / 10, correct, wrong, blank }
}

export function SimulazionePage() {
  const { addSimulation, progress } = useProgress()
  const [params, setParams] = useSearchParams()
  const initialSim = isSimId(params.get('id')) ? (params.get('id') as SimId) : 'sim-1'
  const [simId, setSimId] = useState<SimId>(initialSim)
  const [phase, setPhase] = useState<Phase>({ kind: 'lobby' })
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const [papers, setPapers] = useState<Record<Materia, Question[]> | null>(null)
  const [answersByMateria, setAnswersByMateria] = useState<
    Record<Materia, (string | number | null)[]>
  >({ chimica: [], fisica: [], biologia: [] })
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(PROVA_MINUTES * 60)

  const currentMateria =
    phase.kind === 'prova' ? SIM_ORDER[phase.materiaIndex]! : null
  const questions = currentMateria && papers ? papers[currentMateria] : []
  const answers = currentMateria ? answersByMateria[currentMateria] : []

  const scores = useMemo(() => {
    if (!papers) return null
    const byMateria = {
      chimica: scorePaper(papers.chimica, answersByMateria.chimica).points,
      fisica: scorePaper(papers.fisica, answersByMateria.fisica).points,
      biologia: scorePaper(papers.biologia, answersByMateria.biologia).points,
    }
    const total = Math.round((byMateria.chimica + byMateria.fisica + byMateria.biologia) * 10) / 10
    return { byMateria, total, max: PROVA_N * 3 }
  }, [papers, answersByMateria])

  function finishProva(materiaIndex: number) {
    if (materiaIndex >= SIM_ORDER.length - 1) {
      setPhase({ kind: 'done' })
      return
    }
    setSecondsLeft(BREAK_MINUTES * 60)
    setPhase({ kind: 'break', afterIndex: materiaIndex })
  }

  function startProva(materiaIndex: number) {
    setIndex(0)
    setSecondsLeft(PROVA_MINUTES * 60)
    setPhase({ kind: 'prova', materiaIndex })
  }

  useEffect(() => {
    if (phase.kind !== 'prova' && phase.kind !== 'break') return
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1
        const p = phaseRef.current
        window.setTimeout(() => {
          if (p.kind === 'prova') finishProva(p.materiaIndex)
          else if (p.kind === 'break') startProva(p.afterIndex + 1)
        }, 0)
        return 0
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase])

  function startDay(id: SimId) {
    const day = buildSimulazioneDay(id)
    setPapers(day)
    setAnswersByMateria({
      chimica: day.chimica.map(() => null),
      fisica: day.fisica.map(() => null),
      biologia: day.biologia.map(() => null),
    })
    setSimId(id)
    setParams({ id })
    setIndex(0)
    setSecondsLeft(PROVA_MINUTES * 60)
    setPhase({ kind: 'prova', materiaIndex: 0 })
  }

  function setAnswer(value: string | number | null) {
    if (!currentMateria) return
    setAnswersByMateria((prev) => {
      const next = { ...prev, [currentMateria]: [...prev[currentMateria]] }
      next[currentMateria][index] = value
      return next
    })
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  if (phase.kind === 'lobby') {
    return (
      <div className="page">
        <h1>Simulazione d’esame</h1>
        <p className="muted">
          Giornata completa: 3 prove (Chimica → Fisica → Biologia). Ogni prova {PROVA_N} domande (21
          multipla + 10 completamento), {PROVA_MINUTES} minuti. Intervallo di {BREAK_MINUTES} minuti
          tra le prove. Punteggio +1 / −0,1 / 0. Solo programma 2026.
        </p>
        <div className="row gap" style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
          {(Object.keys(SIM_META) as SimId[]).map((id) => (
            <button key={id} type="button" className="btn primary" onClick={() => startDay(id)}>
              Inizia {SIM_META[id].titolo}
            </button>
          ))}
        </div>
        <ul className="muted" style={{ marginTop: '1rem' }}>
          <li>{SIM_META['sim-1'].descrizione}</li>
          <li>{SIM_META['sim-2'].descrizione}</li>
        </ul>
        {progress.simulationScores.length > 0 && (
          <section className="card" style={{ marginTop: '1.5rem' }}>
            <h3>Storico simulazioni</h3>
            <ul className="history">
              {[...progress.simulationScores].reverse().map((s, i) => (
                <li key={i}>
                  {new Date(s.date).toLocaleString('it-IT')}
                  {s.simId ? ` · ${SIM_META[s.simId as SimId]?.titolo ?? s.simId}` : ''}: {s.score}/
                  {s.max}
                  {s.byMateria
                    ? ` (C ${s.byMateria.chimica} · F ${s.byMateria.fisica} · B ${s.byMateria.biologia})`
                    : ''}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  if (phase.kind === 'break') {
    const next = SIM_ORDER[phase.afterIndex + 1]!
    return (
      <div className="page">
        <div className="card result-card">
          <h2>Intervallo</h2>
          <p className="score-big">
            {mm}:{ss}
          </p>
          <p className="muted">
            Prossima prova: {materiaLabelIt(next)}. Puoi riposare o saltare l’intervallo.
          </p>
          <button
            type="button"
            className="btn primary"
            onClick={() => startProva(phase.afterIndex + 1)}
          >
            Salta intervallo — inizia {materiaLabelIt(next)}
          </button>
        </div>
      </div>
    )
  }

  if (phase.kind === 'done' && scores) {
    return (
      <div className="page">
        <div className="card result-card">
          <h2>{SIM_META[simId].titolo} terminata</h2>
          <p className="score-big">{scores.total}</p>
          <p className="muted">Max {scores.max} (31 × 3 prove)</p>
          <ul>
            <li>Chimica: {scores.byMateria.chimica}</li>
            <li>Fisica: {scores.byMateria.fisica}</li>
            <li>Biologia: {scores.byMateria.biologia}</li>
          </ul>
          <p className="muted">
            Soglia utile in graduatoria ufficiale: spesso si ragiona per prova (~18/30).
          </p>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              addSimulation(scores.total, scores.max, simId, scores.byMateria)
              setPhase({ kind: 'lobby' })
              setPapers(null)
            }}
          >
            Salva risultato
          </button>
        </div>
      </div>
    )
  }

  const q = questions[index]
  if (!q || !currentMateria) return null
  const current = answers[index]
  const materiaIndex = phase.kind === 'prova' ? phase.materiaIndex : 0

  return (
    <div className="page">
      <div className="exam-bar">
        <span>
          {materiaLabelIt(currentMateria)} · Domanda {index + 1}/{PROVA_N}
        </span>
        <span className={`timer ${secondsLeft < 300 ? 'urgent' : ''}`}>
          {mm}:{ss}
        </span>
        <button type="button" className="btn" onClick={() => finishProva(materiaIndex)}>
          Consegna prova
        </button>
      </div>
      <div className="card quiz-card">
        <p className="quiz-prompt">{q.prompt}</p>
        {q.type === 'multipla' && q.options && (
          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className={`option ${current === i ? 'selected' : ''}`}>
                <input type="radio" checked={current === i} onChange={() => setAnswer(i)} />
                {opt}
              </label>
            ))}
          </div>
        )}
        {q.type === 'completamento' && (
          <input
            className="text-input"
            value={current === null ? '' : String(current)}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
        <div className="row gap">
          <button type="button" className="btn" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            Indietro
          </button>
          {index + 1 < PROVA_N ? (
            <button type="button" className="btn primary" onClick={() => setIndex(index + 1)}>
              Avanti
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => finishProva(materiaIndex)}>
              Consegna prova
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
