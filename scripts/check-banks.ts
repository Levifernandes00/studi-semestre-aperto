import { ALL_CONTENT, buildExamPaper } from '../src/data/content/index'

for (const c of ALL_CONTENT.filter((x) => !x.unitaId.startsWith('extra'))) {
  const mc = c.esercizi.filter((q) => q.type === 'multipla').length
  const f = c.esercizi.filter((q) => q.type === 'completamento').length
  console.log(c.unitaId, 'ex', c.esercizi.length, '(mc', mc, 'fill', f, ') vf', c.verifica.length)
}
for (const m of ['chimica', 'fisica', 'biologia'] as const) {
  const p = buildExamPaper(m)
  console.log(
    'paper',
    m,
    p.length,
    'mc',
    p.filter((q) => q.type === 'multipla').length,
    'fill',
    p.filter((q) => q.type === 'completamento').length,
  )
}
