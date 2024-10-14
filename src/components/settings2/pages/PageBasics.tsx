import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { Clef } from '../../../model/common'
import { ClefPicker } from '../controls/ClefPicker/ClefPicker'

export const PageBasics: FC = () => {
  const { t } = useTranslation()
  const [clef, setClef] = useState(Clef.TREBLE)
  return (
    <>
      <Section>
        <Label>{t('Settings.Clef')}</Label>
        <Description>{t('Settings.ClefDescription')}</Description>
        <ClefPicker clef={clef} onChange={setClef} />
      </Section>
    </>
  )
}
