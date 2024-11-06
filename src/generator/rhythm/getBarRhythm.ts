import Fraction from 'fraction.js'
import { GeneratorConfig } from '../../state/types'
import { DurationCluster, RhythmItem } from './types'
import { getRandomWeightedElement, WeightedItem } from '../../common/utils'
import { DurationType } from '../../common/durationType'

function getAvailableDurationClusters(
  clusters: WeightedItem<DurationCluster>[],
  length: Fraction,
  barLength: Fraction,
  index: number,
): WeightedItem<DurationCluster>[] {
  const values = clusters.filter(({ value }) =>
    length.add(value.length).lte(barLength),
  )
  // TODO For now first note is always a note,
  // rework this when melody generation is touched.
  if (index === 0) {
    return values.filter((val) => val.value.type === DurationType.NOTE)
  }
  return values
}

export function getBarRhythm(
  config: GeneratorConfig,
  clusters: WeightedItem<DurationCluster>[],
): RhythmItem[] {
  const items: RhythmItem[] = []
  let length = new Fraction(0, 1)
  let index = 0
  const barLength = new Fraction(
    config.timeSignature.upper,
    config.timeSignature.lower,
  )
  while (length.lt(barLength)) {
    const available = getAvailableDurationClusters(
      clusters,
      length,
      barLength,
      index,
    )
    if (available.length === 0) {
      const { n, d } = barLength.sub(length)
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
    index += 1
  }

  return items
}
