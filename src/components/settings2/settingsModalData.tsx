import { nanoid } from 'nanoid'
import {
  PiFloppyDiskBold,
  PiGearBold,
  PiGearFill,
  PiMetronomeBold,
  PiMusicNote,
  PiMusicNoteBold,
  PiTestTube,
} from 'react-icons/pi'
import { PageNotes } from './pages/PageNotes'
import { ModalPage, PagedModalButton } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../model/useMemoizedTranslation'
import { PageRhythms } from './pages/PageRhythms'
import { PageBasics } from './pages/PageBasics'

function getSettingsPages(t: TFunction): ModalPage[] {
  return [
    {
      id: 'basics',
      name: t('Settings.BasicsPage'),
      Icon: PiGearBold,
      Component: PageBasics,
    },
    {
      id: 'rhythms',
      name: t('Settings.RhythmsPage'),
      Icon: PiMetronomeBold,
      Component: PageRhythms,
    },
    {
      id: 'notes',
      name: t('Settings.NotesPage'),
      Icon: PiMusicNoteBold,
      Component: PageNotes,
    },
  ]
}

export function useSettingsPages(): ModalPage[] {
  return useMemoizedTranslation(getSettingsPages)
}

function getButtons(t: TFunction): PagedModalButton[] {
  return [
    { id: 'test', label: 'Test', icon: PiTestTube },
    { id: 'save', label: t('Settings.Save'), icon: PiFloppyDiskBold },
  ]
}

export function useSettingsButtons(): PagedModalButton[] {
  return useMemoizedTranslation(getButtons)
}
