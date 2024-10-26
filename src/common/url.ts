import { octave, pitchClass } from '@tonaljs/note'
import { GeneratorConfig } from '../state/types'
import { isNil, midiComparator } from './utils'
import LZString from 'lz-string'

type UrlFriendlyConfigType = Omit<GeneratorConfig, 'notes' | 'timeStamp'> & {
  notes: Record<string, number[]>
}

function dehydrateNotes(notes: string[]): Record<string, number[]> {
  const output: Record<string, number[]> = {}
  for (const note of notes) {
    const pc = pitchClass(note)
    const oct = octave(note)!
    if (isNil(output[pc])) {
      output[pc] = []
    }
    const array = output[pc]!
    array.push(oct)
  }
  return output
}

function hydrateNotes(notes: Record<string, number[]>): string[] {
  const output: string[] = []
  for (const [note, octaves] of Object.entries(notes)) {
    for (const oct of octaves) {
      const fullNote = `${note}${oct}`
      output.push(fullNote)
    }
  }
  return output.sort(midiComparator)
}

function dehydrateGeneratorConfig(c: GeneratorConfig): UrlFriendlyConfigType {
  const { notes, timeStamp, ...rest } = c
  const friendlyNotes = dehydrateNotes(c.notes)
  return { ...rest, notes: friendlyNotes }
}

function hydrateGeneratorConfig(c: UrlFriendlyConfigType): GeneratorConfig {
  const hydratedNotes = hydrateNotes(c.notes)
  return {
    ...c,
    notes: hydratedNotes,
    timeStamp: Date.now(),
  }
}

function encodeConfig(c: GeneratorConfig): string {
  const jsonString = JSON.stringify(dehydrateGeneratorConfig(c))
  const compressed = LZString.compressToBase64(jsonString)
  return compressed.replace(/\+/g, '-').replace(/\//g, '_')
}

function decodeConfig(encoded: string): GeneratorConfig {
  const compressed = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const jsonString = LZString.decompressFromBase64(compressed)
  return hydrateGeneratorConfig(JSON.parse(jsonString!))
}

const URL_KEY = 'c'

export function toUrl(config: GeneratorConfig): string {
  const baseUrl = new URL(window.location.origin + window.location.pathname)
  baseUrl.searchParams.append(URL_KEY, encodeConfig(config))
  return baseUrl.toString()
}

export function fromUrl(url: string): GeneratorConfig | undefined {
  try {
    const currentUrl = new URL(url)
    const encodedConfig = currentUrl.searchParams.get(URL_KEY)
    if (!isNil(encodedConfig) && encodedConfig.length > 0) {
      return decodeConfig(encodedConfig)
    }
  } catch (e) {
    return undefined
  }
  return undefined
}
