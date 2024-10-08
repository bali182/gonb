import { distance, Interval, Note, Scale, transpose } from 'tonal'
import { AtBar, AtItem, AtNote } from './alphaTex'
import { Clef, KeySignature } from './common'
import {
  randomHalfNotes,
  randomQuarterNotes,
  randomWholeNote,
} from './melodies/randomNoVariation'
import { FragmentBar, FragmentItem, MelodyType } from './melodyFragment'
import {
  findMin,
  isNil,
  randomElement,
  randomIn as randomInRange,
} from './utils'
import { melodies } from './melodies/melodies'
import { GeneratorConfig } from '../state/types'

function getFragments(type: MelodyType): FragmentBar[] {
  switch (type) {
    case 'WHOLE_NOTES':
      return randomWholeNote
    case 'HALF_NOTES':
      return randomHalfNotes
    case 'QUARTER_NOTES':
      return randomQuarterNotes
    case 'MELODY':
      return melodies
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
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'Cb major',
}

function getRangeByFrets(
  lowString: string,
  highString: string,
  firstFret: number,
  lastFret: number,
): [string, string] {
  const lowNote = transpose(lowString, Interval.fromSemitones(firstFret))
  const highNote = transpose(highString, Interval.fromSemitones(lastFret))
  return [lowNote, highNote]
}

function getRange(
  clef: Clef,
  firstFret: number,
  lastFret: number,
): [string, string] {
  switch (clef) {
    case Clef.BASS: {
      return getRangeByFrets('E1', 'G2', firstFret, lastFret)
    }
    case Clef.TREBLE: {
      return getRangeByFrets('E2', 'E4', firstFret, lastFret)
    }
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

function scaleToString(scale: string[]): string {
  if (scale.length < 9) {
    return scale.toString()
  }
  const first8Notes = scale.slice(0, 8)
  const lastNote = getNoteAtIndex(scale, scale.length - 1)
  return `[${first8Notes.join(', ')}, ... ${lastNote}]`
}

function getNoteIndex(note: string, scale: string[]): number {
  const index = scale.indexOf(note)
  if (index < 0) {
    throw new Error(`${note} is not in scale ${scaleToString(scale)}`)
  }
  return index
}

function getNoteAtIndex(scale: string[], index: number): string {
  if (index < 0) {
    debugger
    throw new Error(`Note index cannot be ${index}`)
  }
  if (index >= scale.length) {
    debugger
    throw new Error(`Note index cannot be >= ${scale.length} (was ${index})`)
  }
  const note = scale[index]
  if (isNil(note)) {
    throw new Error(`Note at index ${index} was ${note}`)
  }
  return note
}

function getFragmentNote(
  scale: string[],
  _lowestNote: string,
  _highestNote: string,
  previousNote: string,
  item: FragmentItem,
): AtItem {
  if (item.type === 'rest') {
    return { type: 'rest', duration: item.duration }
  }
  const previousIndex = getNoteIndex(previousNote, scale)
  const { duration, steps } = item
  switch (steps) {
    // Random note in the scale
    case 'RANDOM_SCALE': {
      const noteIndex = randomInRange(
        Math.max(0, previousIndex - 8),
        Math.min(scale.length - 1, previousIndex + 8),
      )
      const note = getNoteAtIndex(scale, noteIndex)
      return { type: 'note', duration, note }
    }
    default: {
      const index = previousIndex + steps
      const note = getNoteAtIndex(scale, index)
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
  const hasRandomElement = fragment.items.some(
    (item) => item.type === 'note' && item.steps === 'RANDOM_SCALE',
  )
  // Can't do much with random, let it pass.
  if (hasRandomElement) {
    return true
  }
  let index = getNoteIndex(previousNote, scale)
  for (const item of fragment.items) {
    if (item.type === 'rest') {
      continue
    }
    if (item.steps === 'RANDOM_SCALE') {
      continue
    }
    index += item.steps
    if (index < 0 || index >= scale.length) {
      return false
    }
  }
  return index >= 0 && index < scale.length
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

function shiftRandomlyBySemitones(bar: AtBar): AtBar {
  const newItems = bar.items.map((item): AtItem => {
    if (item.type === 'note' && Math.random() > 0.8) {
      return {
        ...item,
        note: transpose(
          item.note,
          Interval.fromSemitones(randomElement([1, -1])!),
        ),
      }
    }
    return item
  })
  return { items: newItems }
}

function getLastNote(bar: AtBar): string {
  const notes = bar.items.filter((item): item is AtNote => item.type === 'note')
  if (notes.length === 0) {
    throw new Error(`No notes in bar: ${JSON.stringify(bar)}`)
  }
  const lastNote = notes[notes.length - 1]?.note
  if (isNil(lastNote)) {
    throw new Error(`Last note is missing: ${JSON.stringify(bar)}`)
  }
  return lastNote
}

function getNextStartingNote(lastNote: string, scale: string[]): string {
  const closesScaleNote = findMin(scale, (note) =>
    Math.abs(Interval.semitones(distance(lastNote, note))),
  )

  const index = getNoteIndex(closesScaleNote, scale)
  const randomNumber = Math.random()
  if (randomNumber < 0.33 && index > 0) {
    return getNoteAtIndex(scale, index - 1)
  } else if (
    randomNumber > 0.33 &&
    randomNumber < 0.66 &&
    index < scale.length - 1
  ) {
    return getNoteAtIndex(scale, index + 1)
  } else {
    return closesScaleNote
  }
}

// TODO this mutates
function addNoteLabels(bars: AtBar[]): AtBar[] {
  for (const bar of bars) {
    for (const item of bar.items) {
      if (item.type === 'note') {
        item.label = Note.pitchClass(item.note)
      }
    }
  }
  return bars
}

export function getRandomMelody(config: GeneratorConfig): AtBar[] {
  const {
    clef,
    type,
    keySignature,
    barCount,
    firstFret,
    lastFret,
    semitones,
    showNoteNames,
  } = config
  const [lowestNote, highestNote] = getRange(clef, firstFret, lastFret)
  const fragments = getFragments(type)
  const scale = getScaleNotesInRange(keySignature, lowestNote, highestNote)
  const bars: AtBar[] = []

  let lastNote = randomElement(scale)!

  for (let i = 0; i < barCount; i += 1) {
    const matchingFragments = fragments.filter((fragment) =>
      fitsInRange(scale, lastNote, fragment),
    )

    if (matchingFragments.length === 0) {
      throw new Error(
        `No matching melody fragments (${lastNote},  ${scaleToString(scale)})`,
      )
    }

    const bar = getMelodyBar(
      scale,
      lowestNote,
      highestNote,
      lastNote,
      randomElement(matchingFragments)!,
    )

    lastNote = getNextStartingNote(getLastNote(bar), scale)

    bars.push(semitones ? shiftRandomlyBySemitones(bar) : bar)
  }

  return showNoteNames ? addNoteLabels(bars) : bars
}
