import { cx } from '@emotion/css'
import { FC } from 'react'
import {
  bottomRightNoteStyle,
  selectedStyle,
  fillSeparatorStyle,
  thStyle,
  topLeftNoteStyle,
  topThStyle,
  leftThStyle,
} from './notesGridStyles'
import { enharmonic, get } from '@tonaljs/note'
import { beautifyNote } from '../../../../common/utils'
import { Language } from '../../../../state/types'
import { Accidental } from '../KeySignaturePicker/types'

export type NoteHeaderProps = {
  note: string
  isSelected: boolean
  language: Language
  accidental: Accidental
  onClick: (note: string) => void
}

export const DesktopNoteHeader: FC<NoteHeaderProps> = ({
  isSelected,
  note,
  language,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx({
    [thStyle]: true,
    [topThStyle]: true,
    [selectedStyle]: isSelected,
  })
  const ehNote = enharmonic(note)
  const onClick = () => _onClick(note)

  if (ehNote === note) {
    return (
      <th className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note, language)}
      </th>
    )
  }
  return (
    <th className={tdFullStyle} onClick={onClick}>
      <div className={fillSeparatorStyle} />
      <span className={topLeftNoteStyle}>{beautifyNote(note, language)}</span>
      <span className={bottomRightNoteStyle}>
        {beautifyNote(ehNote, language)}
      </span>
    </th>
  )
}

export const MobileNoteHeader: FC<NoteHeaderProps> = ({
  isSelected,
  note,
  language,
  accidental,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx({
    [thStyle]: true,
    [topThStyle]: true,
    [selectedStyle]: isSelected,
  })
  const noteObj = get(note)
  const noteName = noteObj.acc === accidental ? note : enharmonic(note)
  const onClick = () => _onClick(note)
  return (
    <th className={tdFullStyle} onClick={onClick}>
      {beautifyNote(noteName, language)}
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
  const tdFullStyle = cx({
    [thStyle]: true,
    [leftThStyle]: true,
    [selectedStyle]: isSelected,
  })
  const onClick = () => _onClick(octave)
  return (
    <th className={tdFullStyle} onClick={onClick}>
      {octave}
    </th>
  )
}
