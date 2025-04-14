import { FC } from 'react'
import { useIsMobile } from '../useIsMobile'
import { useAppContext } from '../../context/useAppContext'
import { MobileSettings } from './mobile/MobileSettings'
import { SettingsModal } from './SettingsModal'

export const Settings: FC = () => {
  const { isSettingsOpen, setSettingsOpen } = useAppContext()
  const isMobile = useIsMobile()

  const onClose = () => setSettingsOpen(false)

  if (isMobile) {
    return <MobileSettings />
  }
  return isSettingsOpen && <SettingsModal onClose={onClose} />
}
