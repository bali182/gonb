import { configureStore, Middleware } from '@reduxjs/toolkit'
import { AppState } from './types'
import { playerSlice } from './playerSlice'
import { initialState } from './initialState'
import { generatorSlice } from './generatorSlice'
import { pagesSlice } from './pagesSlice'

const STATE_STORAGE_KEY = 'sheet-app-data'

function saveState(state: AppState) {
  try {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Could not save state', e)
  }
}

// TODO validate schema
function loadState(): AppState {
  try {
    const serializedState = localStorage.getItem(STATE_STORAGE_KEY)
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (e) {
    console.error('Could not load state', e)
    return initialState
  }
}

const saveStateMiddleware: Middleware<{}, AppState> =
  (store) => (next) => (action) => {
    const result = next(action)
    saveState(store.getState())
    return result
  }

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    pages: pagesSlice.reducer,
    generator: generatorSlice.reducer,
  },
  middleware: (deafult) => deafult().concat(saveStateMiddleware),
  preloadedState: loadState(),
})

export type AppDispatch = typeof store.dispatch
