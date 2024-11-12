import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { DurationFrequency } from '../common/durationFrequency'
import { DurationType } from '../common/durationType'
import { KeySignature } from '../common/keySignature'
import { MelodyType } from '../legacy/melodies/types'
import { Messages } from './types'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Basszuskulcs',
  [Clef.TREBLE]: 'Violinkulcs',
  [Clef.PERCUSSION]: 'Ütőkulcs',
  [Clef.TENOR]: 'Tenorkulcs',
  [Clef.ALTO]: 'Altokulcs',
}

const ClefsPrimary: Record<Clef, string> = {
  [Clef.BASS]: 'Basszus',
  [Clef.TREBLE]: 'Violin',
  [Clef.PERCUSSION]: 'Ütő',
  [Clef.TENOR]: 'Tenor',
  [Clef.ALTO]: 'Alto',
}

const ClefsAlternate: Record<Clef, string> = {
  [Clef.BASS]: 'F kulcs',
  [Clef.TREBLE]: 'G kulcs',
  [Clef.PERCUSSION]: 'Ütőkulcs',
  [Clef.TENOR]: 'C(3) kulcs ',
  [Clef.ALTO]: 'C(4) kulcs ',
}

const Durations: Record<Duration, string> = {
  [Duration.WHOLE]: 'egész',
  [Duration.DOTTED_WHOLE]: 'pontozott egész',
  [Duration.HALF]: 'fél',
  [Duration.DOTTED_HALF]: 'pontozott fél',
  [Duration.QUARTER]: 'negyed',
  [Duration.DOTTED_QUARTER]: 'pontozott negyed',
  [Duration.EIGHTH]: 'nyolcad',
  [Duration.DOTTED_EIGHT]: 'pontozott nyolcad',
  [Duration.SIXTEENTH]: 'tizenhatod',
  [Duration.DOTTED_SIXTEENTH]: 'pontozott tizenhatod',
}

const DurationTypes: Record<DurationType, string> = {
  [DurationType.NOTE]: 'hang',
  [DurationType.REST]: 'értékű szünet',
}

const KeySignatures: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Dúr / A Moll',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Dúr / E Moll',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Dúr / B Moll',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Dúr / F♯ Moll',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Dúr / C♯ Moll',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'H Dúr / G♯ Moll',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]: 'F♯ Dúr / D♯ Moll',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]: 'C♯ Dúr / A♯ Moll',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Dúr / D Moll',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'B Dúr / G Moll',
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

