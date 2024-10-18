import { Clef, Duration, KeySignature } from '../../model/common'

export type SelectItem<T> = {
  label: string
  value: T
}

export type FullConfig = {
  bars: number
  bpm: number
  clef: Clef
  keySignature: KeySignature
  notes: string[]
  noteDurations: Duration[]
  restDurations: Duration[]
}

export type SettingsPageProps = {
  onClose: () => void
  value: FullConfig
  onChange: (value: FullConfig) => void
}
