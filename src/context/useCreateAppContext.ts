import { useDispatch, useSelector } from 'react-redux'
import { AppContextType } from './AppContext'
import { generatorSlice } from '../state/generatorSlice'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { useAlphaTab } from '../alphaTex/useAlphaTab'
import { AppDispatch } from '../state/store'
import { PlayerConfig } from '../state/types'
import { useCallback, useState } from 'react'

export function useCreateAppContext(): AppContextType {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const tex = useSelector(alphaTexSelector)
  const playerConfig = useSelector(playerSlice.selectSlice)

  const [root, setRootDOMElement] = useState<HTMLElement>()
  const [scrollArea, setScrollAreaDOMElement] = useState<HTMLElement>()

  const { api, isLoading, isPlaying } = useAlphaTab({
    tex,
    root,
    scrollArea,
    instrumentVolume: playerConfig.instrumentVolume,
    metronomeVolume: playerConfig.metronomeVolume,
    chordsVolume: playerConfig.chordsVolume,
    isLooping: playerConfig.isLooping,
    isCountingIn: playerConfig.isCountingIn,
    showChordsStaff: generatorConfig.showChordsStaff,
  })

  const playPause = useCallback(() => api?.playPause(), [api])
  const stop = useCallback(() => api?.stop(), [api])

  const regenerate = useCallback(() => {
    dispatch(
      generatorSlice.actions.setGeneratorConfig({
        ...generatorConfig,
        timeStamp: new Date().getTime(),
      }),
    )
  }, [generatorConfig])

  const setPlayerConfig = useCallback(
    (partialConfig: Partial<PlayerConfig>) =>
      dispatch(
        playerSlice.actions.setPlayerConfig({
          ...playerConfig,
          ...partialConfig,
        }),
      ),
    [playerConfig],
  )

  const toggleLooping = useCallback(
    () => setPlayerConfig({ isLooping: !playerConfig.isLooping }),
    [setPlayerConfig],
  )

  const toggleCountIn = useCallback(
    () => setPlayerConfig({ isCountingIn: !playerConfig.isCountingIn }),
    [setPlayerConfig],
  )

  const setInstrumentVolume = useCallback(
    (instrumentVolume: number) => setPlayerConfig({ instrumentVolume }),
    [setPlayerConfig],
  )

  const setChordsVolume = useCallback(
    (metronomeVolume: number) => setPlayerConfig({ metronomeVolume }),
    [setPlayerConfig],
  )

  const setMetronomeVolume = useCallback(
    (chordsVolume: number) => setPlayerConfig({ chordsVolume }),
    [setPlayerConfig],
  )

  return {
    instrumentVolume: playerConfig.instrumentVolume,
    metronomeVolume: playerConfig.metronomeVolume,
    chordsVolume: playerConfig.chordsVolume,
    isLooping: playerConfig.isLooping,
    isCountingIn: playerConfig.isCountingIn,
    isLoading,
    isPlaying,
    stop,
    playPause,
    regenerate,
    toggleLooping,
    toggleCountIn,
    setInstrumentVolume,
    setChordsVolume,
    setMetronomeVolume,
    setRootDOMElement,
    setScrollAreaDOMElement,
  }
}
