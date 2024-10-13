import { Clef, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Bass clef',
  [Clef.TREBLE]: 'Treble clef',
  [Clef.SOPRANO]: 'Soprano clef',
  [Clef.PERCUSSION]: 'Percussion clef',
}

const KeySignatures: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Major / A Minor',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Major / E Minor (#)',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Major / B Minor (##)',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Major / F# Minor (###)',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Major / C# Minor (####)',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B Major / G# Minor (#####)',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]:
    'F# Major / D# Minor (######)',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]:
    'C# Major / A# Minor (#######)',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Major / D Minor (b)',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'Bb Major / G Minor (bb)',
  [KeySignature.Eb_MAJOR_C_MINOR_2_FLATS]: 'Eb Major / C Minor (bbb)',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'Ab Major / F Minor (bbbb)',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'Db Major / F Minor (bbbbb)',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'Gb Major / Eb Minor (bbbbbb)',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'Cb Major / Ab Minor (bbbbbbb)',
}

const MelodyTypes: Record<MelodyType, string> = {
  WHOLE_NOTES: 'Steady whole notes',
  HALF_NOTES: 'Steady half notes',
  QUARTER_NOTES: 'Steady quarter notes',
  MELODY: 'Realistic melody',
}

export const en = {
  Language: 'Language',
  Score: {
    AlphaTabRenderedBy: 'Score rendered by:',
  },
  Menu: {
    GenerateNew: 'Generate new',
    Settings: 'Settings',
    Help: 'Help',
  },
  Help: {
    Help: 'Help',
    TrebleClef: 'Treble Clef',
    BassClef: 'Bass Clef',
  },
  Settings: {
    Settings: 'Settings',
    Basics: 'Basics',
    Details: 'Details',
    Tuning: 'Tuning',

    BasicsPage: 'Basic Settings',
    NotesPage: 'Notes',
    RhythmsPage: 'Rhythms',

    BarCount: 'Number of bars',
    BarCountDescription:
      'Number of bars (length of the random generated piece).',
    Clef: 'Clef',
    ClefDescription: 'Clef you want to practice. Can be either bass or treble.',
    KeySignature: 'Key signature',
    KeySignatureDescription: 'The key you want to practice in.',
    MelodyType: 'Melody type',
    MelodyTypeDescription: 'The type of melodies you want to practice.',
    Range: 'Range',
    RangeDescription:
      'Fret range on your stringed instrument (guitar or bass).',
    NonScaleNotes: 'Use non scale notes',
    NonScaleNotesDescription:
      'Use notes that are outside of your selected scale, to practice accidentals.',
    Tempo: 'Tempo (in BPM)',
    TempoDescription: 'The tempo of the generated melody.',
    ShowNoteNames: 'Show note names',
    ShowNoteNamesDescription:
      'When turned on, shows the note names above the score.',
    TuningName: 'Tuning',
    TuningDescription:
      'Individual strings of the instruments you want to practice with',
    TuningAddString: 'Add string',

    NotesPreset: 'Notes preset',
    NotesPresetDescription:
      'Select notes from the available presets describing the range of common instruments',

    Notes: 'Notes',
    NotesDescription:
      'Select the individual notes of your instruments range, if the presets are not suitable',

    RhythmDurations: 'Rhythm durations',
    RhythmDurationsDescription:
      'Select the individual note and rest durations you want to practice',
  },
  NotePresets: {
    SixStringGuitar: '6 String Guitar',
    SevenStringGuitar: '7 String Guitar',
    FourStringBass: '4 String Bass',
    FiveStringBass: '5 String Bass',
    SixStringGuitarUnfretted: '6 String Guitar (unfretted)',
    SevenStringGuitarUnfretted: '7 String Guitar (unfretted)',
    FourStringBassUnfretted: '4 String Bass (unfretted)',
    FiveStringBassUnfretted: '5 String Bass (unfretted)',
  },
  NoteAndRestHeaders: {
    Notes: 'Notes',
    DottedNotes: 'Dotted notes',
    Rests: 'Rests',
    DottedRests: 'Dotted rests',
  },
  DurationHeaders: {
    Whole: 'Whole notes',
    Half: 'Half notes',
    Quarter: 'Quarter notes',
    Eighth: 'Eighth notes',
    Sixteenth: 'Sixteenth notes',
  },
  Clefs,
  KeySignatures,
  MelodyTypes,
}
