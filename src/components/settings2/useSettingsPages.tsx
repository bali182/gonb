import { nanoid } from 'nanoid'
import {
  PiGearBold,
  PiGearFill,
  PiMetronomeBold,
  PiMusicNote,
  PiMusicNoteBold,
} from 'react-icons/pi'
import { PageNotes } from './pages/PageNotes'
import { ModalPage } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../model/useMemoizedTranslation'
import { PageRhythms } from './pages/PageRhythms'
import { PageBasics } from './pages/PageBasics'

function getSettingsPages(t: TFunction): ModalPage[] {
  return [
    {
      id: nanoid(),
      name: t('Settings.BasicsPage'),
      Icon: PiGearBold,
      Component: PageBasics,
    },
    {
      id: nanoid(),
      name: t('Settings.RhythmsPage'),
      Icon: PiMetronomeBold,
      Component: PageRhythms,
    },
    {
      id: nanoid(),
      name: t('Settings.NotesPage'),
      Icon: PiMusicNoteBold,
      Component: PageNotes,
    },
  ]
}

export function useSettingsPages(): ModalPage[] {
  return useMemoizedTranslation(getSettingsPages)
}
