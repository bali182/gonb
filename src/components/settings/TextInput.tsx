import { css } from '@emotion/css'
import React, { FC, InputHTMLAttributes } from 'react'
import { EditorProps } from './types'

const inputStyle = css`
  border-radius: 6px;
  background-color: #ffffff10;
  flex: 1;
  color: #ffffff;
  border: none;
  outline: none;
  padding: 10px 14px;
  font-size: 1em;
  &:hover {
    background-color: #ffffff30;
  }
  &:focus {
    background-color: #ffffff50;
  }
`

export const TextInput: FC<EditorProps<string, InputHTMLAttributes<any>>> = ({
  id,
  value,
  onChange,
  data,
}) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <input
      type="text"
      className={inputStyle}
      {...(data ?? {})}
      id={id}
      value={value}
      onChange={_onChange}
    />
  )
}
