import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { Duration } from '../../common/duration'
import { validateIfAllFitsBar, validateIfBarCanComplete } from './durationUtils'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { DurationType } from '../../common/durationType'

export function validateDottedNoteDurations(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue> {
  const durations = Object.keys(config.noteDurations) as Duration[]
  if (durations.length === 0) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.EmptyRhytms'),
      },
    ]
  }
  return [
    ...validateIfAllFitsBar(t, language, config, true, DurationType.NOTE),
    ...validateIfBarCanComplete(t, language, config, true),
  ]
}
