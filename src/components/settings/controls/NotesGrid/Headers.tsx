import { cx } from '@emotion/css'
import { FC } from 'react'
import { beautifyNote } from './notesGridUtils'
import {
  bottomRightNoteStyle,
  selectedStyle,
  fillSeparatorStyle,
  thStyle,
  topLeftNoteStyle,
} from './notesGridStyles'
import { enharmonic } from '@tonaljs/note'

export type NoteHeaderProps = {
  note: string
  isSelected: boolean
  onClick: (note: string) => void
}

export const NoteHeader: FC<NoteHeaderProps> = ({
  isSelected,
  note,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(thStyle, isSelected ? selectedStyle : undefined)
  const ehNote = enharmonic(note)
  const onClick = () => _onClick(note)

  if (ehNote === note) {
    return (
      <th className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note)}
      </th>
    )
  }
  return (
    <th className={tdFullStyle} onClick={onClick}>
      <div className={fillSeparatorStyle} />
      <span className={topLeftNoteStyle}>{beautifyNote(note)}</span>
      <span className={bottomRightNoteStyle}>{beautifyNote(ehNote)}</span>
    </th>
  )
}

export type OctaveHeaderProps = {
  octave: number
  isSelected: boolean
  onClick: (octave: number) => void
}

export const OctaveHeader: FC<OctaveHeaderProps> = ({
  isSelected,
  octave,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(thStyle, isSelected ? selectedStyle : undefined)
  const onClick = () => _onClick(octave)
  return (
    <th className={tdFullStyle} onClick={onClick}>
      {octave}
    </th>
  )
}
