import { FC } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { useHelpPages } from './useHelpPages'
import { PagedModal } from '../PagedModal'
import { HelpPageId } from './HelpPageId'
import { useDispatch, useSelector } from 'react-redux'
import { pagesSlice } from '../../state/pagesSlice'
import { AppDispatch } from '../../state/store'

export type HelpModalProps = {
  onClose: () => void
}

export const HelpModal: FC<HelpModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const pages = useHelpPages()
  const activePageId = useSelector(pagesSlice.selectors.selectHelpPage)
  const setActivePage = (page: HelpPageId) =>
    dispatch(pagesSlice.actions.setHelpPage(page))

  return (
    <PagedModal
      icon={PiGearBold}
      activePageId={activePageId}
      title={t('Help.Help')}
      onClose={onClose}
      setActivePage={setActivePage}
      pages={pages}
      pageProps={undefined as any}
    />
  )
}
