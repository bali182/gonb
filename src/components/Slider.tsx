import { css, cx } from '@emotion/css'
import { FC } from 'react'

const sliderStyle = css`
  appearance: none;
  background-color: transparent;
  width: 100%;

  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 6px;
  }

  &::-moz-range-track {
    height: 6px;
    border-radius: 6px;
  }

  &::-webkit-slider-thumb {
    box-sizing: border-box;
    appearance: none;
    position: relative;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    top: 50%;
    translate: 0 -50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.4);
    }
  }

  &::-moz-range-thumb {
    box-sizing: border-box;
    appearance: none;
    position: relative;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.4);
    }
  }
`

const lightSliderStyle = css`
  &::-webkit-slider-runnable-track {
    background-color: #ffffff60;
  }
  &::-moz-range-track {
    background-color: #ffffff60;
  }
  &::-webkit-slider-thumb {
    background-color: #ffffffdd;
    &:hover,
    &:focus {
      background-color: #ffffff;
    }
  }
  &::-moz-range-thumb {
    background-color: #ffffffdd;
    &:hover,
    &:focus {
      background-color: #ffffff;
    }
  }
`

const darkSliderStlye = css`
  &::-webkit-slider-runnable-track {
    background-color: #777777;
  }
  &::-moz-range-track {
    background-color: #777777;
  }
  &::-webkit-slider-thumb {
    background-color: #777777;
    &:hover,
    &:focus {
      background-color: #666666;
    }
  }
  &::-moz-range-thumb {
    background-color: #777777;
    &:hover,
    &:focus {
      background-color: #666666;
    }
  }
`

export type SliderProps = {
  value: number
  min: number
  max: number
  step: number
  color: 'dark' | 'light'
  className?: string
  onChange: (value: number) => void
}

export const Slider: FC<SliderProps> = ({
  value,
  min,
  max,
  step,
  color,
  className,
  onChange,
}) => {
  const fullStyle = cx(
    sliderStyle,
    color === 'light' ? lightSliderStyle : darkSliderStlye,
    className,
  )
  return (
    <input
      type="range"
      className={fullStyle}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(event.target.valueAsNumber)}
    />
  )
}
