import { css, cx } from '@emotion/css'
import { FC, Fragment, PropsWithChildren } from 'react'
import { PiCaretLeft, PiCaretLeftBold, PiX } from 'react-icons/pi'
import { isNil } from '../../../common/utils'
import { Button } from '../../Button'
import { PagedModalButton } from '../../types'

export type MobileSettingsPageProps<T> = PropsWithChildren & {
  titles: string[]
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
  box-shadow: rgba(100, 100, 111, 0.4) 0px 2px 29px 0px;

  @supports (height: 100dvh) {
    height: min(100vh, 100dvh);
  }
`

const openPageStyle = css`
  left: 0px;
`

const headerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 40px;
  height: 150px;
`

const titlesStyle = css`
  font-size: 2rem;
  flex-grow: 1;
  flex-shrink: 1;
`

const titleSeparator = css`
  color: #666;
  margin-left: 20px;
  margin-right: 20px;
`

const closeIconStyle = css`
  font-size: 3rem;
`

const backIconStyle = css`
  font-size: 3rem;
  position: relative;
  left: -10px;
`

const contentStyle = css`
  flex: 1 1 1px;
`

const buttonContainerStyle = css`
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: all;
  padding: 14px;
  gap: 10px;
  width: 100%;
  border-bottom-right-radius: 14px;
`

export function MobileSettingsPage<T>({
  isOpen,
  titles,
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
      <div className={headerStyle}>
        {titles.length > 1 && !isNil(onBack) && (
          <PiCaretLeft className={backIconStyle} onClick={onBack} />
        )}
        <div className={titlesStyle}>
          {titles.map((title, index) => (
            <Fragment key={title}>
              <span>{title}</span>
              {index < titles.length - 1 && (
                <span className={titleSeparator}>/</span>
              )}
            </Fragment>
          ))}
        </div>
        <PiX className={closeIconStyle} onClick={onClose} />
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
