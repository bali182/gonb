import { enharmonic, fromMidi, midi, pitchClass } from '@tonaljs/note'
import { Chord, get as getTonalChord } from '@tonaljs/chord'
import { GeneratorConfig } from '../../state/types'
import {
  TonalJsHarmonicFunction,
  ProgressionChord,
  ChordsHarmonicFunction,
} from './types'
import { isNil, matchesPitchClass, midiComparator } from '../../common/utils'

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
  chordNotes: readonly string[],
  melodyNotes: string[],
): string[] {
  return chordNotes
    .flatMap((chordNote) =>
      melodyNotes.filter((melodyNote) =>
        matchesPitchClass(chordNote, melodyNote),
      ),
    )
    .sort(midiComparator)
}

export function getMelodyNotesInRange(config: GeneratorConfig): Set<string> {
  return new Set(config.notes.map((note) => pitchClass(note)))
}

function getBestBassNotes(chord: Chord, melodyNotes: string[]): string[] {
  if (melodyNotes.length === 0) {
    return []
  }
  const rootNote = chord.tonic ?? chord.notes[0]!
  // Check if the root is present in the melody notes, get the lowest if present
  const roots = melodyNotes.filter((note) => matchesPitchClass(rootNote, note))
  if (roots.length > 0) {
    return roots
  }

  // Do the same for the fifth
  const fifthIndex = chord.intervals.findIndex(
    (interval) => interval === '5P' || interval === '5A' || interval === '5d',
  )
  const fifthOfChord = chord.notes[fifthIndex]
  if (!isNil(fifthOfChord)) {
    const fifths = melodyNotes.filter((note) =>
      matchesPitchClass(fifthOfChord, note),
    )
    if (fifths.length > 0) {
      return fifths
    }
  }
  // As a fallback, return any other melody note.
  return melodyNotes
}

export function getChord(
  scale: string[],
  triadName: string,
  seventhName: string,
  fn: ChordsHarmonicFunction,
  melodyNotes: string[],
): ProgressionChord {
  const seventh = getTonalChord(seventhName)
  const triad = getTonalChord(triadName)
  const triadMelodyNotes = getChordMelodyNotes(triad.notes, melodyNotes)
  const bassMelodyNotes = getBestBassNotes(triad, triadMelodyNotes)
  return {
    seventhName: seventhName,
    triadName: triadName,
    seventh: seventh.notes,
    triad: triad.notes,
    harmonicFunction: fn,
    scale: scale,
    bassMelodyNotes: bassMelodyNotes,
    triadMelodyNotes: triadMelodyNotes,
    seventhMelodyNotes: getChordMelodyNotes(seventh.notes, melodyNotes),
    scaleMelodyNotes: getChordMelodyNotes(scale, melodyNotes),
  }
}

export function getClosestChordVoicing(
  reference: string[],
  chord: string[],
): string[] {
  const referenceMidi: (number | undefined)[] = reference.map(
    (note) => midi(note)!,
  )
  const referenceAbsMidi: (number | undefined)[] = referenceMidi.map(
    (midi) => midi! % 12,
  )
  const result = new Array<number>(chord.length)

  // First find the shared notes and put them in the correct position
  for (let i = 0; i < chord.length; i += 1) {
    const note = chord[i]!
    const noteMidi = midi(note)!
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
  return result.map((midi) => fromMidi(midi))
}
