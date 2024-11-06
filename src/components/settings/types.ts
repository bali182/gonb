import { GeneratorConfig } from '../../state/types'
import { ConfigIssues } from '../../state/validation/types'
import { ModalPage } from '../PagedModal'
import { SettingsPageId } from './SettingsPageId'

export type SelectItem<T> = {
  label: string
  value: T
}

export type SettingsPageProps = {
  onClose: () => void
  value: GeneratorConfig
  issues: ConfigIssues
  onChange: (value: GeneratorConfig) => void
}

export type SettingsPage = ModalPage<SettingsPageId, SettingsPageProps>
