import type { Question } from '../types'

let qCounter = 0

export function mc(
  unitaId: string,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  examEligible = true,
): Question {
  qCounter += 1
  return {
    id: `${unitaId}-q${qCounter}`,
    type: 'multipla',
    prompt,
    options,
    answer: correctIndex,
    explanation,
    examEligible,
  }
}

export function fill(
  unitaId: string,
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  examEligible = true,
): Question {
  qCounter += 1
  return {
    id: `${unitaId}-q${qCounter}`,
    type: 'completamento',
    prompt,
    answer,
    acceptedAnswers,
    explanation,
    examEligible,
  }
}

export function resetQCounter() {
  qCounter = 0
}

/** Pesca un foglio d’esame: N multipla + M completamento, mescolate. */
export function pickExamPaper(
  pool: Question[],
  multiplaN: number,
  completamentoN: number,
  excludeIds: string[] = [],
): Question[] {
  const avail = pool.filter((q) => !excludeIds.includes(q.id))
  const mcPool = avail.filter((q) => q.type === 'multipla').sort(() => Math.random() - 0.5)
  const fillPool = avail.filter((q) => q.type === 'completamento').sort(() => Math.random() - 0.5)
  const picked = [
    ...mcPool.slice(0, Math.min(multiplaN, mcPool.length)),
    ...fillPool.slice(0, Math.min(completamentoN, fillPool.length)),
  ]
  return picked.sort(() => Math.random() - 0.5)
}

export function isAnswerCorrect(q: Question, userAnswer: string | number): boolean {
  if (q.type === 'multipla') {
    return Number(userAnswer) === q.answer
  }
  const normalize = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[,.]/g, '')
  const u = normalize(String(userAnswer))
  const targets = [String(q.answer), ...(q.acceptedAnswers ?? [])].map(normalize)
  return targets.includes(u)
}
