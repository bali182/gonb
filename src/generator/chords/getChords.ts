import { AtBar, AtChord } from '../../alphaTex/alphaTex'
import { Duration } from '../../common/common'
import { GeneratorConfig2 } from '../../state/types'
import { ProgressionChord } from '../progression/types'

export function getChords(
  _config: GeneratorConfig2,
  progression: ProgressionChord[],
): AtBar[] {
  return progression.map((chord) => {
    const atChord: AtChord = {
      type: 'chord',
      duration: Duration.WHOLE,
      notes: chord.triad.map((note) => `${note}5`),
      label: `${chord.triadName}`,
    }
    return { items: [atChord] }
  })
}
