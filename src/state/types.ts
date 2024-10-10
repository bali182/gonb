import { AtBar, AtTrack } from '../model/alphaTex'
import { Clef, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  isLooping: boolean
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
