import { GeneratorConfig2 } from '../state/types'
import { getChordProgression } from './progression/getChordProgression'
import { getMelodyRhythm } from './rhythm/getMelodyRhythm'

export function getRandomContent(config: GeneratorConfig2): void {
  console.log('chords', getChordProgression(config))
  console.log('rhythm', getMelodyRhythm(config))
}
