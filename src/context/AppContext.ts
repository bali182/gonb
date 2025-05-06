import { createContext } from 'react'
import { noop } from '../common/utils'
import { Language } from '../state/types'

export type AppContextType = {
  isPlaying: boolean
  isLooping: boolean
  isLoading: boolean
  isSettingsOpen: boolean
  isHelpOpen: boolean
  isCountingIn: boolean
  instrumentVolume: number
  metronomeVolume: number
  chordsVolume: number
  language: Language
  setRootDOMElement: (e: HTMLElement | undefined) => void
  setScrollAreaDOMElement: (e: HTMLElement | undefined) => void
  stop: () => void
  regenerate: () => void
  playPause: () => void
  toggleLooping: () => void
  toggleCountIn: () => void
  setInstrumentVolume: (volume: number) => void
  setChordsVolume: (volume: number) => void
  setMetronomeVolume: (volume: number) => void
  setSettingsOpen: (open: boolean) => void
  setHelpOpen: (open: boolean) => void
  setLanguage: (language: Language) => void
}

export const AppContext = createContext<AppContextType>({
  isPlaying: false,
  isLooping: false,
  isLoading: false,
  isCountingIn: false,
  instrumentVolume: 0,
  metronomeVolume: 0,
  chordsVolume: 0,
  isSettingsOpen: false,
  isHelpOpen: false,
  language: undefined!,
  setRootDOMElement: noop,
  setScrollAreaDOMElement: noop,
  stop: noop,
  regenerate: noop,
  playPause: noop,
  toggleLooping: noop,
  toggleCountIn: noop,
  setInstrumentVolume: noop,
  setChordsVolume: noop,
  setMetronomeVolume: noop,
  setSettingsOpen: noop,
  setHelpOpen: noop,
  setLanguage: noop,
})
