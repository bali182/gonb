import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { Duration } from '../../common/duration'
import { validateIfAllFitsBar, validateIfBarCanComplete } from './durationUtils'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { DurationType } from '../../common/durationType'
import { isNil } from '../../common/utils'

export function validateDottedNoteDurations(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): Issue | undefined {
  const durations = Object.keys(config.noteDurations) as Duration[]
  if (durations.length === 0) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyRhytms') }
  }
  const fitsBar = validateIfAllFitsBar(
    t,
    language,
    config,
    true,
    DurationType.NOTE,
  )
  if (!isNil(fitsBar)) {
    return fitsBar
  }
  return validateIfBarCanComplete(t, language, config, true)
}
