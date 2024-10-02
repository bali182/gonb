import { css, keyframes } from '@emotion/css'
import { FC } from 'react'

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const spinnerStyle = css`
  width: 60px;
  height: 60px;
  border: 7px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`

export const Spinner: FC = () => {
  return <span className={spinnerStyle}></span>
}
