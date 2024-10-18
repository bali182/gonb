import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { DurationGrid } from '../controls/DurationGrid/DurationGrid'
import { Duration } from '../../../model/common'
import { SettingsPageProps } from '../types'

export const PageRhythms: FC<SettingsPageProps> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const onRhytmsChange = (notes: Duration[], rests: Duration[]) => {
    onChange({ ...value, noteDurations: notes, restDurations: rests })
  }

  return (
    <>
      <Section>
        <Label>{t('Settings.RhythmDurations')}</Label>
        <Description>{t('Settings.RhythmDurationsDescription')}</Description>
        <DurationGrid
          notes={value.noteDurations}
          rests={value.restDurations}
          onChange={onRhytmsChange}
        />
      </Section>
    </>
  )
}
