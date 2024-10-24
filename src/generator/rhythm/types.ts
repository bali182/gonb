import { Duration } from '../../common/common'

export type RhythmItem = {
  duration: Duration
  type: 'note' | 'rest'
}
