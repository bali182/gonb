import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { AtBar } from '../model/alphaTex'
import { generatorSlice } from './generatorSlice'
import { getRandomMelody } from '../model/getRandomMelody'
import { displaySlice } from './displaySlice'

export type SetMelodyPayload = AtBar[]

export const melodySlice = createSlice({
  name: 'melody',
  initialState: initialState.melody,
  reducers: {
    updateDisplayConfig: (_, { payload }: PayloadAction<SetMelodyPayload>) =>
      payload,
  },
  extraReducers: (builder) => {
    builder.addCase(
      generatorSlice.actions.setGeneratorConfig,
      (_state, { payload }) => getRandomMelody(payload),
    )

    builder.addCase(
      displaySlice.actions.setDisplayConfig,
      (state, { payload: { showNoteNames } }) => {
        for (const bar of state) {
          for (const item of bar.items) {
            if (item.type === 'note') {
              item.label = showNoteNames ? item.note : undefined
            }
          }
        }
      },
    )
  },
  selectors: {
    getMelody: (state) => state,
  },
})
