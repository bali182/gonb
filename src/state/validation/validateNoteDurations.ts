import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue, IssueType } from './types'
import { Duration } from '../../common/duration'
import { validateIfBarCanComplete } from './durationUtils'

export function validateNoteDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  const durations = Object.keys(config.noteDurations) as Duration[]
  if (durations.length === 0) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyRhytms') }
  }
  return validateIfBarCanComplete(t, config, false)
}
