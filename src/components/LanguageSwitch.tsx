import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { noop } from '../common/utils'
import { Language } from '../state/types'
import { svgToDataUri } from './utils'

const HungarianFlag =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-hu" viewBox="0 0 640 480">
  <g fill-rule="evenodd">
    <path fill="#fff" d="M640 480H0V0h640z"/>
    <path fill="#388d00" d="M640 480H0V320h640z"/>
    <path fill="#d43516" d="M640 160.1H0V.1h640z"/>
  </g>
</svg>`)

const UnitedKingdomFlag =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
  <path fill="#012169" d="M0 0h640v480H0z"/>
  <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
  <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
  <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
  <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
</svg>`)

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
  background-image: url('${HungarianFlag}');
`

const checkedSliderStyle = cx(
  sliderStyle,
  css`
    background-image: url('${UnitedKingdomFlag}');
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
