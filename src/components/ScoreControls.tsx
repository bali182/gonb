import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import { MessageKey } from '../languages/types'
import { Trans } from 'react-i18next'

type PlayerButtonKind = 'primary' | 'secondary'

export type BasicButtonProps = {
  kind?: PlayerButtonKind
  label: MessageKey
  icon: IconType
  onClick: () => void
}

export type ToggleButtonProps = {
  kind?: PlayerButtonKind
  isToggled: boolean
  label: MessageKey
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

export const PlayerButtonDesktop: FC<BasicButtonProps> = ({
  onClick,
  kind,
  label: tooltip,
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

export const PlayerToggleDesktop: FC<ToggleButtonProps> = ({
  kind,
  isToggled,
  label: tooltip,
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

const baseMobileButtonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  &:focus {
    color: #ffffff;
  }
`

const toggledMobileButtonStyle = css`
  color: #ffffff;
  font-weight: bold;
`

export const PlayerButtonMobile: FC<BasicButtonProps> = ({
  onClick,
  label,
  icon: Icon,
}) => {
  const style = cx({
    [baseMobileButtonStyle]: true,
  })
  return (
    <button className={style} onClick={onClick}>
      <Icon fontSize="2em" />
      <Trans i18nKey={label} />
    </button>
  )
}

export const PlayerToggleMobile: FC<ToggleButtonProps> = ({
  isToggled,
  label,
  onToggle,
  icon: Icon,
}) => {
  const style = cx({
    [baseMobileButtonStyle]: true,
    [toggledMobileButtonStyle]: isToggled,
  })
  const fullLabelStyle = cx({})
  const onClick = () => onToggle(!isToggled)
  return (
    <button className={style} onClick={onClick}>
      <Icon fontSize="2em" />
      <span className={fullLabelStyle}>
        <Trans i18nKey={label} />
      </span>
    </button>
  )
}

export const ButtonGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={buttonGroupStyle}>{children}</div>
}