export const Frequency: Record<DurationFrequency, string> = {
  [DurationFrequency.FREQUENT]: 'Gyakori',
  [DurationFrequency.MODERATE]: 'Mérsékelt',
  [DurationFrequency.INFREQUENT]: 'Ritka',
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
    TimeSignature: 'Ütemmutató',
    TimeSignatureDescription: 'Az ütemmutató amivel gyakorolni szeretnél.',
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
    RestsPage: 'Szünetek',
    ChordsPage: 'Akkordok',
    SharePage: 'Megosztás',

    Save: 'Mentés',
    NotesPreset: 'Profilok',
    NotesPresetDescription: 'Válassz előre beállított profilok közül!',
    Notes: 'Hangok',
    NotesDescription:
      'Válaszd ki a hangokat amikkel gyakorolni szeretnél (vagy válassz egy profilt).',
    NoteDurations: 'Ritmusok',
    NoteDurationsDescription:
      'Válaszd ki a ritmusokat amiket gyakorolni szerenél.',
    DottedNoteDurations: 'Pontozott ritmusok',
    DottedNoteDurationsDescription:
      'Válaszd ki a pontozott ritmusokat amiket gyakorolni szerenél.',
    RestDurations: 'Szünetek',
    RestDurationsDescription:
      'Válaszd ki a szüneteket amiket gyakorolni szerenél.',
    DottedRestDurations: 'Pontozott szünetek',
    DottedRestDurationsDescription:
      'Válaszd ki a pontozott szüneteket amiket gyakorolni szerenél.',
    ShareableLink: 'Megosztható link',
    ShareableLinkDescription: 'Ezen a linken megoszthatod a beállításaidat.',
    ClickToCopy: 'Kattints a link vágólapra másolásához!',
    CopySuccess: 'Link sikeresen a vágólapra másolva!',
    CopyFailure: 'Vágólapra másolás sikertelen.',
    ScaleOnly: 'Skálahangok',

    ShowChordsStaff: 'Mutasd a kíséretet',
    ShowChordsStaffDescription:
      'Mutatja a fő dallam alatt játszott akkordokat egy külön szólamon.',
    ShowChordLabels: 'Mutasd az akkordszimbólumokat',
    ShowChordLabelsDescription:
      'Mutatja a kíséretben használt akkordok neveit a dallam fölött.',
    SeventhChords: 'Használj dúsított akkordokat',
    SeventhChordsDescription:
      'Dúsabb akkordhangzásokat használ az alap hármashangzatok helyett.',
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
  DurationTypes,
  Frequency,
  Validation: {
    PercussionClef: 'Ez a kulcs még nem működik.',
    ZeroBars: 'Legalább 1 ütem szükséges.',
    WrongBpm: 'A tempó 10 és 400 bpm között kell hogy legyen.',
    EmptyNotes: 'Válassz legalább 1 hangot.',
    NoScaleNotes:
      'Válassz legalább 1 hangot a {{scale}} dúr skálából ({{scaleNotes}} hangok egyikét).',
    EmptyDurations:
      'Válassz legalább 1 ritmust tipust, ami befér {{timeSignature}}-be.',
    DottedRhytms: `A {{required}} (ritmus vagy szünet) kiválasztása kötelező  (a {{dotted}} miatt).`,
    TimeSignatureLower: `Az ütemmutató nevezője a következő értékek egyike kell hogy legyen: {{lower}}.`,
    TimeSignatureUpper: `Az ütemmutató számlálója {{min}} és {{max}} között kell hogy legyen.`,
    EmptyBars: 'Az ütemszám nem lehet üres.',
    EmptyTempo: 'A tempó nem lehet üres.',
    EmptyTimeSignatureUpper: 'Az ütemmutató számlálója nem lehet üres.',
    EmptyTimeSignatureLower: 'Az ütemmutató nevezője nem lehet üres.',
    ErrorInUrl: `Megosztható URL nem generálható ameddig a beállítás kritikus hibákat tartalmaz.`,
    DurationLongerThanBar: `Egy {{duration}} nem fér egy {{timeSignature}} ütemmutatójú ütembe, emiatt nem fog előfordulni a kottában.`,
    DurationInvalidBecauseOfTimeSignature:
      'Érvénytelen a hibás ütemmutató miatt.',
    DurationInvalidBeacauseOfTimeSignature:
      'Javítsd az ütemmutatót a ritmusok beállítása előtt!',
  },
  ErrorBoundary: {
    Title: 'Hiba történt!',
    Explanation:
      'Vagy régiek a mentett adataid, vagy programhibát találtál. Ha úgy gondolod hogy ez programhiba, kérlek jelentsd (az alábbiakat csatolva):',
    Reset: 'Alkalmazás alaphelyzetbe állítása',
  },
  DurationGrid: {
    IsNotActive: 'inaktív.',
    Enabled: 'Aktív',
    Probability: 'Gyakoriság',
    ClusterSize: 'Preferált csoport méret',
    DurationTooLong: 'Egy {{duration}} nem fér egy ütembe.',
  },
  PlayerTooltips: {
    MelodyVolume: 'Dallam hangereje',
    ChordsVolume: 'Kíséret hangereje',
    MetronomeVolume: 'Metronóm hangereje',
    Play: 'Lejátszás',
    Pause: 'Szünet',
    Stop: 'Stop',
    Loop: 'Kiválasztás ismétlése',
    CountIn: 'Beszámolás a lejátszás előtt',
  },
}
