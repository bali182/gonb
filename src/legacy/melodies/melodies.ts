import { Duration } from '../../common/duration'
import { bar, note } from './factories'

const a = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.HALF, -1),
)

const b = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
  note(Duration.QUARTER, -1),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, -2),
)

const c = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHTH, -2),
  note(Duration.QUARTER, 1),
)

const d = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, -7),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHTH, 2),
  note(Duration.QUARTER, -3),
)

const e = bar(
  note(Duration.HALF, 0),
  note(Duration.EIGHTH, -2),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
)

const f = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHTH, -1),
  note(Duration.QUARTER, -3),
  note(Duration.EIGHTH, -1),
  note(Duration.QUARTER, -2),
)

const g = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, -1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
)

const h = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
)

const i = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHTH, 7),
  note(Duration.QUARTER, -6),
  note(Duration.EIGHTH, 7),
  note(Duration.QUARTER, -6),
)

const j = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 2),
  note(Duration.EIGHTH, -1),
)

const k = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.QUARTER, 5),
  note(Duration.EIGHTH, -3),
  note(Duration.QUARTER, 1),
)

const l = bar(
  note(Duration.QUARTER, 0),
  note(Duration.QUARTER, 2),
  note(Duration.QUARTER, 2),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
)

const m = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, 3),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHTH, -1),
  note(Duration.QUARTER, -1),
)

const n = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHTH, 4),
  note(Duration.QUARTER, -3),
  note(Duration.EIGHTH, 4),
  note(Duration.QUARTER, -3),
)

const o = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, 6),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, -3),
)

const p = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.EIGHTH, -2),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, 1),
)

const q = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.EIGHTH, -3),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHTH, -1),
  note(Duration.EIGHTH, -1),
)

const r = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, -4),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.QUARTER, 1),
)

const s = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.QUARTER, -5),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, 1),
)

const t = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, -6),
  note(Duration.QUARTER, 1),
)

const u = bar(
  note(Duration.EIGHTH, 0),
  note(Duration.EIGHTH, -7),
  note(Duration.EIGHTH, 7),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, -7),
  note(Duration.EIGHTH, 7),
  note(Duration.EIGHTH, 1),
  note(Duration.EIGHTH, -7),
)

export const melodies = [
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
]
