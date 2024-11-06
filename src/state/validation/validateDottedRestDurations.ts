import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue } from './types'
import { validateIfBarCanComplete } from './durationUtils'

export function validateDottedRestDurations(
  t: TFunction,
  language: string,
  config: GeneratorConfig,
): Issue | undefined {
  return validateIfBarCanComplete(t, language, config, true)
}
