import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { isNil, isNotNil } from '../../common/utils'
import { TimeSignature } from '../types'
import { isCompleteTimeSignature } from './utils'

const POSSIBLE_LOWER = [1, 2, 4, 8]
const UPPER_MIN = 1
const UPPER_MAX = 30

export function validateTimeSignature(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue<keyof TimeSignature>> {
  const { timeSignature } = config

  if (!isCompleteTimeSignature(timeSignature)) {
    const issues: Issue<keyof TimeSignature>[] = []
    if (isNil(timeSignature.lower)) {
      issues.push({
        id: 'lower',
        type: IssueType.ERROR,
        label: t('Validation.EmptyTimeSignatureLower'),
      })
    }
    if (isNil(timeSignature.upper)) {
      issues.push({
        id: 'upper',
        type: IssueType.ERROR,
        label: t('Validation.EmptyTimeSignatureUpper'),
      })
    }
    return issues
  }

  const { lower, upper } = timeSignature

  const issues: Issue<keyof TimeSignature>[] = []

  if (!POSSIBLE_LOWER.includes(lower)) {
    const arrayFormat = new Intl.ListFormat(language, {
      style: 'short',
      type: 'disjunction',
    })
    issues.push({
      id: 'lower',
      type: IssueType.ERROR,
      label: t('Validation.TimeSignatureLower', {
        lower: arrayFormat.format(POSSIBLE_LOWER.map((e) => e.toString())),
      }),
    })
  }
  if (upper < UPPER_MIN || upper > UPPER_MAX) {
    issues.push({
      id: 'upper',
      type: IssueType.ERROR,
      label: t('Validation.TimeSignatureUpper', {
        min: UPPER_MIN,
        max: UPPER_MAX,
      }),
    })
  }

  return issues
}
