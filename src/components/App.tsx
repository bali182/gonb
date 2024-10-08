import { FC, useState } from 'react'
import { Score } from './Score'
import { SettingsModal } from './settings/SettingsModal'
import { Toolbar } from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'
import { HelpModal } from './help/HelpModal'

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)

  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const onSettingsClosed = () => setShowSettings(false)
  const onSettingsOpened = () => setShowSettings(true)

  const onHelpClosed = () => setShowHelp(false)
  const onHelpOpened = () => setShowHelp(true)

  const onRegenerate = () => {
    dispatch(
      generatorSlice.actions.setGeneratorConfig({
        ...generatorConfig,
        timestamp: new Date().getTime(),
      }),
    )
  }

  return (
    <>
      <Toolbar
        onOpenSettings={onSettingsOpened}
        onRegenerate={onRegenerate}
        onOpenHelp={onHelpOpened}
      />
      <Score />
      {showHelp && <HelpModal onClose={onHelpClosed} />}
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
    </>
  )
}
