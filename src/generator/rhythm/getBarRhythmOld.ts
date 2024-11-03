import Fraction from 'fraction.js'
import { GeneratorConfig } from '../../state/types'
import { RhythmItem } from './types'
import { asFraction } from './asFraction'
import { randomElement } from '../../common/utils'
import { Duration } from '../../common/duration'
import { DurationType } from '../../common/durationType'

const BAR_LENGTH = new Fraction(1, 1)
const NOTE_CHANCE = 0.9

function getAvailableDurations(
  durations: Duration[],
  length: Fraction,
  barLength: Fraction,
): Duration[] {
  return durations.filter((duration) =>
    length.add(asFraction(duration)).lte(barLength),
  )
}

export function getBarRhythm(config: GeneratorConfig): RhythmItem[] {
  const noteDurations = Object.keys(config.noteDurations) as Duration[]
  const restDurations = Object.keys(config.noteDurations) as Duration[]
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

    let type: DurationType = undefined!
    let array: Duration[] = []

    if (notes.length > 0 && rests.length > 0) {
      type =
        index === 0 || Math.random() < NOTE_CHANCE
          ? DurationType.NOTE
          : DurationType.REST
      array = type === DurationType.NOTE ? notes : rests
    }
    if (notes.length > 0 && rests.length === 0) {
      type = DurationType.NOTE
      array = notes
    }
    if (notes.length === 0 && rests.length > 0) {
      type = DurationType.REST
      array = rests
    }

    const value = randomElement(array)!
    items.push({ duration: value, type })
    length = length.add(asFraction(value))
    index += 1
  }

  return items
}
