import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { noop } from '../../../common/utils'

const switchStyle = css`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

const sliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 26px;
  background-color: #777;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    transition: 0.4s;
    border-radius: 50%;
    background-color: #ffffff;
  }
`

const checkedSliderStyle = css`
  background-color: #238636;

  &:before {
    transform: translateX(26px);
  }
`

const inputStyle = css`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2; /* Ensure the input is on top of the slider */
`

export type SwitchProps = {
  id: string
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({ id, value, onChange }) => {
  const handleChange = () => {
    onChange(!value)
  }

  return (
    <label className={switchStyle}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={noop}
        onClick={handleChange}
        className={inputStyle}
      />
      <span
        className={cx(sliderStyle, value ? checkedSliderStyle : undefined)}
      />
    </label>
  )
}
