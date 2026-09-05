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
