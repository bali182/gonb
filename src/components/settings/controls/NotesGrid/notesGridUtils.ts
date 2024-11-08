import { enharmonic } from '@tonaljs/note'

export type NotesGridData = Record<string, boolean[]>

export const NOTES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

export const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function asNotesGridData(value: string[]): NotesGridData {
  const data: NotesGridData = {}
  for (const noteName of NOTES) {
    const octaves: boolean[] = []
    for (const octave of OCTAVES) {
      const note = `${noteName}${octave}`
      const enharmonicNote = enharmonic(note)
      octaves[octave] = value.includes(note) || value.includes(enharmonicNote)
    }
    data[noteName] = octaves
  }
  return data
}

export function asColumnSelection(data: NotesGridData): boolean[] {
  const selected: boolean[] = []
  for (const octave of OCTAVES) {
    let isOctaveFullySelected = true
    notesLoop: for (const note of NOTES) {
      isOctaveFullySelected = isOctaveFullySelected && data[note]![octave]!
      if (!isOctaveFullySelected) {
        break notesLoop
      }
    }
    selected[octave] = isOctaveFullySelected
  }
  return selected
}

export function asRowSelection(data: NotesGridData): Record<string, boolean> {
  const selected: Record<string, boolean> = {}
  for (const note of NOTES) {
    selected[note] = data[note]!.every((octave) => octave)
  }
  return selected
}

export function asValueArray(data: NotesGridData): string[] {
  const selected: string[] = []
  for (const octave of OCTAVES) {
    for (const note of NOTES) {
      const isSelected = data[note]![octave]!
      // TODO if enharmonics are needed add here.
      if (isSelected) {
        const fullNote = `${note}${octave}`
        selected.push(fullNote)
      }
    }
  }
  return selected
}

export function updateCell(
  data: NotesGridData,
  note: string,
  octave: number,
): NotesGridData {
  const noteArray = Array.from(data[note]!)
  noteArray[octave] = !noteArray[octave]
  return { ...data, [note]: noteArray }
}

export function updateColumn(
  data: NotesGridData,
  columnSelection: boolean[],
  octave: number,
): NotesGridData {
  const isSelected = !columnSelection[octave]!
  const newData: NotesGridData = {}
  for (const noteName of NOTES) {
    const octaves: boolean[] = []
    for (const oct of OCTAVES) {
      octaves[oct] = data[noteName]![oct]!
      if (oct === octave) {
        octaves[oct] = isSelected
      }
    }
    newData[noteName] = octaves
  }
  return newData
}

export function updateRow(
  data: NotesGridData,
  rowSelection: Record<string, boolean>,
  note: string,
): NotesGridData {
  const isSelected = !rowSelection[note]!
  const row = data[note]!.map(() => isSelected)
  return { ...data, [note]: row }
}
