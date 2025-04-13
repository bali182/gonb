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
  background-color: #ffffff20;
`

const iconContainerStyle = css`
  display: grid;
`

const baseIconStyle = css`
  transition: opacity 0.2s ease, transform 0.2s ease;
  font-size: 2em;
  grid-row: 1;
  grid-column: 1;
`

const hiddenOffIconStyle = css`
  opacity: 0;
  transform: translateX(-20px) scale(0.8);
`

const hiddenOnIconStyle = css`
  opacity: 0;
  transform: translateX(20px) scale(0.8);
`

const visibleOffIconStyle = css`
  opacity: 1;
  transform: translateX(0) scale(1);
`

const visibleOnIconStyle = css`
  opacity: 1;
  transform: translateX(0) scale(1.25);
`

const simpleSelectedIconStyle = css`
  transform: scale(1.25);
`

export type ToggleButtonMobileProps = {
  kind?: PlayerButtonKind
  isToggled: boolean
  label: MessageKey
  offIcon: IconType
  onIcon: IconType
  onToggle: (isToggled: boolean) => void
}

type SwappingIconsProps = {
  offIcon: IconType
  onIcon: IconType
  isToggled: boolean
}

const SwappingIcons: FC<SwappingIconsProps> = ({
  isToggled,
  offIcon: OffIcon,
  onIcon: OnIcon,
}) => {
  const offIconComputedStyle = cx({
    [baseIconStyle]: true,
    [hiddenOffIconStyle]: true,
    [visibleOffIconStyle]: !isToggled,
  })
  const onIconComputedStyle = cx({
    [baseIconStyle]: true,
    [hiddenOnIconStyle]: true,
    [visibleOnIconStyle]: isToggled,
  })
  return (
    <div className={iconContainerStyle}>
      <OffIcon className={offIconComputedStyle} />
      <OnIcon className={onIconComputedStyle} />
    </div>
  )
}

type SimpleIconProps = {
  isToggled: boolean
  icon: IconType
}

const SimpleIcon: FC<SimpleIconProps> = ({ isToggled, icon: Icon }) => {
  const computedIconStyle = cx({
    [baseIconStyle]: true,
    [simpleSelectedIconStyle]: isToggled,
  })

  return <Icon className={computedIconStyle} />
}

export const PlayerToggleMobile: FC<ToggleButtonMobileProps> = ({
  isToggled,
  label,
  onToggle,
  offIcon: OffIcon,
  onIcon: OnIcon,
}) => {
  const style = cx({
    [baseMobileButtonStyle]: true,
    [toggledMobileButtonStyle]: isToggled,
  })

  const onClick = () => onToggle(!isToggled)
  return (
    <button className={style} onClick={onClick}>
      {OffIcon === OnIcon ? (
        <SimpleIcon isToggled={isToggled} icon={OnIcon} />
      ) : (
        <SwappingIcons
          isToggled={isToggled}
          offIcon={OffIcon}
          onIcon={OnIcon}
        />
      )}
      <span>
        <Trans i18nKey={label} />
      </span>
    </button>
  )
}

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

export const ButtonGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={buttonGroupStyle}>{children}</div>
}
