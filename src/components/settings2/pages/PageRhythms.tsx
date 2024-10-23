import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { DurationGrid } from '../controls/DurationGrid/DurationGrid'
import { Duration } from '../../../model/common'
import { SettingsPageProps } from '../types'
import { isNotNil } from '../../../model/utils'
import { issueComparator } from '../utils'

export const PageRhythms: FC<SettingsPageProps> = ({
  value,
  issues,
  onChange,
}) => {
  const { t } = useTranslation()

  const onRhytmsChange = (notes: Duration[], rests: Duration[]) => {
    onChange({ ...value, noteDurations: notes, restDurations: rests })
  }

  const issue = [issues.noteDurations, issues.restDurations]
    .filter(isNotNil)
    .sort(issueComparator)[0]

  return (
    <>
      <Section>
        <Label>{t('Settings.RhythmDurations')}</Label>
        <Description issue={issue}>
          {t('Settings.RhythmDurationsDescription')}
        </Description>
        <DurationGrid
          notes={value.noteDurations}
          rests={value.restDurations}
          onChange={onRhytmsChange}
        />
      </Section>
    </>
  )
}
