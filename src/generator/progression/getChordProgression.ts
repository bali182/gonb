import { Chord, Key, Note } from 'tonal'
import { GeneratorConfig2 } from '../../state/types'
import {
  TonalJsHarmonicFunction,
  ProgressionChord,
  ChordsHarmonicFunction,
} from './types'

function asHarmonicFunction(
  fn: TonalJsHarmonicFunction,
): ChordsHarmonicFunction {
  switch (fn) {
    case 'T':
      return 'Tonic'
    case 'SD':
      return 'SubDominant'
    case 'D':
      return 'Dominant'
  }
}

function getChord(
  name: string,
  fn: ChordsHarmonicFunction,
  melodyNotes: Set<string>,
): ProgressionChord {
  const chord = Chord.get(name)
  return {
    name: name,
    notes: chord.notes,
    melodyNotes: chord.notes.flatMap((note) => {
      if (melodyNotes.has(note)) {
        return [note]
      }
      const enharmonic = Note.enharmonic(note)
      if (melodyNotes.has(enharmonic)) {
        return [enharmonic]
      }
      return []
    }),
    harmonicFunction: fn,
  }
}

function getMelodyNotes(config: GeneratorConfig2): Set<string> {
  return new Set(config.notes.map((note) => Note.pitchClass(note)))
}

function getDiatonicChords(config: GeneratorConfig2): ProgressionChord[] {
  const key = Key.majorKey(config.keySignature)
  const allMelodyNotes = getMelodyNotes(config)
  const harmonicFns = key.chordsHarmonicFunction as TonalJsHarmonicFunction[]
  return key.triads
    .map((triad, i) =>
      getChord(triad, asHarmonicFunction(harmonicFns[i]!), allMelodyNotes),
    )
    .filter((chord) => chord.melodyNotes.length > 0)
}

function getSecondaryDominants(
  config: GeneratorConfig2,
  chords: ProgressionChord[],
): Map<ProgressionChord, ProgressionChord> {
  const secondaryDominants = new Map<ProgressionChord, ProgressionChord>()
  const melodyNotes = getMelodyNotes(config)
  for (const chord of chords) {
    if (chord.name.includes('dim')) {
      continue
    }
    const secondaryDominant = getChord(
      chord.notes[2]!,
      'SecondaryDominant',
      melodyNotes,
    )
    if (secondaryDominant.melodyNotes.length > 0) {
      secondaryDominants.set(chord, secondaryDominant)
    }
  }
  return secondaryDominants
}

export function getChordProgression(config: GeneratorConfig2) {
  const chords = getDiatonicChords(config)
  const secondaryDominants = getSecondaryDominants(config, chords)

  console.log({ chords, secondaryDominants })
}
