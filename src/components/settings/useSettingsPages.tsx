import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { nanoid } from 'nanoid'
import { PiGearFill, PiMusicNotesSimpleFill } from 'react-icons/pi'
import { PageBasics } from './PageBasics'
import { PageDetails } from './PageDetails'
import { ModalPage } from '../PagedModal'

export function useSettingsPages(): ModalPage[] {
  const { t, i18n } = useTranslation()
  const pages = useMemo((): ModalPage[] => {
    return [
      {
        id: nanoid(),
        name: t('Settings.Basics'),
        Icon: PiGearFill,
        Component: PageBasics,
      },
      {
        id: nanoid(),
        name: t('Settings.Details'),
        Icon: PiMusicNotesSimpleFill,
        Component: PageDetails,
      },
    ]
  }, [t, i18n.language])
  return pages
}
