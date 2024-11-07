import { GeneratorConfig } from '../state/types'
import { isNil } from '../common/utils'
import LZString from 'lz-string'
import { dehydrate } from './dehydrate'
import { rehydrate } from './rehydrate'

const URL_KEY = 'c'

function encodeConfig(c: GeneratorConfig): string {
  const jsonString = JSON.stringify(dehydrate(c))
  const compressed = LZString.compressToBase64(jsonString)
  return compressed.replace(/\+/g, '-').replace(/\//g, '_')
}

function decodeConfig(encoded: string): GeneratorConfig {
  const compressed = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const jsonString = LZString.decompressFromBase64(compressed)
  return rehydrate(JSON.parse(jsonString!))
}

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
