import { Note, Scale } from 'tonal'
import { AtBar, AtItem } from './alphaTex'
import { Clef, KeySignature } from './common'
import {
  randomHalfNotes,
  randomQuarterNotes,
  randomWholeNote,
} from './melodies/randomNoVariation'
import { FragmentBar, FragmentItem, MelodyType } from './melodyFragment'
import { isNil, randomElement, randomIn as randomInRange } from './utils'

function getFragments(type: MelodyType): FragmentBar[] {
  switch (type) {
    case 'WHOLE_NOTES':
      return [randomWholeNote]
    case 'HALF_NOTES':
      return [randomHalfNotes]
    case 'QUARTER_NOTES':
      return [randomQuarterNotes]
    case 'MELODY':
      return []
  }
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
}

function getRange(clef: Clef): [string, string] {
  switch (clef) {
    case Clef.BASS:
      return ['E2', 'G4']
    case Clef.TREBLE:
      return ['E6', 'E3']
  }
}

function getScaleNotesInRange(
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

function getFragmentNote(
  scale: string[],
  lowestNote: string,
  highestNote: string,
  previousNote: string,
  item: FragmentItem,
): AtItem {
  if (item.type === 'rest') {
    return { type: 'rest', duration: item.duration }
  }
  const previousIndex = scale.indexOf(previousNote)
  const { duration, steps, shift } = item
  switch (steps) {
    // Random note in the scale
    case 'RANDOM_SCALE': {
      const noteIndex = randomInRange(
        Math.max(0, previousIndex - 8),
        Math.min(scale.length - 1, previousIndex + 8),
      )
      const note = scale[noteIndex]!
      return { type: 'note', duration, note }
    }
    // Fully random note
    case 'RANDOM': {
      const previousMidi = Note.midi(previousNote)
      const lowestMidi = Note.midi(lowestNote)
      const highestMidi = Note.midi(highestNote)
      if (isNil(previousMidi) || isNil(lowestMidi) || isNil(highestMidi)) {
        throw new Error('Invalid note input')
      }
      const minMidi = Math.max(lowestMidi, previousMidi - 12)
      const maxMidi = Math.min(highestMidi, previousMidi + 12)
      const note = Note.fromMidi(randomInRange(minMidi, maxMidi))
      return { type: 'note', duration, note }
    }
    default: {
      const index = previousIndex + steps
      const note = scale[index]!
      // TODO shift
      return { type: 'note', duration, note }
    }
  }
}

function fitsInRange(
  scale: string[],
  previousNote: string,
  fragment: FragmentBar,
): boolean {
  return fragment.items.every((item) => {
    if (item.type === 'rest') {
      return true
    }
    if (item.steps === 'RANDOM' || item.steps === 'RANDOM_SCALE') {
      return true
    }
    const noteIndex = scale.indexOf(previousNote) + item.steps
    return noteIndex >= 0 && noteIndex < scale.length - 1
  })
}

function getMelodyBar(
  scale: string[],
  lowestNote: string,
  highestNote: string,
  previousNote: string,
  fragment: FragmentBar,
): AtBar {
  const items: AtItem[] = []
  let lastNote = previousNote
  for (const fragItem of fragment.items) {
    const atItem = getFragmentNote(
      scale,
      lowestNote,
      highestNote,
      lastNote,
      fragItem,
    )
    if (atItem.type === 'note') {
      lastNote = atItem.note
    }
    items.push(atItem)
  }

  return { items }
}

function getLastNote(bar: AtBar): string {
  return bar.items.filter((item) => item.type === 'note').pop()!.note
}

export function getRandomMelody(
  type: MelodyType,
  barCount: number,
  keySignature: KeySignature,
  clef: Clef,
): AtBar[] {
  const [lowestNote, highestNote] = getRange(clef)
  const fragments = getFragments(type)
  const scale = getScaleNotesInRange(keySignature, lowestNote, highestNote)
  let lastNote = randomElement(scale)!
  const bars: AtBar[] = []

  for (let i = 0; i < barCount; i += 1) {
    const matchingFragments = fragments.filter((fragment) =>
      fitsInRange(scale, lastNote, fragment),
    )
    const bar = getMelodyBar(
      scale,
      lowestNote,
      highestNote,
      lastNote,
      randomElement(matchingFragments)!,
    )
    lastNote = getLastNote(bar)
    bars.push(bar)
  }

  return bars
}
