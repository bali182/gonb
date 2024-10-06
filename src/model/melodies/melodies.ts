import { Duration } from '../common'
import { bar, note } from '../utils'

const a = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHT, 1),
  note(Duration.EIGHT, 1),
  note(Duration.HALF, -1),
)

const b = bar(
  note(Duration.EIGHT, 0),
  note(Duration.EIGHT, -1),
  note(Duration.EIGHT, -1),
  note(Duration.QUARTER, -1),
  note(Duration.EIGHT, 1),
  note(Duration.QUARTER, -2),
)

const c = bar(
  note(Duration.EIGHT, 0),
  note(Duration.EIGHT, 1),
  note(Duration.EIGHT, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHT, -2),
  note(Duration.QUARTER, 1),
)

const d = bar(
  note(Duration.EIGHT, 0),
  note(Duration.EIGHT, -7),
  note(Duration.EIGHT, 1),
  note(Duration.QUARTER, 1),
  note(Duration.EIGHT, 2),
  note(Duration.QUARTER, -3),
)

const e = bar(
  note(Duration.HALF, 0),
  note(Duration.EIGHT, -2),
  note(Duration.EIGHT, -1),
  note(Duration.EIGHT, -1),
  note(Duration.EIGHT, -1),
)

const f = bar(
  note(Duration.QUARTER, 0),
  note(Duration.EIGHT, -1),
  note(Duration.QUARTER, -3),
  note(Duration.EIGHT, -1),
  note(Duration.QUARTER, -2),
)

const g = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, -1),
  note(Duration.EIGHT, -1),
  note(Duration.EIGHT, -1),
)

const h = bar(
  note(Duration.DOTTED_QUARTER, 0),
  note(Duration.DOTTED_QUARTER, 1),
  note(Duration.EIGHT, 1),
  note(Duration.EIGHT, 1),
)

export const melodies = [a, b, c, d, e, f, g, h]
