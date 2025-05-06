import {
  AtBar,
  AtChord,
  AtItem,
  AtNote,
  AtRest,
  AtSong,
  AtTrack,
} from './alphaTex'
import { isNil, isNotNil } from '../common/utils'
import { asFrettedNote, asNumber, hasDot } from './utils'
import { isMobile } from '../components/useIsMobile'

// Reference: https://alphatab.net/docs/alphatex/introduction

function getSongMetaData(song: AtSong): string[] {
  const extra = isMobile()
    ? []
    : [
        isNil(song.title) ? undefined : `\\title "${song.title}"`,
        isNil(song.subtitle) ? undefined : `\\subtitle "${song.subtitle}"`,
        isNil(song.artist) ? undefined : `\\artist "${song.artist}"`,
        isNil(song.album) ? undefined : `\\album "${song.album}"`,
        isNil(song.words) ? undefined : `\\words "${song.words}"`,
        isNil(song.music) ? undefined : `\\music "${song.music}"`,
        isNil(song.copyright) ? undefined : `\\copyright "${song.copyright}"`,
      ]
  const pieces = [...extra, `\\tempo ${song.tempo ?? 120}`]
  return pieces.filter(isNotNil)
}

function getTrackMetadata(track: AtTrack): string[] {
  const pieces = [
    `\\track "${track.name}" "${track.shortName}"`,
    isNil(track.staff) || track.staff === 'both'
      ? undefined
      : `\\staff{${track.staff}}`,
    track.instrument ? `\\instrument "${track.instrument}"` : undefined,
    `\\tuning ${track.tuning.join(' ')}`,
  ]
  return pieces.filter(isNotNil)
}

function getEffects(effects: (string | undefined)[]): string | undefined {
  const nonNull = effects.filter(isNotNil)
  if (nonNull.length === 0) {
    return undefined
  }
  return ` {${effects.join(' ')}}`
}

function getNote({ duration, note, label }: AtNote, tuning: string[]): string {
  const { fret, string } = asFrettedNote(note, tuning)
  const atDuration = asNumber(duration)
  const effects = getEffects([
    hasDot(duration) ? 'd' : undefined,
    isNil(label) ? undefined : `ch "${label}"`,
  ])

  return `${fret}.${string}.${atDuration}${isNil(effects) ? '' : effects}`
}

function getRest({ duration, label }: AtRest): string {
  const effects = getEffects([
    hasDot(duration) ? 'd' : undefined,
    isNil(label) ? undefined : `ch "${label}"`,
  ])
  return `r.${asNumber(duration)}${isNil(effects) ? '' : effects}`
}

function getChord(chord: AtChord, tuning: string[]): string {
  const notes = chord.notes.map((note) => {
    const { fret, string } = asFrettedNote(note, tuning)
    return `${fret}.${string}`
  })
  const effects = getEffects([
    hasDot(chord.duration) ? 'd' : undefined,
    isNil(chord.label) ? undefined : `ch "${chord.label}"`,
    // `bd 50`,
  ])
  const duration = asNumber(chord.duration)
  return `(${notes.join(' ')}).${duration}${isNil(effects) ? '' : effects}`
}

function getItem(item: AtItem, tuning: string[]): string {
  switch (item.type) {
    case 'note':
      return getNote(item, tuning)
    case 'rest':
      return getRest(item)
    case 'chord':
      return getChord(item, tuning)
  }
}

function getBar(bar: AtBar, tuning: string[]): string {
  return bar.items.map((note) => getItem(note, tuning)).join(' ')
}

function getBars(model: AtTrack): string[] {
  if (model.bars.length === 0) {
    return []
  }
  const firstBarMeta = [
    `\\clef ${model.clef}`,
    `\\ts ${model.timeSignature.upper} ${model.timeSignature.lower}`,
    `\\ks ${model.keySignature}`,
  ].join(' ')
  const [first, ...rest] = model.bars
  const bars = [
    `${firstBarMeta} ${getBar(first!, model.tuning)}`,
    ...rest.map((bar) => getBar(bar, model.tuning)),
  ]
  return bars
}

function getTrack(model: AtTrack): string {
  const metadata = getTrackMetadata(model).join(' ')
  const lines = [metadata, getBars(model).join(' | ')]
  return lines.join('\n')
}

export function toAlphaTex(model: AtSong): string {
  const lines: string[] = [
    getSongMetaData(model).join(' '),
    '.',
    ...model.tracks.map((track) => `${getTrack(track)}`),
  ]
  return lines.join('\n')
}
