import Fraction from 'fraction.js'
import { DurationConfig, DurationItem, DurationType } from './types'
import { Duration } from '../../../../common/duration'
import { asFraction } from '../../../../generator/rhythm/asFraction'
import * as NoteDurations from './NoteDurations'
import * as RestDurations from './RestDurations'
import { ComponentType } from 'react'
import { TFunction } from 'i18next'
import { capitalize, isDotted, isNil } from '../../../../common/utils'
import { DurationFrequency } from '../../../../common/durationFrequency'

export const createDurationsSetter =
  (config: DurationConfig = {}, onChange: (items: DurationConfig) => void) =>
  (items: DurationItem[]): void => {
    const newConfig: DurationConfig = { ...config }
    for (const { isEnabled, duration, cluster, frequency } of items) {
      newConfig[duration] = isEnabled
        ? { c: cluster ?? 1, f: frequency }
        : undefined
    }
    onChange(newConfig)
  }

const NoteComponents: Record<Duration, ComponentType> = {
  [Duration.WHOLE]: NoteDurations.NoteWhole,
  [Duration.DOTTED_WHOLE]: NoteDurations.NoteDottedWhole,
  [Duration.HALF]: NoteDurations.NoteHalf,
  [Duration.DOTTED_HALF]: NoteDurations.NoteDottedHalf,
  [Duration.QUARTER]: NoteDurations.NoteQuarter,
  [Duration.DOTTED_QUARTER]: NoteDurations.NoteDottedQuarter,
  [Duration.EIGHTH]: NoteDurations.NoteEighth,
  [Duration.DOTTED_EIGHT]: NoteDurations.NoteDottedEighth,
  [Duration.SIXTEENTH]: NoteDurations.NoteSixteenth,
  [Duration.DOTTED_SIXTEENTH]: NoteDurations.NoteDottedSixteenth,
}

const RestComponents: Record<Duration, ComponentType> = {
  [Duration.WHOLE]: RestDurations.RestWhole,
  [Duration.DOTTED_WHOLE]: RestDurations.RestDottedWhole,
  [Duration.HALF]: RestDurations.RestHalf,
  [Duration.DOTTED_HALF]: RestDurations.RestDottedHalf,
  [Duration.QUARTER]: RestDurations.RestQuarter,
  [Duration.DOTTED_QUARTER]: RestDurations.RestDottedQuarter,
  [Duration.EIGHTH]: RestDurations.RestEighth,
  [Duration.DOTTED_EIGHT]: RestDurations.RestDottedEighth,
  [Duration.SIXTEENTH]: RestDurations.RestSixteenth,
  [Duration.DOTTED_SIXTEENTH]: RestDurations.RestDottedSixteenth,
}

export function getMaxClusterSize(
  timeSignature: Fraction,
  duration: Duration,
): number {
  const len = asFraction(duration)
  const times = timeSignature.div(len).valueOf()
  if (times < 1) {
    return 0
  }
  return Math.floor(times)
}

function getDurationItemName(
  type: DurationType,
  duration: Duration,
  t: TFunction,
): string {
  const typeLabel = t(`DurationType.${type}`)
  const valueLabel = t(`Durations.${duration}`)
  return capitalize(`${valueLabel} ${typeLabel}`)
}

export function getDurationItem(
  type: DurationType,
  duration: Duration,
  config: DurationConfig,
  t: TFunction,
): DurationItem {
  const { c, f } = config[duration] ?? {}
  const Components = type === 'NOTE' ? NoteComponents : RestComponents
  return {
    type,
    Component: Components[duration],
    duration,
    cluster: c,
    name: getDurationItemName(type, duration, t),
    isEnabled: !isNil(c),
    frequency: f ?? DurationFrequency.MODERATE,
    maxCluster: getMaxClusterSize(new Fraction(4, 4), duration),
  }
}

export const getDurationItems =
  (type: DurationType, dotted: boolean) =>
  (t: TFunction, c: DurationConfig): DurationItem[] => {
    return [
      getDurationItem(type, Duration.WHOLE, c, t),
      getDurationItem(type, Duration.DOTTED_WHOLE, c, t),
      getDurationItem(type, Duration.HALF, c, t),
      getDurationItem(type, Duration.DOTTED_HALF, c, t),
      getDurationItem(type, Duration.QUARTER, c, t),
      getDurationItem(type, Duration.DOTTED_QUARTER, c, t),
      getDurationItem(type, Duration.EIGHTH, c, t),
      getDurationItem(type, Duration.DOTTED_EIGHT, c, t),
      getDurationItem(type, Duration.SIXTEENTH, c, t),
      getDurationItem(type, Duration.DOTTED_SIXTEENTH, c, t),
    ].filter((i) => i.maxCluster >= 1 && isDotted(i.duration) === dotted)
  }
