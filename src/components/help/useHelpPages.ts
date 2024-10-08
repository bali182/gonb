import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { nanoid } from 'nanoid'
import { GiFClef, GiGClef } from 'react-icons/gi'
import { ModalPage } from '../PagedModal'
import { BassClefHelpPage, TrebleClefHelpPage } from './HelpPages'

export function useHelpPages(): ModalPage[] {
  const { t, i18n } = useTranslation()
  const pages = useMemo((): ModalPage[] => {
    return [
      {
        id: nanoid(),
        name: t('Help.TrebleClef'),
        Icon: GiGClef,
        Component: TrebleClefHelpPage,
      },
      {
        id: nanoid(),
        name: t('Help.BassClef'),
        Icon: GiFClef,
        Component: BassClefHelpPage,
      },
    ]
  }, [t, i18n.language])
  return pages
}
