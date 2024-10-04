import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { GeneratorConfig } from './types'

export type UpdateGeneratorConfigPayload = GeneratorConfig

export const generatorSlice = createSlice({
  name: 'generator',
  initialState: initialState.generator,
  reducers: {
    setGeneratorConfig: (
      _,
      { payload }: PayloadAction<UpdateGeneratorConfigPayload>,
    ) => payload,
  },
  selectors: {
    getGeneratorConfig: (state) => state,
  },
})
