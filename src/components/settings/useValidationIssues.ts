import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { GeneratorConfig } from '../../state/types'
import { ConfigIssues } from '../../state/validation/types'
import { validate } from '../../state/validation/validate'

export function useValidationIssues(config: GeneratorConfig): ConfigIssues {
  return useMemoizedTranslation1(validate, config)
}
