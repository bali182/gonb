import { GeneratorConfig2 } from '../../state/types'
import { ProgressionChord, SecondaryDominants } from './types'
import { getChord, getMelodyNotesInRange } from './utils'

export function getSecondaryDominants(
  config: GeneratorConfig2,
  chords: ProgressionChord[],
): SecondaryDominants {
  const secondaryDominants = new Map<ProgressionChord, ProgressionChord>()
  const melodyNotes = getMelodyNotesInRange(config)
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
    const secondaryDominant = getChord(
      triadName,
      seventhName,
      'SecondaryDominant',
      melodyNotes,
    )
    if (secondaryDominant.triadMelodyNotes.length > 0) {
      secondaryDominants.set(chord, secondaryDominant)
    }
  }
  return secondaryDominants
}
