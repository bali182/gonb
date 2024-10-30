import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { HelpPageId } from '../components/help/HelpPageId'
import { SettingsPageId } from '../components/settings/SettingsPageId'

export const pagesSlice = createSlice({
  name: 'pages',
  initialState: initialState.pages,
  reducers: {
    setHelpPage: (state, { payload }: PayloadAction<HelpPageId>) => ({
      ...state,
      help: payload,
    }),
    setSettingsPage: (state, { payload }: PayloadAction<SettingsPageId>) => ({
      ...state,
      settings: payload,
    }),
  },
  selectors: {
    selectHelpPage: (state) => state.help,
    selectSettingsPage: (state) => state.settings,
  },
})
