import { Duration } from '../../model/common'

export type RhythmItem = {
  duration: Duration
  type: 'note' | 'rest'
}
