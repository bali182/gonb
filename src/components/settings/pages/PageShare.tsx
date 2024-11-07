import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { ShareableLink } from '../controls/ShareableLink/ShareableLink'
import { toUrl } from '../../../url/url'

export const PageShare: FC<SettingsPageProps> = ({ value }) => {
  const { t } = useTranslation()

  const url = useMemo(() => toUrl(value), [value])

  return (
    <>
      <Section>
        <Label>{t('Settings.ShareableLink')}</Label>
        <Description issue={undefined}>
          {t('Settings.ShareableLinkDescription')}
        </Description>
        <ShareableLink url={url} />
      </Section>
    </>
  )
}
