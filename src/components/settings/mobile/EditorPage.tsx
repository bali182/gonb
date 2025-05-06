import { FC } from 'react'
import { isNil, noop } from '../../../common/utils'
import { ConfigIssues } from '../../../state/validation/types'
import { SettingsPage, NumberSafeGeneratorConfig } from '../types'
import { MobileSettingsPage } from './MobileSettingsPage'

type EditorProps = {
  page: SettingsPage | undefined
  issues: ConfigIssues
  config: NumberSafeGeneratorConfig
  onBack: () => void
  onChange: (value: NumberSafeGeneratorConfig) => void
}

const EmptyPage = () => <></>

export const EditorPage: FC<EditorProps> = ({
  page,
  issues,
  config,
  onChange,
  onBack,
}) => {
  const isOpen = !isNil(page)
  const title = page?.name ?? ''
  const PageComponent = isNil(page) ? EmptyPage : page.Component
  return (
    <MobileSettingsPage title={title} isOpen={isOpen} onBack={onBack}>
      <PageComponent
        issues={issues}
        onChange={onChange}
        onClose={noop}
        value={config}
      />
    </MobileSettingsPage>
  )
}
