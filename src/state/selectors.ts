import { AtTrack } from '../model/alphaTex'
import { Clef } from '../model/common'
import { toAlphaTex } from '../model/toAlphaTex'
import { generatorSlice } from './generatorSlice'
import { melodySlice } from './melodySlice'
import { createSelector } from '@reduxjs/toolkit'

export const trackSelector = createSelector(
  [generatorSlice.selectSlice, melodySlice.selectSlice],
  ({ clef, keySignature, bpm }, bars): AtTrack => {
    return {
      clef,
      keySignature,
      bars,
      bpm,
      instrument: clef === Clef.BASS ? 'AcousticBass' : 'AcousticGuitarSteel',
      name: 'A Random Melody',
      shortName: 'ex',
      timeSignature: { bottom: 4, top: 4 },
    }
  },
)

export const alphaTexSelector = createSelector([trackSelector], (track) => {
  return toAlphaTex(track)
})
