import { get } from '@tonaljs/scale'
import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { KeySignature } from '../common/keySignature'
import { SIX_STRING_GUITAR } from '../components/settings/controls/NotePresetPicker/presets'
import { AppState } from './types'
import { matchesPitchClass } from '../common/utils'
import { SettingsPageId } from '../components/settings/SettingsPageId'
import { HelpPageId } from '../components/help/HelpPageId'
import { DurationFrequency } from '../common/durationFrequency'

const SCALE = get(`C major`).notes
const C_MAJOR_GUITAR = SIX_STRING_GUITAR.filter((note) =>
  SCALE.some((sNote) => matchesPitchClass(sNote, note)),
)

export const initialState: AppState = {
  player: {
    isLooping: false,
    metronomeVolume: 0.25,
    instrumentVolume: 0.5,
    chordsVolume: 0.25,
  },
  generator: {
    bars: 4,
    tempo: 60,
    timeStamp: 0,
    showChordsStaff: false,
    useSeventhChords: false,
    showChordSymbols: false,
    clef: Clef.TREBLE,
    timeSignature: { upper: 4, lower: 4 },
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    noteDurations: {
      [Duration.HALF]: { cluster: 1, frequency: DurationFrequency.MODERATE },
    },
    restDurations: {
      [Duration.HALF]: { cluster: 1, frequency: DurationFrequency.MODERATE },
    },
    notes: C_MAJOR_GUITAR,
  },
  pages: {
    settings: SettingsPageId.BASICS,
    help: HelpPageId.TREBLE_CLEF,
  },
}
