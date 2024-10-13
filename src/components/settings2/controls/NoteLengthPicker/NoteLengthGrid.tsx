import { FC, useMemo } from 'react'
import {
  selectedStyle,
  tableStyle,
  tdStyle,
  thStyle,
} from './notesLengthGridStyles'
import { useDurationHeaders, useNoteAndRestHeaders } from './headers'
import {
  DurationHeader,
  NoteAndRestHeader,
  SelectableNoteLengthItem,
} from './types'
import { Duration } from '../../../../model/common'
import {
  getDurationHeaderSelection,
  getDurationsOfType,
  getNoteAndRestHeaderSelection,
  getSelectableNoteLengths,
  updateDurationHeader,
  updateItem,
  updateNoteAndRestHeader,
} from './noteLengthUtils'
import { cx } from '@emotion/css'

export type NoteLengthGridProps = {
  rests: Duration[]
  notes: Duration[]
  onChange: (notes: Duration[], rests: Duration[]) => void
}

export const NoteLengthGrid: FC<NoteLengthGridProps> = ({
  notes,
  rests,
  onChange,
}) => {
  const durationHeaders = useDurationHeaders()
  const noteAndRestHeaders = useNoteAndRestHeaders()

  const data = useMemo(
    () => getSelectableNoteLengths(notes, rests),
    [notes, rests],
  )

  const durationSelection = useMemo(
    () => getDurationHeaderSelection(data, durationHeaders),
    [data, durationHeaders],
  )

  const noteAndRestSelection = useMemo(
    () => getNoteAndRestHeaderSelection(data, noteAndRestHeaders),
    [data, noteAndRestHeaders],
  )

  const onNoteLengthSelected = (item: SelectableNoteLengthItem) => {
    const updatedData = updateItem(data, item)
    onChange(
      getDurationsOfType(updatedData, 'NOTE'),
      getDurationsOfType(updatedData, 'REST'),
    )
  }

  const onNoteOrRestHeaderSelected = (header: NoteAndRestHeader) => {
    const updatedData = updateNoteAndRestHeader(
      data,
      header,
      noteAndRestSelection.get(header)!,
    )

    onChange(
      getDurationsOfType(updatedData, 'NOTE'),
      getDurationsOfType(updatedData, 'REST'),
    )
  }

  const onDurationHeaderSelected = (header: DurationHeader) => {
    const updatedData = updateDurationHeader(
      data,
      header,
      durationSelection.get(header)!,
    )
    onChange(
      getDurationsOfType(updatedData, 'NOTE'),
      getDurationsOfType(updatedData, 'REST'),
    )
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th />
          {noteAndRestHeaders.map((header) => {
            const className = cx(
              thStyle,
              noteAndRestSelection.get(header) ? selectedStyle : undefined,
            )
            const onClick = () => onNoteOrRestHeaderSelected(header)
            return (
              <th onClick={onClick} className={className} key={header.label}>
                {header.label}
              </th>
            )
          })}
        </tr>
        {durationHeaders.map((header, i) => {
          const row = data[i]!
          const headerClassName = cx(
            thStyle,
            durationSelection.get(header) ? selectedStyle : undefined,
          )
          const onHeaderClick = () => onDurationHeaderSelected(header)

          return (
            <tr key={header.label}>
              <th className={headerClassName} onClick={onHeaderClick}>
                {header.label}
              </th>
              {row.map((item) => {
                const className = cx(
                  tdStyle,
                  item.isSelected ? selectedStyle : undefined,
                )
                const onClick = () => onNoteLengthSelected(item)
                const key = `${item.type}-${item.duration}`
                return (
                  <td className={className} onClick={onClick} key={key}>
                    <item.Component />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </thead>
    </table>
  )
}
