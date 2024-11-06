import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { DurationGrid } from '../controls/DurationGrid/DurationGrid'
import { DurationConfig } from '../../../state/types'
import { DurationType } from '../../../common/durationType'

export const PageRests: FC<SettingsPageProps> = ({
  value,
  issues,
  onChange,
}) => {
  const { t } = useTranslation()

  const onRestDurationsChange = (restDurations: DurationConfig) => {
    onChange({ ...value, restDurations })
  }

  return (
    <>
      <Section>
        <Label>{t('Settings.RestDurations')}</Label>
        <Description issue={issues.restDurations}>
          {t('Settings.RestDurationsDescription')}
        </Description>
        <DurationGrid
          timeSignature={value.timeSignature}
          value={value.restDurations}
          onChange={onRestDurationsChange}
          type={DurationType.REST}
          dotted={false}
        />
      </Section>
      <Section>
        <Label>{t('Settings.DottedRestDurations')}</Label>
        <Description issue={issues.dottedRestDurations}>
          {t('Settings.DottedRestDurationsDescription')}
        </Description>
        <DurationGrid
          timeSignature={value.timeSignature}
          value={value.restDurations}
          onChange={onRestDurationsChange}
          type={DurationType.REST}
          dotted={true}
        />
      </Section>
    </>
  )
}
