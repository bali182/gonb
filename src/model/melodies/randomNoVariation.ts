import { Duration } from '../common'
import { bar, note } from '../utils'

export const randomWholeNote = [bar(note(Duration.WHOLE, 'RANDOM'))]

export const randomHalfNotes = [
  bar(note(Duration.HALF, 'RANDOM'), note(Duration.HALF, 'RANDOM')),
]

export const randomQuarterNotes = [
  bar(
    note(Duration.QUARTER, 'RANDOM'),
    note(Duration.QUARTER, 'RANDOM'),
    note(Duration.QUARTER, 'RANDOM'),
    note(Duration.QUARTER, 'RANDOM'),
  ),
]
