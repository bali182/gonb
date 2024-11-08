import { AtBar, AtNote, AtSong } from '../../alphaTex/alphaTex'
import { KeySignature } from '../../common/keySignature'
import { Clef } from '../../common/clef'
import { Duration } from '../../common/duration'
import { beautifyNote, chunk, getScaleNotesInRange } from '../../common/utils'
import { DEFAULT_TUNING } from '../../alphaTex/constants'
import { pitchClass } from '@tonaljs/note'
import { useTranslation } from 'react-i18next'
import { Language } from '../../state/types'
import { useMemo } from 'react'

export function useHelpTrack(
  lowNote: string,
  highNote: string,
  clef: Clef,
): AtSong {
  const { i18n } = useTranslation()
  const language = i18n.language as Language
  return useMemo(() => {
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
          label: beautifyNote(pitchClass(note), language),
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
          timeSignature: { lower: 4, upper: 4 },
          tuning: DEFAULT_TUNING,
        },
      ],
    }
  }, [language])
}
