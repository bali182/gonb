import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { KeySignature } from '../common/keySignature'
import { HelpPageId } from '../components/help/HelpPageId'
import { SettingsPageId } from '../components/settings/SettingsPageId'
import { MelodyType } from '../legacy/melodies/types'

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  chordsVolume: number
  isLooping: boolean
}

export type PagesConfig = {
  settings: SettingsPageId
  help: HelpPageId
}

export type GeneratorConfig = {
  bars: number
  bpm: number
  clef: Clef
  keySignature: KeySignature
  showChordsStaff: boolean
  showChordSymbols: boolean
  useSeventhChords: boolean
  notes: string[]
  noteDurations: Duration[]
  restDurations: Duration[]
  // Just for easier regeneration
  timeStamp: number
}

export type LegacyGeneratorConfig = {
  type: MelodyType
  barCount: number
  keySignature: KeySignature
  clef: Clef
  firstFret: number
  lastFret: number
  semitones: boolean
  showNoteNames: boolean
  tuning: string[]
  bpm: number
  // Just for easier regeneration
  timestamp: number
}

export type AppState = {
  player: PlayerConfig
  pages: PagesConfig
  generator: GeneratorConfig
}
