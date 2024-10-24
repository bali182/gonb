import { GeneratorConfig2 } from '../state/types'
import { getChords } from './chords/getChords'
import { getMelody } from './melody/getMelody'
import { MelodyBarInput } from './melody/types'
import { getProgression } from './progression/getProgression'
import { getRhythm } from './rhythm/getRhythm'

export function getSong(config: GeneratorConfig2): void {
  const progression = getProgression(config)
  const chords = getChords(config, progression)
  const rhythm = getRhythm(config)
  const melodyInput = progression.map(
    (chord, i): MelodyBarInput => ({ chord, rhythm: rhythm[i]! }),
  )
  const melody = getMelody(config, melodyInput)

  console.log('progression', progression)
  console.log('rhythm', rhythm)
  console.log('melody', melody)
  console.log('chords', chords)
}
