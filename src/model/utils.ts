import { Note, Scale } from 'tonal'
import { Duration, KeySignature } from './common'
import {
  FragmentBar,
  FragmentInterval,
  FragmentItem,
  FragmentNote,
  FragmentRest,
} from './melodyFragment'

export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function noop() {}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null || input !== undefined
}

export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function bar(...items: FragmentItem[]): FragmentBar {
  return {
    items,
  }
}

export function note(
  duration: Duration,
  steps: FragmentInterval,
  shift?: number,
): FragmentNote {
  return {
    type: 'note',
    duration,
    steps,
    shift,
  }
}

export function rest(duration: Duration): FragmentRest {
  return {
    type: 'rest',
    duration,
  }
}

export function findMin<T>(arr: T[], transform: (item: T) => number): T {
  if (arr.length === 0) {
    throw new TypeError(`Can't find the minimum in an empty array!`)
  }

  let minValue = arr[0]
  let minTransformed = transform(arr[0]!)

  for (let i = 1; i < arr.length; i++) {
    const transformedValue = transform(arr[i]!)
    if (transformedValue < minTransformed) {
      // Compare the transformed values
      minValue = arr[i]
      minTransformed = transformedValue
    }
  }

  return minValue!
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw 'Invalid chunk size'
  }
  const output = []
  for (let i = 0, len = array.length; i < len; i += chunkSize) {
    output.push(array.slice(i, i + chunkSize))
  }
  return output
}

const ScaleNameMap: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C major',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G major',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D major',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A major',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E major',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B major',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]: 'F# major',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]: 'C# major',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F major',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'Bb major',
  [KeySignature.Eb_MAJOR_C_MINOR_2_FLATS]: 'Eb major',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'Ab major',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'Db major',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'Gb major',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'Cb major',
}

export function getScaleNotesInRange(
  keySignature: KeySignature,
  lowNote: string,
  highNote: string,
): string[] {
  const scaleName = ScaleNameMap[keySignature]
  const scaleNotes = Scale.get(scaleName).notes
  const lowMidi = Note.midi(lowNote)
  const highMidi = Note.midi(highNote)
  if (isNil(lowMidi) || isNil(highMidi)) {
    throw new Error('Invalid low or high note')
  }
  const notes: string[] = []
  for (let midi = lowMidi; midi <= highMidi; midi++) {
    const noteName = Note.fromMidi(midi)
    const pitchClass = Note.pitchClass(noteName)

    const ehNoteName = Note.enharmonic(noteName)
    const ehPitchClass = Note.pitchClass(ehNoteName)

    if (scaleNotes.includes(pitchClass)) {
      notes.push(noteName)
    }
    if (ehNoteName !== noteName && scaleNotes.includes(ehPitchClass)) {
      notes.push(ehNoteName)
    }
  }
  return notes
}
