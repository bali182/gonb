import { FC } from 'react'
import { Note } from './Note'

const NOTE_WHOLE = String.fromCodePoint(0xe0a2)
const NOTE_HALF = String.fromCodePoint(0x1d15e)
const NOTE_QUARTER = String.fromCodePoint(0x1d15f)
const NOTE_EIGHTH = String.fromCodePoint(0x1d160)
const NOTE_SIXTEENTH = String.fromCodePoint(0x1d161)

const DOT = String.fromCodePoint(0xe920)

const TOP = 10

export const NoteWhole: FC = () => <Note>{NOTE_WHOLE}</Note>
export const NoteHalf: FC = () => <Note top={TOP}>{NOTE_HALF}</Note>
export const NoteQuarter: FC = () => <Note top={TOP}>{NOTE_QUARTER}</Note>
export const NoteEighth: FC = () => <Note top={TOP}>{NOTE_EIGHTH}</Note>
export const NoteSixteenth: FC = () => <Note top={TOP}>{NOTE_SIXTEENTH}</Note>

export const NoteDottedWhole: FC = () => (
  <Note>
    {NOTE_WHOLE}
    {DOT}
  </Note>
)
export const NoteDottedHalf: FC = () => (
  <Note top={TOP}>
    {NOTE_HALF}
    {DOT}
  </Note>
)
export const NoteDottedQuarter: FC = () => (
  <Note top={TOP}>
    {NOTE_QUARTER}
    {DOT}
  </Note>
)
export const NoteDottedEighth: FC = () => (
  <Note top={TOP}>
    {NOTE_EIGHTH}
    {DOT}
  </Note>
)
export const NoteDottedSixteenth: FC = () => (
  <Note top={TOP}>
    {NOTE_SIXTEENTH}
    {DOT}
  </Note>
)
