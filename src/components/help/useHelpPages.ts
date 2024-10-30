import { GiFClef, GiGClef } from 'react-icons/gi'
import { ModalPage } from '../PagedModal'
import { BassClefHelpPage, TrebleClefHelpPage } from './HelpPages'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../common/useMemoizedTranslation'
import { HelpPage } from './types'
import { HelpPageId } from './HelpPageId'

function getHelpPages(t: TFunction): HelpPage[] {
  return [
    {
      id: HelpPageId.TREBLE_CLEF,
      name: t('Help.TrebleClef'),
      Icon: GiGClef,
      Component: TrebleClefHelpPage,
    },
    {
      id: HelpPageId.BASS_CLEF,
      name: t('Help.BassClef'),
      Icon: GiFClef,
      Component: BassClefHelpPage,
    },
  ]
}

export function useHelpPages(): HelpPage[] {
  return useMemoizedTranslation(getHelpPages)
}
