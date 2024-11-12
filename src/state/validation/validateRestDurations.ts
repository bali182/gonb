import { TFunction } from 'i18next'
import { Issue } from './types'
import { validateIfAllFitsBar, validateIfBarCanComplete } from './durationUtils'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { DurationType } from '../../common/durationType'

export function validateRestDurations(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue> {
  return [
    ...validateIfAllFitsBar(t, language, config, false, DurationType.REST),
    ...validateIfBarCanComplete(t, language, config, false),
  ]
}
