import { FC, useState } from 'react'
import { css } from '@emotion/css'
import { Score } from './Score'
import { SettingsModal } from './settings/SettingsModal'

const appStyle = css``

export const App: FC = () => {
  const [showSettings, setShowSettings] = useState(true)

  const onSettingsClosed = () => setShowSettings(false)

  return (
    <>
      <Score />
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
    </>
  )
}
