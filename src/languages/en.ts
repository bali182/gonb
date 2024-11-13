import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { DurationFrequency } from '../common/durationFrequency'
import { DurationType } from '../common/durationType'
import { KeySignature } from '../common/keySignature'
import { MelodyType } from '../legacy/melodies/types'

const Clefs: Record<Clef, string> = {
  [Clef.BASS]: 'Bass clef',
  [Clef.TREBLE]: 'Treble clef',
  [Clef.PERCUSSION]: 'Percussion clef',
  [Clef.TENOR]: 'Tenor clef',
  [Clef.ALTO]: 'Alto clef',
}

const ClefsPrimary: Record<Clef, string> = {
  [Clef.BASS]: 'Bass',
  [Clef.TREBLE]: 'Treble',
  [Clef.PERCUSSION]: 'Neutral',
  [Clef.TENOR]: 'Tenor',
  [Clef.ALTO]: 'Alto',
}

const ClefsAlternate: Record<Clef, string> = {
  [Clef.BASS]: 'F clef',
  [Clef.TREBLE]: 'G clef',
  [Clef.PERCUSSION]: 'Percussion',
  [Clef.TENOR]: 'C(3) clef ',
  [Clef.ALTO]: 'C(4) clef ',
}

const Durations: Record<Duration, string> = {
  [Duration.WHOLE]: 'whole',
  [Duration.DOTTED_WHOLE]: 'dotted whole',
  [Duration.HALF]: 'half',
  [Duration.DOTTED_HALF]: 'dotted half',
  [Duration.QUARTER]: 'quarter',
  [Duration.DOTTED_QUARTER]: 'dotted quarter',
  [Duration.EIGHTH]: 'eighth',
  [Duration.DOTTED_EIGHT]: 'dotted eighth',
  [Duration.SIXTEENTH]: 'sixteenth',
  [Duration.DOTTED_SIXTEENTH]: 'dotted sixteenth',
}

const DurationTypes: Record<DurationType, string> = {
  [DurationType.NOTE]: 'note',
  [DurationType.REST]: 'note rest',
}

