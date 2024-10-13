import { FC } from 'react'
import { Clef } from '../../../../model/common'
import { css, cx } from '@emotion/css'

export type ClefButtonProps = {
  clef: Clef
  // isSelected: boolean
  // onClick: () => void
}

const Icons: Record<Clef, string> = {
  [Clef.BASS]: String.fromCodePoint(0xe062),
  [Clef.TREBLE]: String.fromCodePoint(0xe050),
  [Clef.SOPRANO]: String.fromCodePoint(0xe05c),
  [Clef.PERCUSSION]: String.fromCodePoint(0xe069),
}

const Names: Record<Clef, string> = {
  [Clef.BASS]: 'Bass',
  [Clef.TREBLE]: 'Treble',
  [Clef.SOPRANO]: 'Soprano',
  [Clef.PERCUSSION]: 'Percussion',
}

const AlternateNames: Record<Clef, string> = {
  [Clef.BASS]: 'F clef',
  [Clef.TREBLE]: 'G clef',
  [Clef.SOPRANO]: 'C clef',
  [Clef.PERCUSSION]: 'Perc. clef',
}

const IocnStyles: Record<Clef, string> = {
  [Clef.BASS]: css`
    top: 8px;
  `,
  [Clef.TREBLE]: css`
    top: 16px;
  `,
  [Clef.SOPRANO]: css`
    top: 11px;
  `,
  [Clef.PERCUSSION]: css`
    top: 12px;
  `,
}

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  flex: 1;
  border: none;
  padding: 5px 12px;
  gap: 12px;
  cursor: pointer;
  border-radius: 6px;
  color: #000000;
  background-color: #00000010;
  &:hover {
    background-color: #00000015;
  }
  &:focus {
    background-color: #00000020;
  }
`

const clefIcon = css`
  font-family: 'Bravura';
  position: relative;
  font-size: 25px;
  line-height: 25px;
`

const nameWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const nameStyle = css`
  font-weight: bold;
  font-size: 1em;
`

const alternateNameStyle = css`
  color: #00000099;
  font-size: 0.9em;
`

export const ClefButton: FC<ClefButtonProps> = ({
  clef,
  // isSelected,
  // onClick,
}) => {
  const fullClefStyle = cx(clefIcon, IocnStyles[clef])
  return (
    <button className={buttonStyle}>
      <span className={fullClefStyle}>{Icons[clef]}</span>
      <div className={nameWrapperStyle}>
        <span className={nameStyle}>{Names[clef]}</span>
        <span className={alternateNameStyle}>{AlternateNames[clef]}</span>
      </div>
    </button>
  )
}
