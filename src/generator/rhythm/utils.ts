import { Duration } from '../../common/duration'
import { DurationFrequency } from '../../common/durationFrequency'
import { DurationType } from '../../common/durationType'
import { WeightedItem } from '../../common/utils'
import {
  DurationConfig,
  DurationData,
  GeneratorConfig,
} from '../../state/types'
import { asFraction } from './asFraction'
import { DurationCluster } from './types'

const NoteFrequencies: Record<DurationFrequency, number> = {
  [DurationFrequency.FREQUENT]: 1000,
  [DurationFrequency.MODERATE]: 500,
  [DurationFrequency.INFREQUENT]: 100,
}

const RestFrequencies: Record<DurationFrequency, number> = {
  [DurationFrequency.FREQUENT]: 100,
  [DurationFrequency.MODERATE]: 50,
  [DurationFrequency.INFREQUENT]: 10,
}

function getClusters(
  config: DurationConfig,
  type: DurationType,
): WeightedItem<DurationCluster>[] {
  const items: WeightedItem<DurationCluster>[] = []
  const pairs = Object.entries(config) as [Duration, DurationData][]
  const weights = type === DurationType.NOTE ? NoteFrequencies : RestFrequencies
  for (const [duration, { cluster, frequency }] of pairs) {
    const clusterLength = asFraction(duration, cluster)
    const clusterWeight = weights[frequency]
    const clusterItem: DurationCluster = {
      duration,
      cluster,
      type,
      length: clusterLength,
    }
    items.push({ value: clusterItem, weight: clusterWeight })

    if (cluster > 1) {
      const length = asFraction(duration)
      const item: DurationCluster = { cluster: 1, duration, length, type }
      items.push({ value: item, weight: 1 })
    }
  }

  return items
}

export function getDurationClusters(
  config: GeneratorConfig,
): WeightedItem<DurationCluster>[] {
  return [
    ...getClusters(config.noteDurations, DurationType.NOTE),
    ...getClusters(config.restDurations, DurationType.REST),
  ].sort((a, b) => a.weight - b.weight)
}
