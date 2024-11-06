import { Duration } from '../common/duration'
import { isNil, midiComparator } from '../common/utils'
import { DurationConfig, GeneratorConfig } from '../state/types'
import { UrlDurationConfig, UrlDurationData, UrlGeneratorConfig } from './types'

function rehydrateDurations(durations: UrlDurationConfig): DurationConfig {
  const kvPairs = Object.entries(durations) as [Duration, UrlDurationData][]
  const output: DurationConfig = {}
  for (const [duration, data] of kvPairs) {
    if (!isNil(data)) {
      output[duration] = { cluster: data.c, frequency: data.f }
    }
  }
  return output
}

function rehydrateNotes(notes: Record<string, number[]>): string[] {
  const output: string[] = []
  for (const [note, octaves] of Object.entries(notes)) {
    for (const oct of octaves) {
      const fullNote = `${note}${oct}`
      output.push(fullNote)
    }
  }
  return output.sort(midiComparator)
}

export function rehydrate(c: UrlGeneratorConfig): GeneratorConfig {
  return {
    bars: c.b,
    tempo: c.t,
    clef: c.c,
    keySignature: c.ks,
    showChordsStaff: c.scst,
    showChordSymbols: c.scsy,
    useSeventhChords: c.usc,
    timeStamp: Date.now(),
    noteDurations: rehydrateDurations(c.nd),
    restDurations: rehydrateDurations(c.rd),
    notes: rehydrateNotes(c.n),
    timeSignature: {
      lower: c.ts.l,
      upper: c.ts.u,
    },
  }
}
