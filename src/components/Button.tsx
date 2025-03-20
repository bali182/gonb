import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { IS_MOBILE_QUERY } from './useIsMobile'

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
  font-size: 1.2rem;
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

  @media ${IS_MOBILE_QUERY} {
    height: 100px;
    font-size: 1.8rem;
    border-radius: 50px;
    padding: 10px 24px 10px 20px;
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
