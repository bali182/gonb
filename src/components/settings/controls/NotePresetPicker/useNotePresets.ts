import { TFunction } from 'i18next'
import { SelectGroup } from '../../types'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import { MessageKey } from '../../../../languages/types'
import {
  getNthFretOption,
  getPositionPresetOption,
  getUnfrettedPresetOption,
} from './utils'
import { Language } from '../../../../state/types'

export const SIX_STRING_GUITAR_UNFRETTED = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
export const SEVEN_STRING_GUITAR_UNFRETTED = [
  'B0',
  'E2',
  'A2',
  'D3',
  'G3',
  'B3',
  'E4',
]
export const FOUR_STRING_BASS_UNFRETTED = ['E1', 'A1', 'D2', 'G2']
export const FIVE_STRING_BASS_UNFRETTED = ['B0', 'E1', 'A1', 'D2', 'G2']

function getOptionGroupForInstrument(
  instrument: MessageKey,
  tuning: string[],
  t: TFunction,
  language: Language,
): SelectGroup<string[]> {
  return {
    label: t(instrument),
    options: [
      getUnfrettedPresetOption(tuning, t, language),
      getPositionPresetOption(tuning, 0, t, language),
      getPositionPresetOption(tuning, 1, t, language),
      getPositionPresetOption(tuning, 2, t, language),
      getPositionPresetOption(tuning, 3, t, language),
      getPositionPresetOption(tuning, 4, t, language),
      getPositionPresetOption(tuning, 5, t, language),
      getPositionPresetOption(tuning, 6, t, language),
      getPositionPresetOption(tuning, 7, t, language),
      getPositionPresetOption(tuning, 8, t, language),
      getPositionPresetOption(tuning, 9, t, language),
      getNthFretOption(tuning, 12, t, language),
      getNthFretOption(tuning, 24, t, language),
    ],
  }
}

function getNotePresets(t: TFunction, lang: Language): SelectGroup<string[]>[] {
  return [
    getOptionGroupForInstrument(
      'Instruments.SixStringGuitar',
      SIX_STRING_GUITAR_UNFRETTED,
      t,
      lang,
    ),
    getOptionGroupForInstrument(
      'Instruments.SevenStringGuitar',
      SEVEN_STRING_GUITAR_UNFRETTED,
      t,
      lang,
    ),
    getOptionGroupForInstrument(
      'Instruments.FourStringBass',
      FOUR_STRING_BASS_UNFRETTED,
      t,
      lang,
    ),
    getOptionGroupForInstrument(
      'Instruments.FiveStringBass',
      FIVE_STRING_BASS_UNFRETTED,
      t,
      lang,
    ),
  ]
}

export function useNotePresets(): SelectGroup<string[]>[] {
  return useMemoizedTranslation(getNotePresets)
}
