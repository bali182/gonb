import { css } from '@emotion/css'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCheckBold, PiWarningCircleBold } from 'react-icons/pi'

const boxStyle = css`
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:hover {
    background-color: #00000010;
    border-radius: 8px;
  }
`

const urlStyle = css`
  font-size: 1em;
  font-weight: bold;
  word-break: break-all;
`

const descriptionStyle = css`
  display: flex;
  gap: 4px;
  font-size: 0.7em;
  color: #00000090;
`

type CopyDescriptionProps = {
  isCopied: boolean | undefined
}

const CopyDescription: FC<CopyDescriptionProps> = ({ isCopied }) => {
  const { t } = useTranslation()
  switch (isCopied) {
    case undefined:
      return (
        <span className={descriptionStyle}>{t('Settings.ClickToCopy')}</span>
      )
    case true:
      return (
        <span className={descriptionStyle}>
          <PiCheckBold />
          <span>{t('Settings.CopySuccess')}</span>
        </span>
      )
    case false:
      return (
        <span className={descriptionStyle}>
          <PiWarningCircleBold />
          <span>{t('Settings.CopyFailure')}</span>
        </span>
      )
  }
}

type ShareableLinkProps = {
  url: string
}

export const ShareableLink: FC<ShareableLinkProps> = ({ url }) => {
  const [isCopied, setCopied] = useState<boolean | undefined>(undefined)

  const onClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => setCopied(true))
      .catch(() => setCopied(false))
  }

  return (
    <div className={boxStyle} onClick={onClick}>
      <span className={urlStyle}>{url}</span>
      <CopyDescription isCopied={isCopied} />
    </div>
  )
}
