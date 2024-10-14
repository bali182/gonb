import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { Clef, KeySignature } from '../../../model/common'
import { ClefPicker } from '../controls/ClefPicker/ClefPicker'
import { KeySignaturePicker } from '../controls/KeySignaturePicker/KeySignaturePicker'

export const PageBasics: FC = () => {
  const { t } = useTranslation()
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
    </>
  )
}
