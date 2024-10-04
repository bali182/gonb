import { css } from '@emotion/css'
import { FC } from 'react'
import { StickLogo } from './StickLogo'
import { Button } from './Button'
import { PiGearFill } from 'react-icons/pi'

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

type ToolbarProps = {
  onRegenerate: () => void
  onOpenSettings: () => void
}

export const Toolbar: FC<ToolbarProps> = ({ onRegenerate, onOpenSettings }) => {
  return (
    <div className={toolbarStyle}>
      <StickLogo />
      <div className={buttonsContainer}>
        <Button onClick={onRegenerate}>Generate</Button>
        <Button onClick={onOpenSettings}>
          <PiGearFill />
          Settings
        </Button>
      </div>
    </div>
  )
}
