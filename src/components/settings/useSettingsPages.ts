import {
  PiGearBold,
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
  PiShareBold,
} from 'react-icons/pi'
import { PageNotes } from './pages/PageNotes'
import { ModalPage } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { PageRhythms } from './pages/PageRhythms'
import { PageBasics } from './pages/PageBasics'
import { ConfigIssues, Issue, SettingsPage } from './types'
import { isNil, isNotNil } from '../../common/utils'
import { issueComparator } from './utils'
import { ErrorIcon, WarningIcon } from './controls/InputSectionPrimitives'
import { ComponentType } from 'react'
import { PageShare } from './pages/PageShare'
import { PageChords } from './pages/PageChords'
import { SettingsPageId } from './SettingsPageId'

function getBadge(...issues: (Issue | undefined)[]): ComponentType | undefined {
  const sorted = issues.filter(isNotNil).sort(issueComparator)
  const first = sorted[0]
  if (isNil(first)) {
    return undefined
  }
  return first.type === 'error' ? ErrorIcon : WarningIcon
}

function getSettingsPages(t: TFunction, issues: ConfigIssues): SettingsPage[] {
  return [
    {
      id: SettingsPageId.BASICS,
      name: t('Settings.BasicsPage'),
      Icon: PiGearBold,
      Badge: getBadge(
        issues.bars,
        issues.bpm,
        issues.clef,
        issues.keySignature,
      ),
      Component: PageBasics,
    },
    {
      id: SettingsPageId.RHYTHMS,
      name: t('Settings.RhythmsPage'),
      Icon: PiMetronomeBold,
      Badge: getBadge(issues.noteDurations, issues.restDurations),
      Component: PageRhythms,
    },
    {
      id: SettingsPageId.NOTES,
      name: t('Settings.NotesPage'),
      Icon: PiMusicNoteBold,
      Badge: getBadge(issues.notes),
      Component: PageNotes,
    },
    {
      id: SettingsPageId.CHORDS,
      name: t('Settings.ChordsPage'),
      Icon: PiMusicNotesBold,
      Badge: undefined,
      Component: PageChords,
    },
    {
      id: SettingsPageId.SHARE,
      name: t('Settings.SharePage'),
      Icon: PiShareBold,
      Badge: undefined,
      Component: PageShare,
    },
  ]
}

export function useSettingsPages(issues: ConfigIssues): SettingsPage[] {
  return useMemoizedTranslation1(getSettingsPages, issues)
}