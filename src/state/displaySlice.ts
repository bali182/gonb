import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { DisplayConfig } from './types'

export type UpdateDisplayConfigPayload = DisplayConfig

export const displaySlice = createSlice({
  name: 'display',
  initialState: initialState.display,
  reducers: {
    setDisplayConfig: (
      _state,
      { payload }: PayloadAction<UpdateDisplayConfigPayload>,
    ) => payload,
  },
  selectors: {
    getDisplayConfig: (state) => state,
  },
})
