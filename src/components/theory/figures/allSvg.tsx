const ink = '#15202b'
const teal = '#0d9488'
const muted = '#5b6b76'

function ArrowDefs() {
  return (
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={teal} />
      </marker>
    </defs>
  )
}

export function SvgCarnot() {
  return (
    <svg viewBox="0 0 320 200" className="fig-svg" aria-hidden>
      <rect x="40" y="30" width="240" height="140" fill="none" stroke={muted} strokeDasharray="4 3" />
      <text x="16" y="100" fill={muted} fontSize="12">
        P
      </text>
      <text x="160" y="190" fill={muted} fontSize="12">
        V
      </text>
      <path
        d="M70 150 C110 150 130 50 170 50 C210 50 230 150 270 150"
        fill="none"
        stroke={teal}
        strokeWidth="2.5"
      />
      <path d="M70 150 L270 150" fill="none" stroke={ink} strokeWidth="1.5" />
      <text x="100" y="42" fill={ink} fontSize="11">
        isoterma calda
      </text>
      <text x="180" y="168" fill={ink} fontSize="11">
        isoterma fredda
      </text>
    </svg>
  )
}

export function SvgPvGas() {
  return (
    <svg viewBox="0 0 320 200" className="fig-svg" aria-hidden>
      <line x1="40" y1="170" x2="290" y2="170" stroke={ink} strokeWidth="1.5" />
      <line x1="40" y1="170" x2="40" y2="30" stroke={ink} strokeWidth="1.5" />
      <text x="12" y="100" fill={muted} fontSize="12">
        P
      </text>
      <text x="160" y="192" fill={muted} fontSize="12">
        V
      </text>
      <path d="M60 50 Q160 60 260 150" fill="none" stroke={teal} strokeWidth="2.5" />
      <text x="170" y="70" fill={ink} fontSize="12">
        isoterma (Boyle)
      </text>
    </svg>
  )
}

export function SvgVectors() {
  return (
    <svg viewBox="0 0 320 200" className="fig-svg" aria-hidden>
      <ArrowDefs />
      <line x1="40" y1="160" x2="280" y2="160" stroke={muted} />
      <line x1="40" y1="160" x2="40" y2="30" stroke={muted} />
      <line x1="40" y1="160" x2="200" y2="60" stroke={teal} strokeWidth="2.5" markerEnd="url(#arr)" />
      <line x1="40" y1="160" x2="200" y2="160" stroke={ink} strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="200" y1="160" x2="200" y2="60" stroke={ink} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="110" y="50" fill={teal} fontSize="12">
        F
      </text>
      <text x="110" y="178" fill={ink} fontSize="11">
        Fx = F cosθ
      </text>
      <text x="210" y="115" fill={ink} fontSize="11">
        Fy
      </text>
    </svg>
  )
}

export function SvgKinematics() {
  return (
    <svg viewBox="0 0 320 200" className="fig-svg" aria-hidden>
      <line x1="40" y1="170" x2="290" y2="170" stroke={ink} />
      <line x1="40" y1="170" x2="40" y2="30" stroke={ink} />
      <text x="10" y="100" fill={muted} fontSize="12">
        v
      </text>
      <text x="160" y="192" fill={muted} fontSize="12">
        t
      </text>
      <path d="M50 140 L120 140 L220 60 L280 60" fill="none" stroke={teal} strokeWidth="2.5" />
      <rect x="120" y="60" width="100" height="80" fill={teal} opacity="0.12" />
      <text x="135" y="105" fill={teal} fontSize="10">
        area = Δx
      </text>
    </svg>
  )
}

export function SvgBernoulli() {
  return (
    <svg viewBox="0 0 320 160" className="fig-svg" aria-hidden>
      <path
        d="M20 40 L120 40 L160 70 L200 70 L280 40 L300 40 L300 120 L280 120 L200 90 L160 90 L120 120 L20 120 Z"
        fill="#e6f7f5"
        stroke={teal}
        strokeWidth="2"
      />
      <text x="50" y="85" fill={ink} fontSize="11">
        A grande · v↓ P↑
      </text>
      <text x="165" y="85" fill={ink} fontSize="11">
        stenosi · v↑ P↓
      </text>
    </svg>
  )
}

