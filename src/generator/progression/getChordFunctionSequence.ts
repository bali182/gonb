import { isNil, randomElement } from '../../model/utils'
import { GeneratorConfig2 } from '../../state/types'
import { ChordsHarmonicFunction } from './types'

function groupTemplatesByLength(
  templates: ChordsHarmonicFunction[][],
): Map<number, ChordsHarmonicFunction[][]> {
  const map = new Map<number, ChordsHarmonicFunction[][]>()
  for (const template of templates) {
    if (!map.has(template.length)) {
      map.set(template.length, [])
    }
    const array = map.get(template.length)!
    array.push(template)
  }
  return map
}

export function getChordFunctionSequence(
  config: GeneratorConfig2,
  templates: ChordsHarmonicFunction[][],
): ChordsHarmonicFunction[] {
  if (config.bars === 0) {
    return []
  }
  if (templates.length === 0) {
    throw new Error(`No templates!`)
  }
  const groups = groupTemplatesByLength(templates)
  const possibleLengths = Array.from(groups.keys()).sort((a, b) => b - a)
  const hasTonic = templates.some(
    (template) => template.length === 1 && template[0] === 'Tonic',
  )
  const desiredLength = hasTonic ? config.bars - 1 : config.bars
  const output: ChordsHarmonicFunction[] = []

  while (output.length < desiredLength) {
    const tplLength = possibleLengths.find(
      (length) => output.length + length <= desiredLength,
    )
    if (isNil(tplLength)) {
      throw new Error('No matching length')
    }
    const templates = groups.get(tplLength) ?? []
    const template = randomElement(templates)
    if (isNil(template)) {
      throw new Error('Template was null or undefined')
    }
    output.push(...template)
  }

  if (hasTonic) {
    output.push('Tonic')
  }

  return output
}
