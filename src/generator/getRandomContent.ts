import { GeneratorConfig2 } from '../state/types'
import { getMelody } from './melody/getMelody'
import { MelodyBarInput } from './melody/types'
import { getChordProgression } from './progression/getChordProgression'
import { getMelodyRhythm } from './rhythm/getMelodyRhythm'

export function getRandomContent(config: GeneratorConfig2): void {
  const chords = getChordProgression(config)
  const rhythm = getMelodyRhythm(config)
  const melodyInput = chords.map(
    (chord, i): MelodyBarInput => ({ chord, rhythm: rhythm[i]! }),
  )
  const melody = getMelody(config, melodyInput)

  console.log('chords', chords)
  console.log('rhythm', rhythm)
  console.log('melody', melody)
}
