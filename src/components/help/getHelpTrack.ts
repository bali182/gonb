import { Note } from 'tonal'
import { AtBar, AtNote, AtSong } from '../../alphaTex/alphaTex'
import { Clef, Duration, KeySignature } from '../../model/common'
import { chunk, getScaleNotesInRange } from '../../model/utils'
import { DEFAULT_TUNING } from '../../alphaTex/constants'

export function getHelpTrack(
  lowNote: string,
  highNote: string,
  clef: Clef,
): AtSong {
  const noteNames = getScaleNotesInRange(
    KeySignature.C_MAJOR_A_MINOR,
    lowNote,
    highNote,
  )
  const quarters = chunk(noteNames, 4)
  const bars = quarters.map((bar): AtBar => {
    const atNotes = bar.map(
      (note): AtNote => ({
        duration: Duration.QUARTER,
        note,
        type: 'note',
        label: Note.pitchClass(note),
      }),
    )
    return { items: atNotes }
  })
  return {
    tempo: 120,
    tracks: [
      {
        bars,
        clef,
        staff: 'score',
        instrument: 'AcousticGuitarSteel',
        keySignature: KeySignature.C_MAJOR_A_MINOR,
        name: '',
        shortName: '',
        timeSignature: { bottom: 4, top: 4 },
        tuning: DEFAULT_TUNING,
      },
    ],
  }
}
