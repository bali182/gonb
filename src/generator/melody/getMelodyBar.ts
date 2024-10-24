import { semitones } from '@tonaljs/interval'
import { AtBar, AtItem, AtNote } from '../../alphaTex/alphaTex'
import { isNil, randomElement } from '../../model/utils'
import { GeneratorConfig2 } from '../../state/types'
import { MelodyBarInput } from './types'
import { distance } from '@tonaljs/note'

const CHORD_TONE_PERCENTAGE = 0.5
const CLOSEST_PERCENTAGE = 0.8

const distanceComparator =
  (note: string) =>
  (a: string, b: string): number => {
    const aDist = Math.abs(semitones(distance(note, a)))
    const bDist = Math.abs(semitones(distance(note, b)))
    return aDist - bDist
  }

function findClosest(note: string, notes: string[]): string {
  const withoutNote = notes.filter((n) => n !== note)
  // Only one note, nothing to do
  if (withoutNote.length === 0) {
    return note
  }
  const [closest] = withoutNote.sort(distanceComparator(note))
  return isNil(closest) ? note : closest
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
  config: GeneratorConfig2,
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
      items.push({
        type: 'note',
        duration: rhythm.duration,
        note: randomElement(current.chord.triadMelodyNotes)!,
      })
      continue
    }

    // First note in second, third, etc bar, find the closest chord tone
    // to the previous bars last note, so the transition is smooth.
    if (isFirstNoteOfChord && !isFirstBar) {
      const lastNoteOfPreviousBar = findLastNote(previous?.items ?? [])
      const note = findClosest(
        lastNoteOfPreviousBar.note,
        current.chord.triadMelodyNotes,
      )
      items.push({ type: 'note', duration: rhythm.duration, note })
      continue
    }

    // Last note of the bar, let's find note close to a chord tone
    // of the next chord.
    if (isLastNoteOfChord && !isLastBar) {
      const randomNextChordTone = randomElement(next.chord.triadMelodyNotes)!
      const closest = findClosest(randomNextChordTone, config.notes)
      items.push({ type: 'note', duration: rhythm.duration, note: closest })
      continue
    }

    const useChordTone = Math.random() < CHORD_TONE_PERCENTAGE
    const useClosest = Math.random() < CLOSEST_PERCENTAGE
    const lastNoteItem = findLastNote(items)
    const lastNote = lastNoteItem.note

    const array = useChordTone ? current.chord.seventhMelodyNotes : config.notes
    const note = useClosest
      ? findClosest(lastNote, array)
      : randomElement(array)!

    items.push({ type: 'note', duration: rhythm.duration, note })
  }

  return { items }
}
