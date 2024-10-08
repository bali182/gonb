import { Note } from 'tonal'
import { AtBar, AtNote, AtTrack } from '../../model/alphaTex'
import { Clef, Duration, KeySignature } from '../../model/common'
import { chunk, getScaleNotesInRange } from '../../model/utils'

export function getHelpTrack(
  lowNote: string,
  highNote: string,
  clef: Clef,
): AtTrack {
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
    bars,
    clef,
    instrument: 'AcousticGuitarSteel',
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    name: '',
    shortName: '',
    timeSignature: { bottom: 4, top: 4 },
  }
}
