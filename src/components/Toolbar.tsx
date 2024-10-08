import { css } from '@emotion/css'
import { FC } from 'react'
import { StickLogo } from './StickLogo'
import { Button } from './Button'
import { PiGearFill, PiFastForwardFill, PiQuestion } from 'react-icons/pi'

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
  return (
    <div className={toolbarStyle}>
      <StickLogo />
      <div className={buttonsContainer}>
        <Button onClick={onRegenerate}>
          <PiFastForwardFill />
          Generate new
        </Button>
        <Button onClick={onOpenSettings}>
          <PiGearFill />
          Settings
        </Button>
        <Button onClick={onOpenHelp} className={helpButtonStyle}>
          <PiQuestion />
          Help
        </Button>
      </div>
    </div>
  )
}
