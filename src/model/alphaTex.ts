import { Clef, Duration, KeySignature } from './common'

export type AtInstrumentType = 'AcousticBass' | 'AcousticGuitarSteel'

export type AtItem = AtNote | AtRest

export type AtNote = {
  type: 'note'
  note: string
  duration: Duration
  label?: string
}

export type AtRest = {
  type: 'rest'
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
  bars: AtBar[]
  bpm: number
}
