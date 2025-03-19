import { css } from '@emotion/css'
import { FC } from 'react'
import gonb from './svg/gonb.svg?base64-data-uri'
import { useTranslation } from 'react-i18next'
import { IS_MOBILE_QUERY, useIsMobile } from './useIsMobile'

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
    gap: 14px;
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
    width: 120px;
  }
  width: 100px;
`

const titleStyle = css`
  color: #000;
  font-size: 2.3rem;
  @media ${IS_MOBILE_QUERY} {
    font-size: 2rem;
  }
  font-weight: bold;
  line-height: 90%;
  margin: 0px;
`

const sloganStyle = css`
  color: #00000099;
  font-size: 0.8rem;
  line-height: 90%;
  font-weight: normal;
  white-space: nowrap;
`

export const Logo: FC = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return (
    <span className={logoBlockStyle}>
      <img src={gonb} className={titleIconStyle} />
      <span className={logoTextStyle}>
        <h1 className={titleStyle}>{t('Logo.Name')}</h1>
        {!isMobile && <h2 className={sloganStyle}>{t('Logo.Slogan')}</h2>}
      </span>
    </span>
  )
}
