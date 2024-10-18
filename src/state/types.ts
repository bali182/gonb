import { AtBar } from '../model/alphaTex'
import { Clef, Duration, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  isLooping: boolean
}

export type GeneratorConfig2 = {
  bars: number
  bpm: number
  clef: Clef
  keySignature: KeySignature
  notes: string[]
  noteDurations: Duration[]
  restDurations: Duration[]
}

export type GeneratorConfig = {
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
  generator: GeneratorConfig
  melody: AtBar[]
}
