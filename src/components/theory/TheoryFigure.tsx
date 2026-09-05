import type { TheoryFigure } from '../../types'
import { SvgRegistry } from './figures/registry'

export function TheoryFigureView({ figure }: { figure: TheoryFigure }) {
  if (figure.kind === 'sketch') {
    return (
      <figure className="theory-figure sketch">
        <img
          src={`/sketches/${figure.id}.png`}
          alt={figure.alt}
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget
            if (el.src.endsWith('.png')) {
              el.src = `/sketches/${figure.id}.webp`
            }
          }}
        />
        <figcaption>{figure.caption}</figcaption>
      </figure>
    )
  }

  const Svg = SvgRegistry[figure.id]
  return (
    <figure className="theory-figure svg">
      <div className="svg-frame" role="img" aria-label={figure.alt}>
        {Svg ? <Svg /> : <p className="muted small">Schema non disponibile ({figure.id})</p>}
      </div>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  )
}
