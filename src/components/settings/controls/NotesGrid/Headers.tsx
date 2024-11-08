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
import { enharmonic } from '@tonaljs/note'
import { beautifyNote } from '../../../../common/utils'
import { Language } from '../../../../state/types'

export type NoteHeaderProps = {
  note: string
  isSelected: boolean
  language: Language
  onClick: (note: string) => void
}

export const NoteHeader: FC<NoteHeaderProps> = ({
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
