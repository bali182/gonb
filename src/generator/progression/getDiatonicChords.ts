import { Key } from 'tonal'
import { GeneratorConfig2 } from '../../state/types'
import { ProgressionChord, TonalJsHarmonicFunction } from './types'
import { asHarmonicFunction, getChord, getMelodyNotesInRange } from './utils'

export function getDiatonicChords(
  config: GeneratorConfig2,
): ProgressionChord[] {
  const key = Key.majorKey(config.keySignature)
  const allMelodyNotes = getMelodyNotesInRange(config)
  const harmonicFns = key.chordsHarmonicFunction as TonalJsHarmonicFunction[]
  return key.triads
    .map((triad, i) =>
      getChord(
        triad,
        key.chords[i]!,
        asHarmonicFunction(harmonicFns[i]!),
        allMelodyNotes,
      ),
    )
    .filter((chord) => chord.triadMelodyNotes.length > 0)
}
