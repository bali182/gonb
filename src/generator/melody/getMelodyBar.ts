import { semitones } from '@tonaljs/interval'
import { AtBar, AtItem, AtNote } from '../../alphaTex/alphaTex'
import {
  getRandomWeightedElement,
  isNil,
  randomElement,
  WeightedItem,
} from '../../common/utils'
import { GeneratorConfig } from '../../state/types'
import { MelodyBarInput } from './types'
import { distance } from '@tonaljs/note'
import { RhythmItem } from '../rhythm/types'
import { ProgressionChord } from '../progression/types'
import { Clef } from '../../common/clef'

type MelodyNoteType = 'chord-tone' | 'chord-scale' | 'random'
type MelodyNoteDistanceType = 'closest' | 'close' | 'random'

const MIDDLE_NOTE_TYPES: WeightedItem<MelodyNoteType>[] = [
  { value: 'chord-tone', weight: 50 },
  { value: 'chord-scale', weight: 100 },
  { value: 'random', weight: 1 },
]

const MIDDLE_NOTE_DISTANCES: WeightedItem<MelodyNoteDistanceType>[] = [
  { value: 'closest', weight: 100 },
  { value: 'close', weight: 50 },
]

const distanceComparator =
  (note: string) =>
  (a: string, b: string): number => {
    const aDist = Math.abs(semitones(distance(note, a)))
    const bDist = Math.abs(semitones(distance(note, b)))
    return aDist - bDist
  }

function listClosest(note: string, notes: string[]): string[] {
  const withoutNote = notes.filter((n) => n !== note)
  // Only one note, nothing to do
  if (withoutNote.length === 0) {
    return [note]
  }
  const closest = withoutNote.sort(distanceComparator(note))
  return closest.length === 0 ? [note] : closest
}

function findLast<T>(items: T[], predicate: (item: T) => boolean): T {
  const list = Array.from(items).reverse()
  const item = list.find(predicate)
  if (isNil(item)) {
    throw new Error('No last item found')
  }
  return item
}

function findLastNote(a: AtItem[]): AtNote {
  return findLast(a, (e: AtItem) => e.type === 'note') as AtNote
}

export function getMelodyBar(
  config: GeneratorConfig,
  input: MelodyBarInput[],
  bars: AtBar[],
  index: number,
): AtBar {
  const previous = bars[index - 1]
  const current = input[index]!
  const next = input[index + 1]

  const isFirstBar = index === 0
  const isLastBar = isNil(next)

  const items: AtItem[] = []

  for (let i = 0; i < current.rhythm.length; i += 1) {
    const rhythm = current.rhythm[i]!
    // Get rests out of the way
    if (rhythm.type === 'rest') {
      items.push({ type: 'rest', duration: rhythm.duration })
      continue
    }

    const isFirstNoteOfChord = i === 0
    const isLastNoteOfChord = i === current.rhythm.length - 1

    // Very first note, start it on a chord tone
    if (isFirstNoteOfChord && isFirstBar) {
      items.push(getFirstNoteOfFirstBar(rhythm, current, config))
      continue
    }

    // First note in second, third, etc bar, find the closest chord tone
    // to the previous bars last note, so the transition is smooth.
    if (isFirstNoteOfChord && !isFirstBar) {
      items.push(getFirstNoteInNonFirstBar(rhythm, current, previous, config))
      continue
    }

    // Last note of the bar, let's find note close to a chord tone
    // of the next chord.
    if (isLastNoteOfChord && !isLastBar) {
      items.push(getLastNoteOfBar(rhythm, next, config))
      continue
    }

    items.push(
      getMiddleNoteOfBar(rhythm, current, config, findLastNote(items).note),
    )
  }

  return { items }
}

function getFirstNoteOfFirstBar(
  rhythm: RhythmItem,
  current: MelodyBarInput,
  config: GeneratorConfig,
): AtItem {
  const note =
    config.clef === Clef.BASS
      ? current.chord.bassMelodyNote!
      : randomElement(current.chord.triadMelodyNotes)!
  return { type: 'note', duration: rhythm.duration, note }
}

function getFirstNoteInNonFirstBar(
  rhythm: RhythmItem,
  current: MelodyBarInput,
  previous: AtBar | undefined,
  config: GeneratorConfig,
): AtNote {
  const lastNoteOfPreviousBar = findLastNote(previous?.items ?? [])
  const note =
    config.clef === Clef.BASS
      ? current.chord.bassMelodyNote!
      : listClosest(
          lastNoteOfPreviousBar.note,
          current.chord.triadMelodyNotes,
        )[0]!
  return { type: 'note', duration: rhythm.duration, note }
}

function getPossibleMelodyNotes(
  type: MelodyNoteType,
  chord: ProgressionChord,
  config: GeneratorConfig,
): string[] {
  switch (type) {
    case 'chord-tone':
      return chord.seventhMelodyNotes
    case 'chord-scale':
      return chord.scaleMelodyNotes
    case 'random':
      return config.notes
  }
}

function getMelodyNotesByDistance(
  reference: string,
  type: MelodyNoteDistanceType,
  notes: string[],
): string[] {
  switch (type) {
    case 'closest':
      return [listClosest(reference, notes)[0]!]
    case 'close':
      // TODO check if this is enough granularity
      return listClosest(reference, notes).slice(0, 3)
    case 'random':
      return notes
  }
}

function getMiddleNoteOfBar(
  rhythm: RhythmItem,
  current: MelodyBarInput,
  config: GeneratorConfig,
  lastNote: string,
): AtNote {
  const noteType = getRandomWeightedElement(MIDDLE_NOTE_TYPES)
  const distanceType = getRandomWeightedElement(MIDDLE_NOTE_DISTANCES)
  const options = getPossibleMelodyNotes(noteType, current.chord, config)
  const narrowedOptions = getMelodyNotesByDistance(
    lastNote,
    distanceType,
    options,
  )
  const note = randomElement(narrowedOptions)!
  return { type: 'note', duration: rhythm.duration, note }
}

function getLastNoteOfBar(
  rhythm: RhythmItem,
  next: MelodyBarInput,
  config: GeneratorConfig,
): AtNote {
  const randomNextChordTone =
    config.clef === Clef.BASS
      ? next.chord.bassMelodyNote!
      : randomElement(next.chord.triadMelodyNotes)!
  const closest = listClosest(randomNextChordTone, config.notes)[0]!
  return { type: 'note', duration: rhythm.duration, note: closest }
}
