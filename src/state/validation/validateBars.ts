import { TFunction } from 'i18next'
import { GeneratorConfig } from '../../state/types'
import { Issue, IssueType } from './types'

export function validateBars(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.bars <= 0) {
    return { type: IssueType.ERROR, label: t('Validation.ZeroBars') }
  }
  return undefined
}
