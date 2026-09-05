import { useEffect, useMemo, useState } from 'react'
import { getExamQuestions } from '../data/content'
import { pickQuestions } from '../components/QuizPlayer'
import { useProgress } from '../state/ProgressContext'
import type { Question } from '../types'
import { isAnswerCorrect } from '../data/quizHelpers'

const EXAM_N = 31
const EXAM_MINUTES = 50

export function SimulazionePage() {
  const { addSimulation, progress } = useProgress()
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<(string | number | null)[]>([])
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(EXAM_MINUTES * 60)
  const [questions, setQuestions] = useState<Question[]>([])

  const scored = useMemo(() => {
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
  }, [answers, questions])

  useEffect(() => {
    if (!started || done) return
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setDone(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [started, done])

  function start() {
    const pool = getExamQuestions()
    const qs = pickQuestions(pool, EXAM_N)
    setQuestions(qs)
    setAnswers(qs.map(() => null))
    setIndex(0)
    setStarted(true)
    setDone(false)
    setSecondsLeft(EXAM_MINUTES * 60)
  }

  if (!started) {
    return (
      <div className="page">
        <h1>Simulazione d’esame</h1>
        <p className="muted">
          Formato ufficiale: {EXAM_N} domande, {EXAM_MINUTES} minuti. Punteggio +1 / −0,1 / 0. Solo
          programma 2026 (niente approfondimenti).
        </p>
        <button type="button" className="btn primary" onClick={start}>
          Inizia simulazione
        </button>
        {progress.simulationScores.length > 0 && (
          <section className="card" style={{ marginTop: '1.5rem' }}>
            <h3>Storico simulazioni</h3>
            <ul className="history">
              {[...progress.simulationScores].reverse().map((s, i) => (
                <li key={i}>
                  {new Date(s.date).toLocaleString('it-IT')}: {s.score}/{s.max}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  if (done) {
    return (
      <div className="page">
        <div className="card result-card">
          <h2>Simulazione terminata</h2>
          <p className="score-big">{scored.points}</p>
          <p className="muted">
            Corrette {scored.correct} · Errate {scored.wrong} · Non date {scored.blank} (max {EXAM_N})
          </p>
          <p className="muted">Soglia utile in graduatoria: almeno 18/30 in sede d’esame ufficiale.</p>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              addSimulation(scored.points, EXAM_N)
              setStarted(false)
            }}
          >
            Salva risultato
          </button>
        </div>
      </div>
    )
  }

  const q = questions[index]!
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const current = answers[index]

  return (
    <div className="page">
      <div className="exam-bar">
        <span>
          Domanda {index + 1}/{EXAM_N}
        </span>
        <span className={`timer ${secondsLeft < 300 ? 'urgent' : ''}`}>
          {mm}:{ss}
        </span>
        <button type="button" className="btn" onClick={() => setDone(true)}>
          Termina
        </button>
      </div>
      <div className="card quiz-card">
        <p className="quiz-prompt">{q.prompt}</p>
        {q.type === 'multipla' && q.options && (
          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className={`option ${current === i ? 'selected' : ''}`}>
                <input
                  type="radio"
                  checked={current === i}
                  onChange={() => {
                    const next = [...answers]
                    next[index] = i
                    setAnswers(next)
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
        {q.type === 'completamento' && (
          <input
            className="text-input"
            value={current === null ? '' : String(current)}
            onChange={(e) => {
              const next = [...answers]
              next[index] = e.target.value
              setAnswers(next)
            }}
          />
        )}
        <div className="row gap">
          <button type="button" className="btn" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            Indietro
          </button>
          {index + 1 < EXAM_N ? (
            <button type="button" className="btn primary" onClick={() => setIndex(index + 1)}>
              Avanti
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => setDone(true)}>
              Consegna
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
