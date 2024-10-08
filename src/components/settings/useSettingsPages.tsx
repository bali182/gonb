import { nanoid } from 'nanoid'
import { PiGearFill, PiMusicNotesSimpleFill } from 'react-icons/pi'
import { PageBasics } from './PageBasics'
import { PageDetails } from './PageDetails'
import { ModalPage } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../model/useMemoizedTranslation'

function getSettingsPages(t: TFunction): ModalPage[] {
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
}

export function useSettingsPages(): ModalPage[] {
  return useMemoizedTranslation(getSettingsPages)
}
