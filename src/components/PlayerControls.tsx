import { FC } from 'react'
import { css } from '@emotion/css'
import {
  PiFastForwardFill,
  PiHourglassBold,
  PiPauseFill,
  PiPlayFill,
  PiRepeatBold,
  PiStopFill,
} from 'react-icons/pi'
import {
  ButtonGroup,
  PlayerButtonDesktop,
  PlayerButtonMobile,
  PlayerToggleDesktop,
  PlayerToggleMobile,
} from './ScoreControls'
import { useAppContext } from '../context/useAppContext'

const desktopContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const innerDesktopContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-self: center;
  gap: 10px;
`

const mobileContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
`

export type PlayerControlsProps = {
  isLooping: boolean
  isPlaying: boolean
  isCountingIn: boolean
  onPlayPause: () => void
  onLoop: () => void
  onStop: () => void
  onCountIn: () => void
}

export const PlayerControlsDesktop: FC = () => {
  const {
    stop,
    playPause,
    toggleLooping,
    toggleCountIn,
    isPlaying,
    isLooping,
    isCountingIn,
  } = useAppContext()
  return (
    <div className={desktopContainerStyle}>
      <div className={innerDesktopContainerStyle}>
        <PlayerButtonDesktop
          kind="secondary"
          icon={PiStopFill}
          onClick={stop}
          label="PlayerTooltips.Stop"
        />
        <PlayerToggleDesktop
          kind="primary"
          icon={isPlaying ? PiPauseFill : PiPlayFill}
          isToggled={isPlaying}
          onToggle={playPause}
          label={isPlaying ? 'PlayerTooltips.Pause' : 'PlayerTooltips.Play'}
        />
        <ButtonGroup>
          <PlayerToggleDesktop
            kind="secondary"
            icon={PiRepeatBold}
            isToggled={isLooping}
            onToggle={toggleLooping}
            label="PlayerTooltips.Loop"
          />
          <PlayerToggleDesktop
            kind="secondary"
            icon={PiHourglassBold}
            isToggled={isCountingIn}
            onToggle={toggleCountIn}
            label="PlayerTooltips.CountIn"
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

export const PlayerControlsMobile: FC = () => {
  const {
    stop,
    playPause,
    regenerate,
    toggleLooping,
    toggleCountIn,
    isPlaying,
    isLooping,
    isCountingIn,
  } = useAppContext()
  return (
    <div className={mobileContainerStyle}>
      <PlayerButtonMobile
        icon={PiFastForwardFill}
        onClick={regenerate}
        label="PlayerTooltips.Regenerate"
      />
      <PlayerButtonMobile
        icon={PiStopFill}
        onClick={stop}
        label="PlayerTooltips.Stop"
      />
      <PlayerToggleMobile
        offIcon={PiPlayFill}
        onIcon={PiPauseFill}
        isToggled={isPlaying}
        onToggle={playPause}
        label={isPlaying ? 'PlayerTooltips.Pause' : 'PlayerTooltips.Play'}
      />
      <PlayerToggleMobile
        offIcon={PiRepeatBold}
        onIcon={PiRepeatBold}
        isToggled={isLooping}
        onToggle={toggleLooping}
        label="PlayerTooltips.Loop"
      />
      <PlayerToggleMobile
        kind="secondary"
        offIcon={PiHourglassBold}
        onIcon={PiHourglassBold}
        isToggled={isCountingIn}
        onToggle={toggleCountIn}
        label="PlayerTooltips.CountIn"
      />
    </div>
  )
}
