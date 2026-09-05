import { NavLink } from 'react-router-dom'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">SA</span>
          <div>
            <strong>Studio Semestre Aperto</strong>
            <div className="muted small">Biologia · Chimica · Fisica · fino al 30 nov 2026</div>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" end>
            Triage
          </NavLink>
          <NavLink to="/calendario">Calendario</NavLink>
          <NavLink to="/simulazione">Simulazione</NavLink>
          <NavLink to="/impostazioni">Dati</NavLink>
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
