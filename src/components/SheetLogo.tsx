import { css } from '@emotion/css'
import { FC } from 'react'
import gonb from './svg/gonb.svg?base64-data-uri'

const logoBlockStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-right: 60px;
  flex-shrink: 0;
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
  }
`

const logoTextStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const titleIconStyle = css`
  width: 100px;
`

const titleStyle = css`
  color: #000;
  font-size: 2.4em;
  font-weight: bold;
  line-height: 90%;
  margin: 0px;
`

const subTitleStyle = css`
  color: #00000099;
  font-size: 0.8em;
  line-height: 90%;
  font-weight: normal;
  white-space: nowrap;
`

export const SheetLogo: FC = () => {
  return (
    <span className={logoBlockStyle}>
      <img src={gonb} className={titleIconStyle} />
      <span className={logoTextStyle}>
        <h1 className={titleStyle}>Gonb</h1>
        <h2 className={subTitleStyle}>reading practice.</h2>
      </span>
    </span>
  )
}
