import { FC, useState } from 'react'
import { Score } from './Score'
import { SettingsModal } from './settings/SettingsModal'
import { Toolbar } from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(
    generatorSlice.selectors.getGeneratorConfig,
  )

  const [showSettings, setShowSettings] = useState(false)

  const onSettingsClosed = () => setShowSettings(false)
  const onSettingsOpened = () => setShowSettings(true)
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
      <Toolbar onOpenSettings={onSettingsOpened} onRegenerate={onRegenerate} />
      <Score />
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
    </>
  )
}
