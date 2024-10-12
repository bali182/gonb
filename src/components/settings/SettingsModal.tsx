import { FC, useState } from 'react'
import { PiGearFill } from 'react-icons/pi'
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
      icon={PiGearFill}
      activePage={activePage}
      title={t('Settings.Settings')}
      onClose={onClose}
      setActivePage={setActivePage}
      pages={pages}
      pageProps={undefined}
    />
  )
}
