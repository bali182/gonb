import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import { DurationHeader, TypeHeader } from './types'
import { Duration } from '../../../../common/duration'
import { DurationType } from '../../../../common/durationType'

function getTypeHeaders(t: TFunction): TypeHeader[] {
  return [
    {
      label: t('NoteAndRestHeaders.Notes'),
      type: DurationType.NOTE,
      dotted: false,
    },
    {
      label: t('NoteAndRestHeaders.DottedNotes'),
      type: DurationType.NOTE,
      dotted: true,
    },
    {
      label: t('NoteAndRestHeaders.Rests'),
      type: DurationType.REST,
      dotted: false,
    },
    {
      label: t('NoteAndRestHeaders.DottedRests'),
      type: DurationType.REST,
      dotted: true,
    },
  ]
}

export function useTypeHeaders(): TypeHeader[] {
  return useMemoizedTranslation(getTypeHeaders)
}

function getDurationHeaders(t: TFunction): DurationHeader[] {
  return [
    {
      label: t('DurationHeaders.Whole'),
      durations: [Duration.WHOLE, Duration.DOTTED_WHOLE],
    },
    {
      label: t('DurationHeaders.Half'),
      durations: [Duration.HALF, Duration.DOTTED_HALF],
    },
    {
      label: t('DurationHeaders.Quarter'),
      durations: [Duration.QUARTER, Duration.DOTTED_QUARTER],
    },
    {
      label: t('DurationHeaders.Eighth'),
      durations: [Duration.EIGHTH, Duration.DOTTED_EIGHT],
    },
    {
      label: t('DurationHeaders.Sixteenth'),
      durations: [Duration.SIXTEENTH, Duration.DOTTED_SIXTEENTH],
    },
  ]
}

export function useDurationHeaders(): DurationHeader[] {
  return useMemoizedTranslation(getDurationHeaders)
}
