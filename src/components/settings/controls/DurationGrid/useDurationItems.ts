import { DurationItem } from './types'
import { useMemoizedTranslation1 } from '../../../../common/useMemoizedTranslation'
import { createDurationsSetter, getDurationItems } from './utils'
import { DurationConfig, TimeSignature } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'

export function useDurationItems(
  type: DurationType,
  dotted: boolean,
  config: DurationConfig,
  timeSignature: TimeSignature,
  onChange: (items: DurationConfig) => void,
): [DurationItem[], (items: DurationItem[]) => void] {
  const producer = getDurationItems(type, dotted, timeSignature)
  const items = useMemoizedTranslation1(producer, config)
  const setItems = createDurationsSetter(config, onChange)
  return [items, setItems]
}
