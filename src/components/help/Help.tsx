import { FC } from 'react'
import { useIsMobile } from '../useIsMobile'
import { useAppContext } from '../../context/useAppContext'
import { HelpModal } from './HelpModal'

export const Help: FC = () => {
  const { isHelpOpen, setHelpOpen } = useAppContext()
  const isMobile = useIsMobile()

  const onClose = () => setHelpOpen(false)

  if (isMobile) {
    return null
  }
  return isHelpOpen && <HelpModal onClose={onClose} />
}
