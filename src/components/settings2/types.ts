import { GeneratorConfig2 } from '../../state/types'

export type SelectItem<T> = {
  label: string
  value: T
}

export type Issue = {
  type: 'error' | 'warning'
  label: string
}

export type ConfigIssues = Partial<Record<keyof GeneratorConfig2, Issue>>

export type SettingsPageProps = {
  onClose: () => void
  value: GeneratorConfig2
  issues: ConfigIssues
  onChange: (value: GeneratorConfig2) => void
}
