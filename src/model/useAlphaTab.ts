import { AlphaTabApi, json, synth } from '@coderline/alphatab'
import { useEffect, useState } from 'react'
import { alphaTabConfig } from './alphaTabConfig'
import { isNil } from './utils'

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
  metronomeVolume?: number
  isLooping?: boolean
  bpm?: number
  player?: Partial<json.PlayerSettingsJson>
}

const noop = () => {}

export function useAlphaTab({
  bpm,
  tex,
  root,
  player,
  scrollArea,
  isLooping,
  instrumentVolume,
  metronomeVolume,
}: UseAlphaTabConfig): UseAlphaTabResult {
  const [api, setApi] = useState<AlphaTabApi>()
  const [isLoading, setLoading] = useState(false)
  const [isPlaying, setPlaying] = useState(false)

  useEffect(() => {
    if (!isNil(api)) {
      console.log({ tex })
      api.tex(tex)
    }
  }, [api, tex])

  useEffect(() => {
    if (!isNil(api) && !isNil(isLooping)) {
      api.isLooping = isLooping
    }
  }, [api, isLooping])

  useEffect(() => {
    if (!isNil(api) && !isNil(api.score)) {
      // TODO change tempo
    }
  }, [api, bpm])

  useTrackVolume(api, 0, instrumentVolume)
  useMetronomeVolume(api, metronomeVolume)

  useEffect(() => {
    if (!isNil(root) && !isNil(scrollArea)) {
      const _api = new AlphaTabApi(root, alphaTabConfig(scrollArea, player))

      console.log(_api)
      _api.renderStarted.on(() => setLoading(true))
      _api.renderFinished.on(() => setLoading(false))
      _api.playerStateChanged.on(({ state }) =>
        setPlaying(state === synth.PlayerState.Playing),
      )

      _api.render()
      if (!isNil(isLooping)) {
        _api.isLooping = isLooping
      }
      if (!isNil(metronomeVolume)) {
        _api.metronomeVolume = metronomeVolume
      }
      setTrackVolume(_api, 0, instrumentVolume)

      console.log({ _api })
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

export function useTrackVolume(
  api: AlphaTabApi | undefined,
  trackIndex: number,
  volume: number | undefined,
): void {
  useEffect(() => {
    setTrackVolume(api, trackIndex, volume)
  }, [trackIndex, volume, api])
}

export function useMetronomeVolume(
  api: AlphaTabApi | undefined,
  volume: number | undefined,
): void {
  useEffect(() => {
    if (isNil(api) || isNil(volume)) {
      return
    }
    api.metronomeVolume = volume
  }, [volume])
}

export function setTrackVolume(
  api: AlphaTabApi | undefined,
  trackIndex: number,
  volume: number | undefined,
): void {
  if (isNil(api) || isNil(volume)) {
    return
  }
  const track = api.score?.tracks[trackIndex]
  if (isNil(track)) {
    return
  }
  api.changeTrackVolume([track], volume)
}
