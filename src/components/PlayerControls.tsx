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

export const PlayerControlsDesktop: FC<PlayerControlsProps> = ({
  isPlaying,
  isLooping,
  isCountingIn,
  onPlayPause,
  onLoop,
  onCountIn,
  onStop,
}) => {
  return (
    <div className={desktopContainerStyle}>
      <div className={innerDesktopContainerStyle}>
        <PlayerButtonDesktop
          kind="secondary"
          icon={PiStopFill}
          onClick={onStop}
          label="PlayerTooltips.Stop"
        />
        <PlayerToggleDesktop
          kind="primary"
          icon={isPlaying ? PiPauseFill : PiPlayFill}
          isToggled={isPlaying}
          onToggle={onPlayPause}
          label={isPlaying ? 'PlayerTooltips.Pause' : 'PlayerTooltips.Play'}
        />
        <ButtonGroup>
          <PlayerToggleDesktop
            kind="secondary"
            icon={PiRepeatBold}
            isToggled={isLooping}
            onToggle={onLoop}
            label="PlayerTooltips.Loop"
          />
          <PlayerToggleDesktop
            kind="secondary"
            icon={PiHourglassBold}
            isToggled={isCountingIn}
            onToggle={onCountIn}
            label="PlayerTooltips.CountIn"
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

export const PlayerControlsMobile: FC<PlayerControlsProps> = ({
  isPlaying,
  isLooping,
  isCountingIn,
  onPlayPause,
  onLoop,
  onCountIn,
  onStop,
}) => {
  console.log(
    isPlaying,
    isLooping,
    isCountingIn,
    onPlayPause,
    onLoop,
    onCountIn,
    onStop,
  )
  return (
    <div className={mobileContainerStyle}>
      <PlayerButtonMobile
        icon={PiFastForwardFill}
        onClick={onStop}
        label="PlayerTooltips.Regenerate"
      />
      <PlayerButtonMobile
        icon={PiStopFill}
        onClick={onStop}
        label="PlayerTooltips.Stop"
      />
      <PlayerToggleMobile
        icon={isPlaying ? PiPauseFill : PiPlayFill}
        isToggled={isPlaying}
        onToggle={onPlayPause}
        label={isPlaying ? 'PlayerTooltips.Pause' : 'PlayerTooltips.Play'}
      />
      <PlayerToggleMobile
        icon={PiRepeatBold}
        isToggled={isLooping}
        onToggle={onLoop}
        label="PlayerTooltips.Loop"
      />
      <PlayerToggleMobile
        kind="secondary"
        icon={PiHourglassBold}
        isToggled={isCountingIn}
        onToggle={onCountIn}
        label="PlayerTooltips.CountIn"
      />
    </div>
  )
}
