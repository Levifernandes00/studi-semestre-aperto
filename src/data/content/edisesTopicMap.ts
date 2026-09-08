/**
 * Checklist temi per argomento (allineata a syllabus MUR + copertura tipica manuali tipo Edises).
 * Solo elenchi di nodi da coprire — nessun testo protetto.
 */
import { ARGOMENTI } from '../unita'

const EXTRA: Record<string, string[]> = {
  'fis-2-cinematica': [
    'moto rettilineo uniforme e uniformemente accelerato',
    'grafici x–t, v–t, a–t',
    'moto circolare uniforme e accelerazione centripeta',
    'caduta libera',
  ],
  'fis-2-dinamica-e-forze': [
    'principi di Newton',
    'forze di contatto, peso, vincoli',
    'attrito statico e dinamico',
    'diagramma di corpo libero',
  ],
  'fis-2-lavoro-ed-energia': [
    'lavoro di una forza costante',
    'energia cinetica e potenziale',
    'conservazione energia meccanica',
    'potenza',
  ],
  'fis-2-quantita-di-moto-centro-di-massa-e-leve': [
    'quantità di moto e impulso',
    'centro di massa',
    'leve e momento torcente',
    'equilibrio rotazionale (cenni)',
  ],
}

function defaultTopics(titolo: string): string[] {
  return [
    `Definizioni e grandezze di: ${titolo}`,
    `Relazioni e formule tipiche d’esame`,
    `Esempi biomedici o applicativi`,
    `Trappole e confusione con argomenti vicini`,
  ]
}

export const EDISES_TOPIC_MAP: Record<string, string[]> = Object.fromEntries(
  ARGOMENTI.map((a) => [a.id, EXTRA[a.id] ?? defaultTopics(a.titolo)]),
)

export function topicsFor(argomentoId: string): string[] {
  return EDISES_TOPIC_MAP[argomentoId] ?? defaultTopics(argomentoId)
}
