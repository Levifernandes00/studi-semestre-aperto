import { Link } from 'react-router-dom'
import { getUnita, UNITA } from '../data/unita'
import type { Unita } from '../types'

export function ArgomentiCorrelati({ unita }: { unita: Unita }) {
  if (unita.approfondimento) {
    const linked = (unita.collegataA ?? [])
      .map((id) => getUnita(id))
      .filter((u): u is Unita => Boolean(u))

    if (linked.length === 0) return null

    return (
      <section className="card correlati">
        <h3>Dove lo userai</h3>
        <p className="muted small">
          Questa base extra torna utile in queste unità del programma ufficiale.
        </p>
        <div className="correlati-map">
          <div className="correlati-hub hub-extra">
            <span className="badge warn">{unita.badge ?? 'extra'}</span>
            <strong>{unita.titolo}</strong>
          </div>
          <ul className="correlati-rays">
            {linked.map((u) => {
              const motivo = unita.motivoCollegamento?.[u.id]
              return (
                <li key={u.id}>
                  <Link to={`/unita/${u.id}`} className="correlati-chip">
                    <span className={`tag mat-${u.materia}`}>
                      {u.numero}. {u.titolo}
                    </span>
                    {motivo && <span className="motivo">{motivo}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  const extras = UNITA.filter(
    (u) => u.approfondimento && u.collegataA?.includes(unita.id),
  )

  if (extras.length === 0) return null

  return (
    <section className="card correlati">
      <h3>Argomenti correlati</h3>
      <p className="muted small">
        Basi fuori programma 2026 che tornano utili proprio qui — aprili quando ti servono.
      </p>
      <div className="correlati-map">
        <div className="correlati-hub">
          <span className="hub-label">Unità {unita.numero}</span>
          <strong>{unita.titolo}</strong>
        </div>
        <ul className="correlati-rays">
          {extras.map((extra) => {
            const motivo = extra.motivoCollegamento?.[unita.id]
            return (
              <li key={extra.id}>
                <Link to={`/unita/${extra.id}`} className="correlati-chip">
                  <span className="badge warn">{extra.badge}</span>
                  <strong>{extra.titolo}</strong>
                  {motivo && <span className="motivo">{motivo}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
