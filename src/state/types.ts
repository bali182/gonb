import { AtBar } from '../model/alphaTex'
import { Clef, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  isLooping: boolean
}

export type DisplayConfig = {
  showNoteNames: boolean
}

export type GeneratorConfig = {
  type: MelodyType
  barCount: number
  keySignature: KeySignature
  clef: Clef
}

export type AppState = {
  player: PlayerConfig
  generator: GeneratorConfig
  display: DisplayConfig
  melody: AtBar[]
}
