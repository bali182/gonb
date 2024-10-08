import { css, cx } from '@emotion/css'
import { ComponentType, FC, useMemo, useState } from 'react'
import { PiGearFill, PiX } from 'react-icons/pi'
import { Modal } from './Modal'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'

export type PageProps = {
  onClose: () => void
}

export type ModalPage = {
  id: string
  name: string
  Icon: IconType
  Component: ComponentType<PageProps>
}

export type PagedModalProps = {
  activePage: string
  title: string
  icon: IconType
  pages: ModalPage[]
  onClose: () => void
  setActivePage: (pageId: string) => void
}

const menuStyle = css`
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  background-color: #ffffff10;
  min-width: 200px;
`

const menuHeaderStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4em;
  font-weight: bold;
  color: #ffffff;
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
  color: #ffffffcc;
  font-size: 1.2em;
  gap: 10px;
  padding: 10px 18px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #ffffff10;
  }
`

const activeMenuItemStyle = css`
  background-color: #ffffff20;
  color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: #ffffff20;
  }
`

const contentStyle = css`
  flex: 1;
  min-width: 400px;
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
  color: #ffffff;
  padding: 14px;
`

const closeIconStyle = css`
  font-size: 1.4em;
  color: #ffffff;
  cursor: pointer;
`

const contentContainerStyle = css`
  width: 600px;
  height: 600px;
  overflow: auto;
`

export const PagedModal: FC<PagedModalProps> = ({
  pages,
  title,
  icon: Icon,
  activePage: activePageId,
  onClose,
  setActivePage,
}) => {
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
          {<activePage.Component onClose={onClose} />}
        </div>
      </div>
    </Modal>
  )
}
