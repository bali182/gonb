import { css } from '@emotion/css'
import { FC } from 'react'
import { Button } from './Button'
import { PiFastForwardBold, PiGearBold, PiQuestionBold } from 'react-icons/pi'
import { t } from 'i18next'
import { LanguageSwitch } from './LanguageSwitch'
import { ToolbarProps } from './Toolbar'

const buttonsContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`

const toolBarButtonStyle = css`
  overflow: hidden;
  flex: 0 1 auto;
`

const toolBarButtonLabelStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 0 1 auto;
`

const toolBarButtonIconStyle = css`
  flex-shrink: 0;
`

export const ToolbarMenuDesktop: FC<ToolbarProps> = ({
  language,
  onRegenerate,
  onOpenSettings,
  onOpenHelp,
  onLanguageChange,
}) => {
  return (
    <div className={buttonsContainer}>
      <Button onClick={onRegenerate} className={toolBarButtonStyle}>
        <PiFastForwardBold className={toolBarButtonIconStyle} />
        <span className={toolBarButtonLabelStyle}>{t('Menu.GenerateNew')}</span>
      </Button>
      <Button onClick={onOpenSettings} className={toolBarButtonStyle}>
        <PiGearBold className={toolBarButtonIconStyle} />
        <span className={toolBarButtonLabelStyle}> {t('Menu.Settings')}</span>
      </Button>
      <Button onClick={onOpenHelp} className={toolBarButtonStyle}>
        <PiQuestionBold className={toolBarButtonIconStyle} />
        <span className={toolBarButtonLabelStyle}> {t('Menu.Help')}</span>
      </Button>
      <LanguageSwitch onChange={onLanguageChange} language={language} />
    </div>
  )
}
