import { css } from '@emotion/css'
import { FC } from 'react'
import {
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
} from 'react-icons/pi'
import { VolumeSlider } from './VolumeSlider'
import { useAppContext } from '../context/useAppContext'

const volumeContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-self: start;
`

export const VolumeControls: FC = () => {
  const {
    metronomeVolume,
    instrumentVolume,
    chordsVolume,
    setMetronomeVolume,
    setInstrumentVolume,
    setChordsVolume,
  } = useAppContext()

  return (
    <div className={volumeContainerStyle}>
      <VolumeSlider
        Icon={PiMetronomeBold}
        value={metronomeVolume}
        onChange={setMetronomeVolume}
        sliderTooltip="PlayerTooltips.MetronomeVolume"
      />
      <VolumeSlider
        Icon={PiMusicNoteBold}
        value={instrumentVolume}
        onChange={setInstrumentVolume}
        sliderTooltip="PlayerTooltips.MelodyVolume"
      />
      <VolumeSlider
        Icon={PiMusicNotesBold}
        value={chordsVolume}
        onChange={setChordsVolume}
        sliderTooltip="PlayerTooltips.ChordsVolume"
      />
    </div>
  )
}
