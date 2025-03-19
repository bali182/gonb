import { FC, ReactNode } from 'react'
import { KeySignature } from '../../../../common/keySignature'
import {
  getAccidental,
  getAccidentalAmount,
  getAccidentalSymbol,
} from './utils'
import { Accidental } from './types'
import { css } from '@emotion/css'

export type AccidentalsProps = {
  keySignature: KeySignature
}

const YShiftOrder: Record<Accidental, number[]> = {
  '#': [-5, 5, -9, 1, 11, -3, 7],
  b: [0, -6, 2, -4, 4, -2, 6],
}

const sharpsStyle = css`
  letter-spacing: -3px;
  font-size: 0.8rem;
  margin-right: 4px;
`

const flatsStyle = css`
  letter-spacing: -3px;
  margin-right: 4px;
`

const accidentalStyle = css`
  position: relative;
`

export const Accidentals: FC<AccidentalsProps> = ({ keySignature }) => {
  const accidental = getAccidental(keySignature)
  const symbol = getAccidentalSymbol(accidental)
  const amount = getAccidentalAmount(keySignature)
  const accidentalDom: ReactNode[] = []
  for (let i = 0; i < amount; i += 1) {
    accidentalDom.push(
      <span
        key={`${accidental}-${i}`}
        className={accidentalStyle}
        style={{ top: YShiftOrder[accidental!][i] }}
      >
        {symbol}
      </span>,
    )
  }
  return (
    <span className={accidental === '#' ? sharpsStyle : flatsStyle}>
      {accidentalDom}
    </span>
  )
}
