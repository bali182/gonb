import { css, cx } from '@emotion/css'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { PiX } from 'react-icons/pi'
import { Modal } from './Modal'
import { Button } from './Button'
import { isNil, noop } from '../common/utils'
import { useScrollOverflowGradient } from './useScrollOverflowGradient'
import { ModalPage, PagedModalButton } from './types'

export type PagedModalProps<P extends string, T> = {
  activePageId: P
  title: string
  icon: IconType
  closeOnBackdropClick?: boolean
  pageProps: T
  pages: ModalPage<P, T>[]
  buttons?: PagedModalButton[]
  onClick?: (button: PagedModalButton, props: T) => void
  onClose: () => void
  setActivePage: (pageId: P) => void
}

const menuStyle = css`
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  min-width: 245px;
`

const menuHeaderStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #000000;
  gap: 10px;
  padding: 14px 18px;
`

const headerIconStyle = css`
  position: relative;
  top: 1px;
`

const menuContainerStyle = css`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
`

const menuItemStlye = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000cc;
  font-size: 1.2rem;
  gap: 10px;
  padding: 10px 18px;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #00000010;
  }
`

const activeMenuItemStyle = css`
  background-color: #00000020;
  color: #000000;
  &:hover {
    color: #000000;
    background-color: #00000020;
  }
`

const menuItemNameStyle = css`
  flex: 1;
`

const contentStyle = css`
  position: relative;
  flex: 1;
  min-width: 400px;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 2px 29px 0px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  /* margin: 10px 10px 10px 0px; */
  /* border-radius: 10px; */
`

const contentTitleStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const contentHeaderStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #000000;
  padding: 14px;
`

const closeIconStyle = css`
  font-size: 1.4rem;
  color: #000000;
  cursor: pointer;
`

const contentContainerStyle = css`
  overflow: auto;
  width: 600px;
  height: 540px;
`

const gradientBase = css`
  position: absolute;
  pointer-events: none;
  height: 50px;
  transition: opacity linear 200ms;
`

const bottomGradient = cx(
  gradientBase,
  css`
    bottom: 65px;
    left: 0px;
    right: 20px;
    background: linear-gradient(0deg, #ffffffff 0%, transparent 100%);
  `,
)

const topGradient = cx(
  gradientBase,
  css`
    top: 60px;
    left: 0px;
    right: 20px;
    background: linear-gradient(180deg, #ffffffff 0%, transparent 100%);
  `,
)

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

export function PagedModal<P extends string, T>({
  pages,
  title,
  icon: Icon,
  activePageId,
  pageProps: pageData,
  closeOnBackdropClick,
  buttons = [],
  onClick,
  onClose,
  setActivePage,
}: PagedModalProps<P, T>) {
  const activePage = useMemo(
    () => pages.find((page) => page.id === activePageId)!,
    [pages, activePageId],
  )

  const { ref, needsBottomGradient, needsTopGradient, onScroll, setScrollTop } =
    useScrollOverflowGradient()

  const onMenuClick = (id: P) => () => {
    setActivePage(id)
    setScrollTop(0)
  }

  return (
    <Modal onBackdropClick={closeOnBackdropClick ? onClose : noop}>
      <div className={menuStyle}>
        <header className={menuHeaderStyle}>
          <Icon className={headerIconStyle} /> {title}
        </header>
        <div className={menuContainerStyle}>
          {pages.map((e) => {
            const { id, name, Icon, Badge } = e
            const className = cx(
              menuItemStlye,
              id === activePageId ? activeMenuItemStyle : null,
            )
            return (
              <div key={id} className={className} onClick={onMenuClick(e.id)}>
                <Icon />
                <span className={menuItemNameStyle}>{name}</span>
                {Badge && <Badge />}
              </div>
            )
          })}
        </div>
      </div>
      <div className={contentStyle}>
        <header className={contentHeaderStyle}>
          <div className={contentTitleStyle}>
            <activePage.Icon /> {activePage.name}
          </div>
          <PiX className={closeIconStyle} onClick={onClose} />
        </header>
        <div className={contentContainerStyle} ref={ref} onScroll={onScroll}>
          {
            <div
              className={topGradient}
              style={{ opacity: needsTopGradient ? 1 : 0 }}
            />
          }
          {<activePage.Component {...(pageData as any)} />}
        </div>
        {isNil(buttons) || buttons.length === 0 ? null : (
          <>
            {
              <div
                className={bottomGradient}
                style={{ opacity: needsBottomGradient ? 1 : 0 }}
              />
            }
            <ButtonsBar
              buttons={buttons}
              data={pageData}
              onClick={onClick ?? noop}
            />
          </>
        )}
      </div>
    </Modal>
  )
}

type ButtonsBarProps<T> = {
  buttons: PagedModalButton[]
  data: T
  onClick: (button: PagedModalButton, data: T) => void
}

function ButtonsBar<T>({ buttons, data, onClick }: ButtonsBarProps<T>) {
  return (
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
  )
}
