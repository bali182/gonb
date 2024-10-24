import { AtSong, AtTrack } from '../alphaTex/alphaTex'
import { DEFAULT_TUNING } from '../alphaTex/constants'
import { Clef } from '../common/clef'
import { GeneratorConfig } from '../state/types'
import { getChords } from './chords/getChords'
import { getMelody } from './melody/getMelody'
import { MelodyBarInput } from './melody/types'
import { getProgression } from './progression/getProgression'
import { getRhythm } from './rhythm/getRhythm'

export function getSong(config: GeneratorConfig): AtSong {
  const progression = getProgression(config)
  const chords = getChords(config, progression)
  const rhythm = getRhythm(config)
  const melodyInput = progression.map(
    (chord, i): MelodyBarInput => ({ chord, rhythm: rhythm[i]! }),
  )
  const melody = getMelody(config, melodyInput)

  const melodyTrack: AtTrack = {
    name: 'melody',
    shortName: 'm',
    bars: melody,
    clef: config.clef,
    instrument: 'AcousticGrandPiano',
    keySignature: config.keySignature,
    timeSignature: {
      top: 4,
      bottom: 4,
    },
    tuning: DEFAULT_TUNING,
    staff: 'score',
  }

  const chordsTrack: AtTrack = {
    bars: chords,
    name: 'chords',
    shortName: 'c',
    clef: Clef.TREBLE,
    instrument: 'AcousticGrandPiano',
    keySignature: config.keySignature,
    timeSignature: {
      top: 4,
      bottom: 4,
    },
    tuning: DEFAULT_TUNING,
    staff: 'score',
  }

  return {
    title: `Melody in ${config.keySignature}`,
    music: 'Édes Balázs',
    tempo: config.bpm,
    tracks: [melodyTrack, chordsTrack],
  }
}
