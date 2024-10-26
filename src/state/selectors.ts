import { AtSong } from '../alphaTex/alphaTex'
import { generatorSlice } from './generatorSlice'
import { createSelector } from '@reduxjs/toolkit'
import { getSong } from '../generator/getSong'
import { toAlphaTex } from '../alphaTex/toAlphaTex'

export const songSelector = createSelector(
  [generatorSlice.selectSlice],
  (config): AtSong => getSong(config),
)

export const alphaTexSelector = createSelector(
  [songSelector],
  (song): string => {
    const tex = toAlphaTex(song)
    // console.log(tex)
    return tex
  },
)
