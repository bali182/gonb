import { Clef, KeySignature } from '../model/common'
import { AppState } from './types'

export const initialState: AppState = {
  player: {
    isLooping: false,
    metronomeVolume: 0.5,
    instrumentVolume: 0.5,
  },
  generator: {
    type: 'WHOLE_NOTES',
    barCount: 4,
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    clef: Clef.TREBLE,
    semitones: false,
    firstFret: 0,
    lastFret: 4,
    showNoteNames: false,
    bpm: 120,
    timestamp: 0,
    tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  },
  melody: [],
}
