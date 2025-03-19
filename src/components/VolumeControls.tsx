import { css } from '@emotion/css'
import { FC } from 'react'
import {
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
} from 'react-icons/pi'
import { VolumeSlider } from './VolumeSlider'

type VolumeControlsProps = {
  instrumentVolume: number
  chordsVolume: number
  metronomeVolume: number
  onInstrumentVolumeChange: (volume: number) => void
  onChordsVolumeChange: (volume: number) => void
  onMetronomeVolumeChange: (metronomeVolume: number) => void
}

const volumeContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-self: start;
`

export const VolumeControls: FC<VolumeControlsProps> = ({
  instrumentVolume,
  metronomeVolume,
  chordsVolume,
  onInstrumentVolumeChange,
  onMetronomeVolumeChange,
  onChordsVolumeChange,
}) => {
  return (
    <div className={volumeContainerStyle}>
      <VolumeSlider
        Icon={PiMetronomeBold}
        value={metronomeVolume}
        onChange={onMetronomeVolumeChange}
        sliderTooltip="PlayerTooltips.MetronomeVolume"
      />
      <VolumeSlider
        Icon={PiMusicNoteBold}
        value={instrumentVolume}
        onChange={onInstrumentVolumeChange}
        sliderTooltip="PlayerTooltips.MelodyVolume"
      />
      <VolumeSlider
        Icon={PiMusicNotesBold}
        value={chordsVolume}
        onChange={onChordsVolumeChange}
        sliderTooltip="PlayerTooltips.ChordsVolume"
      />
    </div>
  )
}
