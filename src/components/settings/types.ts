import { GeneratorConfig, TimeSignature } from '../../state/types'
import { ConfigIssues } from '../../state/validation/types'
import { ModalPage } from '../types'
import { SettingsPageId } from './SettingsPageId'

export type SelectItem<T> = {
  label: string
  value: T
}

export type SettingsPageProps = {
  onClose: () => void
  value: NumberSafeGeneratorConfig
  issues: ConfigIssues
  onChange: (value: NumberSafeGeneratorConfig) => void
}

export type SettingsPage = ModalPage<SettingsPageId, SettingsPageProps>

export type NumberSafeGeneratorConfig = Omit<
  GeneratorConfig,
  'bars' | 'tempo' | 'timeSignature'
> & {
  bars: number | undefined
  tempo: number | undefined
  timeSignature: Partial<TimeSignature>
}
