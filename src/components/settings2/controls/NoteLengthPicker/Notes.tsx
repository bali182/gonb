import { css } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'

const REST_WHOLE = String.fromCharCode(0xe4e3)
const REST_HALF = String.fromCharCode(0xe4e4)
const REST_QUARTER = String.fromCharCode(0xe4e5)
const REST_EIGHTH = String.fromCharCode(0xe4e6)
const REST_SIXTEENTH = String.fromCharCode(0xe4e7)

const NOTE_WHOLE = String.fromCodePoint(0xe0a2)
const NOTE_HALF = String.fromCodePoint(0x1d15e)
const NOTE_QUARTER = String.fromCodePoint(0x1d15f)
const NOTE_EIGHTH = String.fromCodePoint(0x1d160)
const NOTE_SIXTEENTH = String.fromCodePoint(0x1d161)

const DOT = String.fromCodePoint(0xe920)

const SHIFT = 10

const noteStyle = css`
  font-family: 'Bravura';
  font-size: 30px;
  line-height: 40px;
  pointer-events: none;
  letter-spacing: 5px;
  position: relative;
`

const Note: FC<PropsWithChildren & { top?: number }> = ({ children, top }) => {
  return (
    <span className={noteStyle} style={{ top }}>
      {children}
    </span>
  )
}

export const RestWhole: FC = () => <Note>{REST_WHOLE}</Note>
export const RestHalf: FC = () => <Note>{REST_HALF}</Note>
export const RestQuarter: FC = () => <Note>{REST_QUARTER}</Note>
export const RestEighth: FC = () => <Note>{REST_EIGHTH}</Note>
export const RestSixteenth: FC = () => <Note>{REST_SIXTEENTH}</Note>

export const RestDottedWhole: FC = () => (
  <Note>
    {REST_WHOLE}
    {DOT}
  </Note>
)
export const RestDottedHalf: FC = () => (
  <Note>
    {REST_HALF}
    {DOT}
  </Note>
)
export const RestDottedQuarter: FC = () => (
  <Note>
    {REST_QUARTER}
    {DOT}
  </Note>
)
export const RestDottedEighth: FC = () => (
  <Note>
    {REST_EIGHTH}
    {DOT}
  </Note>
)
export const RestDottedSixteenth: FC = () => (
  <Note>
    {REST_SIXTEENTH}
    {DOT}
  </Note>
)

export const NoteWhole: FC = () => <Note>{NOTE_WHOLE}</Note>
export const NoteHalf: FC = () => <Note top={SHIFT}>{NOTE_HALF}</Note>
export const NoteQuarter: FC = () => <Note top={SHIFT}>{NOTE_QUARTER}</Note>
export const NoteEighth: FC = () => <Note top={SHIFT}>{NOTE_EIGHTH}</Note>
export const NoteSixteenth: FC = () => <Note top={SHIFT}>{NOTE_SIXTEENTH}</Note>

export const NoteDottedWhole: FC = () => (
  <Note>
    {NOTE_WHOLE}
    {DOT}
  </Note>
)
export const NoteDottedHalf: FC = () => (
  <Note top={SHIFT}>
    {NOTE_HALF}
    {DOT}
  </Note>
)
export const NoteDottedQuarter: FC = () => (
  <Note top={SHIFT}>
    {NOTE_QUARTER}
    {DOT}
  </Note>
)
export const NoteDottedEighth: FC = () => (
  <Note top={SHIFT}>
    {NOTE_EIGHTH}
    {DOT}
  </Note>
)
export const NoteDottedSixteenth: FC = () => (
  <Note top={SHIFT}>
    {NOTE_SIXTEENTH}
    {DOT}
  </Note>
)
