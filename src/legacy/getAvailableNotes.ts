import { fromSemitones } from '@tonaljs/interval'
import { transpose } from '@tonaljs/note'

// TODO rework generation system, to allow for non complete scales
export function getAvailableNotes(
  tuning: string[],
  firstFret: number,
  lastFret: number,
): string[] {
  const availableNotes = new Set<string>()

  for (const instString of tuning) {
    for (let i = firstFret; i < lastFret; i += 1) {
      const note = transpose(instString, fromSemitones(i))
      availableNotes.add(note)
    }
  }

  return Array.from(availableNotes)
}
