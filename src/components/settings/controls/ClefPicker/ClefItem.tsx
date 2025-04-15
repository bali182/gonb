import { FC } from 'react'
import { css, cx } from '@emotion/css'
import { ClefModel } from './types'
import { bodyTextStyle, smallTextStyle } from '../../../constants'

export type ClefButtonProps = {
  model: ClefModel
  isSelected: boolean
  onClick: () => void
}

const buttonStyle = cx(
  smallTextStyle,
  css`
    display: flex;
    flex-direction: row;
    flex: 1;
    border: none;
    gap: 8px;
    cursor: pointer;
    color: #000000;
    overflow: hidden;
    background-color: transparent;
    padding: 1px 0px;
  `,
)

const clefIcon = cx(
  css`
    font-family: 'Bravura';
    position: relative;
    pointer-events: none;
    line-height: 20px;
    font-size: 1rem;
  `,
)

const nameWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ClefItem: FC<ClefButtonProps> = ({ model, onClick }) => {
  const fullClefStyle = cx(smallTextStyle, clefIcon, model.iconStyle)
  return (
    <button
      className={buttonStyle}
      disabled={!model.isEnabled}
      onClick={onClick}
    >
      <span className={fullClefStyle}>{model.icon}</span>
      <div className={nameWrapperStyle}>
        <span className={bodyTextStyle}>{model.label}</span>
      </div>
    </button>
  )
}
