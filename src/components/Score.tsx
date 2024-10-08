import { FC, useState, useCallback } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { useAlphaTab } from '../model/useAlphaTab'
import { PlayerControls } from './PlayerControls'
import { useDispatch, useSelector } from 'react-redux'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'

export type ScoreProps = {
  progressionId: string
}

const wrapStyle = css`
  //.at-wrap
  width: 100vw;
  height: calc(100vh - 120px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const contentStyle = css`
  // .at-content
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
`

const viewportStyle = css`
  // .at-viewport
  overflow-y: auto;
  position: absolute;
  left: 200px;
  right: 200px;
  padding: 40px;
  top: 0px;
  bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const Score: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()
  const tex = useSelector(alphaTexSelector)
  const playerConfig = useSelector(playerSlice.selectSlice)
  const { bpm } = useSelector(generatorSlice.selectSlice)

  const setScrollAreaCallback = useCallback((node: HTMLDivElement | null) => {
    setScrollArea(node ?? undefined)
  }, [])

  const setRootCallback = useCallback((node: HTMLDivElement | null) => {
    setRoot(node ?? undefined)
  }, [])

  const onPlayPause = () => api?.playPause()
  const onStop = () => api?.stop()

  const onLoop = () =>
    dispatch(
      playerSlice.actions.setPlayerConfig({
        ...playerConfig,
        isLooping: !playerConfig.isLooping,
      }),
    )
  const onInstrumentVolumeChange = (instrumentVolume: number) =>
    dispatch(
      playerSlice.actions.setPlayerConfig({
        ...playerConfig,
        instrumentVolume,
      }),
    )
  const onMetronomeVolumeChange = (metronomeVolume: number) =>
    dispatch(
      playerSlice.actions.setPlayerConfig({
        ...playerConfig,
        metronomeVolume,
      }),
    )
  const onTempoChange = () => {}

  const { api, isPlaying, isLoading } = useAlphaTab({
    tex,
    root,
    scrollArea,
    bpm,
    instrumentVolume: playerConfig.instrumentVolume,
    metronomeVolume: playerConfig.metronomeVolume,
    isLooping: playerConfig.isLooping,
  })

  return (
    <div className={wrapStyle}>
      <ScoreOverlay isVisible={isLoading} />
      <div className={contentStyle}>
        <div className={viewportStyle} ref={setScrollAreaCallback}>
          <div className="at-main" ref={setRootCallback}></div>
        </div>
      </div>
      <PlayerControls
        bpm={bpm}
        isPlaying={isPlaying}
        isLooping={playerConfig.isLooping}
        instrumentVolume={playerConfig.instrumentVolume}
        metronomeVolume={playerConfig.metronomeVolume}
        onLoop={onLoop}
        onStop={onStop}
        onPlayPause={onPlayPause}
        onTempoChange={onTempoChange}
        onInstrumentVolumeChange={onInstrumentVolumeChange}
        onMetronomeVolumeChange={onMetronomeVolumeChange}
      />
    </div>
  )
}
