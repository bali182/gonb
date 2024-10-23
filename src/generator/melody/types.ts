import { ProgressionChord } from '../progression/types'
import { RhythmItem } from '../rhythm/types'

export type MelodyBarInput = {
  chord: ProgressionChord
  rhythm: RhythmItem[]
}
