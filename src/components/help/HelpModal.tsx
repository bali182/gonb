import { FC, useState } from 'react'
import { PiGearFill } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { useHelpPages } from './useHelpPages'
import { PagedModal, PageProps } from '../PagedModal'

export const HelpModal: FC<PageProps> = ({ onClose }) => {
  const pages = useHelpPages()
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)
  const { t } = useTranslation()
  return (
    <PagedModal
      icon={PiGearFill}
      activePage={activePage}
      title={t('Help.Help')}
      onClose={onClose}
      setActivePage={setActivePage}
      pages={pages}
    />
  )
}
