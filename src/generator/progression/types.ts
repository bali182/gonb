export type ChordsHarmonicFunction =
  | 'Tonic'
  | 'SubDominant'
  | 'Dominant'
  | 'SecondaryDominant'

export type TonalJsHarmonicFunction = 'T' | 'SD' | 'D'

export type ProgressionChord = {
  triadName: string
  seventhName: string
  harmonicFunction: ChordsHarmonicFunction
  triad: string[]
  seventh: string[]
  scale: string[]
  triadMelodyNotes: string[]
  seventhMelodyNotes: string[]
  scaleMelodyNotes: string[]
  bassMelodyNote: string | undefined
}

export type SecondaryDominants = Map<ProgressionChord, ProgressionChord>
