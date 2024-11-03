import { DurationItem } from './types'
import { useMemoizedTranslation1 } from '../../../../common/useMemoizedTranslation'
import { createDurationsSetter, getDurationItems } from './utils'
import { DurationConfig } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'

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
