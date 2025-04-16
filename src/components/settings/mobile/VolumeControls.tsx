import { FC } from 'react'
import { RiVolumeMuteLine, RiVolumeUpLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../../context/useAppContext'
import { Label, Section } from '../controls/InputSectionPrimitives'
import { MutableVolumeSlider } from '../../MutableVolumeSlider'
import { css } from '@emotion/css'

const containerStyle = css`
  background: linear-gradient(to bottom, #00000018 0px, #00000000 50px);
`

export const VolumeControls: FC = () => {
  const { t } = useTranslation()
  const {
    metronomeVolume,
    instrumentVolume,
    chordsVolume,
    setMetronomeVolume,
    setInstrumentVolume,
    setChordsVolume,
  } = useAppContext()

  return (
    <div className={containerStyle}>
      <Section>
        <Label>{t('PlayerTooltips.MelodyVolume')}</Label>
        <MutableVolumeSlider
          color="dark"
          value={instrumentVolume}
          MuteIcon={RiVolumeMuteLine}
          MaxVolumeIcon={RiVolumeUpLine}
          onChange={setInstrumentVolume}
        />
      </Section>
      <Section>
        <Label>{t('PlayerTooltips.ChordsVolume')}</Label>
        <MutableVolumeSlider
          color="dark"
          value={chordsVolume}
          MuteIcon={RiVolumeMuteLine}
          MaxVolumeIcon={RiVolumeUpLine}
          onChange={setChordsVolume}
        />
      </Section>
      <Section>
        <Label>{t('PlayerTooltips.MetronomeVolume')}</Label>
        <MutableVolumeSlider
          color="dark"
          value={metronomeVolume}
          MuteIcon={RiVolumeMuteLine}
          MaxVolumeIcon={RiVolumeUpLine}
          onChange={setMetronomeVolume}
        />
      </Section>
    </div>
  )
}
