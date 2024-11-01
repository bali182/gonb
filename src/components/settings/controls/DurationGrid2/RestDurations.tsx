import { FC } from 'react'
import { Note } from './Note'

const REST_WHOLE = String.fromCharCode(0xe4e3)
const REST_HALF = String.fromCharCode(0xe4e4)
const REST_QUARTER = String.fromCharCode(0xe4e5)
const REST_EIGHTH = String.fromCharCode(0xe4e6)
const REST_SIXTEENTH = String.fromCharCode(0xe4e7)

const DOT = String.fromCodePoint(0xe920)

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
