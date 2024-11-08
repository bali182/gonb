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
import { tableStyle } from './notesGridStyles'
import { useTranslation } from 'react-i18next'
import { Language } from '../../../../state/types'

export type NotesGridProps = {
  value: string[]
  onChange: (value: string[]) => void
}

export const NotesGrid: FC<NotesGridProps> = ({ onChange, value }) => {
  const { i18n } = useTranslation()
  const language = i18n.language as Language
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
          {NOTES.map((note) => {
            const isColumnSelected = rowSelection[note]!
            return (
              <NoteHeader
                key={`note-header-${note}`}
                language={language}
                isSelected={isColumnSelected}
                note={note}
                onClick={onRowHeaderClick}
              />
            )
          })}
        </tr>
      </thead>
      <tbody>
        {OCTAVES.map((octave) => {
          const isRowSelected = columnSelection[octave]!
          return (
            <tr key={`note-row-${octave}`}>
              <OctaveHeader
                octave={octave}
                isSelected={isRowSelected}
                onClick={onColumnHeaderClick}
              />
              {NOTES.map((note) => {
                const isNoteSelected = data[note]![octave]!
                return (
                  <Cell
                    key={`note-${note}${octave}`}
                    language={language}
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
