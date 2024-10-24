import { FC, useState, useCallback } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { useAlphaTab } from '../alphaTex/useAlphaTab'
import { PlayerControls } from './PlayerControls'
import { useDispatch, useSelector } from 'react-redux'
import { alphaTexSelector, songSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'
import { ScoreView } from './ScoreView'

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

  console.log(tex)

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
      <ScoreView
        viewPortLeft={200}
        viewPortRight={200}
        viewPortBottom={30}
        padding={30}
        setRootCallback={setRootCallback}
        setScrollAreaCallback={setScrollAreaCallback}
      />
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
