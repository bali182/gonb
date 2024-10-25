import { enharmonic, fromMidi, midi, pitchClass } from '@tonaljs/note'
import { get as getScale } from '@tonaljs/scale'
import { KeySignature } from './keySignature'

export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function noop() {}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null && input !== undefined
}

export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
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

export function findInIterable<T>(
  iterable: Iterable<T>,
  predicate: (item: T) => boolean,
): T | undefined {
  for (const item of iterable) {
    if (predicate(item)) {
      return item
    }
  }
  return undefined
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
  [KeySignature.Eb_MAJOR_C_MINOR_3_FLATS]: 'Eb major',
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
  const scaleNotes = getScale(scaleName).notes
  const lowMidi = midi(lowNote)
  const highMidi = midi(highNote)
  if (isNil(lowMidi) || isNil(highMidi)) {
    throw new Error('Invalid low or high note')
  }
  const notes: string[] = []
  for (let midi = lowMidi; midi <= highMidi; midi++) {
    const noteName = fromMidi(midi)
    const notePitchClass = pitchClass(noteName)

    const ehNoteName = enharmonic(noteName)
    const ehPitchClass = pitchClass(ehNoteName)

    if (scaleNotes.includes(notePitchClass)) {
      notes.push(noteName)
    }
    if (ehNoteName !== noteName && scaleNotes.includes(ehPitchClass)) {
      notes.push(ehNoteName)
    }
  }
  return notes
}

export function lerp(start: number, end: number, ratio: number): number {
  return Math.floor((1 - ratio) * start + ratio * end)
}

export function moveUp<T>(arr: T[], index: number): T[] {
  if (index <= 0 || index >= arr.length) {
    return [...arr]
  }
  const newArr = [...arr]
  const temp = newArr[index]!
  newArr[index] = newArr[index - 1]!
  newArr[index - 1] = temp
  return newArr
}

export function removeByIndex<T>(arr: T[], index: number): T[] {
  return arr.slice(0, index).concat(arr.slice(index + 1))
}

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = Array.from(array)
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]!,
  )
  return newArray
}

export function moveDown<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length - 1) {
    return [...arr]
  }
  const newArr = [...arr]
  const temp = newArr[index]!
  newArr[index] = newArr[index + 1]!
  newArr[index + 1] = temp
  return newArr
}

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) {
    return true
  }
  if (a == null || b == null) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

export type WeightedItem<T> = {
  value: T
  weight: number
}

export function getRandomWeightedElement<T>(elements: WeightedItem<T>[]): T {
  // Calculate the total weight
  const totalWeight = elements.reduce((sum, element) => sum + element.weight, 0)

  // Generate a random number between 0 and totalWeight
  const random = Math.random() * totalWeight

  // Iterate through the array to find the random element
  let cumulativeWeight = 0
  for (const { value, weight } of elements) {
    cumulativeWeight += weight
    if (random < cumulativeWeight) {
      return value
    }
  }

  // Fallback return statement, this should never be reached
  // because the random number is always less than totalWeight
  throw new Error('Should never reach here if input is valid')
}

export function midiComparator(noteA: string, noteB: string): number {
  const midiA = midi(noteA) ?? Infinity
  const midiB = midi(noteB) ?? Infinity
  return midiA - midiB
}

export function matchesPitchClass(
  reference: string,
  pitchedNote: string,
): boolean {
  const pc = pitchClass(pitchedNote)
  const eh = enharmonic(pc)
  return pc === reference || eh === reference
}
