import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildCalendar, formatWeekRange } from '../lib/calendario'
import { isPlanTaskDone, DEFAULT_WEEKLY_HOURS } from '../lib/progress'
import { useProgress } from '../state/ProgressContext'

export function CalendarioPage() {
  const {
    progress,
    setIncludeBasi,
    setWeeklyHoursTarget,
    setPlanHoursActual,
    togglePlanItem,
  } = useProgress()
  const weeks = useMemo(() => buildCalendar(progress), [progress])
  const target = progress.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS
  const [hoursDraft, setHoursDraft] = useState(String(target))

  const current = weeks.find((w) => w.isCurrent)
  const carried = current?.sessions.filter((s) => s.carriedFrom).length ?? 0

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Calendario intelligente</h1>
          <p className="muted">
            Pool settimanale (~{target} h): scegli tu cosa studiare ogni giorno. Ciò che non finisci
            torna in cima la settimana dopo. Registra le ore reali su ogni argomento.
          </p>
        </div>
        <div className="cal-controls">
          <label className="toggle">
            <span className="muted small">Ore / settimana</span>
            <input
              className="hours-target"
              type="number"
              min={5}
              max={60}
              step={0.5}
              value={hoursDraft}
              onChange={(e) => setHoursDraft(e.target.value)}
              onBlur={() => {
                const n = Number(hoursDraft)
                if (!Number.isNaN(n)) setWeeklyHoursTarget(n)
                else setHoursDraft(String(target))
              }}
            />
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={progress.includeBasi}
              onChange={(e) => setIncludeBasi(e.target.checked)}
            />
            Includi le basi extra
          </label>
        </div>
      </div>

      {carried > 0 && (
        <div className="card tip cal-banner">
          <strong>Ripianificazione automatica:</strong> {carried} argomenti non completati nelle
          settimane scorse sono in cima a questa settimana.
        </div>
      )}

      <div className="weeks">
        {weeks.map((w) => {
          const doneCount = w.sessions.filter((s) =>
            isPlanTaskDone(progress.completedPlanItems, s.taskKey, s.id),
          ).length
          const planned = w.estimatedHours
          const actual = w.actualHours
          const pct =
            planned > 0 ? Math.min(100, Math.round((actual / planned) * 100)) : 0

          return (
            <section
              key={w.weekStart}
              className={`card week ${w.isCurrent ? 'week-current' : ''}`}
            >
              <header className="week-head">
                <div>
                  <h2>
                    {w.label}
                    {w.isCurrent && <span className="badge cal-now">ora</span>}
                  </h2>
                  <p className="muted">
                    {formatWeekRange(w.weekStart, w.weekEnd)} · piano {planned} h
                    {actual > 0 ? ` · registrate ${actual} h` : ''}
                    {w.sessions.length > 0 ? ` · ${doneCount}/${w.sessions.length} fatti` : ''}
                  </p>
                  {planned > 0 && (
                    <div className="cal-progress" aria-hidden>
                      <div className="cal-progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
                <p className="goal">{w.goal}</p>
              </header>

              <p className="muted small cal-hint">
                Non c’è un giorno fisso: spunta ciò che fai quando vuoi, dentro questa settimana.
              </p>

              <ul className="sessions sessions-pool">
                {w.sessions.map((s) => {
                  const done = isPlanTaskDone(progress.completedPlanItems, s.taskKey, s.id)
                  const actualVal = progress.planHoursActual?.[s.taskKey] ?? ''
                  return (
                    <li
                      key={s.id}
                      className={`${done ? 'done' : ''} ${s.carriedFrom ? 'carried' : ''}`}
                    >
                      <div className="session-row">
                        <label className="session-check">
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => togglePlanItem(s.taskKey)}
                          />
                          <span className="label">
                            {s.unitaId !== 'sim' ? (
                              <Link to={`/unita/${s.unitaId}`}>{s.label}</Link>
                            ) : s.kind === 'simulazione' ? (
                              <Link to="/simulazione">{s.label}</Link>
                            ) : (
                              s.label
                            )}
                            {s.carriedFrom && (
                              <span className="badge warn carry-badge">riportato</span>
                            )}
                          </span>
                        </label>
                        <span className="hours-plan muted small">piano {s.hours} h</span>
                        <label className="hours-actual">
                          <span className="muted small">ore reali</span>
                          <input
                            type="number"
                            min={0}
                            max={40}
                            step={0.5}
                            placeholder="0"
                            value={actualVal}
                            onChange={(e) => {
                              const n = e.target.value === '' ? 0 : Number(e.target.value)
                              if (!Number.isNaN(n)) setPlanHoursActual(s.taskKey, n)
                            }}
                          />
                        </label>
                      </div>
                    </li>
                  )
                })}
                {w.sessions.length === 0 && (
                  <li className="empty">
                    Niente in coda — ripassa i verdi o fai una simulazione.
                  </li>
                )}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
