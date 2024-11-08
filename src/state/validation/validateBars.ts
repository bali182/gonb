import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil } from '../../common/utils'

export function validateBars(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
): Issue | undefined {
  if (isNil(config.bars)) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyBars') }
  }
  if (config.bars <= 0) {
    return { type: IssueType.ERROR, label: t('Validation.ZeroBars') }
  }
  return undefined
}
