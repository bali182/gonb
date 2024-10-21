export type ChordsHarmonicFunction =
  | 'Tonic'
  | 'SubDominant'
  | 'Dominant'
  | 'SecondaryDominant'

export type TonalJsHarmonicFunction = 'T' | 'SD' | 'D'

export type ProgressionChord = {
  triadName: string
  seventhName: string
  triad: string[]
  seventh: string[]
  triadMelodyNotes: string[]
  seventhMelodyNotes: string[]
  harmonicFunction: ChordsHarmonicFunction
}

export type SecondaryDominants = Map<ProgressionChord, ProgressionChord>
