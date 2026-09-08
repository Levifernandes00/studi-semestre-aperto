import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '../types'
import { isAnswerCorrect } from '../data/quizHelpers'
import { scoreToColore } from '../lib/semaforo'

interface Props {
  questions: Question[]
  title: string
  onComplete: (score: number, total: number) => void
  showExplanations?: boolean
  completeLabel?: string
  initialAnswers?: (string | number | null)[]
  initialIndex?: number
  /** Estratti di teoria della cartella, mostrati dopo un errore */
  theoryHints?: string[]
  /** Chiamato a ogni cambio di risposte/indice (per persistenza esercizi) */
  onProgress?: (answers: (string | number | null)[], index: number) => void
}

export function QuizPlayer({
  questions,
  title,
  onComplete,
  showExplanations = true,
  completeLabel = 'Salva e continua',
  initialAnswers,
  initialIndex = 0,
  theoryHints,
  onProgress,
}: Props) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, questions.length - 1)),
  )
  const [answers, setAnswers] = useState<(string | number | null)[]>(() => {
    if (initialAnswers && initialAnswers.length === questions.length) return [...initialAnswers]
    return questions.map(() => null)
  })
  const [checked, setChecked] = useState(false)
  const [finished, setFinished] = useState(false)
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress
  const skipFirstProgress = useRef(
    Boolean(initialAnswers && initialAnswers.length === questions.length),
  )

  useEffect(() => {
    if (skipFirstProgress.current) {
      skipFirstProgress.current = false
      return
    }
    onProgressRef.current?.(answers, index)
  }, [answers, index])

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
    const colore = scoreToColore(score, questions.length)
    const msg =
      colore === 'verde'
        ? score === questions.length
          ? 'Perfetto — codice verde.'
          : 'Ottimo — codice verde.'
        : colore === 'giallo'
          ? 'Quasi — codice giallo.'
          : 'Da riprendere — codice rosso.'
    return (
      <div className="card result-card">
        <h2>Risultato</h2>
        <p className="score-big">
          {score}/{questions.length}
        </p>
        <p className="muted">{msg}</p>
        <button type="button" className="btn primary" onClick={() => onComplete(score, questions.length)}>
          {completeLabel}
        </button>
      </div>
    )
  }

  const current = answers[index]
  const isCorrect =
    checked && current !== null ? isAnswerCorrect(q, current) : null
  const correctOptionText =
    q.type === 'multipla' && q.options && typeof q.answer === 'number'
      ? q.options[q.answer]
      : null
  const chosenOptionText =
    q.type === 'multipla' && q.options && typeof current === 'number' ? q.options[current] : null
  const deepenHints =
    checked && isCorrect === false && theoryHints && theoryHints.length > 0 ? theoryHints : null

  function setAnswerAt(value: string | number | null) {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
  }

  function optionClass(i: number): string {
    const classes = ['option']
    if (current === i) classes.push('selected')
    if (checked && showExplanations) {
      if (typeof q.answer === 'number' && i === q.answer) classes.push('right')
      else if (current === i && isCorrect === false) classes.push('wrong')
    }
    return classes.join(' ')
  }

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
            <label key={i} className={optionClass(i)}>
              <input
                type="radio"
                name={`q-${q.id}`}
                disabled={checked}
                checked={current === i}
                onChange={() => setAnswerAt(i)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
      {q.type === 'completamento' && (
        <input
          className={`text-input${checked && isCorrect === false ? ' wrong' : ''}${checked && isCorrect ? ' right' : ''}`}
          disabled={checked}
          value={current === null ? '' : String(current)}
          placeholder="Scrivi la risposta…"
          onChange={(e) => setAnswerAt(e.target.value)}
        />
      )}
      {checked && showExplanations && (
        <div className={`explain ${isCorrect ? 'ok' : 'ko'}`}>
          <strong>{isCorrect ? 'Corretto' : 'Non corretto'}.</strong>
          {!isCorrect && q.type === 'multipla' && chosenOptionText != null && (
            <p className="explain-answer">Hai scelto: {chosenOptionText}</p>
          )}
          {!isCorrect && q.type === 'completamento' && current != null && current !== '' && (
            <p className="explain-answer">Hai scritto: {String(current)}</p>
          )}
          {!isCorrect && correctOptionText != null && (
            <p className="explain-answer">Risposta corretta: {correctOptionText}</p>
          )}
          {!isCorrect && q.type === 'completamento' && (
            <p className="explain-answer">Risposta corretta: {String(q.answer)}</p>
          )}
          <p className="explain-body">{q.explanation}</p>
          {deepenHints && (
            <div className="explain-deepen">
              <p className="explain-deepen-title">Dal ripasso di questa cartella</p>
              {deepenHints.map((hint, i) => (
                <p key={i} className="explain-deepen-body">
                  {hint}
                </p>
              ))}
            </div>
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
