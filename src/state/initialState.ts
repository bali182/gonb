import { get } from '@tonaljs/scale'
import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { KeySignature } from '../common/keySignature'
import { SIX_STRING_GUITAR } from '../components/settings/controls/NotePresetPicker/presets'
import { AppState } from './types'
import { matchesPitchClass } from '../common/utils'
import { SettingsPageId } from '../components/settings/SettingsPageId'
import { HelpPageId } from '../components/help/HelpPageId'

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
    bpm: 60,
    timeStamp: 0,
    showChordsStaff: false,
    useSeventhChords: false,
    showChordSymbols: false,
    clef: Clef.TREBLE,
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    noteDurations: [Duration.QUARTER],
    restDurations: [Duration.QUARTER],
    notes: C_MAJOR_GUITAR,
  },
  pages: {
    settings: SettingsPageId.BASICS,
    help: HelpPageId.TREBLE_CLEF,
  },
}
