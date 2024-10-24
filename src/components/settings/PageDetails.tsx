import { FC, useMemo } from 'react'
import { InputSection } from './InputSection'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../state/store'
import { Dropdown } from './Dropdown'
import { useTranslation } from 'react-i18next'
import { generatorSlice } from '../../state/generatorSlice'
import { GeneratorConfig } from '../../state/types'
import { MelodyType } from '../../model/melodies/types'
import { RangeInput } from './RangeInput'
import { Switch } from './Switch'
import { useMelodyTypeTranslations } from './translatedContent'
import { SelectItem } from './types'

export const PageDetails: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)

  const { type, firstFret, lastFret, semitones } = generatorConfig

  const range = useMemo(
    (): [number, number] => [firstFret, lastFret],
    [firstFret, lastFret],
  )

  const { t } = useTranslation()

  const melodyTypeMap = useMelodyTypeTranslations()

  const selectedMelodyType = useMemo(
    (): SelectItem<string> => ({
      label: melodyTypeMap.get(type)!,
      value: type,
    }),
    [type, melodyTypeMap],
  )

  const melodyTypes = useMemo(
    () => ({
      values: Array.from(melodyTypeMap.entries()).map(
        ([value, label]): SelectItem<string> => ({ value, label }),
      ),
    }),
    [melodyTypeMap],
  )

  function updateGeneratorConfig(updates: Partial<GeneratorConfig>): void {
    dispatch(
      generatorSlice.actions.setGeneratorConfig({
        ...generatorConfig,
        ...updates,
        timestamp: new Date().getTime(),
      }),
    )
  }

  const onMelodyTypeChange = (type: SelectItem<string>) => {
    updateGeneratorConfig({ type: type.value as MelodyType })
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
        name={t('Settings.MelodyType')}
        description={t('Settings.MelodyTypeDescription')}
        Editor={Dropdown}
        data={melodyTypes}
        onChange={onMelodyTypeChange}
        value={selectedMelodyType}
      />
      <InputSection
        name={t('Settings.NonScaleNotes')}
        description={t('Settings.NonScaleNotesDescription')}
        Editor={Switch}
        onChange={onNonScaleNotesChange}
        value={semitones}
      />
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
