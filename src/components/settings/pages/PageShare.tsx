import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { ShareableLink } from '../controls/ShareableLink/ShareableLink'
import { toUrl } from '../../../url/url'
import { GeneratorConfig } from '../../../state/types'
import { isNil } from '../../../common/utils'
import { Issue, IssueType } from '../../../state/validation/types'

export const PageShare: FC<SettingsPageProps> = ({ value, issues }) => {
  const { t } = useTranslation()

  const issue = useMemo((): Issue | undefined => {
    const hasCriticalIssues = Object.values(issues)
      .filter((issue) => !isNil(issue))
      .some((issue) => issue.type === IssueType.ERROR)
    if (hasCriticalIssues) {
      return {
        type: IssueType.ERROR,
        label: t('Validation.ErrorInUrl'),
      }
    }
    return undefined
  }, [issues])

  const url = useMemo(
    () => (isNil(issue) ? toUrl(value as GeneratorConfig) : undefined),
    [value, issue],
  )

  return (
    <>
      <Section>
        <Label>{t('Settings.ShareableLink')}</Label>
        <Description issue={issue}>
          {t('Settings.ShareableLinkDescription')}
        </Description>
        <ShareableLink url={url} disabled={!isNil(issue)} />
      </Section>
    </>
  )
}
