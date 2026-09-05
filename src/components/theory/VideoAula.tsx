import type { TheoryVideo } from '../../types'

export function VideoAula({ videos }: { videos: TheoryVideo[] }) {
  if (!videos.length) return null

  return (
    <section className="card video-aula">
      <h3>Video aula</h3>
      <p className="muted small">Lezioni esterne incorporate — aprono anche su YouTube se preferisci.</p>
      <div className="video-grid">
        {videos.map((v) => (
          <article key={v.youtubeId} className="video-card">
            <div className="video-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                title={v.titolo}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="video-meta">
              <strong>{v.titolo}</strong>
              <span className="muted small">{v.canale}</span>
              <p className="motivo">{v.perché}</p>
              <a
                className="yt-link"
                href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                target="_blank"
                rel="noreferrer"
              >
                Apri su YouTube ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
