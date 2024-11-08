import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue } from './types'
import { validateIfAllFitsBar, validateIfBarCanComplete } from './durationUtils'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { DurationType } from '../../common/durationType'
import { isNil } from '../../common/utils'

export function validateDottedRestDurations(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): Issue | undefined {
  const fitsBar = validateIfAllFitsBar(
    t,
    language,
    config,
    true,
    DurationType.REST,
  )
  if (!isNil(fitsBar)) {
    return fitsBar
  }
  return validateIfBarCanComplete(t, language, config, true)
}
