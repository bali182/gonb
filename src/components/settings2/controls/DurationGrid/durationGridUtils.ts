import { Duration } from '../../../../model/common'
import { DURATION_ROWS } from './durationGridModel'
import { DurationHeader, TypeHeader, DurationType, DurationItem } from './types'

export function getDurationGridData(
  notes: Duration[],
  rests: Duration[],
): DurationItem[][] {
  return DURATION_ROWS.map((row): DurationItem[] => {
    return row.map((item): DurationItem => {
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

export function getDurations(
  data: DurationItem[][],
  type: DurationType,
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
  data: DurationItem[][],
  toUpdate: DurationItem,
): DurationItem[][] {
  const output: DurationItem[][] = []
  for (const row of data) {
    const updatedRow: DurationItem[] = []
    for (const item of row) {
      if (item.type === toUpdate.type && item.duration === toUpdate.duration) {
        const updatedItem: DurationItem = {
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

export function getTypeHeaderSelection(
  data: DurationItem[][],
  disabled: Duration[],
  headers: TypeHeader[],
): Map<TypeHeader, boolean> {
  const selection = new Map<TypeHeader, boolean>()
  const flatItems = data
    .flatMap((row) => row)
    .filter((item) => !disabled.includes(item.duration))
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
  data: DurationItem[][],
  disabled: Duration[],
  headers: DurationHeader[],
): Map<DurationHeader, boolean> {
  const selection = new Map<DurationHeader, boolean>()
  const flatItems = data
    .flatMap((row) => row)
    .filter((item) => !disabled.includes(item.duration))
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
  data: DurationItem[][],
  header: DurationHeader,
  disabled: Duration[],
  isSelected: boolean,
): DurationItem[][] {
  const output: DurationItem[][] = []
  for (const row of data) {
    const updatedRow: DurationItem[] = []
    for (const item of row) {
      if (disabled.includes(item.duration)) {
        updatedRow.push({ ...item, isSelected: false })
      } else if (header.durations.includes(item.duration)) {
        updatedRow.push({ ...item, isSelected: !isSelected })
      } else {
        updatedRow.push(item)
      }
    }
    output.push(updatedRow)
  }
  return output
}

export function updateTypeHeader(
  data: DurationItem[][],
  header: TypeHeader,
  disabled: Duration[],
  isSelected: boolean,
): DurationItem[][] {
  const output: DurationItem[][] = []
  for (const row of data) {
    const updatedRow: DurationItem[] = []
    for (const item of row) {
      if (disabled.includes(item.duration)) {
        updatedRow.push({ ...item, isSelected: false })
      } else if (
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
