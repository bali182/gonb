import { FC, useEffect, useState } from 'react'
import { Score } from './Score'
import { Toolbar } from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'
import { HelpModal } from './help/HelpModal'
import { SettingsModal } from './settings/SettingsModal'
import { fromUrl } from '../common/url'
import { isNil } from '../common/utils'

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
        timeStamp: new Date().getTime(),
      }),
    )
  }

  useEffect(() => {
    const gcFromUrl = fromUrl(window.location.href)
    if (!isNil(gcFromUrl)) {
      dispatch(generatorSlice.actions.setGeneratorConfig(gcFromUrl))
    }
    const withoutQuery = window.location.origin + window.location.pathname
    window.history.replaceState({}, document.title, withoutQuery)
  }, [])

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
