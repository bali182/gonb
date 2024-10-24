import { AtBar, AtChord } from '../../alphaTex/alphaTex'
import { Duration } from '../../common/duration'
import { GeneratorConfig } from '../../state/types'
import { ProgressionChord } from '../progression/types'

export function getChords(
  _config: GeneratorConfig,
  progression: ProgressionChord[],
): AtBar[] {
  return progression.map((chord) => {
    const atChord: AtChord = {
      type: 'chord',
      duration: Duration.WHOLE,
      notes: chord.triad.map((note) => `${note}4`),
      label: `${chord.triadName}`,
    }
    return { items: [atChord] }
  })
}
