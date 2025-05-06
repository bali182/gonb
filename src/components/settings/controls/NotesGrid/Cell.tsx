import { cx } from '@emotion/css'
import { FC } from 'react'
import {
  bottomRightNoteStyle,
  selectedStyle,
  tdStyle,
  topLeftNoteStyle,
  fillSeparatorStyle,
} from './notesGridStyles'
import { enharmonic, get } from '@tonaljs/note'
import { beautifyNote } from '../../../../common/utils'
import { Language } from '../../../../state/types'
import { Accidental } from '../KeySignaturePicker/types'

export type CellProps = {
  note: string
  octave: number
  isSelected: boolean
  language: Language
  accidental: Accidental
  onClick: (note: string, octave: number) => void
}

export const DesktopCell: FC<CellProps> = ({
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

export const MobileCell: FC<CellProps> = ({
  isSelected,
  note,
  octave,
  language,
  accidental,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(tdStyle, isSelected ? selectedStyle : undefined)
  const noteObj = get(note)
  const noteName = noteObj.acc === accidental ? note : enharmonic(note)
  const onClick = () => {
    _onClick(note, octave)
  }
  return (
    <td className={tdFullStyle} onClick={onClick}>
      {beautifyNote(noteName, language)}
      {octave}
    </td>
  )
}
