import { css, cx } from '@emotion/css'
import { FC, InputHTMLAttributes } from 'react'
import { bodyTextStyle } from '../../../constants'

const inputStyle = cx(
  bodyTextStyle,
  css`
    border-radius: 6px;
    background-color: #00000010;
    flex: 1;
    color: #000000;
    border: none;
    outline: none;
    padding: 10px 14px;
    &:hover {
      background-color: #00000015;
    }
    &:focus {
      background-color: #00000020;
    }
  `,
)

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={cx(inputStyle, className)} {...props} />
}
