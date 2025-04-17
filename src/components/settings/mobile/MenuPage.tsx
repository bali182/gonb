import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PagedModalButton } from '../../types'
import { SettingsPage } from '../types'
import { DrilldownMenu } from './DrilldownMenu'
import { MobileSettingsPage } from './MobileSettingsPage'
import { css } from '@emotion/css'
import { VolumeControls } from './VolumeControls'
import { LanguagePicker } from '../controls/LanguageSelector/LanguageSelector'

type MenuProps = {
  isOpen: boolean
  buttons: PagedModalButton[]
  pages: SettingsPage[]
  onClose: () => void
  onClick: (page: SettingsPage) => void
  onButtonClick: (button: PagedModalButton) => void
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
`

export const MenuPage: FC<MenuProps> = ({
  isOpen,
  buttons,
  pages,
  onClose,
  onClick,
  onButtonClick,
}) => {
  const { t } = useTranslation()
  return (
    <MobileSettingsPage
      title={t('Settings.Settings')}
      isOpen={isOpen}
      buttons={buttons}
      onClose={onClose}
      onClick={onButtonClick}
    >
      <div className={containerStyle}>
        <LanguagePicker />
        <DrilldownMenu pages={pages} onClick={onClick} />
        <VolumeControls />
      </div>
    </MobileSettingsPage>
  )
}
