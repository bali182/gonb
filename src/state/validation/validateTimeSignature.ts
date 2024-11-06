import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue, IssueType } from './types'

const POSSIBLE_LOWER = [1, 2, 4, 8]
const UPPER_MIN = 1
const UPPER_MAX = 30

export function validateTimeSignature(
  t: TFunction,
  language: string,
  config: GeneratorConfig,
): Issue | undefined {
  const { timeSignature } = config
  const { lower, upper } = timeSignature

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
      label: t('Validation.TimeSignatureLower', {
        min: UPPER_MIN,
        max: UPPER_MAX,
      }),
    }
  }
  return undefined
}
