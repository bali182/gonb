import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { Language } from './types'

export const languageSlice = createSlice({
  name: 'language',
  initialState: initialState.language,
  reducers: {
    setLanguage: (_, { payload }: PayloadAction<Language | null>) => payload,
  },
})
