import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil } from '../../common/utils'
import { NO_ISSUES } from './utils'

export function validateBpm(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue> {
  if (isNil(config.tempo)) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.EmptyTempo'),
      },
    ]
  }
  if (config.tempo < 10 || config.tempo > 400) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.WrongBpm'),
      },
    ]
  }
  return NO_ISSUES
}
