import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { PlayerConfig } from './types'

export const playerSlice = createSlice({
  name: 'player',
  initialState: initialState.player,
  reducers: {
    setPlayerConfig: (_state, { payload }: PayloadAction<PlayerConfig>) =>
      payload,
  },
})
