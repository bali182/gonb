import { AlphaTabApi, json, synth } from '@coderline/alphatab'
import { useEffect, useState } from 'react'
import { alphaTabConfig } from './alphaTabConfig'
import { isNil, noop } from '../common/utils'

export type UseAlphaTabResult = {
  api: AlphaTabApi | undefined
  isLoading: boolean
  isPlaying: boolean
}

export type UseAlphaTabConfig = {
  tex: string
  root: HTMLElement | undefined
  scrollArea: HTMLElement | undefined
  instrumentVolume?: number
  chordsVolume?: number
  metronomeVolume?: number
  showChordsStaff?: boolean
  isLooping?: boolean
  isCountingIn?: boolean
  player?: Partial<json.PlayerSettingsJson>
}

export function useAlphaTab({
  tex,
  root,
  player,
  scrollArea,
  isLooping,
  isCountingIn,
  instrumentVolume,
  chordsVolume,
  showChordsStaff,
  metronomeVolume,
}: UseAlphaTabConfig): UseAlphaTabResult {
  const [api, setApi] = useState<AlphaTabApi>()
  const [isLoading, setLoading] = useState(false)
  const [isPlaying, setPlaying] = useState(false)

  useEffect(() => {
    if (!isNil(api)) {
      api.tex(tex, showChordsStaff ? [0, 1] : [0])
    }
  }, [api, tex])

  useEffect(() => {
    if (!isNil(api) && !isNil(isLooping)) {
      api.isLooping = isLooping
    }
  }, [api, isLooping])

  useEffect(() => {
    if (!isNil(api)) {
      const onRenderStarted = () => setLoading(true)
      const onRenderFinished = () => setLoading(false)
      api.renderStarted.on(onRenderStarted)
      api.renderFinished.on(onRenderFinished)
      return () => {
        api.renderStarted.off(onRenderStarted)
        api.renderFinished.off(onRenderFinished)
      }
    }
    return noop
  }, [api, setLoading])

  useEffect(() => {
    if (!isNil(api)) {
      const onPlayerStateChanged = ({
        state,
      }: synth.PlayerStateChangedEventArgs): void => {
        const isPlaying = state === synth.PlayerState.Playing
        setPlaying(isPlaying)

        // This seems to be the best place to set these, otherwise main
        // track volume seems to be lost.
        if (isPlaying) {
          setTrackVolume(api, 0, instrumentVolume)
          setTrackVolume(api, 1, chordsVolume)
          setMetronomeVolume(api, metronomeVolume, isCountingIn)
        }
      }
      api.playerStateChanged.on(onPlayerStateChanged)
      return () => api.playerStateChanged.off(onPlayerStateChanged)
    }
    return noop
  }, [
    api,
    instrumentVolume,
    chordsVolume,
    metronomeVolume,
    isCountingIn,
    setPlaying,
  ])

  useTrackVolume(api, 0, instrumentVolume)
  useTrackVolume(api, 1, chordsVolume)
  useMetronomeVolume(api, metronomeVolume, isCountingIn)

  useEffect(() => {
    if (!isNil(root) && !isNil(scrollArea)) {
      const _api = new AlphaTabApi(root, alphaTabConfig(scrollArea, player))

      _api.render()
      if (!isNil(isLooping)) {
        _api.isLooping = isLooping
      }
      if (!isNil(metronomeVolume)) {
        _api.metronomeVolume = metronomeVolume
        if (isCountingIn) {
          _api.countInVolume = metronomeVolume
        }
      }

      setApi(_api)
      return () => _api.destroy()
    }
    return noop
  }, [root, scrollArea])

  return {
    api,
    isLoading,
    isPlaying,
  }
}

function useTrackVolume(
  api: AlphaTabApi | undefined,
  trackIndex: number,
  volume: number | undefined,
): void {
  useEffect(() => {
    setTrackVolume(api, trackIndex, volume)
  }, [api, trackIndex, volume])
}

function useMetronomeVolume(
  api: AlphaTabApi | undefined,
  volume: number | undefined,
  isCountingIn: boolean | undefined,
): void {
  useEffect(
    () => setMetronomeVolume(api, volume, isCountingIn),
    [api, volume, isCountingIn],
  )
}

function setTrackVolume(
  api: AlphaTabApi | undefined,
  trackIndex: number,
  volume: number | undefined,
): void {
  if (isNil(api) || isNil(volume)) {
    return
  }
  const track = api.score?.tracks?.[trackIndex]
  if (isNil(track)) {
    return
  }
  api.changeTrackVolume([track], volume)
}

function setMetronomeVolume(
  api: AlphaTabApi | undefined,
  volume: number | undefined,
  isCountingIn: boolean | undefined,
): void {
  if (isNil(api) || isNil(volume)) {
    return
  }
  api.metronomeVolume = volume
  api.countInVolume = isCountingIn ? volume : 0
}
