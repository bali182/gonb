import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  color: #ffffff;
  padding: 5px 14px 5px 12px;
  gap: 6px;
  cursor: pointer;
  height: 40px;
  font-size: 1.2em;
  border-radius: 20px;
  background-color: transparent;
  background-color: #444;
  &:hover {
    color: #ffffff;
    background-color: #333;
  }
  &:disabled {
    background-color: #888;
    color: #ddd;
    cursor: not-allowed;
  }
`

export type ButtonProps = PropsWithChildren & {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      className={cx(buttonStyle, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
