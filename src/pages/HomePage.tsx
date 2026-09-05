import { Link } from 'react-router-dom'
import { UNITA_APPROFONDIMENTI, UNITA_UFFICIALI, materiaLabel } from '../data/unita'
import { coloreLabel } from '../lib/semaforo'
import { useProgress } from '../state/ProgressContext'
import type { SemaforoColore, Unita } from '../types'
import { useMemo, useState } from 'react'

function PatientCard({ u, colore }: { u: Unita; colore: SemaforoColore }) {
  const { progress } = useProgress()
  const st = progress.unita[u.id]
  return (
    <li>
      <Link to={`/unita/${u.id}`} className={`patient-card code-${colore}`}>
        <span className="patient-stripe" aria-hidden />
        <span className={`tag mat-${u.materia}`}>{materiaLabel(u.materia)}</span>
        <strong>
          {u.numero}. {u.titolo}
        </strong>
        <span className="patient-meta muted small">
          {u.cfu} CFU
          {typeof st?.lastScore === 'number' ? ` · ultimo ${st.lastScore}/5` : ' · da triage'}
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
        {items.length === 0 && <li className="empty">Nessuna unità</li>}
      </ul>
    </section>
  )
}

export function HomePage() {
  const { progress } = useProgress()
  const [filtro, setFiltro] = useState<'tutte' | 'biologia' | 'chimica' | 'fisica'>('tutte')

  const filtered = useMemo(
    () => UNITA_UFFICIALI.filter((u) => filtro === 'tutte' || u.materia === filtro),
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

  const done = UNITA_UFFICIALI.filter((u) => (progress.unita[u.id]?.colore ?? 'grigio') !== 'grigio')
    .length

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Triage</h1>
          <p className="muted">
            5/5 verde · 3–4 giallo · 0–2 rosso. Cartelle triagiate: {done}/{UNITA_UFFICIALI.length}
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
        </div>
      </div>

      <div className="semaforo-grid">
        <Column title="Codice rosso" colore="rosso" items={groups.rosso} />
        <Column title="Codice giallo" colore="giallo" items={groups.giallo} />
        <Column title="Codice verde" colore="verde" items={groups.verde} />
        <Column title="In attesa" colore="grigio" items={groups.grigio} />
      </div>

      <section className="card deepen">
        <h2>Basi extra · fuori programma 2026</h2>
        <p className="muted">
          Indice secondario: gli stessi argomenti appaiono anche come correlati nelle cartelle dove
          li userai. Non entrano nel triage d’esame né nelle simulazioni.
        </p>
        <ul className="link-list">
          {UNITA_APPROFONDIMENTI.map((u) => (
            <li key={u.id}>
              <Link to={`/unita/${u.id}`}>
                <span className="badge warn">{u.badge}</span> {u.titolo}
                <span className="muted small">
                  {' '}
                  · {coloreLabel(progress.unita[u.id]?.colore ?? 'grigio')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
