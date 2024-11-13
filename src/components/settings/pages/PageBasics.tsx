import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { KeySignature } from '../../../common/keySignature'
import { Clef } from '../../../common/clef'
import { ClefPicker } from '../controls/ClefPicker/ClefPicker'
import { KeySignaturePicker } from '../controls/KeySignaturePicker/KeySignaturePicker'
import { NumberInput } from '../controls/Input/NumberInput'
import { SettingsPageProps } from '../types'
import { TimeSignaturePicker } from '../controls/TimeSignaturePicker/TimeSignaturePicker'
import { TimeSignature } from '../../../state/types'

export const PageBasics: FC<SettingsPageProps> = ({
  onChange,
  value,
  issues,
}) => {
  const { t } = useTranslation()

  const setClef = (clef: Clef) => onChange({ ...value, clef })
  const setKeySignature = (keySignature: KeySignature) =>
    onChange({ ...value, keySignature })
  const setTempo = (tempo: number | undefined) => onChange({ ...value, tempo })
  const setBars = (bars: number | undefined) => onChange({ ...value, bars })
  const setTimeSignature = (timeSignature: Partial<TimeSignature>) =>
    onChange({ ...value, timeSignature })

  return (
    <>
      <Section>
        <Label>{t('Settings.Clef')}</Label>
        <Description issues={issues.clef}>
          {t('Settings.ClefDescription')}
        </Description>
        <ClefPicker value={value.clef} onChange={setClef} />
      </Section>
      <Section>
        <Label>{t('Settings.KeySignature')}</Label>
        <Description issues={issues.keySignature}>
          {t('Settings.KeySignatureDescription')}
        </Description>
        <KeySignaturePicker
          value={value.keySignature}
          onChange={setKeySignature}
        />
      </Section>
      <Section>
        <Label>{t('Settings.TimeSignature')}</Label>
        <Description issues={issues.timeSignature}>
          {t('Settings.TimeSignatureDescription')}
        </Description>
        <TimeSignaturePicker
          value={value.timeSignature}
          onChange={setTimeSignature}
        />
      </Section>
      <Section>
        <Label>{t('Settings.Tempo')}</Label>
        <Description issues={issues.bpm}>
          {t('Settings.TempoDescription')}
        </Description>
        <NumberInput
          value={value.tempo}
          onChange={setTempo}
          min={10}
          max={400}
          step={1}
        />
      </Section>
      <Section>
        <Label>{t('Settings.BarCount')}</Label>
        <Description issues={issues.bars}>
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
