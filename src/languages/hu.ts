import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { KeySignature } from '../common/keySignature'
import { MelodyType } from '../legacy/melodies/types'
import { Messages } from './types'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Basszuskulcs',
  [Clef.TREBLE]: 'Violinkulcs',
  [Clef.SOPRANO]: 'Szopránkulcs',
  [Clef.PERCUSSION]: 'Ütőkulcs',
}

const ClefsPrimary: Record<Clef, string> = {
  [Clef.BASS]: 'Basszus',
  [Clef.TREBLE]: 'Violin',
  [Clef.SOPRANO]: 'Szoprán',
  [Clef.PERCUSSION]: 'Ütő',
}

const ClefsAlternate: Record<Clef, string> = {
  [Clef.BASS]: 'F kulcs',
  [Clef.TREBLE]: 'G kulcs',
  [Clef.SOPRANO]: 'C kulcs',
  [Clef.PERCUSSION]: 'Ütőkulcs',
}

const Durations: Record<Duration, string> = {
  [Duration.WHOLE]: 'egész hang',
  [Duration.DOTTED_WHOLE]: 'pontozott egész hang',
  [Duration.HALF]: 'fél hang',
  [Duration.DOTTED_HALF]: 'pontozott fél hang',
  [Duration.QUARTER]: 'negyed hang',
  [Duration.DOTTED_QUARTER]: 'pontozott negyed hang',
  [Duration.EIGHTH]: 'nyolcad hang',
  [Duration.DOTTED_EIGHT]: 'pontozott nyolcad hang',
  [Duration.SIXTEENTH]: 'tizenhatod hang',
  [Duration.DOTTED_SIXTEENTH]: 'pontozott tizenhatod hang',
}

const KeySignatures: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Dúr / A Moll',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Dúr / E Moll',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Dúr / B Moll',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Dúr / F♯ Moll',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Dúr / C♯ Moll',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B Dúr / G♯ Moll',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]: 'F♯ Dúr / D♯ Moll',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]: 'C♯ Dúr / A♯ Moll',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Dúr / D Moll',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'B♭ Dúr / G Moll',
  [KeySignature.Eb_MAJOR_C_MINOR_3_FLATS]: 'E♭ Dúr / C Moll',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'A♭ Dúr / F Moll',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'D♭ Dúr / F Moll',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'G♭ Dúr / E♭ Moll',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'C♭ Dúr / A♭ Moll',
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
    MelodyIn: `Egy dallam {{key}}-ben`,
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

    BarCount: 'Ütemek száma',
    BarCountDescription: 'Generált ütemek száma (a generált dallam hossza).',
    Clef: 'Kulcs',
    ClefDescription: 'Zenei kulcs amiben gyakorolni szeretnél.',
    KeySignature: 'Előjegyzés',
    KeySignatureDescription: 'Az előjegyzés amivel gyakorolni szeretnél.',
    MelodyType: 'Dallam típusa',
    MelodyTypeDescription: 'Dallam típusa amit gyakorolni szeretnél.',
    Range: 'Tartomány',
    RangeDescription:
      'Bundok tartománya amiben gyakorolni szeretnél (gitár vagy basszus).',
    NonScaleNotes: 'Skálán kívüli hangok',
    NonScaleNotesDescription:
      'Skálán kívül eső hangok használata (random ♯-ek és ♭-k gyakorlására).',
    Tempo: 'Tempó (BPM-ben)',
    TempoDescription: 'A generált dallam sebessége.',
    ShowNoteNames: 'Hangok nevei',
    ShowNoteNamesDescription: 'Mutassa a hangok nevét.',
    TuningName: 'Hangolás',
    TuningDescription: 'A hangszered hangolása',
    TuningAddString: 'Húr hozzáadása',

    BasicsPage: 'Alapbeállítások',
    NotesPage: 'Hangok',
    RhythmsPage: 'Ritmusok',
    ChordsPage: 'Akkordok',
    SharePage: 'Megosztás',

    Save: 'Mentés',
    NotesPreset: 'Hang profilok',
    NotesPresetDescription: 'Válassz előre beállított hang profilok közül!',
    Notes: 'Hangok',
    NotesDescription:
      'Válaszd ki a hangokat amikkel gyakorolni szeretnél (vagy válassz egy profilt).',
    RhythmDurations: 'Ritmusok',
    RhythmDurationsDescription: 'Ritmusok amiket gyakrolni szeretnél.',
    ShareableLink: 'Megosztható link',
    ShareableLinkDescription: 'Ezen a linken megoszthatod a beállításaidat.',
    ClickToCopy: 'Kattints a link vágólapra másolásához!',
    CopySuccess: 'Link sikeresen a vágólapra másolva!',
    CopyFailure: 'Vágólapra másolás sikertelen.',
    ScaleOnly: 'Skálahangok',

    ShowChords: 'Mutasd a kíséretet',
    ShowChordsDescription:
      'Mutatja a fő dallam alatt játszott akkordokat egy külön szólamon.',
    SeventhChords: 'Használj dúsított akkordokat',
    SeventhChordsDescription:
      'Dúsabb akkordhangzásokat használ a hármashangzatok helyett.',
  },
  Clefs,
  KeySignatures,
  MelodyTypes,

  NotePresets: {
    SixStringGuitar: '6 Húros Gitár',
    SevenStringGuitar: '7 Húros Gitár',
    FourStringBass: '4 Húros Basszusgitár',
    FiveStringBass: '5 Húros Basszusgitár',
    SixStringGuitarUnfretted: '6 Húros Gitár (csak húrok)',
    SevenStringGuitarUnfretted: '7 Húros Gitár (csak húrok)',
    FourStringBassUnfretted: '4 Húros Basszusgitár (csak húrok)',
    FiveStringBassUnfretted: '5 Húros Basszusgitár (csak húrok)',
    Custom: 'Egyedi hangok',
  },
  NoteAndRestHeaders: {
    Notes: 'Hangok',
    DottedNotes: 'Pontozott hangok',
    Rests: 'Szünetek',
    DottedRests: 'Pontozott szünetek',
  },
  DurationHeaders: {
    Whole: 'Egész hangok',
    Half: 'Fél hangok',
    Quarter: 'Negyed hangok',
    Eighth: 'Nyolcad hangok',
    Sixteenth: 'Tizenhatod hangok',
  },
  ClefsPrimary,
  ClefsAlternate,
  Durations,
  Validation: {
    PercussionClef: 'Ez a kulcs még nem működik.',
    ZeroBars: 'Legalább 1 ütem szükséges.',
    WrongBpm: 'A tempó 10 és 400 bpm között kell hogy legyen.',
    EmptyNotes: 'Válassz legalább 1 hangot.',
    NoScaleNotes:
      'Válassz legalább 1 hangot a {{scale}} dúr skálából ({{scaleNotes}} hangok egyikét).',
    EmptyRhytms: 'Válassz legalább 1 ritmust tipust hangokhoz.',
    DottedRhytms: `Amikor a {{dotted}} ki van választva, a {{required}} kiválasztása kötelező.`,
  },
  ErrorBoundary: {
    Title: 'Hiba történt!',
    Explanation:
      'Vagy régiek a mentett adataid, vagy programhibát találtál. Ha úgy gondolod hogy ez programhiba, kérlek jelentsd (az alábbiakat csatolva):',
    Reset: 'Alkalmazás alaphelyzetbe állítása',
  },
}
