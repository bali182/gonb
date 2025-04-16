import { css } from '@emotion/css'
import { FC } from 'react'
import {
  PiMetronomeBold,
  PiMusicNoteBold,
  PiMusicNotesBold,
} from 'react-icons/pi'
import { MutableVolumeSlider } from './MutableVolumeSlider'
import { useAppContext } from '../context/useAppContext'

const volumeContainerDesktopStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-self: start;
`

export const VolumeControlsDesktop: FC = () => {
  const {
    metronomeVolume,
    instrumentVolume,
    chordsVolume,
    setMetronomeVolume,
    setInstrumentVolume,
    setChordsVolume,
  } = useAppContext()

  return (
    <div className={volumeContainerDesktopStyle}>
      <MutableVolumeSlider
        Icon={PiMetronomeBold}
        value={metronomeVolume}
        onChange={setMetronomeVolume}
        sliderTooltip="PlayerTooltips.MetronomeVolume"
      />
      <MutableVolumeSlider
        Icon={PiMusicNoteBold}
        value={instrumentVolume}
        onChange={setInstrumentVolume}
        sliderTooltip="PlayerTooltips.MelodyVolume"
      />
      <MutableVolumeSlider
        Icon={PiMusicNotesBold}
        value={chordsVolume}
        onChange={setChordsVolume}
        sliderTooltip="PlayerTooltips.ChordsVolume"
      />
    </div>
  )
}
