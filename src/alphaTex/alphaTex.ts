import { Clef, Duration, KeySignature } from '../common/common'

export type AtInstrumentType = 'AcousticBass' | 'AcousticGuitarSteel'

export type AtItem = AtNote | AtRest | AtChord

export type Staff = 'score' | 'tabs' | 'both'

export type AtNote = {
  type: 'note'
  note: string
  duration: Duration
  label?: string
}

export type AtFrettedNote = {
  string: number
  fret: number
}

export type AtRest = {
  type: 'rest'
  duration: Duration
  label?: string
}

export type AtChord = {
  type: 'chord'
  notes: string[]
  duration: Duration
  label?: string
}

export type AtBar = {
  items: AtItem[]
}

export type AtTimeSignature = {
  top: number
  bottom: number
}

export type AtTrack = {
  instrument: AtInstrumentType
  name: string
  shortName: string
  clef: Clef
  keySignature: KeySignature
  timeSignature: AtTimeSignature
  tuning: string[]
  bars: AtBar[]
  staff?: Staff
  bpm?: number
}

export type AtSong = {
  title?: string
  subtitle?: string
  artist?: string
  album?: string
  words?: string
  music?: string
  copyright?: string
  tempo: number
  tracks: AtTrack[]
}
