import { css, cx } from '@emotion/css'
import { FC } from 'react'
import gonb from './svg/gonb.svg?base64-data-uri'
import { useTranslation } from 'react-i18next'
import { IS_MOBILE_QUERY } from './useIsMobile'
import {
  extraSmallTextStyle,
  headerStyle,
  MOBILE_TOOLBAR_HEIGHT,
} from './constants'

const logoBlockStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 60px;
  flex-shrink: 0;
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
  }
  user-select: none;

  gap: 8px;

  @media ${IS_MOBILE_QUERY} {
    gap: 8px;
  }
`

const logoTextStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const titleIconStyle = css`
  @media ${IS_MOBILE_QUERY} {
    max-width: 18vw;
    max-height: ${MOBILE_TOOLBAR_HEIGHT - 10}px;
    height: auto;
  }
  width: 100px;
`

const titleStyle = cx(
  headerStyle,
  css`
    line-height: 90%;
    margin: 0px;
  `,
)

const sloganStyle = cx(
  extraSmallTextStyle,
  css`
    color: #000000aa;
    line-height: 90%;
    font-weight: normal;
    white-space: nowrap;
  `,
)

export const Logo: FC = () => {
  const { t } = useTranslation()
  return (
    <span className={logoBlockStyle}>
      <img src={gonb} className={titleIconStyle} />
      <span className={logoTextStyle}>
        <h1 className={titleStyle}>{t('Logo.Name')}</h1>
        <h2 className={sloganStyle}>{t('Logo.Slogan')}</h2>
      </span>
    </span>
  )
}
