import { cx } from '@emotion/css'
import { FC } from 'react'
import {
  bottomRightNoteStyle,
  selectedStyle,
  tdStyle,
  topLeftNoteStyle,
  fillSeparatorStyle,
} from './notesGridStyles'
import { enharmonic } from '@tonaljs/note'
import { beautifyNote } from '../../../../common/utils'
import { Language } from '../../../../state/types'

export type CellProps = {
  note: string
  octave: number
  isSelected: boolean
  language: Language
  onClick: (note: string, octave: number) => void
}

export const Cell: FC<CellProps> = ({
  isSelected,
  note,
  octave,
  language,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(tdStyle, isSelected ? selectedStyle : undefined)
  const ehNote = enharmonic(note)
  const onClick = () => {
    _onClick(note, octave)
  }
  if (ehNote === note) {
    return (
      <td className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note, language)}
        {octave}
      </td>
    )
  }
  return (
    <td className={tdFullStyle} onClick={onClick}>
      <div className={fillSeparatorStyle} />
      <span className={topLeftNoteStyle}>
        {beautifyNote(note, language)}
        {octave}
      </span>
      <span className={bottomRightNoteStyle}>
        {beautifyNote(ehNote, language)}
        {octave}
      </span>
    </td>
  )
}
