import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { DurationGrid } from '../controls/DurationPicker/DurationGrid'
import { Duration } from '../../../model/common'

export const PageRhythms: FC = () => {
  const { t } = useTranslation()

  const [noteDurations, setNoteDurations] = useState<Duration[]>([
    Duration.QUARTER,
  ])

  const [restDurations, setRestDurations] = useState<Duration[]>([
    Duration.QUARTER,
  ])

  const onChange = (notes: Duration[], rests: Duration[]) => {
    setNoteDurations(notes)
    setRestDurations(rests)
  }

  return (
    <>
      <Section>
        <Label>{t('Settings.RhythmDurations')}</Label>
        <Description>{t('Settings.RhythmDurationsDescription')}</Description>
        <DurationGrid
          notes={noteDurations}
          rests={restDurations}
          onChange={onChange}
        />
      </Section>
    </>
  )
}
