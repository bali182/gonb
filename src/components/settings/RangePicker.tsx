import { css } from '@emotion/css'
import { ChangeEvent, FC } from 'react'

export type RangeSliderProps = {
  step: number
  min: number
  max: number
  rangeStart: number
  rangeEnd: number
  onChange: (rangeStart: number, rangeEnd: number) => void
}

const wrapper = css`
  position: relative;
  display: flex;
  align-items: center;
  margin: 40px calc(16px / 2);
  padding-top: 1.6rem;
  height: calc(16px + 1.6rem);
`

const inputWrapper = css`
  width: calc(100% + 16px);
  margin: 0 calc(16px / -2);
  position: absolute;
  height: 16px;
`

const controlWrapper = css`
  width: 100%;
  position: absolute;
  height: 16px;
`

// https://benhoneywill.com/building-a-range-slider-component-in-react/
const input = css`
  position: absolute;
  width: 100%;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 100%;
  opacity: 0;
  z-index: 3;
  padding: 0;
`

export const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  rangeStart,
  rangeEnd,
  step,
  onChange,
}) => {
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newRangeStart = Math.min(+e.target.value, rangeEnd - step)
    onChange(newRangeStart, rangeEnd)
  }

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newRangeEnd = Math.max(+e.target.value, rangeStart + step)
    onChange(rangeStart, newRangeEnd)
  }

  const minPos = ((rangeStart - min) / (max - min)) * 100
  const maxPos = ((rangeEnd - min) / (max - min)) * 100

  return (
    <div className="wrapper">
      <div className="input-wrapper">
        <input
          className="input"
          type="range"
          value={rangeStart}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className="input"
          type="range"
          value={rangeEnd}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className="control-wrapper">
        <div className="control" style={{ left: `${minPos}%` }} />
        <div className="rail">
          <div
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className="control" style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  )
}
