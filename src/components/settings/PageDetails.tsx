import { FC, useMemo } from 'react'
import { InputSection } from './InputSection'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../state/store'
import { Dropdown } from './Dropdown'
import { PageProps } from './types'
import { useTranslation } from 'react-i18next'
import { generatorSlice } from '../../state/generatorSlice'
import { GeneratorConfig } from '../../state/types'
import { MelodyType } from '../../model/melodyFragment'
import { RangeInput } from './RangeInput'
import { Switch } from './Switch'

const melodyTypeToLabel: Record<MelodyType, string> = {
  WHOLE_NOTES: 'Steady whole notes',
  HALF_NOTES: 'Steady half notes',
  QUARTER_NOTES: 'Steady quarter notes',
  MELODY: 'Realistic melody',
}

const labelToMelodyType: Record<string, MelodyType> = Object.fromEntries(
  Object.entries(melodyTypeToLabel).map((a) => a.reverse()),
)

const melodyTypeData = {
  values: Object.values(melodyTypeToLabel),
}

export const PageDetails: FC<PageProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)

  const { type, firstFret, lastFret, semitones } = generatorConfig

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

  const onMelodyTypeChange = (type: string) => {
    updateGeneratorConfig({ type: labelToMelodyType[type] })
  }

  const onRangeChange = ([firstFret, lastFret]: [number, number]) => {
    updateGeneratorConfig({ firstFret, lastFret })
  }

  const onNonScaleNotesChange = (semitones: boolean) => {
    updateGeneratorConfig({ semitones })
  }

  // const onShowNoteNamesChange = (showNoteNames: boolean) => {
  //   updateGeneratorConfig({ showNoteNames })
  // }

  return (
    <>
      <InputSection
        name={t('Settings.MelodyType')}
        description={t('Settings.MelodyTypeDescription')}
        Editor={Dropdown}
        data={melodyTypeData}
        onChange={onMelodyTypeChange}
        value={melodyTypeToLabel[type]}
      />
      <InputSection
        name={t('Settings.NonScaleNotes')}
        description={t('Settings.NonScaleNotesDescription')}
        Editor={Switch}
        onChange={onNonScaleNotesChange}
        value={semitones}
      />
      {/* <InputSection
        name={t('Settings.ShowNoteNames')}
        description={t('Settings.ShowNoteNamesDescription')}
        Editor={Switch}
        onChange={onShowNoteNamesChange}
        value={showNoteNames}
      /> */}
      <InputSection
        name={t('Settings.Range')}
        description={t('Settings.RangeDescription')}
        Editor={RangeInput}
        onChange={onRangeChange}
        value={range}
        data={{ min: 0, max: 13, step: 1 }}
      />
    </>
  )
}
