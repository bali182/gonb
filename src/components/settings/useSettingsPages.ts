import {
  PiGearBold,
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
  PiShareBold,
  PiPauseBold,
} from 'react-icons/pi'
import { PageNotes } from './pages/PageNotes'
import { TFunction } from 'i18next'
import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { PageRhythms } from './pages/PageRhythms'
import { PageBasics } from './pages/PageBasics'
import { SettingsPage } from './types'
import { isNil, isNotNil } from '../../common/utils'
import { issueComparator } from './utils'
import { ErrorIcon, WarningIcon } from './controls/InputSectionPrimitives'
import { ComponentType } from 'react'
import { PageShare } from './pages/PageShare'
import { PageChords } from './pages/PageChords'
import { SettingsPageId } from './SettingsPageId'
import { PageRests } from './pages/PageRests'
import { ConfigIssues, Issue } from '../../state/validation/types'

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
      id: SettingsPageId.NOTES,
      name: t('Settings.NotesPage'),
      Icon: PiMusicNoteBold,
      Badge: getBadge(issues.notes),
      Component: PageNotes,
    },
    {
      id: SettingsPageId.RHYTHMS,
      name: t('Settings.RhythmsPage'),
      Icon: PiMetronomeBold,
      Badge: getBadge(issues.noteDurations, issues.dottedNoteDurations),
      Component: PageRhythms,
    },
    {
      id: SettingsPageId.RESTS,
      name: t('Settings.RestsPage'),
      Icon: PiPauseBold,
      Badge: getBadge(issues.restDurations, issues.dottedRestDurations),
      Component: PageRests,
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
