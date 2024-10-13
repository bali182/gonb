import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { NoteLengthGrid } from '../controls/NoteLengthPicker/NoteLengthGrid'
import { Duration } from '../../../model/common'

export const PageNoteLengths: FC = () => {
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
        <Label>{t('Settings.NotesPreset')}</Label>
        <Description>{t('Settings.NotesPresetDescription')}</Description>
        <NoteLengthGrid
          notes={noteDurations}
          rests={restDurations}
          onChange={onChange}
        />
      </Section>
    </>
  )
}
