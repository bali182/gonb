import { css, cx } from '@emotion/css'
import { FC, HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'
import alphaTabLogo from './svg/alphaTabLogo.svg?base64-data-uri'
import { PiGithubLogoBold } from 'react-icons/pi'

const alphaTabLogoStyle = css`
  width: 120px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`

const alphaTabLinkStyle = css`
  margin-bottom: 18px;
`

const githubLinkStyle = css`
  color: #ffffffaa;
  &:hover {
    color: #ffffff;
  }
  display: flex;
  flex-direction: row;
  gap: 1px;
  align-items: center;
  font-size: 1.3em;
`

const labelStyle = css`
  visibility: hidden;
  font-size: 0.8em;
  line-height: 100%;
  color: #ffffff99;
  @media (min-width: 1080px) {
    visibility: visible;
  }
`

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75%;
  gap: 2px;
  cursor: pointer;
  transition: opacity 0.2s ease;
`

export const SVGAlphaTabLogo: FC<HTMLProps<HTMLElement>> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div className={cx(wrapperStyle, className)}>
      <span className={labelStyle}>{t('Score.AlphaTabRenderedBy')}</span>
      <a href="https://alphatab.net" className={alphaTabLinkStyle}>
        <img src={alphaTabLogo} className={alphaTabLogoStyle} />
      </a>
      <span className={labelStyle}>{t('Score.Issues')}</span>
      <a
        href="https://github.com/bali182/sheet/issues/new"
        className={githubLinkStyle}
      >
        <PiGithubLogoBold /> Github
      </a>
    </div>
  )
}
