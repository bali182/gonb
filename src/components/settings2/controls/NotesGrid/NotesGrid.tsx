import { css, cx } from '@emotion/css'
import { FC, useMemo } from 'react'
import {
  asColumnSelection,
  asNotesGridData,
  asRowSelection,
  asValueArray,
  NOTES,
  OCTAVES,
  updateCell,
  updateColumn,
  updateRow,
} from './notesGridUtils'
import { Cell } from './Cell'
import { NoteHeader, OctaveHeader } from './Headers'

const tableStyle = css`
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
`

const selectedStyle = css`
  background-color: #00000030;
`

export type NotesGridProps = {
  value: string[]
  onChange: (value: string[]) => void
}

export const NotesGrid: FC<NotesGridProps> = ({ onChange, value }) => {
  const data = useMemo(() => asNotesGridData(value), [value])
  const columnSelection = useMemo(() => asColumnSelection(data), [data])
  const rowSelection = useMemo(() => asRowSelection(data), [data])

  const onCellClick = (note: string, octave: number): void => {
    onChange(asValueArray(updateCell(data, note, octave)))
  }

  const onRowHeaderClick = (note: string): void => {
    onChange(asValueArray(updateRow(data, rowSelection, note)))
  }

  const onColumnHeaderClick = (octave: number): void => {
    onChange(asValueArray(updateColumn(data, columnSelection, octave)))
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th />
          {OCTAVES.map((octave) => {
            const isColumnSelected = columnSelection[octave]!
            return (
              <OctaveHeader
                isSelected={isColumnSelected}
                octave={octave}
                onClick={onColumnHeaderClick}
              />
            )
          })}
        </tr>
      </thead>
      <tbody>
        {NOTES.map((note) => {
          const isRowSelected = rowSelection[note]!
          return (
            <tr key={`note-row-${note}`}>
              <NoteHeader
                note={note}
                isSelected={isRowSelected}
                onClick={onRowHeaderClick}
              />
              {OCTAVES.map((octave) => {
                const isNoteSelected = data[note]![octave]!
                return (
                  <Cell
                    key={`note-${note}${octave}`}
                    isSelected={isNoteSelected}
                    note={note}
                    octave={octave}
                    onClick={onCellClick}
                  />
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
