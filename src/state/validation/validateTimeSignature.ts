import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil } from '../../common/utils'

const POSSIBLE_LOWER = [1, 2, 4, 8]
const UPPER_MIN = 1
const UPPER_MAX = 30

export function validateTimeSignature(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): Issue | undefined {
  const { timeSignature } = config
  const { lower, upper } = timeSignature

  if (isNil(lower)) {
    return {
      type: IssueType.ERROR,
      label: t('Validation.EmptyTimeSignatureLower'),
    }
  }
  if (isNil(upper)) {
    return {
      type: IssueType.ERROR,
      label: t('Validation.EmptyTimeSignatureUpper'),
    }
  }

  if (!POSSIBLE_LOWER.includes(lower)) {
    const arrayFormat = new Intl.ListFormat(language, {
      style: 'short',
      type: 'disjunction',
    })
    return {
      type: IssueType.ERROR,
      label: t('Validation.TimeSignatureLower', {
        lower: arrayFormat.format(POSSIBLE_LOWER.map((e) => e.toString())),
      }),
    }
  }
  if (upper < UPPER_MIN || upper > UPPER_MAX) {
    return {
      type: IssueType.ERROR,
      label: t('Validation.TimeSignatureUpper', {
        min: UPPER_MIN,
        max: UPPER_MAX,
      }),
    }
  }
  return undefined
}
