import { Link } from 'react-router-dom'
import {
  ARGOMENTI,
  MUR_UNITA,
  UNITA_APPROFONDIMENTI,
  getArgomentiOf,
  getMurUnita,
  materiaLabel,
} from '../data/unita'
import { coloreLabel } from '../lib/semaforo'
import { useProgress } from '../state/ProgressContext'
import type { SemaforoColore, Unita } from '../types'
import { useMemo, useState } from 'react'

function PatientCard({ u, colore }: { u: Unita; colore: SemaforoColore }) {
  const { progress } = useProgress()
  const st = progress.unita[u.id]
  const parent = u.parentUnitaId ? getMurUnita(u.parentUnitaId) : undefined
  return (
    <li>
      <Link to={`/unita/${u.id}`} className={`patient-card code-${colore}`}>
        <span className="patient-stripe" aria-hidden />
        <span className={`tag mat-${u.materia}`}>{materiaLabel(u.materia)}</span>
        {u.badge && <span className="badge">{u.badge}</span>}
        <strong>{u.titolo}</strong>
        <span className="patient-meta muted small">
          {parent ? `${parent.titolo} · ` : ''}
          {u.cfu} CFU
          {typeof st?.lastScore === 'number' ? ` · ultimo ${st.lastScore}` : ' · da triage'}
        </span>
      </Link>
    </li>
  )
}

function Column({
  title,
  colore,
  items,
}: {
  title: string
  colore: SemaforoColore
  items: Unita[]
}) {
  return (
    <section className={`semaforo-col col-${colore}`}>
      <header>
        <h2>{title}</h2>
        <span className="badge">{items.length}</span>
      </header>
      <ul>
        {items.map((u) => (
          <PatientCard key={u.id} u={u} colore={colore} />
        ))}
        {items.length === 0 && <li className="empty">Nessun argomento</li>}
      </ul>
    </section>
  )
}

export function HomePage() {
  const { progress } = useProgress()
  const [filtro, setFiltro] = useState<'tutte' | 'biologia' | 'chimica' | 'fisica'>('tutte')
  const [vista, setVista] = useState<'triage' | 'unita'>('unita')

  const filtered = useMemo(
    () => ARGOMENTI.filter((u) => filtro === 'tutte' || u.materia === filtro),
    [filtro],
  )

  const groups = useMemo(() => {
    const g: Record<SemaforoColore, Unita[]> = {
      rosso: [],
      giallo: [],
      verde: [],
      grigio: [],
    }
    for (const u of filtered) {
      const c = progress.unita[u.id]?.colore ?? 'grigio'
      g[c].push(u)
    }
    return g
  }, [filtered, progress])

  const murList = useMemo(
    () => MUR_UNITA.filter((u) => filtro === 'tutte' || u.materia === filtro),
    [filtro],
  )

  const done = ARGOMENTI.filter((u) => (progress.unita[u.id]?.colore ?? 'grigio') !== 'grigio')
    .length

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Triage</h1>
          <p className="muted">
            Cartelle = argomenti (sottotitoli). Badge = unità MUR. 4–5/5 verde · 3/5 giallo · 0–2
            rosso. Triagiate: {done}/{ARGOMENTI.length}
          </p>
        </div>
        <div className="filters">
          {(['tutte', 'biologia', 'chimica', 'fisica'] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${filtro === f ? 'active' : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f === 'tutte' ? 'Tutte' : materiaLabel(f)}
            </button>
          ))}
          <button
            type="button"
            className={`chip ${vista === 'unita' ? 'active' : ''}`}
            onClick={() => setVista('unita')}
          >
            Per unità
          </button>
          <button
            type="button"
            className={`chip ${vista === 'triage' ? 'active' : ''}`}
            onClick={() => setVista('triage')}
          >
            Per codice
          </button>
        </div>
      </div>

      {vista === 'triage' ? (
        <div className="semaforo-grid">
          <Column title="Codice rosso" colore="rosso" items={groups.rosso} />
          <Column title="Codice giallo" colore="giallo" items={groups.giallo} />
          <Column title="Codice verde" colore="verde" items={groups.verde} />
          <Column title="In attesa" colore="grigio" items={groups.grigio} />
        </div>
      ) : (
        <div className="mur-groups">
          {murList.map((mur) => {
            const args = getArgomentiOf(mur.id)
            return (
              <section key={mur.id} className="card" style={{ marginBottom: '1rem' }}>
                <h2>
                  <span className={`tag mat-${mur.materia}`}>{materiaLabel(mur.materia)}</span>{' '}
                  Unità {mur.numero} · {mur.titolo}
                </h2>
                <p className="muted small">{mur.cfu} CFU totali · {args.length} argomenti</p>
                <ul className="link-list">
                  {args.map((a) => {
                    const c = progress.unita[a.id]?.colore ?? 'grigio'
                    return (
                      <li key={a.id}>
                        <Link to={`/unita/${a.id}`} className={`code-${c}`}>
                          {a.titolo}{' '}
                          <span className="muted small">({coloreLabel(c)})</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      )}

      <section className="card deepen">
        <h2>Basi extra · fuori programma 2026</h2>
        <p className="muted">
          Indice secondario: compaiono anche come correlati nelle cartelle dove li userai. Non
          entrano nel triage d’esame né nelle simulazioni.
        </p>
        <ul className="link-list">
          {UNITA_APPROFONDIMENTI.map((u) => (
            <li key={u.id}>
              <Link to={`/unita/${u.id}`}>
                <span className="badge warn">{u.badge}</span> {u.titolo}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
