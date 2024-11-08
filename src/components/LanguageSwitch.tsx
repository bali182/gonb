import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { noop } from '../common/utils'
import { Language } from '../state/types'
import huFlag from './svg/hu.svg'
import ukFlag from './svg/gb.svg'

const switchStyle = css`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 40px;
  overflow: hidden;
`

const sliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110%;
  background-image: url('${huFlag}');
`

const checkedSliderStyle = cx(
  sliderStyle,
  css`
    background-image: url('${ukFlag}');
  `,
)

const thumbStyle = css`
  position: absolute;
  content: '';
  height: 32px;
  width: 32px;
  left: 4px;
  bottom: 4px;
  transition: 0.4s;
  border-radius: 50%;
  background-color: #ffffff;
`

const checkedThumbStyle = cx(
  thumbStyle,
  css`
    transform: translateX(20px);
  `,
)

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

const baseGradientStyle = css`
  position: absolute;
  pointer-events: none;
  border-radius: 26px;
  transition: 0.4s;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
`

const gradientStyle = cx(
  baseGradientStyle,
  css`
    background: linear-gradient(90deg, #444 0%, transparent 100%);
  `,
)

const checkedGradientStyle = cx(
  baseGradientStyle,
  css`
    background: linear-gradient(270deg, #444 0%, transparent 100%);
  `,
)

export type LanguageSwitchProps = {
  language: Language
  onChange: (language: Language) => void
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({
  language,
  onChange,
}) => {
  const isChecked = language === Language.English

  const handleChange = () => {
    const newIsChecked = !isChecked
    const newLanguage = newIsChecked ? Language.English : Language.Hungarian
    onChange(newLanguage)
  }

  return (
    <label className={switchStyle}>
      <div className={isChecked ? checkedSliderStyle : sliderStyle} />
      <div className={isChecked ? checkedGradientStyle : gradientStyle} />
      <div className={isChecked ? checkedThumbStyle : thumbStyle} />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={noop}
        onClick={handleChange}
        className={inputStyle}
      />
    </label>
  )
}
