import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil } from '../../common/utils'

export function validateBpm(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
): Issue | undefined {
  if (isNil(config.tempo)) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyTempo') }
  }
  if (config.tempo < 10 || config.tempo > 400) {
    return { type: IssueType.ERROR, label: t('Validation.WrongBpm') }
  }
  return undefined
}
