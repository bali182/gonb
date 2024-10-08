import { nanoid } from 'nanoid'
import { GiFClef, GiGClef } from 'react-icons/gi'
import { ModalPage } from '../PagedModal'
import { BassClefHelpPage, TrebleClefHelpPage } from './HelpPages'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../model/useMemoizedTranslation'

function getHelpPages(t: TFunction): ModalPage[] {
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
}

export function useHelpPages(): ModalPage[] {
  return useMemoizedTranslation(getHelpPages)
}
