import { AtBar } from '../../alphaTex/alphaTex'
import { GeneratorConfig2 } from '../../state/types'
import { getMelodyBar } from './getMelodyBar'
import { MelodyBarInput } from './types'

export function getMelody(
  config: GeneratorConfig2,
  input: MelodyBarInput[],
): AtBar[] {
  const bars: AtBar[] = []
  for (let i = 0; i < input.length; i += 1) {
    const bar = getMelodyBar(config, input, bars, i)
    bars.push(bar)
  }
  return bars
}
