import { css, cx } from '@emotion/css'
import { DOMAttributes, FC } from 'react'
import { IconType } from 'react-icons'
import {
  PiPauseFill,
  PiPlayFill,
  PiStopFill,
  PiRepeatBold,
  PiHourglassBold,
} from 'react-icons/pi'

type PlayerButtonKind = 'primary' | 'secondary'

export type BasicButtonProps = {
  kind: PlayerButtonKind
  icon: IconType
  onClick: () => void
}

export type ToggleButtonProps = {
  kind: PlayerButtonKind
  isToggled: boolean
  icon: IconType
  onToggle: (isToggled: boolean) => void
}

const baseButtonStyle = css`
  border-radius: 50%;
  background-color: #ffffff15;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, outline 0.2s ease;
  border: none;
  &:hover {
    background-color: #ffffff40;
  }
  &:focus {
    outline: 2px solid #ffffff;
  }
`

const primaryButtonStyle = css`
  width: 100px;
  height: 100px;
  font-size: 50px;
`

const secondaryButtonStyle = css`
  width: 70px;
  height: 70px;
  font-size: 25px;
`

const toogledButtonStyle = css`
  background-color: #ffffff60;
  &:hover {
    background-color: #ffffff60;
  }
`

export const PlayerButton: FC<BasicButtonProps> = ({
  onClick,
  kind,
  icon: Icon,
}) => {
  const style = cx({
    [baseButtonStyle]: true,
    [primaryButtonStyle]: kind === 'primary',
    [secondaryButtonStyle]: kind === 'secondary',
  })
  return (
    <button className={style} onClick={onClick}>
      <Icon />
    </button>
  )
}

export const PlayerToggle: FC<ToggleButtonProps> = ({
  kind,
  isToggled,
  onToggle,
  icon: Icon,
}) => {
  const style = cx({
    [baseButtonStyle]: true,
    [primaryButtonStyle]: kind === 'primary',
    [secondaryButtonStyle]: kind === 'secondary',
    [toogledButtonStyle]: isToggled,
  })
  const onClick = () => onToggle(!isToggled)
  return (
    <button className={style} onClick={onClick}>
      <Icon />
    </button>
  )
}
