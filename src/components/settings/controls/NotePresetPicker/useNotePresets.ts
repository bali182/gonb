import { TFunction } from 'i18next'
import { SelectItem } from '../../types'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import {
  FIVE_STRING_BASS,
  FIVE_STRING_BASS_UNFRETTED,
  FOUR_STRING_BASS,
  FOUR_STRING_BASS_UNFRETTED,
  SEVEN_STRING_GUITAR,
  SEVEN_STRING_GUITAR_UNFRETTED,
  SIX_STRING_GUITAR,
  SIX_STRING_GUITAR_UNFRETTED,
} from './presets'

function getNotePresets(t: TFunction): SelectItem<string[]>[] {
  return [
    { label: t('NotePresets.SixStringGuitar'), value: SIX_STRING_GUITAR },
    { label: t('NotePresets.SevenStringGuitar'), value: SEVEN_STRING_GUITAR },
    { label: t('NotePresets.FourStringBass'), value: FOUR_STRING_BASS },
    { label: t('NotePresets.FiveStringBass'), value: FIVE_STRING_BASS },

    {
      label: t('NotePresets.SixStringGuitarUnfretted'),
      value: SIX_STRING_GUITAR_UNFRETTED,
    },
    {
      label: t('NotePresets.SevenStringGuitarUnfretted'),
      value: SEVEN_STRING_GUITAR_UNFRETTED,
    },
    {
      label: t('NotePresets.FourStringBassUnfretted'),
      value: FOUR_STRING_BASS_UNFRETTED,
    },
    {
      label: t('NotePresets.FiveStringBassUnfretted'),
      value: FIVE_STRING_BASS_UNFRETTED,
    },
  ]
}

export function useNotePresets(): SelectItem<string[]>[] {
  return useMemoizedTranslation(getNotePresets)
}
