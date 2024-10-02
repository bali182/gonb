import { css } from '@emotion/css'
import { DOMAttributes, FC } from 'react'
import { IconType } from 'react-icons'
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;
  justify-content: center;
`

const volumeSliderStyle = css`
  appearance: none;
  background-color: transparent;
  width: 180px;

  &::-webkit-slider-runnable-track {
    height: 8px;
    background-color: #ffffff60;
    border-radius: 8px;
  }

  &::-moz-range-track {
    height: 8px;
    background-color: #ffffff60;
    border-radius: 8px;
  }

  &::-webkit-slider-thumb {
    box-sizing: border-box;
    appearance: none;
    position: relative;
    background-color: #ffffffdd;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    top: 50%;
    translate: 0 -50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #ffffff;
      transform: scale(1.4);
    }
  }

  &::-moz-range-thumb {
    box-sizing: border-box;
    appearance: none;
    position: relative;
    background-color: #ffffffdd;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #ffffff;
      transform: scale(1.4);
    }
  }
`

const controlIconStyle = css`
  font-size: 1.6em;
  color: #ffffffdd;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`

const iconStyle = css`
  font-size: 1.8em;
  margin-right: 10px;
  color: #ffffff;
`

export type VolumeSliderProps = Omit<
  DOMAttributes<HTMLDivElement>,
  'onChange'
> & {
  value: number
  Icon: IconType
  onChange: (value: number) => void
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  value,
  onChange,
  Icon,
  ...rest
}) => {
  return (
    <div className={containerStyle} {...rest}>
      <Icon className={iconStyle} />
      <RiVolumeMuteFill
        className={controlIconStyle}
        onClick={() => onChange(0)}
      />
      <input
        type="range"
        className={volumeSliderStyle}
        min={0}
        max={1}
        step={0.02}
        value={value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
      <RiVolumeUpFill
        className={controlIconStyle}
        onClick={() => onChange(1)}
      />
    </div>
  )
}
