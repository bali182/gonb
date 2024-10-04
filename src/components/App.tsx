import { FC, useState } from 'react'
import { Score } from './Score'
import { SettingsModal } from './settings/SettingsModal'
import { Toolbar } from './Toolbar'
import { noop } from '../model/utils'

export const App: FC = () => {
  const [showSettings, setShowSettings] = useState(false)

  const onSettingsClosed = () => setShowSettings(false)
  const onSettingsOpened = () => setShowSettings(true)

  return (
    <>
      <Toolbar onOpenSettings={onSettingsOpened} onRegenerate={noop} />
      <Score />
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
    </>
  )
}
