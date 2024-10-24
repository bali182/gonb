import { Duration } from '../../common/common'
import { bar, note } from './factories'

export const randomWholeNote = [bar(note(Duration.WHOLE, 'RANDOM_SCALE'))]

export const randomHalfNotes = [
  bar(note(Duration.HALF, 'RANDOM_SCALE'), note(Duration.HALF, 'RANDOM_SCALE')),
]

export const randomQuarterNotes = [
  bar(
    note(Duration.QUARTER, 'RANDOM_SCALE'),
    note(Duration.QUARTER, 'RANDOM_SCALE'),
    note(Duration.QUARTER, 'RANDOM_SCALE'),
    note(Duration.QUARTER, 'RANDOM_SCALE'),
  ),
]
