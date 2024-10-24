import { GeneratorConfig } from '../../state/types'

export type SelectItem<T> = {
  label: string
  value: T
}

export type Issue = {
  type: 'error' | 'warning'
  label: string
}

export type ConfigIssues = Partial<Record<keyof GeneratorConfig, Issue>>

export type SettingsPageProps = {
  onClose: () => void
  value: GeneratorConfig
  issues: ConfigIssues
  onChange: (value: GeneratorConfig) => void
}
