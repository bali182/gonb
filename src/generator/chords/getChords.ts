import { i18n } from 'i18next'
import { AtBar, AtChord } from '../../alphaTex/alphaTex'
import { Duration } from '../../common/duration'
import { beautifyChord } from '../../common/utils'
import { GeneratorConfig, Language } from '../../state/types'
import { ProgressionChord } from '../progression/types'

export function getChords(
  config: GeneratorConfig,
  progression: ProgressionChord[],
  i18n: i18n,
): AtBar[] {
  return progression.map((chord) => {
    const chordNotes = config.useSeventhChords ? chord.seventh : chord.triad
    const chordName = config.useSeventhChords
      ? chord.seventhName
      : chord.triadName

    const atChord: AtChord = {
      type: 'chord',
      duration: Duration.WHOLE,
      notes: chordNotes.map((note) => `${note}4`),
      label: config.showChordSymbols
        ? beautifyChord(chordName, i18n.language as Language)
        : undefined,
    }

    return { items: [atChord] }
  })
}
