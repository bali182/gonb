import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { DurationGrid } from '../controls/DurationGrid/DurationGrid'
import { DurationConfig } from '../../../state/types'
import { DurationType } from '../../../common/durationType'

export const PageRhythms: FC<SettingsPageProps> = ({
  value,
  issues,
  onChange,
}) => {
  const { t } = useTranslation()

  const onNoteDurationsChange = (noteDurations: DurationConfig) => {
    onChange({ ...value, noteDurations })
  }

  return (
    <>
      <Section>
        <Label>{t('Settings.NoteDurations')}</Label>
        <Description issue={issues.noteDurations}>
          {t('Settings.NoteDurationsDescription')}
        </Description>
        <DurationGrid
          timeSignature={value.timeSignature}
          value={value.noteDurations}
          onChange={onNoteDurationsChange}
          type={DurationType.NOTE}
          dotted={false}
        />
      </Section>
      <Section>
        <Label>{t('Settings.DottedNoteDurations')}</Label>
        <Description issue={issues.dottedNoteDurations}>
          {t('Settings.DottedNoteDurationsDescription')}
        </Description>
        <DurationGrid
          value={value.noteDurations}
          timeSignature={value.timeSignature}
          onChange={onNoteDurationsChange}
          type={DurationType.NOTE}
          dotted={true}
        />
      </Section>
    </>
  )
}
