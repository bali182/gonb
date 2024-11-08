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
`

const checkedSliderStyle = css`
  background-color: #238636;
`

const disabledSliderStyle = css`
  cursor: not-allowed;
`

const thumbStyle = css`
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  transition: 0.4s;
  border-radius: 50%;
  background-color: #ffffff;
`

const checkedThumbStyle = css`
  transform: translateX(26px);
`

const disabledThumbStyle = css`
  background-color: #ffffff80;
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
  &:disabled {
    cursor: not-allowed;
  }
`

export type SwitchProps = {
  id: string
  value: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({ id, value, disabled, onChange }) => {
  const handleChange = () => {
    if (disabled) {
      return
    }
    onChange(!value)
  }

  const sliderClassName = cx({
    [sliderStyle]: true,
    [checkedSliderStyle]: value,
    [disabledSliderStyle]: disabled,
  })

  const thumbClassName = cx({
    [thumbStyle]: true,
    [checkedThumbStyle]: value,
    [disabledThumbStyle]: disabled,
  })

  return (
    <label className={switchStyle}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={noop}
        onClick={handleChange}
        className={inputStyle}
      />
      <span className={sliderClassName} />
      <span className={thumbClassName} />
    </label>
  )
}
