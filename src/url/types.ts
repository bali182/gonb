import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { DurationFrequency } from '../common/durationFrequency'
import { KeySignature } from '../common/keySignature'

export type UrlGeneratorConfig = {
  b: number
  t: number
  c: Clef
  ts: UrlTimeSignature
  ks: KeySignature
  scst: boolean
  scsy: boolean
  usc: boolean
  n: UrlNotes
  nd: UrlDurationConfig
  rd: UrlDurationConfig
}

export type UrlNotes = Record<string, number[]>

export type UrlTimeSignature = {
  u: number
  l: number
}

export type UrlDurationConfig = Partial<Record<Duration, UrlDurationData>>

export type UrlDurationData = {
  f: DurationFrequency
  c: number
}
