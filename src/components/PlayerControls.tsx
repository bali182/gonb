import { FC } from 'react'
import { css } from '@emotion/css'
import { VolumeSlider } from './VolumeSlider'
import {
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
} from 'react-icons/pi'
import { LoopButton, PlayButton, StopButton } from './ScoreControls'
import { SVGAlphaTabLogo } from './SVGAlphaTabLogo'

const playerControlsStyle = css`
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 140px;
  margin-bottom: 20px;
  margin-left: 200px;
  margin-right: 200px;
  /* background-color: #141719; */

  background-color: #333;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  instrumentVolume: number
  chordsVolume: number
  metronomeVolume: number
  onPlayPause: () => void
  onLoop: () => void
  onStop: () => void
  onInstrumentVolumeChange: (volume: number) => void
  onChordsVolumeChange: (volume: number) => void
  onMetronomeVolumeChange: (metronomeVolume: number) => void
}

export const PlayerControls: FC<PlayerControlsProps> = ({
  isPlaying,
  isLooping,
  instrumentVolume,
  metronomeVolume,
  chordsVolume,
  onPlayPause,
  onLoop,
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
          <StopButton onClick={onStop} />
          <PlayButton onClick={onPlayPause} isToggled={isPlaying} />
          <LoopButton onClick={onLoop} isToggled={isLooping} />
        </div>
      </div>
      <SVGAlphaTabLogo className={logoStyle} />
    </div>
  )
}
