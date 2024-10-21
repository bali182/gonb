import { isNil, randomElement } from '../../model/utils'
import { GeneratorConfig2 } from '../../state/types'
import { getChordFunctionSequence } from './getChordFunctionSequence'
import { getDiatonicChords } from './getDiatonicChords'
import { getPossibleTemplates } from './getPossibleTemplates'
import { getSecondaryDominants } from './getSecondaryDominants'
import { ChordsHarmonicFunction, ProgressionChord } from './types'

function groupByFunction(
  chords: ProgressionChord[],
): Map<ChordsHarmonicFunction, ProgressionChord[]> {
  const map = new Map<ChordsHarmonicFunction, ProgressionChord[]>()
  const functions: ChordsHarmonicFunction[] = [
    'Tonic',
    'SubDominant',
    'Dominant',
  ]
  for (const fn of functions) {
    map.set(
      fn,
      chords.filter((c) => c.harmonicFunction === fn),
    )
  }

  return map
}

export function getChordProgression(config: GeneratorConfig2) {
  const chords = getDiatonicChords(config)
  const secondaryDominants = getSecondaryDominants(config, chords)
  const templates = getPossibleTemplates(config, chords, secondaryDominants)
  const sequence = getChordFunctionSequence(config, templates)
  const byFunction = groupByFunction(chords)

  const progression: ProgressionChord[] = []
  for (let i = 0; i < sequence.length; i += 1) {
    const fn = sequence[i]!
    if (fn === 'SecondaryDominant') {
      const next = sequence[i + 1]
      if (isNil(next)) {
        throw new Error('Secondary dominant cannot be the last chord')
      }
      if (next === 'SecondaryDominant') {
        throw new Error('Consequitive secondary dominants are not supported')
      }
      const hasSd = chords.filter((chord) => secondaryDominants.has(chord))
      const nextChord = randomElement(hasSd)
      if (isNil(nextChord)) {
        throw new Error(`No secondary dominant for chord function "${next}"`)
      }
      const sd = secondaryDominants.get(nextChord)!
      progression.push(sd, nextChord)
      i += 1
    } else {
      const selection = byFunction.get(fn)!
      progression.push(randomElement(selection)!)
    }
  }

  console.log(progression)
  return progression
}
