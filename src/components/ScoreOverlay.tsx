import { css, cx } from '@emotion/css'
import { FC } from 'react'
import { Spinner } from './Spinner'
import { bodyTextStyle } from './constants'
import { useTranslation } from 'react-i18next'

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

export const scoreOverlayContentStyle = cx(
  bodyTextStyle,
  css`
    color: #ffffff;
  `,
)

export const ScoreOverlay: FC<TabOverlayProps> = ({ isVisible }) => {
  const { t } = useTranslation()

  if (!isVisible) {
    return null
  }

  return (
    <div className={scoreOvelayStyle}>
      <Spinner />
      <div className={scoreOverlayContentStyle}>{t('Score.Loading')}</div>
    </div>
  )
}
