import { GeneratorConfig } from '../../state/types'
import { getBarRhythm } from './getBarRhythm'
import { RhythmItem } from './types'
import { getDurationClusters } from './utils'

export function getRhythm(config: GeneratorConfig): RhythmItem[][] {
  const durations: RhythmItem[][] = []
  const clusters = getDurationClusters(config)
  for (let i = 0; i < config.bars; i += 1) {
    durations.push(getBarRhythm(config, clusters))
  }
  return durations
}
