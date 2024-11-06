import { TFunction } from 'i18next'
import { GeneratorConfig } from '../../state/types'
import { Issue, IssueType } from './types'

export function validateBpm(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.tempo < 10 || config.tempo > 400) {
    return { type: IssueType.ERROR, label: t('Validation.WrongBpm') }
  }
  return undefined
}
