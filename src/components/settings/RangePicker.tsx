import { css } from '@emotion/css'
import { ChangeEvent, FC } from 'react'

export type RangePickerProps = {
  id: string
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
  margin: 10px;
  height: 20px;
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
  height: 20px;
`

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

  &::-ms-track {
    appearance: none;
    background: transparent;
    border: transparent;
  }
  &::-moz-range-track {
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: transparent;
  }
  &:focus::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: transparent;
  }
  &::-ms-thumb {
    appearance: none;
    pointer-events: all;
    width: 16px;
    height: 16px;
    border-radius: 0px;
    border: 0 none;
    cursor: grab;
    background-color: red;
  }
  &::-ms-thumb:active {
    cursor: grabbing;
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    pointer-events: all;
    width: 16px;
    height: 16px;
    border-radius: 0px;
    border: 0 none;
    cursor: grab;
    background-color: red;
  }
  &::-moz-range-thumb:active {
    cursor: grabbing;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    pointer-events: all;
    width: 16px;
    height: 16px;
    border-radius: 0px;
    border: 0 none;
    cursor: -webkit-grab;
    cursor: grab;
    background-color: red;
  }
  &::-webkit-slider-thumb:active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`

const rail = css`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  border-radius: 3px;
  background: #ffffff30;
`

const innerRail = css`
  position: absolute;
  height: 100%;
  background: #ffffff80;
`

const control = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  background: #eeeeee;
  top: 50%;
  margin-left: calc(16px / -2);
  transform: translate3d(0, -50%, 0);
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: bold;
`
// https://benhoneywill.com/building-a-range-slider-component-in-react/
export const RangePicker: FC<RangePickerProps> = ({
  id,
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
    <div className={wrapper} id={id}>
      <div className={inputWrapper}>
        <input
          className={input}
          type="range"
          value={rangeStart}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={input}
          type="range"
          value={rangeEnd}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className={controlWrapper}>
        <div className={control} style={{ left: `${minPos}%` }}>
          {rangeStart}
        </div>
        <div className={rail}>
          <div
            className={innerRail}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={control} style={{ left: `${maxPos}%` }}>
          {rangeEnd}
        </div>
      </div>
    </div>
  )
}
