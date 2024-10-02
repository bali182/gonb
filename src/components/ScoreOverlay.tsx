import { css } from '@emotion/css'
import { FC } from 'react'
import { Spinner } from './Spinner'

export type TabOverlayProps = {
  isVisible: boolean
}

const scoreOvelayStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 3;

  backdrop-filter: blur(5px);
  background: #22222299;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

export const scoreOverlayContentStyle = css`
  color: #ffffff;
  font-size: 2em;
`

export const ScoreOverlay: FC<TabOverlayProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null
  }
  return (
    <div className={scoreOvelayStyle}>
      <Spinner />
      <div className={scoreOverlayContentStyle}>Score is loading...</div>
    </div>
  )
}
