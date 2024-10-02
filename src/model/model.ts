export const enum Duration {
  WHOLE = 1,
  HALF = 2,
  QUARTER = 4,
  EIGHT = 8,
  SIXTEENTH = 16,
}

export type Item = Note | Rest

export type Note = {
  type: 'note'
  octave: number
  name: string
  duration: Duration
  label?: string
}

export type Rest = {
  type: 'rest'
  duration: Duration
  label?: string
}

export type Bar = {
  items: Item[]
}

export type Melody = {
  bars: Bar[]
}

export type TimeSignature = {
  top: number
  bottom: number
}

export type KeySignature =
  | 'Cb'
  | 'Gb'
  | 'Db'
  | 'Ab'
  | 'Eb'
  | 'Bb'
  | 'F'
  | 'C'
  | 'G'
  | 'D'
  | 'A'
  | 'E'
  | 'B'
  | 'F#'
  | 'C#'

export type Clef = 'Bass' | 'Treble' | 'Tenor' | 'Alto' | 'Neutral'

export type Track = {
  instrument: 'AcousticBass' | 'AcousticGuitarSteel' | 'AcousticGrandPiano'
  name: string
  shortName: string
  clef: Clef
  keySignature: KeySignature
  timeSignature: TimeSignature
  bars: Bar[]
}
