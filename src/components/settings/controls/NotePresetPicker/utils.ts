import { TFunction } from 'i18next'
import { SelectItem } from '../../types'
import { enharmonic, transpose } from '@tonaljs/note'
import { fromSemitones } from '@tonaljs/interval'
import { beautifyNote, midiComparator } from '../../../../common/utils'
import { Language } from '../../../../state/types'
import { chromatic } from '@tonaljs/range'

function trns(note: string, interval: number): string {
  const transposed = transpose(note, fromSemitones(interval))
  return transposed.includes('b') ? enharmonic(transposed) : transposed
}

export function getPosition(
  tuning: string[],
  position: number,
  fingers = 4,
): string[] {
  const lowest = trns(tuning[0]!, position)
  const highest = trns(tuning[tuning.length - 1]!, position + fingers - 1)
  return chromatic([lowest, highest], { sharps: true })
}

export function getUpToNthFret(tuning: string[], fret: number): string[] {
  const notes: Set<string> = new Set()
  for (const unfretted of tuning) {
    for (let i = 0; i <= fret; i += 1) {
      notes.add(trns(unfretted, i))
    }
  }
  return Array.from(notes).sort(midiComparator)
}

export function getUnfrettedPresetOption(
  tuning: string[],
  t: TFunction,
  language: Language,
): SelectItem<string[]> {
  return {
    label: t('PresetNames.Unfretted', { notes: tuning.join(', ') }),
    value: tuning.map((note) => beautifyNote(note, language)),
  }
}

export function getPositionPresetOption(
  tuning: string[],
  position: number,
  t: TFunction,
  language: Language,
): SelectItem<string[]> {
  const notes = getPosition(tuning, position)

  return {
    label: t('PresetNames.Position', {
      position,
      lowest: beautifyNote(notes[0]!, language),
      highest: beautifyNote(notes[notes.length - 1]!, language),
    }),
    value: notes,
  }
}

export function getNthFretOption(
  tuning: string[],
  fret: number,
  t: TFunction,
  language: Language,
): SelectItem<string[]> {
  const notes = getUpToNthFret(tuning, fret)
  return {
    label: t('PresetNames.ToNthFret', {
      fret,
      lowest: beautifyNote(notes[0]!, language),
      highest: beautifyNote(notes[notes.length - 1]!, language),
    }),
    value: notes,
  }
}
