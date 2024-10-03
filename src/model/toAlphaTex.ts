import { distance, Interval } from 'tonal'
import { AtBar, AtItem, AtNote, AtRest, Track } from './alphaTex'
import { isNil } from './utils'

// Reference: https://alphatab.net/docs/alphatex/introduction

function getMetaData(model: Track): string[] {
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

function withBrush(content: string): string {
  return `${content} {bd 120}`
}

function getNote(note: AtNote): string {
  const string = 1
  const fret = Interval.semitones(distance('C0', `${note.name}${note.octave}`))
  return withLabel(`${fret}.${string}.${note.duration}`, note.label)
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

function getBars(model: Track): string[] {
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

export function toAlphaTex(model: Track): string {
  const metadata = getMetaData(model).join(' ')
  const lines = [metadata, getBars(model).join('\n|')]
  const tex = lines.join('\n')
  console.log(tex)
  return tex
}
