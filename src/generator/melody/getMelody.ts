import { i18n } from 'i18next'
import { AtBar } from '../../alphaTex/alphaTex'
import { GeneratorConfig } from '../../state/types'
import { getMelodyBar } from './getMelodyBar'
import { MelodyBarInput } from './types'

export function getMelody(
  config: GeneratorConfig,
  input: MelodyBarInput[],
  i18n: i18n,
): AtBar[] {
  const bars: AtBar[] = []
  for (let i = 0; i < input.length; i += 1) {
    const bar = getMelodyBar(config, input, bars, i, i18n)
    bars.push(bar)
  }
  return bars
}
