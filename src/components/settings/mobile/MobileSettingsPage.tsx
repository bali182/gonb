import { css, cx } from '@emotion/css'
import { PropsWithChildren } from 'react'
import { PiCaretLeft, PiX } from 'react-icons/pi'
import { isNil } from '../../../common/utils'
import { Button } from '../../Button'
import { PagedModalButton } from '../../types'
import {
  actionIconStyle,
  headerStyle,
  MOBILE_TOOLBAR_HEIGHT,
} from '../../constants'

export type MobileSettingsPageProps<T> = PropsWithChildren & {
  title: string
  isOpen: boolean
  buttons?: PagedModalButton[]
  data?: T
  onClick?: (button: PagedModalButton, data?: T) => void
  onBack?: () => void
  onClose?: () => void
}

const basePageStyle = css`
  position: fixed;
  top: 0px;
  left: 100vw;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  transition: 0.2s ease;
  background-color: #ffffff;

  @supports (height: 100dvh) {
    height: min(100vh, 100dvh);
  }
`

const openPageStyle = css`
  left: 0px;
`

const titleBarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: ${MOBILE_TOOLBAR_HEIGHT}px;
  background-color: #f0f0f0;
  border-bottom: 2px solid #ccc;
`

const titlesStyle = cx(
  headerStyle,
  css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
)

const backIconStyle = cx(
  actionIconStyle,
  css`
    position: relative;
    left: -5px;
  `,
)

const contentStyle = css`
  flex: 1 1 1px;
  overflow: auto;
`

const buttonContainerStyle = css`
  width: 100%;
  padding: 40px;
  height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  pointer-events: all;
  gap: 10px;
  width: 100%;
  border-bottom-right-radius: 14px;
  background-color: #f0f0f0;
  border-top: 2px solid #ccc;
`

export function MobileSettingsPage<T>({
  isOpen,
  title,
  buttons,
  children,
  data,
  onBack,
  onClose,
  onClick,
}: MobileSettingsPageProps<T>) {
  const pageStyle = cx({
    [basePageStyle]: true,
    [openPageStyle]: isOpen,
  })

  return (
    <div className={pageStyle}>
      <div className={titleBarStyle}>
        {!isNil(onBack) && (
          <PiCaretLeft className={backIconStyle} onClick={onBack} />
        )}
        <div className={titlesStyle}>
          <span>{title}</span>
        </div>
        {!isNil(onClose) && (
          <PiX className={actionIconStyle} onClick={onClose} />
        )}
      </div>
      <div className={contentStyle}>{children}</div>

      {!isNil(buttons) && !isNil(onClick) && buttons.length > 0 && (
        <div className={buttonContainerStyle}>
          {buttons.map((button) => (
            <Button
              key={button.id}
              onClick={() => onClick(button, data)}
              disabled={!button.enabled}
            >
              <button.icon /> {button.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
