import { FC, useState, useCallback, useEffect } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { useAlphaTab } from '../alphaTex/useAlphaTab'
import { PlayerControlsDesktop, PlayerControlsMobile } from './PlayerControls'
import { useDispatch, useSelector } from 'react-redux'
import { alphaTexSelector } from '../state/selectors'
import { playerSlice } from '../state/playerSlice'
import { AppDispatch } from '../state/store'
import { ScoreView } from './ScoreView'
import { generatorSlice } from '../state/generatorSlice'
import { SVGAlphaTabLogo } from './SVGAlphaTabLogo'
import { VolumeControls } from './VolumeControls'
import { IS_MOBILE_QUERY, useIsMobile } from './useIsMobile'

const wrapStyle = css`
  //.at-wrap
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  height: calc(100vh - 120px);
  @supports (height: 100dvh) {
    height: calc(min(100vh, 100dvh) - 120px);
  }

  @media ${IS_MOBILE_QUERY} {
    height: calc(100vh - 150px);
    @supports (height: 100dvh) {
      height: calc(min(100vh, 100dvh) - 150px);
    }
  }
`

const desktopViewportStyle = css`
  left: 200px;
  right: 200px;
  bottom: 30px;
  padding: 30px;
`

const mobileViewportStyle = css`
  left: 20px;
  right: 20px;
  bottom: 20px;
  padding: 0px;
`

const desktopBottomMenuStyle = css`
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 140px;
  background-color: #333;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
`

const mobileBottomMenuStyle = css`
  display: flex;
  flex-direction: row;
  height: 140px;
  background-color: #333;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0px;
  padding: 0px;
`

const logoStyle = css`
  justify-self: end;
`

export const Score: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const tex = useSelector(alphaTexSelector)
  const playerConfig = useSelector(playerSlice.selectSlice)
  const isMobile = useIsMobile()

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
  const onCountIn = () =>
    dispatch(
      playerSlice.actions.setPlayerConfig({
        ...playerConfig,
        isCountingIn: !playerConfig.isCountingIn,
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

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        return onPlayPause()
      }
      if (e.code === 'KeyR') {
        return onLoop()
      }
    }
    document.addEventListener('keypress', keyListener)
    return () => document.removeEventListener('keypress', keyListener)
  })

  const { api, isPlaying, isLoading } = useAlphaTab({
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

  return (
    <div className={wrapStyle}>
      <ScoreOverlay isVisible={isLoading} />
      <ScoreView
        viewPortStyle={isMobile ? mobileViewportStyle : desktopViewportStyle}
        setRootCallback={setRootCallback}
        setScrollAreaCallback={setScrollAreaCallback}
      />
      <div
        className={isMobile ? mobileBottomMenuStyle : desktopBottomMenuStyle}
      >
        {!isMobile && (
          <VolumeControls
            instrumentVolume={playerConfig.instrumentVolume}
            metronomeVolume={playerConfig.metronomeVolume}
            chordsVolume={playerConfig.chordsVolume}
            onInstrumentVolumeChange={onInstrumentVolumeChange}
            onChordsVolumeChange={onChordsVolumeChange}
            onMetronomeVolumeChange={onMetronomeVolumeChange}
          />
        )}
        {isMobile ? (
          <PlayerControlsMobile
            isPlaying={isPlaying}
            isLooping={playerConfig.isLooping}
            isCountingIn={playerConfig.isCountingIn}
            onLoop={onLoop}
            onStop={onStop}
            onCountIn={onCountIn}
            onPlayPause={onPlayPause}
          />
        ) : (
          <PlayerControlsDesktop
            isPlaying={isPlaying}
            isLooping={playerConfig.isLooping}
            isCountingIn={playerConfig.isCountingIn}
            onLoop={onLoop}
            onStop={onStop}
            onCountIn={onCountIn}
            onPlayPause={onPlayPause}
          />
        )}
        {!isMobile && <SVGAlphaTabLogo className={logoStyle} />}
      </div>
    </div>
  )
}
