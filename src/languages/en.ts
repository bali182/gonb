import { Clef, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Bass clef',
  [Clef.TREBLE]: 'Treble clef',
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
  },
  Clefs,
  KeySignatures,
  MelodyTypes,
}
