import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil } from '../../common/utils'
import { NO_ISSUES } from './utils'

export function validateBars(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue> {
  if (isNil(config.bars)) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.EmptyBars'),
      },
    ]
  }
  if (config.bars <= 0) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.ZeroBars'),
      },
    ]
  }
  return NO_ISSUES
}
