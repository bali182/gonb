import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue, IssueType } from './types'
import { Duration } from '../../common/duration'
import { validateIfBarCanComplete } from './durationUtils'

export function validateDottedNoteDurations(
  t: TFunction,
  language: string,
  config: GeneratorConfig,
): Issue | undefined {
  const durations = Object.keys(config.noteDurations) as Duration[]
  if (durations.length === 0) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyRhytms') }
  }
  return validateIfBarCanComplete(t, language, config, true)
}
