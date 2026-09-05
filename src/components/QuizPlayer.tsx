import { useMemo, useState } from 'react'
import type { Question } from '../types'
import { isAnswerCorrect } from '../data/quizHelpers'

interface Props {
  questions: Question[]
  title: string
  onComplete: (score: number, total: number) => void
  showExplanations?: boolean
  completeLabel?: string
}

export function QuizPlayer({
  questions,
  title,
  onComplete,
  showExplanations = true,
  completeLabel = 'Salva e continua',
}: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | number | null)[]>(
    () => questions.map(() => null),
  )
  const [checked, setChecked] = useState(false)
  const [finished, setFinished] = useState(false)

  const q = questions[index]
  const score = useMemo(() => {
    let s = 0
    questions.forEach((qq, i) => {
      const a = answers[i]
      if (a !== null && isAnswerCorrect(qq, a)) s++
    })
    return s
  }, [answers, questions])

  if (!q) return null

  if (finished) {
    return (
      <div className="card result-card">
        <h2>Risultato</h2>
        <p className="score-big">
          {score}/{questions.length}
        </p>
        <p className="muted">
          {score === 5
            ? 'Perfetto — codice verde.'
            : score >= 3
              ? 'Quasi — codice giallo.'
              : 'Da riprendere — codice rosso.'}
        </p>
        <button type="button" className="btn primary" onClick={() => onComplete(score, questions.length)}>
          {completeLabel}
        </button>
      </div>
    )
  }

  const current = answers[index]
  const isCorrect =
    checked && current !== null ? isAnswerCorrect(q, current) : null

  return (
    <div className="card quiz-card">
      <div className="quiz-meta">
        <h2>{title}</h2>
        <span>
          Domanda {index + 1}/{questions.length}
        </span>
      </div>
      <p className="quiz-prompt">{q.prompt}</p>
      {q.type === 'multipla' && q.options && (
        <div className="options">
          {q.options.map((opt, i) => (
            <label key={i} className={`option ${current === i ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`q-${q.id}`}
                disabled={checked}
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
          disabled={checked}
          value={current === null ? '' : String(current)}
          placeholder="Scrivi la risposta…"
          onChange={(e) => {
            const next = [...answers]
            next[index] = e.target.value
            setAnswers(next)
          }}
        />
      )}
      {checked && showExplanations && (
        <div className={`explain ${isCorrect ? 'ok' : 'ko'}`}>
          <strong>{isCorrect ? 'Corretto' : 'Non corretto'}.</strong> {q.explanation}
          {!isCorrect && q.type === 'completamento' && (
            <span> Risposta attesa: {String(q.answer)}</span>
          )}
        </div>
      )}
      <div className="row gap">
        {!checked ? (
          <button
            type="button"
            className="btn primary"
            disabled={current === null || current === ''}
            onClick={() => setChecked(true)}
          >
            Controlla
          </button>
        ) : (
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              if (index + 1 >= questions.length) {
                setFinished(true)
              } else {
                setIndex(index + 1)
                setChecked(false)
              }
            }}
          >
            {index + 1 >= questions.length ? 'Vedi risultato' : 'Avanti'}
          </button>
        )}
      </div>
    </div>
  )
}

/** Pesca n domande diverse, mescolate */
export function pickQuestions(pool: Question[], n: number, excludeIds: string[] = []): Question[] {
  const avail = pool.filter((q) => !excludeIds.includes(q.id))
  const shuffled = [...avail].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}