export function SvgWave() {
  return (
    <svg viewBox="0 0 320 160" className="fig-svg" aria-hidden>
      <line x1="20" y1="80" x2="300" y2="80" stroke={muted} strokeDasharray="3 3" />
      <path
        d="M20 80 Q50 20 80 80 Q110 140 140 80 Q170 20 200 80 Q230 140 260 80 Q290 20 300 80"
        fill="none"
        stroke={teal}
        strokeWidth="2.5"
      />
      <line x1="80" y1="40" x2="200" y2="40" stroke={ink} />
      <text x="130" y="32" fill={ink} fontSize="11">
        λ
      </text>
    </svg>
  )
}

export function SvgCircuit() {
  return (
    <svg viewBox="0 0 320 160" className="fig-svg" aria-hidden>
      <rect x="40" y="40" width="240" height="80" fill="none" stroke={ink} strokeWidth="2" />
      <circle cx="100" cy="20" r="8" fill="none" stroke={teal} strokeWidth="2" />
      <line x1="80" y1="40" x2="80" y2="20" stroke={ink} />
      <line x1="80" y1="20" x2="92" y2="20" stroke={ink} />
      <path d="M160 40 L160 55 L170 50 L160 65 L170 60 L160 80 L160 120" fill="none" stroke={teal} strokeWidth="2" />
      <text x="178" y="75" fill={ink} fontSize="11">
        R · V=IR · P=I²R
      </text>
    </svg>
  )
}

export function SvgDecay() {
  return (
    <svg viewBox="0 0 320 180" className="fig-svg" aria-hidden>
      <line x1="40" y1="150" x2="290" y2="150" stroke={ink} />
      <line x1="40" y1="150" x2="40" y2="30" stroke={ink} />
      <path d="M40 40 Q100 50 160 95 Q220 130 280 145" fill="none" stroke={teal} strokeWidth="2.5" />
      <line x1="100" y1="150" x2="100" y2="58" stroke={ink} strokeDasharray="3 2" />
      <text x="85" y="168" fill={ink} fontSize="10">
        T½
      </text>
      <text x="200" y="70" fill={ink} fontSize="11">
        N = N₀ e−λt
      </text>
    </svg>
  )
}

export function SvgAtom() {
  return (
    <svg viewBox="0 0 320 180" className="fig-svg" aria-hidden>
      <circle cx="160" cy="90" r="14" fill={teal} />
      <ellipse cx="160" cy="90" rx="90" ry="36" fill="none" stroke={ink} strokeWidth="1.5" />
      <ellipse
        cx="160"
        cy="90"
        rx="50"
        ry="70"
        fill="none"
        stroke={muted}
        strokeWidth="1.5"
        transform="rotate(60 160 90)"
      />
      <circle cx="250" cy="90" r="6" fill={ink} />
      <text x="60" y="170" fill={muted} fontSize="11">
        nucleo · elettroni in orbitali
      </text>
    </svg>
  )
}

export function SvgPhScale() {
  return (
    <svg viewBox="0 0 320 100" className="fig-svg" aria-hidden>
      <defs>
        <linearGradient id="phg" x1="0" x2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="30" y="40" width="260" height="18" rx="4" fill="url(#phg)" />
      <line x1="160" y1="38" x2="160" y2="62" stroke={ink} strokeWidth="2" />
      <text x="30" y="30" fill={ink} fontSize="11">
        acido
      </text>
      <text x="250" y="30" fill={ink} fontSize="11">
        basico
      </text>
      <text x="90" y="85" fill={muted} fontSize="11">
        pH sangue ≈ 7,35–7,45
      </text>
    </svg>
  )
}

