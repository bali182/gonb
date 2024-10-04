import { css, cx } from '@emotion/css'
import { FC, useState } from 'react'
import { PiGearFill, PiX } from 'react-icons/pi'
import { Modal } from './Modal'
import { PageProps, SettingsPage } from './types'
import { useTranslation } from 'react-i18next'
import { useSettingsPages } from './useSettingsPages'

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
`

export const SettingsModal: FC<PageProps> = ({ onClose }) => {
  const pages = useSettingsPages()
  const [activePage, setActivePage] = useState<SettingsPage>(pages[0]!)
  const { t } = useTranslation()
  return (
    <Modal onBackdropClick={onClose}>
      <div className={menuStyle}>
        <header className={menuHeaderStyle}>
          <PiGearFill className={headerIconStyle} /> {t('Settings.Settings')}
        </header>
        <div className={menuContainerStyle}>
          {pages.map((e) => {
            const { id, name, Icon } = e
            const className = cx(
              menuItemStlye,
              id === activePage.id ? activeMenuItemStyle : null,
            )
            const onClick = () => setActivePage(e)
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
