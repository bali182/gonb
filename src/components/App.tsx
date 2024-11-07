import { FC, useEffect, useState } from 'react'
import { Score } from './Score'
import { Toolbar } from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../state/store'
import { generatorSlice } from '../state/generatorSlice'
import { HelpModal } from './help/HelpModal'
import { SettingsModal } from './settings/SettingsModal'
import { isNil } from '../common/utils'
import { fromUrl } from '../url/url'
import { useTranslation } from 'react-i18next'
import { languageSlice } from '../state/languageSlice'
import { Language } from '../state/types'

export const App: FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const storedLanguage = useSelector(languageSlice.selectSlice)
  const language = (
    isNil(storedLanguage) ? i18n.language : storedLanguage
  ) as Language

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

  const onLanguageChange = (language: Language) => {
    dispatch(languageSlice.actions.setLanguage(language))
  }

  useEffect(() => {
    const configFromUrl = fromUrl(window.location.href)
    if (!isNil(configFromUrl)) {
      dispatch(generatorSlice.actions.setGeneratorConfig(configFromUrl))
    }
    const withoutQuery = window.location.origin + window.location.pathname
    window.history.replaceState({}, document.title, withoutQuery)
  }, [])

  useEffect(() => {
    if (!isNil(storedLanguage)) {
      i18n.changeLanguage(storedLanguage, () => onRegenerate())
    }
  }, [storedLanguage])

  return (
    <>
      <Toolbar
        language={language}
        onOpenSettings={onSettingsOpened}
        onRegenerate={onRegenerate}
        onOpenHelp={onHelpOpened}
        onLanguageChange={onLanguageChange}
      />
      <Score />
      {showHelp && <HelpModal onClose={onHelpClosed} />}
      {showSettings && <SettingsModal onClose={onSettingsClosed} />}
    </>
  )
}
