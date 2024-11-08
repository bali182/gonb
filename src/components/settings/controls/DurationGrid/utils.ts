import Fraction from 'fraction.js'
import { DurationItem } from './types'
import { Duration } from '../../../../common/duration'
import {
  asFraction,
  DURATION_VALUES,
} from '../../../../generator/rhythm/asFraction'
import * as NoteDurations from './NoteDurations'
import * as RestDurations from './RestDurations'
import { ComponentType } from 'react'
import { TFunction } from 'i18next'
import { capitalize, isDotted, isNil } from '../../../../common/utils'
import { DurationFrequency } from '../../../../common/durationFrequency'
import { DurationConfig, TimeSignature } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'

export const createDurationsSetter =
  (config: DurationConfig = {}, onChange: (items: DurationConfig) => void) =>
  (items: DurationItem[]): void => {
    const newConfig: DurationConfig = { ...config }
    for (const {
      isSelected: isEnabled,
      duration,
      cluster,
      frequency,
    } of items) {
      if (isEnabled) {
        newConfig[duration] = { cluster: cluster ?? 1, frequency: frequency }
      } else {
        delete newConfig[duration]
      }
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
  const len = DURATION_VALUES[duration]
  const times = timeSignature.div(len).valueOf()
  if (times < 1) {
    return 0
  }
  return Math.floor(times)
}

export function getDurationItemName(
  type: DurationType,
  duration: Duration,
  t: TFunction,
  doCapitalize: boolean = true,
): string {
  const typeLabel = t(`DurationTypes.${type}`)
  const valueLabel = t(`Durations.${duration}`)
  const fullLabel = `${valueLabel} ${typeLabel}`
  return doCapitalize ? capitalize(fullLabel) : fullLabel
}

export function getDurationItem(
  type: DurationType,
  duration: Duration,
  durationConfig: DurationConfig,
  timeSignature: Partial<TimeSignature>,
  t: TFunction,
): DurationItem {
  const { cluster, frequency } = durationConfig[duration] ?? {}
  const Components = type === 'NOTE' ? NoteComponents : RestComponents
  const maxLength = new Fraction(
    timeSignature.upper ?? 0,
    timeSignature.lower ?? 1,
  )
  return {
    type,
    duration,
    cluster,
    timeSignature,
    Component: Components[duration],
    name: getDurationItemName(type, duration, t),
    isSelected: !isNil(cluster),
    isEnabled: DURATION_VALUES[duration].lte(maxLength),
    frequency: frequency ?? DurationFrequency.MODERATE,
    maxCluster: getMaxClusterSize(maxLength, duration),
  }
}

const DURATIONS = (Object.keys(DURATION_VALUES) as Duration[]).sort((a, b) =>
  DURATION_VALUES[b].sub(DURATION_VALUES[a]).valueOf(),
)

export const getDurationItems =
  (
    type: DurationType,
    dotted: boolean,
    timeSignature: Partial<TimeSignature>,
  ) =>
  (t: TFunction, _language: string, c: DurationConfig): DurationItem[] => {
    return DURATIONS.filter((duration) => isDotted(duration) === dotted).map(
      (duration) => getDurationItem(type, duration, c, timeSignature, t),
    )
  }
