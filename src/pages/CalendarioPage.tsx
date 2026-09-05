import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildCalendar, formatWeekRange, listRecentCompleted } from '../lib/calendario'
import { DEFAULT_WEEKLY_HOURS } from '../lib/progress'
import { useProgress } from '../state/ProgressContext'
import type { PlanSession } from '../types'

function SessionRow({
  s,
  done,
  actualVal,
  onToggle,
  onHours,
  onReopen,
  showReopen,
}: {
  s: PlanSession
  done: boolean
  actualVal: number | ''
  onToggle: () => void
  onHours: (n: number) => void
  onReopen?: () => void
  showReopen?: boolean
}) {
  return (
    <li className={`${done ? 'done' : ''} ${s.carriedFrom ? 'carried' : ''}`}>
      <div className="session-row">
        <label className="session-check">
          <input type="checkbox" checked={done} onChange={onToggle} />
          <span className="label">
            {s.unitaId !== 'sim' ? (
              <Link to={`/unita/${s.unitaId}`}>{s.label}</Link>
            ) : s.kind === 'simulazione' || s.taskKey.includes('simulazione') ? (
              <Link
                to={
                  s.taskKey.includes('simulazione2')
                    ? '/simulazione?id=sim-2'
                    : '/simulazione?id=sim-1'
                }
              >
                {s.label}
              </Link>
            ) : (
              s.label
            )}
            {s.carriedFrom && <span className="badge warn carry-badge">riportato</span>}
            {s.kind === 'ripasso' && <span className="badge cal-now">ripasso 14g</span>}
            {s.lowHours && done && (
              <span className="badge warn carry-badge">ore basse — conviene ripetere</span>
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
              if (!Number.isNaN(n)) onHours(n)
            }}
          />
        </label>
        {showReopen && onReopen && (
          <button type="button" className="btn" onClick={onReopen}>
            Ripeti
          </button>
        )}
      </div>
      {s.lowHours && done && (
        <p className="muted small session-hint">
          Hai registrato meno della metà delle ore previste. Usa «Ripeti» per rimetterlo in coda.
        </p>
      )}
    </li>
  )
}

export function CalendarioPage() {
  const {
    progress,
    setIncludeBasi,
    setWeeklyHoursTarget,
    setPlanHoursActual,
    togglePlanItem,
    reopenPlanItem,
  } = useProgress()
  const weeks = useMemo(() => buildCalendar(progress), [progress])
  const target = progress.weeklyHoursTarget ?? DEFAULT_WEEKLY_HOURS
  const [hoursDraft, setHoursDraft] = useState(String(target))

  const current = weeks.find((w) => w.isCurrent)
  const carried = current?.sessions.filter((s) => s.carriedFrom).length ?? 0
  const recentDone = useMemo(() => listRecentCompleted(progress, 25), [progress])
  const olderDone = recentDone.filter(
    (r) => !current?.doneSessions.some((d) => d.taskKey === r.taskKey),
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Calendario intelligente</h1>
          <p className="muted">
            Pool settimanale (~{target} h): scegli tu cosa studiare. Gli argomenti spuntati restano in
            «Fatti» per poterli annullare. I verdi tornano come ripasso ogni 14 giorni; se il triage
            peggiora, rientrano in cima.
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
          <strong>Ripianificazione:</strong> {carried} argomenti non finiti nelle settimane scorse
          sono in cima a questa.
        </div>
      )}

      <div className="weeks">
        {weeks.map((w) => {
          const todo = w.sessions
          const fatti = w.doneSessions
          const planned = w.estimatedHours
          const actual = w.actualHours
          const pct = planned > 0 ? Math.min(100, Math.round((actual / planned) * 100)) : 0

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
                    {` · ${fatti.length} fatti / ${todo.length} da fare`}
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
                Non c’è un giorno fisso: spunta quando vuoi. Togli lo spunta o usa «Ripeti» /
                «Rimetti in piano» per farli riapparire.
              </p>

              <h3 className="cal-section-title">Da fare</h3>
              <ul className="sessions sessions-pool">
                {todo.map((s) => (
                  <SessionRow
                    key={s.id}
                    s={s}
                    done={false}
                    actualVal={progress.planHoursActual?.[s.taskKey] ?? ''}
                    onToggle={() => togglePlanItem(s.taskKey)}
                    onHours={(n) => setPlanHoursActual(s.taskKey, n)}
                  />
                ))}
                {todo.length === 0 && (
                  <li className="empty">Niente in coda — ripassa i verdi o fai una simulazione.</li>
                )}
              </ul>

              {w.isCurrent && fatti.length > 0 && (
                <>
                  <h3 className="cal-section-title">Fatti in questa settimana</h3>
                  <ul className="sessions sessions-pool sessions-done">
                    {fatti.map((s) => (
                      <SessionRow
                        key={s.id}
                        s={s}
                        done
                        actualVal={progress.planHoursActual?.[s.taskKey] ?? ''}
                        onToggle={() => togglePlanItem(s.taskKey)}
                        onHours={(n) => setPlanHoursActual(s.taskKey, n)}
                        showReopen={Boolean(s.lowHours)}
                        onReopen={() => reopenPlanItem(s.taskKey)}
                      />
                    ))}
                  </ul>
                </>
              )}
            </section>
          )
        })}
      </div>

      {olderDone.length > 0 && (
        <section className="card deepen">
          <h2>Completati recenti — rimetti in piano</h2>
          <p className="muted">
            Se un argomento è sparito dal pool (es. unità verde), puoi forzarlo di nuovo in coda.
          </p>
          <ul className="link-list">
            {olderDone.map((r) => (
              <li key={r.taskKey} className="reopen-row">
                <span>
                  {r.label}
                  {r.completedAt && (
                    <span className="muted small">
                      {' '}
                      · {new Date(r.completedAt).toLocaleDateString('it-IT')}
                    </span>
                  )}
                </span>
                <button type="button" className="btn" onClick={() => reopenPlanItem(r.taskKey)}>
                  Rimetti in piano
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
