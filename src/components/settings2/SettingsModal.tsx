import { FC, useState } from 'react'
import { PiGearBold, PiGearFill } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { useSettingsPages } from './useSettingsPages'
import { PagedModal } from '../PagedModal'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const pages = useSettingsPages()
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)
  const { t } = useTranslation()
  return (
    <PagedModal
      icon={PiGearBold}
      activePage={activePage}
      title={t('Settings.Settings')}
      setActivePage={setActivePage}
      pages={pages}
      onClose={onClose}
      pageProps={undefined}
    />
  )
}
