import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { Note } from 'tonal'
import { beautifyNote } from './notesGridUtils'
import { separatorStyle } from './commonStyles'

export type NoteHeaderProps = {
  note: string
  isSelected: boolean
  onClick: (note: string) => void
}

const thStyle = css`
  font-weight: bold;
  text-align: center;
  padding: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 38px;
  font-size: 1em;
`

const selectedStyle = css`
  background-color: #00000030;
`

const topLeftNoteStyle = css`
  position: absolute;
  top: 4px;
  left: 4px;
`

const bottomRightNote = css`
  position: absolute;
  bottom: 1px;
  right: 4px;
`

export const NoteHeader: FC<NoteHeaderProps> = ({
  isSelected,
  note,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(thStyle, isSelected ? selectedStyle : undefined)
  const enharmonic = Note.enharmonic(note)
  const onClick = () => _onClick(note)

  if (enharmonic === note) {
    return (
      <th className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note)}
      </th>
    )
  }
  return (
    <th className={tdFullStyle} onClick={onClick}>
      <div className={separatorStyle} />
      <span className={topLeftNoteStyle}>{beautifyNote(note)}</span>
      <span className={bottomRightNote}>{beautifyNote(enharmonic)}</span>
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
