import { AlphaTabApi, synth } from '@coderline/alphatab'
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
  bassVolume: number
  chordsVolume: number
  metronomeVolume: number
  isLooping: boolean
  bpm: number
}

const noop = () => {}

export function useAlphaTab({
  bpm,
  tex,
  root,
  scrollArea,
  isLooping,
  bassVolume,
  chordsVolume,
  metronomeVolume,
}: UseAlphaTabConfig): UseAlphaTabResult {
  const [api, setApi] = useState<AlphaTabApi>()
  const [isLoading, setLoading] = useState(false)
  const [isPlaying, setPlaying] = useState(false)

  useEffect(() => {
    if (!isNil(api)) {
      api.tex(tex)
    }
  }, [api, tex])

  useEffect(() => {
    if (!isNil(api)) {
      api.isLooping = isLooping
    }
  }, [api, isLooping])

  useEffect(() => {
    if (!isNil(api) && !isNil(api.score)) {
      // TODO change tempo
    }
  }, [api, bpm])

  useTrackVolume(api, 0, bassVolume)
  useTrackVolume(api, 1, chordsVolume)
  useMetronomeVolume(api, metronomeVolume)

  useEffect(() => {
    if (!isNil(root) && !isNil(scrollArea)) {
      const _api = new AlphaTabApi(root, alphaTabConfig(scrollArea))

      _api.renderStarted.on(() => setLoading(true))
      _api.renderFinished.on(() => setLoading(false))
      _api.playerStateChanged.on(({ state }) =>
        setPlaying(state === synth.PlayerState.Playing),
      )

      _api.render()
      _api.isLooping = isLooping
      _api.metronomeVolume = metronomeVolume
      setTrackVolume(_api, 0, bassVolume)
      setTrackVolume(_api, 1, chordsVolume)

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
  volume: number,
): void {
  useEffect(() => {
    setTrackVolume(api, trackIndex, volume)
  }, [trackIndex, volume, api])
}

export function useMetronomeVolume(
  api: AlphaTabApi | undefined,
  volume: number,
): void {
  useEffect(() => {
    if (isNil(api)) {
      return
    }
    api.metronomeVolume = volume
  }, [volume])
}

export function setTrackVolume(
  api: AlphaTabApi | undefined,
  trackIndex: number,
  volume: number,
): void {
  if (isNil(api)) {
    return
  }
  const track = api.score?.tracks[trackIndex]
  if (isNil(track)) {
    return
  }
  api.changeTrackVolume([track], volume)
}
