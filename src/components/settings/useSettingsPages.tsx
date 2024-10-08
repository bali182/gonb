import { useTranslation } from 'react-i18next'
import { SettingsPage } from './types'
import { useMemo } from 'react'
import { nanoid } from 'nanoid'
import { PiGearFill, PiMusicNotesSimple, PiMusicNotesSimpleFill } from 'react-icons/pi'
import { PageBasics } from './PageBasics'
import { PageDetails } from './PageDetails'

export function useSettingsPages(): SettingsPage[] {
  const { t, i18n } = useTranslation()
  const pages = useMemo((): SettingsPage[] => {
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
