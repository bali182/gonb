import { Messages } from './types'

export const hu: Messages = {
  Language: 'Nyelv',
  Score: {
    AlphaTabRenderedBy: 'Kottát rajzolta:',
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
  },
}
