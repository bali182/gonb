import { FC, useCallback, useEffect } from 'react'
import { css } from '@emotion/css'
import { ScoreOverlay } from './ScoreOverlay'
import { PlayerControlsDesktop, PlayerControlsMobile } from './PlayerControls'
import { ScoreView } from './ScoreView'
import { SVGAlphaTabLogo } from './SVGAlphaTabLogo'
import { VolumeControlsDesktop } from './VolumeControls'
import { IS_MOBILE_QUERY, useIsMobile } from './useIsMobile'
import { useAppContext } from '../context/useAppContext'
import { DESKTOP_TOOLBAR_HEIGHT, MOBILE_TOOLBAR_HEIGHT } from './constants'

const wrapStyle = css`
  //.at-wrap
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  height: calc(100vh - ${DESKTOP_TOOLBAR_HEIGHT}px);
  @supports (height: 100dvh) {
    height: calc(min(100vh, 100dvh) - ${DESKTOP_TOOLBAR_HEIGHT}px);
  }

  @media ${IS_MOBILE_QUERY} {
    height: calc(100vh - ${MOBILE_TOOLBAR_HEIGHT}px);
    @supports (height: 100dvh) {
      height: calc(min(100vh, 100dvh) - ${MOBILE_TOOLBAR_HEIGHT}px);
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
  left: 10px;
  right: 10px;
  bottom: 10px;
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
  height: 80px;
  background-color: #333;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0px;
  padding: 0px;
`

const logoStyle = css`
  justify-self: end;
`

export const Score: FC = () => {
  const isMobile = useIsMobile()
  const context = useAppContext()

  const setScrollAreaCallback = useCallback((node: HTMLDivElement | null) => {
    context.setScrollAreaDOMElement(node ?? undefined)
  }, [])

  const setRootCallback = useCallback((node: HTMLDivElement | null) => {
    context.setRootDOMElement(node ?? undefined)
  }, [])

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        return context.playPause()
      }
      if (e.code === 'KeyR') {
        return context.toggleLooping()
      }
    }
    document.addEventListener('keypress', keyListener)
    return () => document.removeEventListener('keypress', keyListener)
  })

  return (
    <div className={wrapStyle}>
      <ScoreOverlay isVisible={context.isLoading} />
      <ScoreView
        viewPortStyle={isMobile ? mobileViewportStyle : desktopViewportStyle}
        setRootCallback={setRootCallback}
        setScrollAreaCallback={setScrollAreaCallback}
      />
      <div
        className={isMobile ? mobileBottomMenuStyle : desktopBottomMenuStyle}
      >
        {!isMobile && <VolumeControlsDesktop />}
        {isMobile ? <PlayerControlsMobile /> : <PlayerControlsDesktop />}
        {!isMobile && <SVGAlphaTabLogo className={logoStyle} />}
      </div>
    </div>
  )
}
