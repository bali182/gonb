export type ChordsHarmonicFunction =
  | 'Tonic'
  | 'SubDominant'
  | 'Dominant'
  | 'SecondaryDominant'

export type TonalJsHarmonicFunction = 'T' | 'SD' | 'D'

export type ProgressionChord = {
  name: string
  notes: string[]
  melodyNotes: string[]
  harmonicFunction: ChordsHarmonicFunction
}

export type FunctionProgressionTemplate = ChordsHarmonicFunction[]
