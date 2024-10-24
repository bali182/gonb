import { Duration } from '../../common/duration'

export type RhythmItem = {
  duration: Duration
  type: 'note' | 'rest'
}
