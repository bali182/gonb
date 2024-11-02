import { DurationConfig, DurationItem, DurationType } from './types'
import { useMemoizedTranslation1 } from '../../../../common/useMemoizedTranslation'
import { createDurationsSetter, getDurationItems } from './utils'

export function useDurationItems(
  type: DurationType,
  dotted: boolean,
  config: DurationConfig,
  onChange: (items: DurationConfig) => void,
): [DurationItem[], (items: DurationItem[]) => void] {
  const items = useMemoizedTranslation1(getDurationItems(type, dotted), config)
  const setItems = createDurationsSetter(config, onChange)
  return [items, setItems]
}
