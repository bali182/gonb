import { TFunction } from 'i18next'
import { DurationConfig, DurationItem } from './types'
import {
  RestWhole,
  RestDottedEighth,
  RestDottedHalf,
  RestDottedQuarter,
  RestDottedSixteenth,
  RestDottedWhole,
  RestEighth,
  RestHalf,
  RestQuarter,
  RestSixteenth,
} from './RestDurations'
import { Duration } from '../../../../common/duration'
import { ComponentType } from 'react'
import { isNil } from '../../../../common/utils'
import { useMemoizedTranslation1 } from '../../../../common/useMemoizedTranslation'

const Components: Record<Duration, ComponentType> = {
  [Duration.WHOLE]: RestWhole,
  [Duration.DOTTED_WHOLE]: RestDottedWhole,
  [Duration.HALF]: RestHalf,
  [Duration.DOTTED_HALF]: RestDottedHalf,
  [Duration.QUARTER]: RestQuarter,
  [Duration.DOTTED_QUARTER]: RestDottedQuarter,
  [Duration.EIGHTH]: RestEighth,
  [Duration.DOTTED_EIGHT]: RestDottedEighth,
  [Duration.SIXTEENTH]: RestSixteenth,
  [Duration.DOTTED_SIXTEENTH]: RestDottedSixteenth,
}

function getRestDurationItem(
  duration: Duration,
  config: DurationConfig,
  t: TFunction,
): DurationItem {
  const cluster = config[duration]
  return {
    type: 'REST',
    Component: Components[duration],
    duration,
    cluster,
    name: t(`Durations.${duration}`),
    isSelected: !isNil(cluster),
  }
}

export function getRestDurations(
  t: TFunction,
  c: DurationConfig,
): DurationItem[] {
  return [
    getRestDurationItem(Duration.WHOLE, c, t),
    getRestDurationItem(Duration.DOTTED_WHOLE, c, t),
    getRestDurationItem(Duration.HALF, c, t),
    getRestDurationItem(Duration.DOTTED_HALF, c, t),
    getRestDurationItem(Duration.QUARTER, c, t),
    getRestDurationItem(Duration.DOTTED_QUARTER, c, t),
    getRestDurationItem(Duration.EIGHTH, c, t),
    getRestDurationItem(Duration.DOTTED_EIGHT, c, t),
    getRestDurationItem(Duration.SIXTEENTH, c, t),
    getRestDurationItem(Duration.DOTTED_SIXTEENTH, c, t),
  ]
}

export function useRestDurations(config: DurationConfig): DurationItem[] {
  return useMemoizedTranslation1(getRestDurations, config)
}
