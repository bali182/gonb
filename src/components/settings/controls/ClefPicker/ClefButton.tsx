import { FC } from 'react'
import { css, cx } from '@emotion/css'
import { ClefModel } from './types'

export type ClefButtonProps = {
  model: ClefModel
  isSelected: boolean
  onClick: () => void
}

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  flex: 1;
  border: none;
  padding: 5px 12px;
  gap: 8px;
  cursor: pointer;
  border-radius: 6px;
  color: #000000;
  background-color: #00000010;
  overflow: hidden;
  &:hover {
    background-color: #00000015;
  }
  &:focus {
    background-color: #00000020;
  }
  &:disabled {
    color: #00000070;
    background-color: #00000010;
    cursor: not-allowed;
  }
`

const clefIcon = css`
  font-family: 'Bravura';
  position: relative;
  font-size: 20px;
  line-height: 20px;
  pointer-events: none;
`

const nameWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const nameStyle = css`
  font-size: 1em;
`

const alternateNameStyle = css`
  opacity: 0.8;
  font-size: 0.75em;
  white-space: nowrap;
`

const selectedStyle = css`
  background-color: #000000aa;
  color: #ffffff;

  &:hover {
    background-color: #000000aa;
  }
  &:focus {
    background-color: #000000aa;
  }
`

export const ClefButton: FC<ClefButtonProps> = ({
  model,
  isSelected,
  onClick,
}) => {
  const fullClefStyle = cx(clefIcon, model.iconStyle)
  const fullButtonStyle = cx(
    buttonStyle,
    isSelected ? selectedStyle : undefined,
  )
  return (
    <button
      className={fullButtonStyle}
      disabled={!model.isEnabled}
      onClick={onClick}
    >
      <span className={fullClefStyle}>{model.icon}</span>
      <div className={nameWrapperStyle}>
        <span className={nameStyle}>{model.name}</span>
        <span className={alternateNameStyle}>{model.alternateName}</span>
      </div>
    </button>
  )
}
