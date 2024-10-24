import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { KeySignature } from '../../../common/keySignature'
import { Clef } from '../../../common/clef'
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
        <Description issue={issues.clef}>
          {t('Settings.ClefDescription')}
        </Description>
        <ClefPicker value={value.clef} onChange={setClef} />
      </Section>
      <Section>
        <Label>{t('Settings.KeySignature')}</Label>
        <Description issue={issues.keySignature}>
          {t('Settings.KeySignatureDescription')}
        </Description>
        <KeySignaturePicker
          value={value.keySignature}
          onChange={setKeySignature}
        />
      </Section>
      <Section>
        <Label>{t('Settings.Tempo')}</Label>
        <Description issue={issues.bpm}>
          {t('Settings.TempoDescription')}
        </Description>
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
        <Description issue={issues.bars}>
          {t('Settings.BarCountDescription')}
        </Description>
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
