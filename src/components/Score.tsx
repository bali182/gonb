import { FC, useState, useCallback } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { useAlphaTab } from '../alphaTex/useAlphaTab'
import { PlayerControls } from './PlayerControls'
import { useDispatch, useSelector } from 'react-redux'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { AppDispatch } from '../state/store'
import { ScoreView } from './ScoreView'
import { generatorSlice } from '../state/generatorSlice'

const wrapStyle = css`
  //.at-wrap
  width: 100vw;
  height: calc(100vh - 120px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  @supports (height: 100dvh) {
    height: calc(min(100vh, 100dvh) - 120px);
  }
`

const viewPortStyle = css`
  left: 20px;
  right: 20px;
  bottom: 20px;
  padding: 20px;

  @media (min-width: 1080px) {
    left: 200px;
    right: 200px;
    bottom: 30px;
    padding: 30px;
  }
`

export const Score: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const tex = useSelector(alphaTexSelector)
  const playerConfig = useSelector(playerSlice.selectSlice)

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
  const onChordsVolumeChange = (chordsVolume: number) =>
    dispatch(
      playerSlice.actions.setPlayerConfig({
        ...playerConfig,
        chordsVolume,
      }),
    )

  const { api, isPlaying, isLoading } = useAlphaTab({
    tex,
    root,
    scrollArea,
    instrumentVolume: playerConfig.instrumentVolume,
    metronomeVolume: playerConfig.metronomeVolume,
    chordsVolume: playerConfig.chordsVolume,
    isLooping: playerConfig.isLooping,
    showChordsStaff: generatorConfig.showChordsStaff,
  })

  return (
    <div className={wrapStyle}>
      <ScoreOverlay isVisible={isLoading} />
      <ScoreView
        viewPortStyle={viewPortStyle}
        setRootCallback={setRootCallback}
        setScrollAreaCallback={setScrollAreaCallback}
      />
      <PlayerControls
        isPlaying={isPlaying}
        isLooping={playerConfig.isLooping}
        instrumentVolume={playerConfig.instrumentVolume}
        metronomeVolume={playerConfig.metronomeVolume}
        chordsVolume={playerConfig.chordsVolume}
        onLoop={onLoop}
        onStop={onStop}
        onPlayPause={onPlayPause}
        onInstrumentVolumeChange={onInstrumentVolumeChange}
        onChordsVolumeChange={onChordsVolumeChange}
        onMetronomeVolumeChange={onMetronomeVolumeChange}
      />
    </div>
  )
}
