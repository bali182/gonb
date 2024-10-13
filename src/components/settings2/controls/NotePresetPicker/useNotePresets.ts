import { TFunction } from 'i18next'
import { Range } from 'tonal'
import { SelectItem } from '../../types'
import { useMemoizedTranslation } from '../../../../model/useMemoizedTranslation'

const SIX_STRING_GUITAR = Range.chromatic(['E2', 'E5'], { sharps: true })
const SEVEN_STRING_GUITAR = Range.chromatic(['B1', 'E5'], { sharps: true })
const FOUR_STRING_BASS = Range.chromatic(['E1', 'G3'], { sharps: true })
const FIVE_STRING_BASS = Range.chromatic(['B0', 'G3'], { sharps: true })

const SIX_STRING_GUITAR_UNFRETTED = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
const SEVEN_STRING_GUITAR_UNFRETTED = ['B0', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']
const FOUR_STRING_BASS_UNFRETTED = ['E1', 'A1', 'D2', 'G2']
const FIVE_STRING_BASS_UNFRETTED = ['B0', 'E1', 'A1', 'D2', 'G2']

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
