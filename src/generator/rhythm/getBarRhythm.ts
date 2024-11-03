import Fraction from 'fraction.js'
import { GeneratorConfig } from '../../state/types'
import { DurationCluster, RhythmItem } from './types'
import { getRandomWeightedElement, WeightedItem } from '../../common/utils'
import { getDurationClusters } from './utils'

const BAR_LENGTH = new Fraction(1, 1)

function getAvailableDurationClusters(
  clusters: WeightedItem<DurationCluster>[],
  length: Fraction,
  barLength: Fraction,
): WeightedItem<DurationCluster>[] {
  return clusters.filter(({ value }) => length.add(value.length).lte(barLength))
}

export function getBarRhythm(
  config: GeneratorConfig,
  clusters: WeightedItem<DurationCluster>[],
): RhythmItem[] {
  const items: RhythmItem[] = []
  let length = new Fraction(0, 1)
  while (length.lt(BAR_LENGTH)) {
    const available = getAvailableDurationClusters(clusters, length, BAR_LENGTH)
    if (available.length === 0) {
      const { n, d } = BAR_LENGTH.sub(length)
      const ns = Object.keys(config.noteDurations)
      const rs = Object.keys(config.restDurations)
      throw new Error(
        `${n}/${d} duration remains, but no rhytms fit (notes: ${ns}, rests: ${rs}`,
      )
    }
    const item = getRandomWeightedElement(available)
    for (let i = 0; i < item.cluster; i += 1) {
      items.push({ duration: item.duration, type: item.type })
    }
    length = length.add(item.length)
  }

  return items
}
