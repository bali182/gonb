import { majorKey } from '@tonaljs/key'
import { GeneratorConfig } from '../../state/types'
import { ProgressionChord, TonalJsHarmonicFunction } from './types'
import { asHarmonicFunction, getChord } from './utils'

export function getDiatonicChords(
  config: GeneratorConfig,
): ProgressionChord[] {
  const key = majorKey(config.keySignature)
  const harmonicFns = key.chordsHarmonicFunction as TonalJsHarmonicFunction[]
  return key.triads
    .map((triad, i) =>
      getChord(
        key,
        triad,
        key.chords[i]!,
        asHarmonicFunction(harmonicFns[i]!),
        config.notes,
      ),
    )
    .filter((chord) => chord.triadMelodyNotes.length > 0)
}
