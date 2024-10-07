import { FC, useMemo, useState } from 'react'
import { InputSection } from './InputSection'
import { TextInput } from './TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../state/store'
import { Dropdown } from './Dropdown'
import { PageProps } from './types'
import { useTranslation } from 'react-i18next'
import { generatorSlice } from '../../state/generatorSlice'
import { GeneratorConfig } from '../../state/types'
import { Clef, KeySignature } from '../../model/common'
import { MelodyType } from '../../model/melodyFragment'
import { RangePicker, RangePickerProps } from './RangePicker'
import { RangeInput } from './RangeInput'
import { Switch } from './Switch'

const keySignatureToLabel: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Major / A Minor',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Major / E Minor (#)',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Major / B Minor (##)',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Major / F# Minor (###)',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Major / C# Minor (####)',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B Major / G# Minor (#####)',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]:
    'F# Major / D# Minor (######)',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]:
    'C# Major / A# Minor (#######)',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Major / D Minor (b)',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'Bb Major / G Minor (bb)',
  [KeySignature.Eb_MAJOR_C_MINOR_2_FLATS]: 'Eb Major / C Minor (bbb)',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'Ab Major / F Minor (bbbb)',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'Db Major / F Minor (bbbbb)',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'Gb Major / Eb Minor (bbbbbb)',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'Cb Major / Ab Minor (bbbbbbb)',
}

const labelToKeySignature: Record<string, KeySignature> = Object.fromEntries(
  Object.entries(keySignatureToLabel).map((a) => a.reverse()),
)

const melodyTypeToLabel: Record<MelodyType, string> = {
  WHOLE_NOTES: 'Steady whole notes',
  HALF_NOTES: 'Steady half notes',
  QUARTER_NOTES: 'Steady quarter notes',
  MELODY: 'Realistic melody',
}

const labelToMelodyType: Record<string, MelodyType> = Object.fromEntries(
  Object.entries(melodyTypeToLabel).map((a) => a.reverse()),
)

const keySignatureData = {
  values: Object.values(keySignatureToLabel),
}

const melodyTypeData = {
  values: Object.values(melodyTypeToLabel),
}

const clefData = {
  values: [Clef.TREBLE, Clef.BASS],
}

export const PageMelody: FC<PageProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(
    generatorSlice.selectors.getGeneratorConfig,
  )
  const { barCount, clef, keySignature, type, firstFret, lastFret, semitones } =
    generatorConfig

  const range = useMemo(
    (): [number, number] => [firstFret, lastFret],
    [firstFret, lastFret],
  )

  const { t } = useTranslation()

  function updateGeneratorConfig(updates: Partial<GeneratorConfig>): void {
    dispatch(
      generatorSlice.actions.setGeneratorConfig({
        ...generatorConfig,
        ...updates,
        timestamp: new Date().getTime(),
      }),
    )
  }

  const onBarCountChange = (barCount: string) => {
    updateGeneratorConfig({ barCount: parseInt(barCount) })
  }

  const onClefChange = (clef: string) => {
    updateGeneratorConfig({ clef: clef as Clef })
  }

  const onKeySignatureChange = (key: string) => {
    updateGeneratorConfig({ keySignature: labelToKeySignature[key] })
  }

  const onMelodyTypeChange = (type: string) => {
    updateGeneratorConfig({ type: labelToMelodyType[type] })
  }

  const onRangeChange = ([firstFret, lastFret]: [number, number]) => {
    updateGeneratorConfig({ firstFret, lastFret })
  }

  const onNonScaleNotesChange = (semitones: boolean) => {
    updateGeneratorConfig({ semitones })
  }

  return (
    <>
      <InputSection
        name={t('Settings.Clef')}
        description={t('Settings.ClefDescription')}
        Editor={Dropdown}
        data={clefData}
        onChange={onClefChange}
        value={clef}
      />
      <InputSection
        name={t('Settings.KeySignature')}
        description={t('Settings.KeySignatureDescription')}
        Editor={Dropdown}
        data={keySignatureData}
        onChange={onKeySignatureChange}
        value={keySignatureToLabel[keySignature]}
      />
      <InputSection
        name={t('Settings.MelodyType')}
        description={t('Settings.MelodyTypeDescription')}
        Editor={Dropdown}
        data={melodyTypeData}
        onChange={onMelodyTypeChange}
        value={melodyTypeToLabel[type]}
      />
      <InputSection
        name={t('Settings.BarCount')}
        description={t('Settings.BarCountDescription')}
        Editor={TextInput}
        onChange={onBarCountChange}
        value={barCount.toString()}
        data={{ type: 'number', min: 1, max: 40, step: 1 }}
      />
      <InputSection
        name={t('Settings.Range')}
        description={t('Settings.RangeDescription')}
        Editor={RangeInput}
        onChange={onRangeChange}
        value={range}
        data={{ min: 0, max: 13, step: 1 }}
      />
      <InputSection
        name={t('Settings.NonScaleNotes')}
        description={t('Settings.NonScaleNotesDescription')}
        Editor={Switch}
        onChange={onNonScaleNotesChange}
        value={semitones}
      />
    </>
  )
}
