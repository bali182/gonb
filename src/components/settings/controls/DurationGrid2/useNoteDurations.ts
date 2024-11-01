import { TFunction } from 'i18next'
import { DurationConfig, DurationItem } from './types'
import {
  NoteWhole,
  NoteHalf,
  NoteQuarter,
  NoteEighth,
  NoteSixteenth,
  NoteDottedWhole,
  NoteDottedEighth,
  NoteDottedQuarter,
  NoteDottedSixteenth,
  NoteDottedHalf,
} from './NoteDurations'
import { Duration } from '../../../../common/duration'
import { ComponentType } from 'react'
import { isNil } from '../../../../common/utils'
import { useMemoizedTranslation1 } from '../../../../common/useMemoizedTranslation'

const Components: Record<Duration, ComponentType> = {
  [Duration.WHOLE]: NoteWhole,
  [Duration.DOTTED_WHOLE]: NoteDottedWhole,
  [Duration.HALF]: NoteHalf,
  [Duration.DOTTED_HALF]: NoteDottedHalf,
  [Duration.QUARTER]: NoteQuarter,
  [Duration.DOTTED_QUARTER]: NoteDottedQuarter,
  [Duration.EIGHTH]: NoteEighth,
  [Duration.DOTTED_EIGHT]: NoteDottedEighth,
  [Duration.SIXTEENTH]: NoteSixteenth,
  [Duration.DOTTED_SIXTEENTH]: NoteDottedSixteenth,
}

function getNoteDurationItem(
  duration: Duration,
  config: DurationConfig,
  t: TFunction,
): DurationItem {
  const cluster = config[duration]
  return {
    type: 'NOTE',
    Component: Components[duration],
    duration,
    cluster,
    name: t(`Durations.${duration}`),
    isSelected: !isNil(cluster),
  }
}

export function getNoteDurations(
  t: TFunction,
  c: DurationConfig,
): DurationItem[] {
  return [
    getNoteDurationItem(Duration.WHOLE, c, t),
    getNoteDurationItem(Duration.DOTTED_WHOLE, c, t),
    getNoteDurationItem(Duration.HALF, c, t),
    getNoteDurationItem(Duration.DOTTED_HALF, c, t),
    getNoteDurationItem(Duration.QUARTER, c, t),
    getNoteDurationItem(Duration.DOTTED_QUARTER, c, t),
    getNoteDurationItem(Duration.EIGHTH, c, t),
    getNoteDurationItem(Duration.DOTTED_EIGHT, c, t),
    getNoteDurationItem(Duration.SIXTEENTH, c, t),
    getNoteDurationItem(Duration.DOTTED_SIXTEENTH, c, t),
  ]
}

export function useNoteDurations(config: DurationConfig): DurationItem[] {
  return useMemoizedTranslation1(getNoteDurations, config)
}
