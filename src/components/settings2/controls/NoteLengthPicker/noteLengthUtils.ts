import { Duration } from '../../../../model/common'
import { NOTE_LENGTH_ROWS } from './noteLengthsGridModel'
import {
  DurationHeader,
  NoteAndRestHeader,
  NoteOrRest,
  SelectableNoteLengthItem,
} from './types'

export function getSelectableNoteLengths(
  notes: Duration[],
  rests: Duration[],
): SelectableNoteLengthItem[][] {
  return NOTE_LENGTH_ROWS.map((row): SelectableNoteLengthItem[] => {
    return row.map((item): SelectableNoteLengthItem => {
      const isSelected =
        item.type === 'NOTE'
          ? notes.includes(item.duration)
          : rests.includes(item.duration)
      return {
        ...item,
        isSelected,
      }
    })
  })
}

export function getDurationsOfType(
  data: SelectableNoteLengthItem[][],
  type: NoteOrRest,
): Duration[] {
  const durations: Duration[] = []
  for (const row of data) {
    for (const item of row) {
      if (item.type === type && item.isSelected) {
        durations.push(item.duration)
      }
    }
  }
  return durations
}

export function updateItem(
  data: SelectableNoteLengthItem[][],
  toUpdate: SelectableNoteLengthItem,
): SelectableNoteLengthItem[][] {
  const output: SelectableNoteLengthItem[][] = []
  for (const row of data) {
    const updatedRow: SelectableNoteLengthItem[] = []
    for (const item of row) {
      if (item.type === toUpdate.type && item.duration === toUpdate.duration) {
        const updatedItem: SelectableNoteLengthItem = {
          ...toUpdate,
          isSelected: !toUpdate.isSelected,
        }
        updatedRow.push(updatedItem)
      } else {
        updatedRow.push(item)
      }
    }
    output.push(updatedRow)
  }
  return output
}

function isDotted(duration: Duration) {
  switch (duration) {
    case Duration.DOTTED_WHOLE:
    case Duration.DOTTED_HALF:
    case Duration.DOTTED_QUARTER:
    case Duration.DOTTED_EIGHT:
    case Duration.DOTTED_SIXTEENTH:
      return true
    default:
      return false
  }
}

export function getNoteAndRestHeaderSelection(
  data: SelectableNoteLengthItem[][],
  headers: NoteAndRestHeader[],
): Map<NoteAndRestHeader, boolean> {
  const selection = new Map<NoteAndRestHeader, boolean>()
  const flatItems = data.flatMap((row) => row)
  for (const header of headers) {
    const relevantItems = flatItems.filter(
      (item) =>
        item.type === header.type && header.dotted === isDotted(item.duration),
    )
    selection.set(
      header,
      relevantItems.every((item) => item.isSelected),
    )
  }
  return selection
}

export function getDurationHeaderSelection(
  data: SelectableNoteLengthItem[][],
  headers: DurationHeader[],
): Map<DurationHeader, boolean> {
  const selection = new Map<DurationHeader, boolean>()
  const flatItems = data.flatMap((row) => row)
  for (const header of headers) {
    const relevantItems = flatItems.filter((item) =>
      header.durations.includes(item.duration),
    )
    selection.set(
      header,
      relevantItems.every((item) => item.isSelected),
    )
  }
  return selection
}

export function updateDurationHeader(
  data: SelectableNoteLengthItem[][],
  header: DurationHeader,
  isSelected: boolean,
): SelectableNoteLengthItem[][] {
  const output: SelectableNoteLengthItem[][] = []
  for (const row of data) {
    const updatedRow: SelectableNoteLengthItem[] = []
    for (const item of row) {
      if (header.durations.includes(item.duration)) {
        updatedRow.push({ ...item, isSelected: !isSelected })
      } else {
        updatedRow.push(item)
      }
    }
    output.push(updatedRow)
  }
  return output
}

export function updateNoteAndRestHeader(
  data: SelectableNoteLengthItem[][],
  header: NoteAndRestHeader,
  isSelected: boolean,
): SelectableNoteLengthItem[][] {
  const output: SelectableNoteLengthItem[][] = []
  for (const row of data) {
    const updatedRow: SelectableNoteLengthItem[] = []
    for (const item of row) {
      if (
        item.type === header.type &&
        header.dotted === isDotted(item.duration)
      ) {
        updatedRow.push({ ...item, isSelected: !isSelected })
      } else {
        updatedRow.push(item)
      }
    }
    output.push(updatedRow)
  }
  return output
}
