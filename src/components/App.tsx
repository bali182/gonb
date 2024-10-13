import { FC, useState } from 'react'
import { Score } from './Score'
import { Toolbar } from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'
import { HelpModal } from './help/HelpModal'
import { SettingsModal as SettingsModal2 } from './settings2/SettingsModal'
import { SettingsModal } from './settings/SettingsModal'

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)

  const [showSettings, setShowSettings] = useState(false)
  const [showSettings2, setShowSettings2] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const onSettingsClosed = () => setShowSettings(false)
  const onSettingsOpened = () => setShowSettings(true)

  const onSettingsClosed2 = () => setShowSettings2(false)
  const onSettingsOpened2 = () => setShowSettings2(true)

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
        onOpenSettings2={onSettingsOpened2}
        onRegenerate={onRegenerate}
        onOpenHelp={onHelpOpened}
      />
      <Score />
      {showHelp && <HelpModal onClose={onHelpClosed} />}
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
      {showSettings2 && <SettingsModal2 onClose={onSettingsClosed2} />}
    </>
  )
}
