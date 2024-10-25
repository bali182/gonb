import { majorKey } from '@tonaljs/key'
import { GeneratorConfig } from '../../state/types'
import { ProgressionChord, SecondaryDominants } from './types'
import { getChord } from './utils'
import { get } from '@tonaljs/scale'

export function getSecondaryDominants(
  config: GeneratorConfig,
  chords: ProgressionChord[],
): SecondaryDominants {
  const secondaryDominants = new Map<ProgressionChord, ProgressionChord>()
  for (const chord of chords) {
    if (chord.triadName.includes('dim')) {
      continue
    }
    const triadName = chord.triad[2]!
    const seventhName = `${triadName}7`
    if (
      chords.some(
        (c) => c.triadName === triadName && c.seventhName === seventhName,
      )
    ) {
      continue
    }
    const scale = get(`${triadName} mixolydian`).notes
    const secondaryDominant = getChord(
      scale,
      triadName,
      seventhName,
      'SecondaryDominant',
      config.notes,
    )
    if (secondaryDominant.triadMelodyNotes.length > 0) {
      secondaryDominants.set(chord, secondaryDominant)
    }
  }
  return secondaryDominants
}
