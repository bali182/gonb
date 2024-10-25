import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { KeySignature } from '../common/keySignature'
import { SIX_STRING_GUITAR } from '../components/settings/controls/NotePresetPicker/presets'
import { AppState } from './types'

export const initialState: AppState = {
  player: {
    isLooping: false,
    metronomeVolume: 0.5,
    instrumentVolume: 0.5,
    chordsVolume: 0.2,
  },
  generator: {
    bars: 4,
    bpm: 60,
    clef: Clef.TREBLE,
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    noteDurations: [Duration.QUARTER],
    restDurations: [Duration.QUARTER],
    notes: SIX_STRING_GUITAR,
    timeStamp: 0,
  },
}
