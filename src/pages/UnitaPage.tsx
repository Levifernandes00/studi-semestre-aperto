import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getContent } from '../data/content'
import { getUnita, materiaLabel } from '../data/unita'
import { pickQuestions, QuizPlayer } from '../components/QuizPlayer'
import { ArgomentiCorrelati } from '../components/ArgomentiCorrelati'
import { TheoryFigureView } from '../components/theory/TheoryFigure'
import { VideoAula } from '../components/theory/VideoAula'
import { useProgress } from '../state/ProgressContext'
import { coloreLabel } from '../lib/semaforo'
import type { TheoryFigure } from '../types'

type StudioTab = 'teoria' | 'capire' | 'esercizi' | 'verifica'

function hasTriageDone(attempts: { kind: string }[] | undefined, colore?: string) {
  if (attempts?.some((a) => a.kind === 'diagnostico')) return true
  if (colore && colore !== 'grigio') return true
  return false
}

export function UnitaPage() {
  const { id } = useParams()
  const unita = id ? getUnita(id) : undefined
  const content = id ? getContent(id) : undefined
  const { progress, markTheory, recordQuiz, addEserciziDone } = useProgress()
  const st = id ? progress.unita[id] : undefined

  const triaged = hasTriageDone(st?.attempts, st?.colore)
  const [forceTriage, setForceTriage] = useState(false)
  const [studioUnlocked, setStudioUnlocked] = useState(false)
  const [tab, setTab] = useState<StudioTab>('teoria')
  const [quizKey, setQuizKey] = useState(0)

  // Reset local UI when navigating between units
  useEffect(() => {
    setForceTriage(false)
    setStudioUnlocked(false)
    setTab('teoria')
    setQuizKey(0)
  }, [id])

  const inTriage = (!triaged && !studioUnlocked) || forceTriage

  const diagnosticoQs = useMemo(() => {
    if (!content) return []
    return content.diagnostico.slice(0, 5)
  }, [content])

  const verificaQs = useMemo(() => {
    if (!content) return []
    const pool = [...content.esercizi, ...content.diagnostico]
    return pickQuestions(pool, 5, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, quizKey])

  const eserciziQs = useMemo(() => content?.esercizi ?? [], [content])

  if (!unita || !content) {
    return (
      <div className="page">
        <p>Unità non trovata.</p>
        <Link to="/">Torna al triage</Link>
      </div>
    )
  }

  if (inTriage) {
    return (
      <div className="page triage-gate">
        <div className="page-header">
          <div>
            <Link to="/" className="back">
              ← Triage
            </Link>
            <p className="triage-kicker">Triage iniziale · 5 domande</p>
            <h1>
              {!unita.approfondimento && `${unita.numero}. `}
              {unita.titolo}
            </h1>
            <p className="muted">
              <span className={`tag mat-${unita.materia}`}>{materiaLabel(unita.materia)}</span>{' '}
              {unita.approfondimento ? (
                <span className="badge warn">{unita.badge}</span>
              ) : (
                <span>{unita.cfu} CFU</span>
              )}
            </p>
            <p className="card tip triage-intro">
              Come in pronto soccorso: prima valutiamo quanto conosci l’argomento. Il risultato
              assegna un codice (rosso / giallo / verde) e apre lo studio.
            </p>
          </div>
        </div>
        <QuizPlayer
          key={`triage-${id}-${quizKey}`}
          title="Triage"
          questions={diagnosticoQs}
          completeLabel="Salva e apri lo studio"
          onComplete={(score, total) => {
            recordQuiz(unita.id, score, total, 'diagnostico', true)
            setStudioUnlocked(true)
            setForceTriage(false)
            setTab('teoria')
            setQuizKey((x) => x + 1)
          }}
        />
        {forceTriage && triaged && (
          <button
            type="button"
            className="btn"
            onClick={() => setForceTriage(false)}
          >
            Annulla e torna allo studio
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="page">
      <div className="chart-header card chart-file">
        <div className="chart-file-main">
          <Link to="/" className="back">
            ← Triage
          </Link>
          <div className="chart-meta-row">
            <span className={`code-pill code-${st?.colore ?? 'grigio'}`}>
              {coloreLabel(st?.colore ?? 'grigio')}
            </span>
            {typeof st?.lastScore === 'number' && (
              <span className="muted small">Ultimo triage: {st.lastScore}/5</span>
            )}
          </div>
          <h1>
            {!unita.approfondimento && `${unita.numero}. `}
            {unita.titolo}
          </h1>
          <p className="muted">
            <span className={`tag mat-${unita.materia}`}>{materiaLabel(unita.materia)}</span>{' '}
            {unita.approfondimento ? (
              <span className="badge warn">{unita.badge}</span>
            ) : (
              <span>{unita.cfu} CFU</span>
            )}
          </p>
        </div>
        <div className="chart-actions">
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              setForceTriage(true)
              setQuizKey((x) => x + 1)
            }}
          >
            Rifai triage
          </button>
        </div>
      </div>

      <div className="tabs">
        {(
          [
            ['teoria', 'Teoria'],
            ['capire', 'Per capire meglio'],
            ['esercizi', 'Esercizi'],
            ['verifica', 'Verifica'],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={`tab ${tab === k ? 'active' : ''}`}
            onClick={() => {
              setTab(k)
              if (k === 'verifica') setQuizKey((x) => x + 1)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'teoria' && (
        <div className="stack notebook">
          <header className="notebook-head card">
            <p className="triage-kicker">Quaderno di studio</p>
            <h2>
              {!unita.approfondimento && `${unita.numero}. `}
              {unita.titolo}
            </h2>
            <p className="muted small">
              Spiegazioni, schemi, video aula e riferimenti — come appunti d’esame.
            </p>
          </header>

          {content.theory.map((t) => {
            const figs = (t.figureIds ?? [])
              .map((fid) => content.figure?.find((f) => f.id === fid))
              .filter((f): f is TheoryFigure => Boolean(f))
            return (
              <article key={t.title} className="card theory notebook-section">
                <h2>{t.title}</h2>
                <p>{t.body}</p>
                {t.formule && t.formule.length > 0 && (
                  <div className="callout formule">
                    <strong>Formule</strong>
                    <ul>
                      {t.formule.map((f) => (
                        <li key={f}>
                          <code>{f}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {t.esempio && (
                  <div className="callout esempio">
                    <strong>Esempio</strong>
                    <p>{t.esempio}</p>
                  </div>
                )}
                {t.attenzione && (
                  <div className="callout attenzione">
                    <strong>Attenzione</strong>
                    <p>{t.attenzione}</p>
                  </div>
                )}
                {t.approfondisci && t.approfondisci.length > 0 && (
                  <div className="callout approfondisci">
                    <strong>Approfondisci — spiegazioni possibili</strong>
                    <ul>
                      {t.approfondisci.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {figs.length > 0 && (
                  <div className="figure-row">
                    {figs.map((f) => (
                      <TheoryFigureView key={f.id} figure={f} />
                    ))}
                  </div>
                )}
              </article>
            )
          })}

          {content.figure
            ?.filter((f) => !content.theory.some((t) => t.figureIds?.includes(f.id)))
            .map((f) => (
              <TheoryFigureView key={f.id} figure={f} />
            ))}

          {content.video && content.video.length > 0 && <VideoAula videos={content.video} />}

          {content.riferimenti && content.riferimenti.length > 0 && (
            <section className="card riferimenti">
              <h3>Riferimenti</h3>
              <ul>
                {content.riferimenti.map((r) => (
                  <li key={r.label}>
                    <strong>{r.label}</strong>
                    {r.detail ? <span className="muted"> — {r.detail}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ul className="bullet-list card">
            <h3>Punti del syllabus</h3>
            {unita.sottotitoli.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <ArgomentiCorrelati unita={unita} />
          <button type="button" className="btn primary" onClick={() => markTheory(unita.id)}>
            {st?.theoryRead ? 'Teoria segnata come letta ✓' : 'Segna teoria come letta'}
          </button>
        </div>
      )}

      {tab === 'capire' && (
        <div className="stack">
          <article className="card tip capire-hero">
            <h2>Per capire meglio</h2>
            <p className="muted small">Spiegato come a una ragazzina di 12 anni.</p>
            <p className="analogia">{content.perCapireMeglio.analogia}</p>
          </article>
          {content.perCapireMeglio.concetti.map((c) => (
            <article key={c.titolo} className="card theory">
              <h3>{c.titolo}</h3>
              <p>{c.testo}</p>
            </article>
          ))}
          <ArgomentiCorrelati unita={unita} />
        </div>
      )}

      {tab === 'esercizi' && (
        <QuizPlayer
          key={`e-${quizKey}`}
          title="Esercizi"
          questions={eserciziQs}
          onComplete={(score, total) => {
            recordQuiz(unita.id, score, total, 'esercizi', false)
            addEserciziDone(unita.id, total)
            setTab('teoria')
          }}
        />
      )}

      {tab === 'verifica' && (
        <div>
          <p className="muted">5 domande diverse: aggiorna il codice triage.</p>
          <QuizPlayer
            key={`v-${quizKey}`}
            title="Verifica"
            questions={verificaQs}
            onComplete={(score, total) => {
              recordQuiz(unita.id, score, total, 'verifica', true)
              setTab('teoria')
            }}
          />
        </div>
      )}

      {st && st.attempts.length > 0 && (
        <section className="card">
          <h3>Storico</h3>
          <ul className="history">
            {[...st.attempts].reverse().map((a, i) => (
              <li key={i}>
                {new Date(a.date).toLocaleString('it-IT')} — {a.kind}: {a.score}/{a.total}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
