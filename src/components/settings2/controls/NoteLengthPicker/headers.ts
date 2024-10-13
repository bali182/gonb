import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../../../model/useMemoizedTranslation'
import { DurationHeader, NoteAndRestHeader } from './types'
import { Duration } from '../../../../model/common'

function getNoteAndRestHeaders(t: TFunction): NoteAndRestHeader[] {
  return [
    { label: t('NoteAndRestHeaders.Notes'), type: 'NOTE', dotted: false },
    { label: t('NoteAndRestHeaders.DottedNotes'), type: 'NOTE', dotted: true },
    { label: t('NoteAndRestHeaders.Rests'), type: 'REST', dotted: false },
    { label: t('NoteAndRestHeaders.DottedRests'), type: 'REST', dotted: true },
  ]
}

export function useNoteAndRestHeaders(): NoteAndRestHeader[] {
  return useMemoizedTranslation(getNoteAndRestHeaders)
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
