import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { Note } from 'tonal'
import { beautifyNote } from './notesGridUtils'
import { separatorStyle } from './commonStyles'

export type CellProps = {
  note: string
  octave: number
  isSelected: boolean
  onClick: (note: string, octave: number) => void
}

const tdStyle = css`
  padding: 6px;
  font-size: 0.8em;
  text-align: center;
  cursor: pointer;
  position: relative;
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

export const Cell: FC<CellProps> = ({
  isSelected,
  note,
  octave,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(tdStyle, isSelected ? selectedStyle : undefined)
  const enharmonic = Note.enharmonic(note)
  const onClick = () => {
    _onClick(note, octave)
  }
  if (enharmonic === note) {
    return (
      <td className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note)}
        {octave}
      </td>
    )
  }
  return (
    <td className={tdFullStyle} onClick={onClick}>
      <div className={separatorStyle} />
      <span className={topLeftNoteStyle}>
        {beautifyNote(note)}
        {octave}
      </span>
      <span className={bottomRightNote}>
        {beautifyNote(enharmonic)}
        {octave}
      </span>
    </td>
  )
}
