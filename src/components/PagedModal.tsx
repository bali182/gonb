import { css, cx } from '@emotion/css'
import { ComponentType, useMemo } from 'react'
import { PiX } from 'react-icons/pi'
import { Modal } from './Modal'
import { IconType } from 'react-icons'

export type ModalPage<T = any> = {
  id: string
  name: string
  Icon: IconType
  Component: ComponentType<T>
}

export type PagedModalProps<T = any> = {
  activePage: string
  title: string
  icon: IconType
  pageProps: T
  pages: ModalPage<T>[]
  onClose: () => void
  setActivePage: (pageId: string) => void
}

const menuStyle = css`
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  background-color: #f9f9f9;
  min-width: 200px;
`

const menuHeaderStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4em;
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
  align-items: center;
  color: #000000cc;
  font-size: 1.2em;
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

const contentStyle = css`
  flex: 1;
  min-width: 400px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  font-size: 1.4em;
  font-weight: bold;
  color: #000000;
  padding: 14px;
`

const closeIconStyle = css`
  font-size: 1.4em;
  color: #000000;
  cursor: pointer;
`

const contentContainerStyle = css`
  width: 600px;
  height: 600px;
  overflow: auto;
`

export function PagedModal<T>({
  pages,
  title,
  icon: Icon,
  activePage: activePageId,
  pageProps: pageData,
  onClose,
  setActivePage,
}: PagedModalProps<T>) {
  const activePage = useMemo(
    () => pages.find((page) => page.id === activePageId)!,
    [pages, activePageId],
  )
  return (
    <Modal onBackdropClick={onClose}>
      <div className={menuStyle}>
        <header className={menuHeaderStyle}>
          <Icon className={headerIconStyle} /> {title}
        </header>
        <div className={menuContainerStyle}>
          {pages.map((e) => {
            const { id, name, Icon } = e
            const className = cx(
              menuItemStlye,
              id === activePageId ? activeMenuItemStyle : null,
            )
            const onClick = () => setActivePage(e.id)
            return (
              <div key={id} className={className} onClick={onClick}>
                <Icon /> {name}
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
        <div className={contentContainerStyle}>
          {<activePage.Component {...(pageData as any)} />}
        </div>
      </div>
    </Modal>
  )
}
