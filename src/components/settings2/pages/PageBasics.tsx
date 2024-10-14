import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { Clef, KeySignature } from '../../../model/common'
import { ClefPicker } from '../controls/ClefPicker/ClefPicker'
import { KeySignaturePicker } from '../controls/KeySignaturePicker/KeySignaturePicker'
import { NumberInput } from '../controls/Input/NumberInput'

export const PageBasics: FC = () => {
  const { t } = useTranslation()
  const [bars, setBars] = useState(8)
  const [bpm, setBpm] = useState(120)
  const [clef, setClef] = useState(Clef.TREBLE)
  const [keySignature, setKeySignature] = useState(KeySignature.C_MAJOR_A_MINOR)
  return (
    <>
      <Section>
        <Label>{t('Settings.Clef')}</Label>
        <Description>{t('Settings.ClefDescription')}</Description>
        <ClefPicker value={clef} onChange={setClef} />
      </Section>
      <Section>
        <Label>{t('Settings.KeySignature')}</Label>
        <Description>{t('Settings.KeySignatureDescription')}</Description>
        <KeySignaturePicker value={keySignature} onChange={setKeySignature} />
      </Section>
      <Section>
        <Label>{t('Settings.Tempo')}</Label>
        <Description>{t('Settings.TempoDescription')}</Description>
        <NumberInput
          value={bpm}
          onChange={setBpm}
          min={10}
          max={400}
          step={1}
        />
      </Section>
      <Section>
        <Label>{t('Settings.BarCount')}</Label>
        <Description>{t('Settings.BarCountDescription')}</Description>
        <NumberInput
          value={bars}
          onChange={setBars}
          min={1}
          max={100}
          step={1}
        />
      </Section>
    </>
  )
}
