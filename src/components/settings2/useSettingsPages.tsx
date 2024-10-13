import { nanoid } from 'nanoid'
import { PiGearFill } from 'react-icons/pi'
import { PageBasics } from './pages/PageBasics'
import { ModalPage } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../model/useMemoizedTranslation'
import { PageNoteLengths } from './pages/PageNoteLengths'

function getSettingsPages(t: TFunction): ModalPage[] {
  return [
    {
      id: nanoid(),
      name: t('Settings.Tempo'),
      Icon: PiGearFill,
      Component: PageNoteLengths,
    },
    {
      id: nanoid(),
      name: t('Settings.Basics'),
      Icon: PiGearFill,
      Component: PageBasics,
    },
  ]
}

export function useSettingsPages(): ModalPage[] {
  return useMemoizedTranslation(getSettingsPages)
}