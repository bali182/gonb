import { Duration } from '../../common/duration'
import { GeneratorConfig } from '../../state/types'
import { getBarRhythm } from './getBarRhythm'
import { RhythmItem } from './types'

export function getRhythm(config: GeneratorConfig): RhythmItem[][] {
  const durations: RhythmItem[][] = []
  const hasWholeNote = config.notes.includes(Duration.WHOLE)
  const randomDurations = hasWholeNote ? config.bars - 1 : config.bars
  for (let i = 0; i < randomDurations; i += 1) {
    durations.push(getBarRhythm(config))
  }
  if (hasWholeNote) {
    durations.push([{ duration: Duration.WHOLE, type: 'note' }])
  }
  return durations
}
