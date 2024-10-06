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
    timestamp: 0,
  },
  display: {
    showNoteNames: false,
  },
  melody: [],
}
