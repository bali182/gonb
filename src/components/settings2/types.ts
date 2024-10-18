import { GeneratorConfig2 } from '../../state/types'

export type SelectItem<T> = {
  label: string
  value: T
}

export type SettingsPageProps = {
  onClose: () => void
  value: GeneratorConfig2
  onChange: (value: GeneratorConfig2) => void
}
