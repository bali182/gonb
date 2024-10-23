import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Section,
  Description,
  Label,
  IssueLabel,
} from '../controls/InputSectionPrimitives'
import { Clef, KeySignature } from '../../../model/common'
import { ClefPicker } from '../controls/ClefPicker/ClefPicker'
import { KeySignaturePicker } from '../controls/KeySignaturePicker/KeySignaturePicker'
import { NumberInput } from '../controls/Input/NumberInput'
import { SettingsPageProps } from '../types'

export const PageBasics: FC<SettingsPageProps> = ({
  onChange,
  value,
  issues,
}) => {
  const { t } = useTranslation()

  const setClef = (clef: Clef) => onChange({ ...value, clef })
  const setKeySignature = (keySignature: KeySignature) =>
    onChange({ ...value, keySignature })
  const setBpm = (bpm: number) => onChange({ ...value, bpm })
  const setBars = (bars: number) => onChange({ ...value, bars })

  return (
    <>
      <Section>
        <Label>{t('Settings.Clef')}</Label>
        <Description>{t('Settings.ClefDescription')}</Description>
        {issues.clef && <IssueLabel issue={issues.clef} />}
        <ClefPicker value={value.clef} onChange={setClef} />
      </Section>
      <Section>
        <Label>{t('Settings.KeySignature')}</Label>
        <Description>{t('Settings.KeySignatureDescription')}</Description>
        {issues.keySignature && <IssueLabel issue={issues.keySignature} />}
        <KeySignaturePicker
          value={value.keySignature}
          onChange={setKeySignature}
        />
      </Section>
      <Section>
        <Label>{t('Settings.Tempo')}</Label>
        <Description>{t('Settings.TempoDescription')}</Description>
        {issues.bpm && <IssueLabel issue={issues.bpm} />}
        <NumberInput
          value={value.bpm}
          onChange={setBpm}
          min={10}
          max={400}
          step={1}
        />
      </Section>
      <Section>
        <Label>{t('Settings.BarCount')}</Label>
        <Description>{t('Settings.BarCountDescription')}</Description>
        {issues.bars && <IssueLabel issue={issues.bars} />}
        <NumberInput
          value={value.bars}
          onChange={setBars}
          min={1}
          max={100}
          step={1}
        />
      </Section>
    </>
  )
}
