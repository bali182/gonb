import { isNil, isNotNil } from '../../common/utils'
import { GeneratorConfig2 } from '../../state/types'
import { deafultTemplates } from './templates'
import {
  ChordsHarmonicFunction,
  ProgressionChord,
  SecondaryDominants,
} from './types'

export function getPossibleTemplates(
  config: GeneratorConfig2,
  chords: ProgressionChord[],
  secondaryDominants: SecondaryDominants,
  templates: ChordsHarmonicFunction[][] = deafultTemplates,
): ChordsHarmonicFunction[][] {
  const output: ChordsHarmonicFunction[][] = []
  templateLoop: for (let t = 0; t < templates.length; t += 1) {
    const template = templates[t]!
    if (template.length > config.bars) {
      continue
    }
    for (let f = 0; f < template.length; f += 1) {
      const fn = template[f]
      if (fn === 'SecondaryDominant') {
        const nextFn = template[f + 1]
        if (isNil(nextFn)) {
          throw new Error(`Secondary dominant cannot be the last chord`)
        }
        const cs = chords.filter((c) => c.harmonicFunction === nextFn)
        const sds = cs.map((c) => secondaryDominants.get(c)).filter(isNotNil)
        if (sds.length === 0) {
          continue templateLoop
        }
      } else {
        if (chords.every((c) => c.harmonicFunction !== fn)) {
          continue templateLoop
        }
      }
    }
    output.push(template)
  }

  return output
}
