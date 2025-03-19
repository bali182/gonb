import { createContext } from 'react'
import { noop } from '../common/utils'

export type AppContextType = {
  isPlaying: boolean
  isLooping: boolean
  isLoading: boolean
  isCountingIn: boolean
  instrumentVolume: number
  metronomeVolume: number
  chordsVolume: number
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
}

export const AppContext = createContext<AppContextType>({
  isPlaying: false,
  isLooping: false,
  isLoading: false,
  isCountingIn: false,
  instrumentVolume: 0,
  metronomeVolume: 0,
  chordsVolume: 0,
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
})
