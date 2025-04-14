import { useDispatch, useSelector } from 'react-redux'
import { AppContextType } from './AppContext'
import { generatorSlice } from '../state/generatorSlice'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { useAlphaTab } from '../alphaTex/useAlphaTab'
import { AppDispatch } from '../state/store'
import { Language, PlayerConfig } from '../state/types'
import { useCallback, useEffect, useState } from 'react'
import { languageSlice } from '../state/languageSlice'
import { isNil } from '../common/utils'
import { useTranslation } from 'react-i18next'
import { fromUrl } from '../url/url'

export function useCreateAppContext(): AppContextType {
  const { i18n } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const tex = useSelector(alphaTexSelector)
  const playerConfig = useSelector(playerSlice.selectSlice)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [isHelpOpen, setHelpOpen] = useState(false)
  const storedLanguage = useSelector(languageSlice.selectSlice)
  const language = (
    isNil(storedLanguage) ? i18n.language : storedLanguage
  ) as Language

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
    (chordsVolume: number) => setPlayerConfig({ chordsVolume }),
    [setPlayerConfig],
  )

  const setMetronomeVolume = useCallback(
    (metronomeVolume: number) => setPlayerConfig({ metronomeVolume }),
    [setPlayerConfig],
  )

  const setLanguage = useCallback((language: Language) => {
    dispatch(languageSlice.actions.setLanguage(language))
  }, [])

  // Update i18n language, when stored language changes.
  useEffect(() => {
    if (!isNil(storedLanguage)) {
      i18n.changeLanguage(storedLanguage, () => regenerate())
    }
  }, [storedLanguage])

  // Try to set config, when it is present in the url.
  useEffect(() => {
    const configFromUrl = fromUrl(window.location.href)
    if (!isNil(configFromUrl)) {
      dispatch(generatorSlice.actions.setGeneratorConfig(configFromUrl))
    }
    const withoutQuery = window.location.origin + window.location.pathname
    window.history.replaceState({}, document.title, withoutQuery)
  }, [])

  return {
    instrumentVolume: playerConfig.instrumentVolume,
    metronomeVolume: playerConfig.metronomeVolume,
    chordsVolume: playerConfig.chordsVolume,
    isLooping: playerConfig.isLooping,
    isCountingIn: playerConfig.isCountingIn,
    isLoading,
    isPlaying,
    isHelpOpen,
    isSettingsOpen,
    language,
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
    setSettingsOpen,
    setHelpOpen,
    setLanguage,
  }
}
