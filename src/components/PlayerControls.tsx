import { FC } from 'react'
import { css } from '@emotion/css'
import { VolumeSlider } from './VolumeSlider'
import {
  PiHourglassBold,
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
  PiPauseFill,
  PiPlayFill,
  PiRepeatBold,
  PiStopFill,
} from 'react-icons/pi'
import { PlayerButton, PlayerToggle } from './ScoreControls'
import { SVGAlphaTabLogo } from './SVGAlphaTabLogo'

const playerControlsStyle = css`
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 140px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0%;
  background-color: #333;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media (min-width: 1080px) {
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
`

const volumeContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-self: start;
`

const middleContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const controlsContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-self: center;
  gap: 10px;
`

const logoStyle = css`
  justify-self: end;
`

export type PlayerControlsProps = {
  isLooping: boolean
  isPlaying: boolean
  isCountingIn: boolean
  instrumentVolume: number
  chordsVolume: number
  metronomeVolume: number
  onPlayPause: () => void
  onLoop: () => void
  onStop: () => void
  onCountIn: () => void
  onInstrumentVolumeChange: (volume: number) => void
  onChordsVolumeChange: (volume: number) => void
  onMetronomeVolumeChange: (metronomeVolume: number) => void
}

export const PlayerControls: FC<PlayerControlsProps> = ({
  isPlaying,
  isLooping,
  isCountingIn,
  instrumentVolume,
  metronomeVolume,
  chordsVolume,
  onPlayPause,
  onLoop,
  onCountIn,
  onStop,
  onInstrumentVolumeChange,
  onMetronomeVolumeChange,
  onChordsVolumeChange,
}) => {
  return (
    <div className={playerControlsStyle}>
      <div className={volumeContainerStyle}>
        <VolumeSlider
          Icon={PiMetronomeBold}
          value={metronomeVolume}
          onChange={onMetronomeVolumeChange}
        />
        <VolumeSlider
          Icon={PiMusicNoteBold}
          value={instrumentVolume}
          onChange={onInstrumentVolumeChange}
        />
        <VolumeSlider
          Icon={PiMusicNotesBold}
          value={chordsVolume}
          onChange={onChordsVolumeChange}
        />
      </div>
      <div className={middleContainerStyle}>
        <div className={controlsContainerStyle}>
          <PlayerButton kind="secondary" icon={PiStopFill} onClick={onStop} />
          <PlayerToggle
            kind="primary"
            icon={isPlaying ? PiPauseFill : PiPlayFill}
            isToggled={isPlaying}
            onToggle={onPlayPause}
          />
          <PlayerToggle
            kind="secondary"
            icon={PiRepeatBold}
            isToggled={isLooping}
            onToggle={onLoop}
          />
          <PlayerToggle
            kind="secondary"
            icon={PiHourglassBold}
            isToggled={isCountingIn}
            onToggle={onCountIn}
          />
        </div>
      </div>
      <SVGAlphaTabLogo className={logoStyle} />
    </div>
  )
}
