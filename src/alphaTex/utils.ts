import { distance, Interval, Note } from 'tonal'
import { Duration } from '../model/common'
import { AtFrettedNote } from './alphaTex'

export function hasDot(duration: Duration): boolean {
  switch (duration) {
    case Duration.DOTTED_WHOLE:
    case Duration.DOTTED_HALF:
    case Duration.DOTTED_QUARTER:
    case Duration.DOTTED_EIGHT:
    case Duration.DOTTED_SIXTEENTH:
      return true
    case Duration.WHOLE:
    case Duration.HALF:
    case Duration.QUARTER:
    case Duration.EIGHTH:
    case Duration.SIXTEENTH:
      return false
  }
}

export function asNumber(duration: Duration): number {
  switch (duration) {
    case Duration.DOTTED_WHOLE:
    case Duration.WHOLE:
      return 1
    case Duration.HALF:
    case Duration.DOTTED_HALF:
      return 2
    case Duration.QUARTER:
    case Duration.DOTTED_QUARTER:
      return 4
    case Duration.EIGHTH:
    case Duration.DOTTED_EIGHT:
      return 8
    case Duration.SIXTEENTH:
    case Duration.DOTTED_SIXTEENTH:
      return 16
  }
}

function findString(pitchClass: string, tuning: string[]): [string, number] {
  let index = 0
  let smallestDistance = Infinity
  for (let i = 0; i < tuning.length; i += 1) {
    const note = tuning[i]!
    const dist = Math.abs(
      Interval.semitones(distance(Note.pitchClass(note), pitchClass)),
    )
    if (dist < smallestDistance) {
      smallestDistance = dist
      index = i
    }
  }
  return [tuning[index]!, index]
}

export function asFrettedNote(note: string, tuning: string[]): AtFrettedNote {
  const notePitchClass = Note.pitchClass(note)
  const [stringNote, stringIndex] = findString(notePitchClass, tuning)
  const fret = Interval.semitones(distance(stringNote, note))
  return { string: stringIndex + 1, fret }
}
