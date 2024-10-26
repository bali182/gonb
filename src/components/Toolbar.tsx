import { css } from '@emotion/css'
import { FC } from 'react'
import { SheetLogo } from './SheetLogo'
import { Button } from './Button'
import { PiGearBold, PiFastForwardBold, PiQuestionBold } from 'react-icons/pi'
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
      <SheetLogo />
      <div className={buttonsContainer}>
        <Button onClick={onRegenerate}>
          <PiFastForwardBold />
          {t('Menu.GenerateNew')}
        </Button>
        <Button onClick={onOpenSettings}>
          <PiGearBold />
          {t('Menu.Settings')}
        </Button>
        <Button onClick={onOpenHelp} className={helpButtonStyle}>
          <PiQuestionBold />
          {t('Menu.Help')}
        </Button>
      </div>
    </div>
  )
}
