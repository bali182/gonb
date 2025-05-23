import { css, cx } from '@emotion/css'
import { DOMAttributes, FC } from 'react'
import { IconType } from 'react-icons'
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri'
import { MessageKey } from '../languages/types'
import { isNil } from '../common/utils'
import { Slider, SliderProps } from './Slider'
import { volumeIconSizeStyle } from './constants'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;
  justify-content: center;
`

const controlIconStyle = cx(
  volumeIconSizeStyle,
  css`
    cursor: pointer;
  `,
)

const lightControlIconStyle = css`
  color: #ffffffdd;
  &:hover {
    color: #ffffff;
  }
`

const darkControlIconStyle = css`
  color: #000000aa;
  &:hover {
    color: #000000;
  }
`

const iconStyle = cx(
  volumeIconSizeStyle,
  css`
    margin-right: 10px;
    color: #ffffff;
  `,
)

export type VolumeSliderProps = Omit<
  DOMAttributes<HTMLDivElement>,
  'onChange'
> & {
  value: number
  Icon?: IconType
  MuteIcon?: IconType
  MaxVolumeIcon?: IconType
  color?: SliderProps['color']
  sliderTooltip?: MessageKey
  onChange: (value: number) => void
}

export const MutableVolumeSlider: FC<VolumeSliderProps> = ({
  value,
  onChange,
  Icon,
  MuteIcon = RiVolumeUpFill,
  MaxVolumeIcon = RiVolumeMuteFill,
  sliderTooltip,
  color = 'light',
}) => {
  const computedControlIconStyle = cx(
    controlIconStyle,
    color === 'light' ? lightControlIconStyle : darkControlIconStyle,
  )
  return (
    <div className={containerStyle} data-tooltip={sliderTooltip}>
      {!isNil(Icon) && (
        <Icon className={iconStyle} width="1rem" height="1rem" />
      )}
      <MuteIcon
        className={computedControlIconStyle}
        onClick={() => onChange(0)}
        width="1rem"
        height="1rem"
      />
      <Slider
        min={0}
        max={1}
        step={0.02}
        value={value}
        onChange={onChange}
        color={color}
      />
      <MaxVolumeIcon
        className={computedControlIconStyle}
        onClick={() => onChange(1)}
        width="1rem"
        height="1rem"
      />
    </div>
  )
}
