import { enharmonic, fromMidi, midi, pitchClass } from '@tonaljs/note'
import { get as getTonalChord } from '@tonaljs/chord'
import { GeneratorConfig2 } from '../../state/types'
import {
  TonalJsHarmonicFunction,
  ProgressionChord,
  ChordsHarmonicFunction,
} from './types'
import { MajorKey } from '@tonaljs/key'

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

function midiComparator(noteA: string, noteB: string): number {
  const midiA = midi(noteA) ?? Infinity
  const midiB = midi(noteB) ?? Infinity
  return midiA - midiB
}

export function getChordMelodyNotes(
  chordNotes: readonly string[],
  melodyNotes: string[],
): string[] {
  return chordNotes
    .flatMap((chordNote) =>
      melodyNotes.filter((melodyNote) => {
        const mnPitchClass = pitchClass(melodyNote)
        const mnEnharmonic = enharmonic(mnPitchClass)
        return chordNote === mnPitchClass || chordNote === mnEnharmonic
      }),
    )
    .sort(midiComparator)
}

export function getMelodyNotesInRange(config: GeneratorConfig2): Set<string> {
  return new Set(config.notes.map((note) => pitchClass(note)))
}

export function getChord(
  key: MajorKey,
  triadName: string,
  seventhName: string,
  fn: ChordsHarmonicFunction,
  melodyNotes: string[],
): ProgressionChord {
  const seventh = getTonalChord(seventhName)
  const triad = getTonalChord(triadName)
  return {
    seventhName: seventhName,
    triadName: triadName,
    seventh: seventh.notes,
    triad: triad.notes,
    triadMelodyNotes: getChordMelodyNotes(triad.notes, melodyNotes),
    seventhMelodyNotes: getChordMelodyNotes(seventh.notes, melodyNotes),
    harmonicFunction: fn,
    scale: key.scale as string[],
    scaleMelodyNotes: getChordMelodyNotes(key.scale, melodyNotes),
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