const KeySignatures: Record<KeySignature, string> = {
  [KeySignature.C_MAJOR_A_MINOR]: 'C Major / A Minor',
  [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: 'G Major / E Minor',
  [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: 'D Major / B Minor',
  [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: 'A Major / F♯ Minor',
  [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: 'E Major / C♯ Minor',
  [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: 'B Major / G♯ Minor',
  [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]: 'F♯ Major / D♯ Minor',
  [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]: 'C♯ Major / A♯ Minor',
  [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: 'F Major / D Minor',
  [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: 'B♭ Major / G Minor',
  [KeySignature.Eb_MAJOR_C_MINOR_3_FLATS]: 'E♭ Major / C Minor',
  [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: 'A♭ Major / F Minor',
  [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: 'D♭ Major / F Minor',
  [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: 'G♭ Major / E♭ Minor',
  [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: 'C♭ Major / A♭ Minor',
}

export const Frequency: Record<DurationFrequency, string> = {
  [DurationFrequency.FREQUENT]: 'Frequent',
  [DurationFrequency.MODERATE]: 'Moderate',
  [DurationFrequency.INFREQUENT]: 'Infrequent',
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
    MelodyIn: `A Melody in {{key}}`,
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

    BasicsPage: 'Basic Settings',
    NotesPage: 'Notes',
    RhythmsPage: 'Rhythms',
    RestsPage: 'Rests',
    ChordsPage: 'Chords',
    SharePage: 'Share',

    Save: 'Save',

    BarCount: 'Number of bars',
    BarCountDescription:
      'Number of bars (length of the random generated piece).',
    Clef: 'Clef',
    ClefDescription: 'Clef you want to practice. Can be either bass or treble.',
    KeySignature: 'Key signature',
    KeySignatureDescription: 'The key you want to practice in.',
    TimeSignature: 'Time signature',
    TimeSignatureDescription: 'The time you want to practice in.',
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

    NoteDurations: 'Note durations',
    NoteDurationsDescription:
      'Select the individual note durations, how often they occur and in what clusters.',
    DottedNoteDurations: 'Dotted note durations',
    DottedNoteDurationsDescription:
      'Select the individual dotted note durations, how often they occur and in what clusters.',

    RestDurations: 'Rest durations',
    RestDurationsDescription:
      'Select the individual rest durations, how often they occur and in what clusters.',
    DottedRestDurations: 'Dotted rest durations',
    DottedRestDurationsDescription:
      'Select the individual dotted rest durations, how often they occur and in what clusters.',

    ShareableLink: 'Shareable link',
    ShareableLinkDescription:
      'Grab a shareable link for your configuration! This contains no tracking data!',
    ClickToCopy: 'Click to copy URL to the clipboard!',
    CopySuccess: 'Successfully copied to the clipboard!',
    CopyFailure: 'Failed to copy to the clipboard!',
    ScaleOnly: 'Scale only',
    ShowChordLabels: 'Show chord labels',
    ShowChordLabelsDescription: 'Shows chords labels above the melody.',
    ShowChordsStaff: 'Show accompaniment',
    ShowChordsStaffDescription:
      'Shows chords played under the main melody part in a separate staff',
    SeventhChords: 'Use extended chords',
    SeventhChordsDescription:
      'Uses extended chords for the accompaniment instead of triads',
  },
  NotePresets: {
    Custom: 'Custom notes',
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
  ClefsPrimary,
  ClefsAlternate,
  KeySignatures,
  MelodyTypes,
  Durations,
  Frequency,
  DurationTypes,
  Logo: {
    Name: 'Gonb',
    Slogan: 'learn to read.',
  },
  Validation: {
    EmptyBars: 'Number of bars cannot be empty.',
    EmptyTempo: 'Tempo cannot be empty.',
    EmptyTimeSignatureUpper: 'Upper part of time signature cannot be empty.',
    EmptyTimeSignatureLower: 'Lower part of time signature cannot be empty.',
    DurationLongerThanBar: `Duration {{duration}} doesn't fit in a bar of {{timeSignature}}, so it will never occur in the score.`,
    DurationInvalidBecauseOfTimeSignature: `Invalid because of time signature.`,
    DurationInvalidBeacauseOfTimeSignature:
      'Please fix the time signature before configuring durations!',
    PercussionClef: 'This clef is not yet supported.',
    ZeroBars: 'There must be at least one bar.',
    WrongBpm: 'Tempo must be between 10 and 400 bpm.',
    EmptyNotes: 'Select at least 1 note.',
    NoScaleNotes:
      'Select at least 1 note of {{scale}} major (one of {{scaleNotes}}).',
    EmptyDurations: `Select at least one duration, that fits in {{timeSignature}}.`,
    DottedRhytms: `When {{dotted}} is selected, {{required}} must be selected as well.`,
    TimeSignatureLower: `Lower value must be {{lower}}`,
    TimeSignatureUpper: `Upper value must be between {{min}} and {{max}}`,
    ErrorInUrl: `Can't share your configuration until it has critical issues.`,
  },
  ErrorBoundary: {
    Title: 'An unexpected error happened!',
    Explanation:
      'This may occur if your locally saved configuration is out of date, or you have found a bug! If you think it is a bug please report it (include the message below).',

    Reset: 'Reset App',
  },
  DurationGrid: {
    IsNotActive: 'is inactive.',
    Enabled: 'Enabled',
    Probability: 'Probability',
    ClusterSize: 'Preferred cluster size',
    DurationTooLong: '{{duration}} does not fit in a bar.',
  },
  PlayerTooltips: {
    MelodyVolume: 'Melody volume',
    ChordsVolume: 'Chords volume',
    MetronomeVolume: 'Metronome volume',
    Play: 'Play',
    Pause: 'Pause',
    Stop: 'Stop',
    Loop: 'Loop selection',
    CountIn: 'Count-in before play',
  },
}
