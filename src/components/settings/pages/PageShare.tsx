import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { ShareableLink } from '../controls/ShareableLink/ShareableLink'
import { toUrl } from '../../../url/url'
import { GeneratorConfig } from '../../../state/types'
import { isNil } from '../../../common/utils'
import { Issue, IssueType } from '../../../state/validation/types'
import { NO_ISSUES } from '../../../state/validation/utils'

export const PageShare: FC<SettingsPageProps> = ({ value, issues }) => {
  const { t } = useTranslation()

  const issue = useMemo((): ReadonlyArray<Issue> => {
    const hasCriticalIssues = Object.values(issues)
      .flatMap((issues) => issues)
      .filter((issue) => !isNil(issue))
      .some((issue) => issue.type === IssueType.ERROR)
    if (hasCriticalIssues) {
      return [
        {
          id: undefined,
          type: IssueType.ERROR,
          label: t('Validation.ErrorInUrl'),
        },
      ]
    }
    return NO_ISSUES
  }, [issues])

  const url = useMemo(
    () => (issue.length === 0 ? toUrl(value as GeneratorConfig) : undefined),
    [value, issue],
  )

  return (
    <>
      <Section>
        <Label>{t('Settings.ShareableLink')}</Label>
        <Description issues={issue}>
          {t('Settings.ShareableLinkDescription')}
        </Description>
        <ShareableLink url={url} disabled={issue.length > 0} />
      </Section>
    </>
  )
}
