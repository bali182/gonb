import { AlphaTabApi, json, synth } from '@coderline/alphatab'
import { useEffect, useState } from 'react'
import { alphaTabConfig } from './alphaTabConfig'
import { isNil } from '../common/utils'

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
  player?: Partial<json.PlayerSettingsJson>
}

const noop = () => {}

export function useAlphaTab({
  tex,
  root,
  player,
  scrollArea,
  isLooping,
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

  useTrackVolume(api, 0, instrumentVolume)
  useTrackVolume(api, 1, chordsVolume)
  useMetronomeVolume(api, metronomeVolume)

  useEffect(() => {
    if (!isNil(root) && !isNil(scrollArea)) {
      const _api = new AlphaTabApi(root, alphaTabConfig(scrollArea, player))

      _api.renderStarted.on(() => setLoading(true))
      _api.renderFinished.on(() => {
        setLoading(false)
        setTrackVolume(_api, 0, instrumentVolume)
        setTrackVolume(_api, 1, chordsVolume)
      })
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
  // Seems to be necessary, otherwise volume might not be set
  setTimeout(() => {
    if (isNil(api) || isNil(volume)) {
      return
    }
    const track = api.score?.tracks[trackIndex]
    if (isNil(track)) {
      return
    }
    api.changeTrackVolume([track], volume)
  }, 5)
}
