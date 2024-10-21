import { Chord, Note } from 'tonal'
import { GeneratorConfig2 } from '../../state/types'
import {
  TonalJsHarmonicFunction,
  ProgressionChord,
  ChordsHarmonicFunction,
} from './types'

export function asHarmonicFunction(
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

export function getChordMelodyNotes(
  chordNotes: string[],
  melodyNotes: Set<string>,
): string[] {
  return chordNotes.flatMap((note) => {
    if (melodyNotes.has(note)) {
      return [note]
    }
    const enharmonic = Note.enharmonic(note)
    if (melodyNotes.has(enharmonic)) {
      return [enharmonic]
    }
    return []
  })
}

export function getMelodyNotesInRange(config: GeneratorConfig2): Set<string> {
  return new Set(config.notes.map((note) => Note.pitchClass(note)))
}

export function getChord(
  triadName: string,
  seventhName: string,
  fn: ChordsHarmonicFunction,
  melodyNotes: Set<string>,
): ProgressionChord {
  const seventh = Chord.get(seventhName)
  const triad = Chord.get(triadName)
  return {
    seventhName: seventhName,
    triadName: triadName,
    seventh: seventh.notes,
    triad: triad.notes,
    triadMelodyNotes: getChordMelodyNotes(triad.notes, melodyNotes),
    seventhMelodyNotes: getChordMelodyNotes(seventh.notes, melodyNotes),
    harmonicFunction: fn,
  }
}

export function getClosestChordVoicing(
  reference: string[],
  chord: string[],
): string[] {
  const referenceMidi: (number | undefined)[] = reference.map(
    (note) => Note.midi(note)!,
  )
  const referenceAbsMidi: (number | undefined)[] = referenceMidi.map(
    (midi) => midi! % 12,
  )
  const result = new Array<number>(chord.length)

  // First find the shared notes and put them in the correct position
  for (let i = 0; i < chord.length; i += 1) {
    const note = chord[i]!
    const noteMidi = Note.midi(note)!
    const noteAbsMidi = noteMidi % 12
    const matchingNoteIndex = referenceAbsMidi.indexOf(noteAbsMidi)
    if (matchingNoteIndex >= 0) {
      result[i] = referenceMidi[i]!
      referenceMidi[i] = undefined
      referenceAbsMidi[i] = undefined
    }
  }

  // TODO find the rest
  // ...
  return result.map((midi) => Note.fromMidi(midi))
}
