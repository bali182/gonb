import { GeneratorConfig } from '../../state/types'
import { ModalPage } from '../PagedModal'
import { SettingsPageId } from './SettingsPageId'

export type SelectItem<T> = {
  label: string
  value: T
}

export type Issue = {
  type: 'error' | 'warning'
  label: string
}

export type ConfigIssues = Partial<{
  bars: Issue
  bpm: Issue
  clef: Issue
  keySignature: Issue
  showChordsStaff: Issue
  showChordSymbols: Issue
  useSeventhChords: Issue
  notes: Issue
  noteDurations: Issue
  dottedNoteDurations: Issue
  restDurations: Issue
  dottedRestDurations: Issue
}>

export type SettingsPageProps = {
  onClose: () => void
  value: GeneratorConfig
  issues: ConfigIssues
  onChange: (value: GeneratorConfig) => void
}

export type SettingsPage = ModalPage<SettingsPageId, SettingsPageProps>
