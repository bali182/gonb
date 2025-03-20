import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PagedModalButton } from '../../types'
import { VolumeControls } from '../../VolumeControls'
import { SettingsPage } from '../types'
import { DrilldownMenu } from './DrilldownMenu'
import { MobileSettingsPage } from './MobileSettingsPage'

type MenuProps = {
  isOpen: boolean
  buttons: PagedModalButton[]
  pages: SettingsPage[]
  onClose: () => void
  onClick: (page: SettingsPage) => void
  onButtonClick: (button: PagedModalButton) => void
}

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
      <DrilldownMenu pages={pages} onClick={onClick} />
      <VolumeControls />
    </MobileSettingsPage>
  )
}
