import { AtTrack } from '../alphaTex/alphaTex'
import { Clef } from '../model/common'
import { toAlphaTex } from '../alphaTex/toAlphaTex'
import { generatorSlice } from './generatorSlice'
import { melodySlice } from './melodySlice'
import { createSelector } from '@reduxjs/toolkit'
import { DEFAULT_TUNING } from '../alphaTex/constants'

export const trackSelector = createSelector(
  [generatorSlice.selectSlice, melodySlice.selectSlice],
  ({ clef, keySignature, bpm }, bars): AtTrack => {
    return {
      clef,
      keySignature,
      bars,
      bpm,
      staff: 'score',
      instrument: clef === Clef.BASS ? 'AcousticBass' : 'AcousticGuitarSteel',
      name: 'A Random Melody',
      shortName: 'ex',
      timeSignature: { bottom: 4, top: 4 },
      tuning: DEFAULT_TUNING,
    }
  },
)

export const alphaTexSelector = createSelector([trackSelector], (track) => {
  const alphaTex = toAlphaTex({
    title: `A Random Melody`,
    music: 'Balázs Édes',
    tempo: track.bpm ?? 120,
    tracks: [track],
  })
  console.log(alphaTex)
  return alphaTex
})
