import { TFunction } from 'i18next'
import { GeneratorConfig } from '../types'
import { Issue } from './types'
import { validateIfBarCanComplete } from './durationUtils'

export function validateRestDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  return validateIfBarCanComplete(t, config, false)
}
