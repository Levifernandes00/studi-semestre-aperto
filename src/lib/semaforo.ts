import type { SemaforoColore } from '../types'

/** 5/5 verde · 3–4 giallo · 0–2 rosso */
export function scoreToColore(score: number, total = 5): SemaforoColore {
  if (total <= 0) return 'grigio'
  if (score >= 5) return 'verde'
  if (score >= 3) return 'giallo'
  return 'rosso'
}

export function coloreLabel(c: SemaforoColore): string {
  switch (c) {
    case 'verde':
      return 'Codice verde — non prioritario'
    case 'giallo':
      return 'Codice giallo — ripasso'
    case 'rosso':
      return 'Codice rosso — priorità alta'
    default:
      return 'In attesa di triage'
  }
}

export function colorePriority(c: SemaforoColore): number {
  switch (c) {
    case 'rosso':
      return 0
    case 'grigio':
      return 1
    case 'giallo':
      return 2
    case 'verde':
      return 3
  }
}
