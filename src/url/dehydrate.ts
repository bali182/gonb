import { octave, pitchClass } from '@tonaljs/note'
import { DurationConfig, DurationData, GeneratorConfig } from '../state/types'
import { UrlDurationConfig, UrlGeneratorConfig, UrlNotes } from './types'
import { isNil } from '../common/utils'
import { Duration } from '../common/duration'

function dehydrateNotes(notes: string[]): UrlNotes {
  const output: UrlNotes = {}
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

function dehydrateDurations(durations: DurationConfig): UrlDurationConfig {
  const kvPairs = Object.entries(durations) as [Duration, DurationData][]
  const output: UrlDurationConfig = {}
  for (const [duration, data] of kvPairs) {
    if (!isNil(data)) {
      output[duration] = { c: data.cluster, f: data.frequency }
    }
  }
  return output
}

export function dehydrate(c: GeneratorConfig): UrlGeneratorConfig {
  return {
    b: c.bars,
    t: c.tempo,
    c: c.clef,
    ts: {
      u: c.timeSignature.upper,
      l: c.timeSignature.lower,
    },
    ks: c.keySignature,
    scst: c.showChordsStaff,
    scsy: c.showChordSymbols,
    usc: c.useSeventhChords,
    n: dehydrateNotes(c.notes),
    nd: dehydrateDurations(c.noteDurations),
    rd: dehydrateDurations(c.restDurations),
  }
}
