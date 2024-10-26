import { AtBar, AtChord } from '../../alphaTex/alphaTex'
import { Duration } from '../../common/duration'
import { GeneratorConfig } from '../../state/types'
import { ProgressionChord } from '../progression/types'

export function getChords(
  config: GeneratorConfig,
  progression: ProgressionChord[],
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
      label: `${chordName}`,
    }

    return { items: [atChord] }
  })
}
