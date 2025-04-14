import { css } from '@emotion/css'
import { FC } from 'react'
import { PiGear } from 'react-icons/pi'
import { useAppContext } from '../../../context/useAppContext'
import { actionIconStyle } from '../../constants'

const containerStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ToolbarMenuMobile: FC = () => {
  const { isSettingsOpen, setSettingsOpen } = useAppContext()

  const onGearClick = () => {
    setSettingsOpen(!isSettingsOpen)
  }

  return (
    <div className={containerStyle}>
      <PiGear onClick={onGearClick} className={actionIconStyle} />
    </div>
  )
}
