import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { GeneratorConfig } from '../../state/types'
import { ConfigIssues } from '../../state/validation/types'
import { validate } from '../../state/validation/validate'
import { NumberSafeGeneratorConfig } from './types'

export function useValidationIssues(
  config: NumberSafeGeneratorConfig,
): ConfigIssues {
  return useMemoizedTranslation1(validate, config)
}
