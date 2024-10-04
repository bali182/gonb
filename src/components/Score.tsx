import { FC, useState, useCallback, useMemo } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { useAlphaTab } from '../model/useAlphaTab'
import { PlayerControls } from './PlayerControls'
import { useSelector } from 'react-redux'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'

export type ScoreProps = {
  progressionId: string
}

const wrapStyle = css`
  //.at-wrap
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
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
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 20px;
`

export const Score: FC = () => {
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()

  const setScrollAreaCallback = useCallback((node: HTMLDivElement | null) => {
    setScrollArea(node ?? undefined)
  }, [])

  const setRootCallback = useCallback((node: HTMLDivElement | null) => {
    setRoot(node ?? undefined)
  }, [])

  const tex = useSelector(alphaTexSelector)
  const { isLooping, instrumentVolume, metronomeVolume } = useSelector(
    playerSlice.selectors.getPlayerConfig,
  )
  
  // TODO figure out where to store this
  const bpm = 120

  const onPlayPause = () => api?.playPause()
  const onLoop = () => {}
  const onStop = () => {}
  const onInstrumentVolumeChange = () => {}
  const onMetronomeVolumeChange = () => {}
  const onTempoChange = () => {}

  const { api, isPlaying, isLoading } = useAlphaTab({
    tex,
    instrumentVolume,
    metronomeVolume,
    isLooping,
    root,
    scrollArea,
    bpm,
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
        isLooping={isLooping}
        instrumentVolume={instrumentVolume}
        metronomeVolume={metronomeVolume}
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
