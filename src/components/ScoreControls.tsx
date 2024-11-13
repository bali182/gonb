import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import { MessageKey } from '../languages/types'

type PlayerButtonKind = 'primary' | 'secondary'

export type BasicButtonProps = {
  kind: PlayerButtonKind
  tooltip: MessageKey
  icon: IconType
  onClick: () => void
}

export type ToggleButtonProps = {
  kind: PlayerButtonKind
  isToggled: boolean
  tooltip: MessageKey
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

const buttonGroupStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  button:first-child {
    border-radius: 50% 0 0 50%;
    padding-left: 6px;
  }

  button:last-child {
    border-radius: 0 50% 50% 0;
    padding-right: 6px;
  }

  button:not(:first-child):not(:last-child) {
    border-radius: 0;
    padding: 0px;
  }
`

export const PlayerButton: FC<BasicButtonProps> = ({
  onClick,
  kind,
  tooltip,
  icon: Icon,
}) => {
  const style = cx({
    [baseButtonStyle]: true,
    [primaryButtonStyle]: kind === 'primary',
    [secondaryButtonStyle]: kind === 'secondary',
  })
  return (
    <button className={style} onClick={onClick} data-tooltip={tooltip}>
      <Icon />
    </button>
  )
}

export const PlayerToggle: FC<ToggleButtonProps> = ({
  kind,
  isToggled,
  tooltip,
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
    <button className={style} onClick={onClick} data-tooltip={tooltip}>
      <Icon />
    </button>
  )
}

export const ButtonGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={buttonGroupStyle}>{children}</div>
}
