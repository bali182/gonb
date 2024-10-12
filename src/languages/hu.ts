import { Clef, KeySignature } from '../model/common'
import { MelodyType } from '../model/melodyFragment'
import { Messages } from './types'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Basszus kulcs',
  [Clef.TREBLE]: 'Violin kulcs',
}

const KeySignatures: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Dúr / A Moll',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Dúr / E Moll (#)',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Dúr / B Moll (##)',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Dúr / F# Moll (###)',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Dúr / C# Moll (####)',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B Dúr / G# Moll (#####)',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]:
    'F# Dúr / D# Moll (######)',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]:
    'C# Dúr / A# Moll (#######)',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Dúr / D Moll (b)',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'Bb Dúr / G Moll (bb)',
  [KeySignature.Eb_MAJOR_C_MINOR_2_FLATS]: 'Eb Dúr / C Moll (bbb)',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'Ab Dúr / F Moll (bbbb)',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'Db Dúr / F Moll (bbbbb)',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'Gb Dúr / Eb Moll (bbbbbb)',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'Cb Dúr / Ab Moll (bbbbbbb)',
}

const MelodyTypes: Record<MelodyType, string> = {
  WHOLE_NOTES: 'Egész hangok',
  HALF_NOTES: 'Fél hangok',
  QUARTER_NOTES: 'Negyed hangok',
  MELODY: 'Realisztikus dallam',
}

export const hu: Messages = {
  Language: 'Nyelv',
  Score: {
    AlphaTabRenderedBy: 'Kottát rajzolta:',
  },
  Menu: {
    GenerateNew: 'Generálj újat',
    Settings: 'Beállítások',
    Help: 'Segítség',
  },
  Help: {
    Help: 'Segítség',
    TrebleClef: 'Violin kulcs',
    BassClef: 'Basszus kulcs',
  },
  Settings: {
    Settings: 'Beállítások',
    Basics: 'Alap',
    Details: 'Egyéb',
    BarCount: 'Ütemek száma',
    BarCountDescription: 'Generált ütemek száma (a generált dallam hossza).',

    Clef: 'Kulcs',
    ClefDescription:
      'Zenei kulcs amiben gyakorolni akarsz (basszus vagy violin).',
    KeySignature: 'Hangnem',
    KeySignatureDescription: 'A hangnem amiben gyakorolni akarsz',
    MelodyType: 'Dallam típusa',
    MelodyTypeDescription: 'Dallam típusa amit gyakorolni akarsz.',
    Range: 'Tartomány',
    RangeDescription:
      'Bundok tartománya amiben gyakorolni akarsz (gitár vagy basszus).',
    NonScaleNotes: 'Skálán kívüli hangok',
    NonScaleNotesDescription:
      'Skálán kívül eső hangok használata (random #-ek és b-k gyakorlására).',
    Tempo: 'Tempó (BPM-ben)',
    TempoDescription: 'A generált dallam sebessége.',
    ShowNoteNames: 'Hangok nevei',
    ShowNoteNamesDescription: 'Mutassa a hangok nevét.',
    Tuning: 'Hangolás',
    TuningName: 'Hangolás',
    TuningDescription: 'A hangszered hangolása',
    TuningAddString: 'Húr hozzáadása',
  },
  Clefs,
  KeySignatures,
  MelodyTypes,
}
