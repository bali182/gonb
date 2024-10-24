import { FC, useMemo } from 'react'
import { InputSection } from './InputSection'
import { TextInput } from './TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../state/store'
import { Dropdown } from './Dropdown'
import { useTranslation } from 'react-i18next'
import { generatorSlice } from '../../state/generatorSlice'
import { GeneratorConfig } from '../../state/types'
import { KeySignature } from '../../common/keySignature'
import { Clef } from '../../common/clef'
import {
  useClefTranslations,
  useKeySignatureTranslations,
} from './translatedContent'
import { SelectItem } from './types'

export const PageBasics: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const { clef, keySignature, barCount, bpm } = generatorConfig

  const { t } = useTranslation()

  const keySignatureMap = useKeySignatureTranslations()
  const clefMap = useClefTranslations()

  const selectedClef = useMemo(
    (): SelectItem<string> => ({ label: clefMap.get(clef)!, value: clef }),
    [clef, clefMap],
  )

  const selectedKeySignature = useMemo(
    (): SelectItem<string> => ({
      label: keySignatureMap.get(keySignature)!,
      value: keySignature,
    }),
    [keySignature, keySignatureMap],
  )

  const clefs = useMemo(
    () => ({
      values: Array.from(clefMap.entries()).map(
        ([value, label]): SelectItem<string> => ({ value, label }),
      ),
    }),
    [clefMap],
  )

  const keySignatures = useMemo(
    () => ({
      values: Array.from(keySignatureMap.entries()).map(
        ([value, label]): SelectItem<string> => ({ value, label }),
      ),
    }),
    [keySignatureMap],
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

  const onClefChange = (clef: SelectItem<string>) => {
    updateGeneratorConfig({ clef: clef.value as Clef })
  }

  const onKeySignatureChange = (item: SelectItem<string>) => {
    updateGeneratorConfig({ keySignature: item.value as KeySignature })
  }

  const onTempoChange = (tempo: string) => {
    updateGeneratorConfig({ bpm: parseInt(tempo) })
  }

  const onBarCountChange = (barCount: string) => {
    updateGeneratorConfig({ barCount: parseInt(barCount) })
  }

  return (
    <>
      <InputSection
        name={t('Settings.Clef')}
        description={t('Settings.ClefDescription')}
        Editor={Dropdown}
        data={clefs}
        onChange={onClefChange}
        value={selectedClef}
      />
      <InputSection
        name={t('Settings.KeySignature')}
        description={t('Settings.KeySignatureDescription')}
        Editor={Dropdown}
        data={keySignatures}
        onChange={onKeySignatureChange}
        value={selectedKeySignature}
      />
      <InputSection
        name={t('Settings.Tempo')}
        description={t('Settings.TempoDescription')}
        Editor={TextInput}
        data={{ type: 'number', min: 1, max: 400, step: 1 }}
        onChange={onTempoChange}
        value={bpm.toString()}
      />
      <InputSection
        name={t('Settings.BarCount')}
        description={t('Settings.BarCountDescription')}
        Editor={TextInput}
        onChange={onBarCountChange}
        value={barCount.toString()}
        data={{ type: 'number', min: 1, max: 40, step: 1 }}
      />
    </>
  )
}
