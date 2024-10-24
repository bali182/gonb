import { PiFloppyDiskBold, PiTestTubeBold } from 'react-icons/pi'
import { PagedModalButton } from '../PagedModal'
import { TFunction } from 'i18next'
import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { ConfigIssues } from './types'

function getButtons(t: TFunction, issues: ConfigIssues): PagedModalButton[] {
  const errors = Object.values(issues).filter(
    (issue) => issue?.type === 'error',
  )

  return [
    {
      id: 'test',
      label: 'Test',
      icon: PiTestTubeBold,
      enabled: errors.length === 0,
    },
    {
      id: 'save',
      label: t('Settings.Save'),
      icon: PiFloppyDiskBold,
      enabled: errors.length === 0,
    },
  ]
}

export function useSettingsButtons(issues: ConfigIssues): PagedModalButton[] {
  return useMemoizedTranslation1(getButtons, issues)
}