export function SvgOsmosis() {
  return (
    <svg viewBox="0 0 320 160" className="fig-svg" aria-hidden>
      <rect x="40" y="30" width="100" height="100" fill="#e6f7f5" stroke={teal} strokeWidth="2" />
      <rect x="180" y="30" width="100" height="100" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <line x1="140" y1="30" x2="140" y2="130" stroke={ink} strokeWidth="3" strokeDasharray="6 4" />
      <line x1="180" y1="30" x2="180" y2="130" stroke={ink} strokeWidth="3" strokeDasharray="6 4" />
      <text x="60" y="85" fill={ink} fontSize="11">
        ipotonico
      </text>
      <text x="200" y="85" fill={ink} fontSize="11">
        ipertonico
      </text>
      <text x="80" y="150" fill={muted} fontSize="11">
        H₂O → dove ci sono più particelle
      </text>
    </svg>
  )
}

export function SvgCellMembrane() {
  return (
    <svg viewBox="0 0 320 140" className="fig-svg" aria-hidden>
      {[80, 140, 200].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="40" rx="18" ry="12" fill={teal} opacity="0.5" />
          <ellipse cx={x} cy="55" rx="18" ry="12" fill={teal} opacity="0.5" />
        </g>
      ))}
      <rect x="230" y="25" width="40" height="50" rx="6" fill="#fff" stroke={ink} strokeWidth="2" />
      <text x="40" y="100" fill={ink} fontSize="11">
        doppio strato fosfolipidico
      </text>
      <text x="230" y="100" fill={ink} fontSize="11">
        canale
      </text>
    </svg>
  )
}

export function SvgDnaReplication() {
  return (
    <svg viewBox="0 0 320 160" className="fig-svg" aria-hidden>
      <path d="M60 30 Q100 80 60 130" fill="none" stroke={teal} strokeWidth="2.5" />
      <path d="M80 30 Q120 80 80 130" fill="none" stroke={ink} strokeWidth="2.5" />
      <path d="M160 30 Q200 50 240 30" fill="none" stroke={teal} strokeWidth="2" />
      <path d="M170 40 Q200 70 250 50" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M160 130 Q200 110 240 130" fill="none" stroke={teal} strokeWidth="2" />
      <path d="M170 120 Q200 90 250 110" fill="none" stroke={ink} strokeWidth="2" />
      <text x="40" y="155" fill={muted} fontSize="11">
        forcella di replicazione · 5′→3′
      </text>
    </svg>
  )
}

export function SvgCellCycle() {
  return (
    <svg viewBox="0 0 320 180" className="fig-svg" aria-hidden>
      <circle cx="160" cy="90" r="60" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M160 30 A60 60 0 0 1 220 90" fill="none" stroke={teal} strokeWidth="8" />
      <path d="M220 90 A60 60 0 0 1 160 150" fill="none" stroke="#ca8a04" strokeWidth="8" />
      <path d="M160 150 A60 60 0 0 1 100 90" fill="none" stroke="#7c3aed" strokeWidth="8" />
      <path d="M100 90 A60 60 0 0 1 160 30" fill="none" stroke="#2563eb" strokeWidth="8" />
      <text x="175" y="50" fill={ink} fontSize="11">
        G1
      </text>
      <text x="210" y="115" fill={ink} fontSize="11">
        S
      </text>
      <text x="145" y="145" fill={ink} fontSize="11">
        G2
      </text>
      <text x="95" y="70" fill={ink} fontSize="11">
        M
      </text>
    </svg>
  )
}

export function SvgDerivative() {
  return (
    <svg viewBox="0 0 320 180" className="fig-svg" aria-hidden>
      <line x1="40" y1="150" x2="290" y2="150" stroke={ink} />
      <line x1="40" y1="150" x2="40" y2="30" stroke={ink} />
      <path d="M50 140 Q120 140 160 80 Q200 40 270 40" fill="none" stroke={teal} strokeWidth="2.5" />
      <line x1="120" y1="120" x2="200" y2="50" stroke={ink} strokeWidth="1.5" />
      <text x="200" y="55" fill={ink} fontSize="11">
        pendenza = derivata
      </text>
      <rect x="160" y="80" width="50" height="70" fill={teal} opacity="0.15" />
      <text x="50" y="100" fill={muted} fontSize="10">
        area ≈ integrale
      </text>
    </svg>
  )
}
