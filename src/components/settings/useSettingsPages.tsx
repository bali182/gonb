import { useTranslation } from 'react-i18next'
import { SettingsPage } from './types'
import { useMemo } from 'react'
import { nanoid } from 'nanoid'
import { PiMusicNotesSimple } from 'react-icons/pi'
import { PageMelody as ProgressionPage } from './PageMelody'

export function useSettingsPages(): SettingsPage[] {
  const { t, i18n } = useTranslation()
  const pages = useMemo((): SettingsPage[] => {
    return [
      {
        id: nanoid(),
        name: t('Settings.Melody'),
        Icon: PiMusicNotesSimple,
        Component: ProgressionPage,
      },
      // {
      //   id: nanoid(),
      //   name: t('Settings.Display'),
      //   Icon: PiMusicNotesSimple,
      //   Component: ProgressionPage,
      // },
    ]
  }, [t, i18n.language])
  return pages
}
