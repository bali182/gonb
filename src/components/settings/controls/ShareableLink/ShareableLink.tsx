import { css, cx } from '@emotion/css'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCheckBold, PiWarningCircleBold } from 'react-icons/pi'
import { isNil } from '../../../../common/utils'
import { smallTextStyle } from '../../../constants'

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

const urlStyle = cx(
  smallTextStyle,
  css`
    font-weight: bold;
    word-break: break-all;
  `,
)

const descriptionStyle = cx(
  smallTextStyle,
  css`
    display: flex;
    gap: 4px;
    color: #00000090;
  `,
)

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
  url: string | undefined
  disabled: boolean
}

export const ShareableLink: FC<ShareableLinkProps> = ({ url, disabled }) => {
  const [isCopied, setCopied] = useState<boolean | undefined>(undefined)

  const onClick = () => {
    if (!isNil(url)) {
      navigator.clipboard
        .writeText(url)
        .then(() => setCopied(true))
        .catch(() => setCopied(false))
    }
  }

  if (disabled) {
    return null
  }

  return (
    <div className={boxStyle} onClick={onClick}>
      <span className={urlStyle}>{url}</span>
      <CopyDescription isCopied={isCopied} />
    </div>
  )
}
