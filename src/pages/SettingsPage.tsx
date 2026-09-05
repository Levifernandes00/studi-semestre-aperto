import { useRef, useState } from 'react'
import { useProgress } from '../state/ProgressContext'

export function SettingsPage() {
  const { doExport, doImport, resetAll } = useProgress()
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="page">
      <h1>Dati</h1>
      <p className="muted">
        Il progresso è salvato solo su questo browser (localStorage). Esporta un backup JSON per non
        perderlo.
      </p>
      <div className="row gap wrap">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            const blob = new Blob([doExport()], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `semestre-aperto-backup-${new Date().toISOString().slice(0, 10)}.json`
            a.click()
            URL.revokeObjectURL(url)
            setMsg('Backup scaricato.')
          }}
        >
          Esporta JSON
        </button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
          Importa JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            try {
              const text = await file.text()
              doImport(text)
              setMsg('Import riuscito.')
            } catch {
              setMsg('File non valido.')
            }
          }}
        />
        <button
          type="button"
          className="btn danger"
          onClick={() => {
            if (confirm('Azzerare tutto il progresso?')) {
              resetAll()
              setMsg('Progresso azzerato.')
            }
          }}
        >
          Azzera progresso
        </button>
      </div>
      {msg && <p className="tip-inline">{msg}</p>}
    </div>
  )
}
