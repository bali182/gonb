import Fraction from 'fraction.js'
import { GeneratorConfig2 } from '../../state/types'
import { RhythmItem } from './types'
import { Duration } from '../../model/common'
import { asFraction } from './asFraction'
import { lte } from './utils'
import { randomElement } from '../../model/utils'

const BAR_LENGTH = new Fraction(1, 1)
const NOTE_CHANCE = 0.9

function getAvailableDurations(
  durations: Duration[],
  length: Fraction,
  barLength: Fraction,
): Duration[] {
  return durations.filter((duration) =>
    lte(length.add(asFraction(duration)), barLength),
  )
}

export function getBarRhythm(config: GeneratorConfig2): RhythmItem[] {
  const { noteDurations, restDurations } = config
  const items: RhythmItem[] = []
  let length = new Fraction(0, 1)
  let index = 0
  while (length.compare(BAR_LENGTH) != 0) {
    const notes = getAvailableDurations(noteDurations, length, BAR_LENGTH)
    const rests = getAvailableDurations(restDurations, length, BAR_LENGTH)
    if (notes.length === 0 && rests.length === 0) {
      const { n, d } = BAR_LENGTH.sub(length)
      throw new Error(
        `${n}/${d} duration remains, but no rhytms fit (notes: ${noteDurations}, rests: ${restDurations}`,
      )
    }

    let type: RhythmItem['type'] = undefined!
    let array: Duration[] = []

    if (notes.length > 0 && rests.length > 0) {
      type = index === 0 || Math.random() < NOTE_CHANCE ? 'note' : 'rest'
      array = type === 'note' ? notes : rests
    }
    if (notes.length > 0 && rests.length === 0) {
      type = 'note'
      array = notes
    }
    if (notes.length === 0 && rests.length > 0) {
      type = 'rest'
      array = rests
    }

    const value = randomElement(array)!
    items.push({ duration: value, type })
    length = length.add(asFraction(value))
    index += 1
  }

  return items
}
