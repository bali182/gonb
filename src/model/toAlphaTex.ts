import { distance, Interval } from 'tonal'
import { AtBar, AtItem, AtNote, AtRest, AtTrack } from './alphaTex'
import { isNil } from './utils'
import { Duration } from './common'

// Reference: https://alphatab.net/docs/alphatex/introduction

function getMetaData(model: AtTrack): string[] {
  return [
    `\\track "${model.name}" "${model.shortName}"`,
    '\\staff{score}',
    model.instrument ? `\\instrument "${model.instrument}"` : undefined,
    `\\tuning ${['C0'].join(' ')}`,
  ].filter((data): data is string => data !== undefined)
}

function withLabel(content: string, label: string | undefined): string {
  const parts = [content, isNil(label) ? undefined : `{ch "${label}"}`]
  return parts.filter((part) => part !== undefined).join(' ')
}

// Chord brush
function withBrush(content: string): string {
  return `${content} {bd 120}`
}

function getDurationNumber(duration: Duration): number {
  switch (duration) {
    case Duration.WHOLE:
      return 1
    case Duration.HALF:
    case Duration.DOTTED_HALF:
      return 2
    case Duration.QUARTER:
    case Duration.DOTTED_QUARTER:
      return 4
    case Duration.EIGHT:
    case Duration.DOTTED_EIGHT:
      return 8
    case Duration.SIXTEENTH:
    case Duration.DOTTED_SIXTEENTH:
      return 16
  }
}

function getDurationDot(duration: Duration): string | undefined {
  switch (duration) {
    case Duration.DOTTED_HALF:
    case Duration.DOTTED_QUARTER:
    case Duration.DOTTED_EIGHT:
    case Duration.DOTTED_SIXTEENTH:
      return '{d}'
    case Duration.WHOLE:
    case Duration.HALF:
    case Duration.QUARTER:
    case Duration.EIGHT:
    case Duration.SIXTEENTH:
      return undefined
  }
}

function getNote({ duration, note, label }: AtNote): string {
  const string = 1
  const fret = Interval.semitones(distance('C0', note))
  const durationMarkup = `${getDurationNumber(duration)}${
    getDurationDot(duration) ?? ''
  }`
  return withLabel(`${fret}.${string}.${durationMarkup}`, label)
}

function getRest(rest: AtRest): string {
  return withLabel(`r.${rest.duration}`, rest.label)
}

function getItem(note: AtItem): string {
  switch (note.type) {
    case 'note':
      return getNote(note)
    case 'rest':
      return getRest(note)
  }
}

function getBar(bar: AtBar): string {
  return bar.items.map((note) => getItem(note)).join(' ')
}

function getBars(model: AtTrack): string[] {
  if (model.bars.length === 0) {
    return []
  }
  const firstBarMeta = [
    `\\clef ${model.clef}`,
    `\\ts ${model.timeSignature.top} ${model.timeSignature.bottom}`,
    `\\ks ${model.keySignature}`,
  ].join(' ')
  const [first, ...rest] = model.bars
  const bars = [
    `${firstBarMeta} ${getBar(first!)}`,
    ...rest.map((bar) => getBar(bar)),
  ]
  return bars
}

export function toAlphaTex(model: AtTrack): string {
  const metadata = getMetaData(model).join(' ')
  const lines = [metadata, getBars(model).join('\n|')]
  const tex = lines.join('\n')
  console.log(tex)
  return tex
}
