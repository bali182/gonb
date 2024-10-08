import { css } from '@emotion/css'
import { FC } from 'react'
import { StickLogo } from './StickLogo'
import { Button } from './Button'
import { PiGearFill, PiFastForwardFill, PiQuestion } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  width: 100%;
  padding: 20px 200px;
`

const buttonsContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const helpButtonStyle = css`
  margin-left: 20px;
`

type ToolbarProps = {
  onRegenerate: () => void
  onOpenSettings: () => void
  onOpenHelp: () => void
}

export const Toolbar: FC<ToolbarProps> = ({
  onRegenerate,
  onOpenSettings,
  onOpenHelp,
}) => {
  const { t } = useTranslation()
  return (
    <div className={toolbarStyle}>
      <StickLogo />
      <div className={buttonsContainer}>
        <Button onClick={onRegenerate}>
          <PiFastForwardFill />
          {t('Menu.GenerateNew')}
        </Button>
        <Button onClick={onOpenSettings}>
          <PiGearFill />
          {t('Menu.Settings')}
        </Button>
        <Button onClick={onOpenHelp} className={helpButtonStyle}>
          <PiQuestion />
          {t('Menu.Help')}
        </Button>
      </div>
    </div>
  )
}
