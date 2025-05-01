import { FC, useEffect, useState } from 'react'
import { MenuPage } from './MenuPage'
import { EditorPage } from './EditorPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../state/store'
import { generatorSlice } from '../../../state/generatorSlice'
import { PagedModalButton } from '../../types'
import { GeneratorConfig } from '../../../state/types'
import { useValidationIssues } from '../useValidationIssues'
import { useSettingsButtons } from '../useSettingsButtons'
import { useSettingsPages } from '../useSettingsPages'
import { NumberSafeGeneratorConfig, SettingsPage } from '../types'
import { useAppContext } from '../../../context/useAppContext'

export const MobileSettings: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const configInState = useSelector(generatorSlice.selectSlice)
  const { isSettingsOpen, setSettingsOpen } = useAppContext()

  const [activePage, setActivePage] = useState<SettingsPage | undefined>(
    undefined,
  )
  const [config, setConfig] = useState<NumberSafeGeneratorConfig>(
    () => configInState,
  )

  const issues = useValidationIssues(config)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)

  const closeMenu = () => {
    setSettingsOpen(false)
    setActivePage(undefined)
    setConfig(configInState)
  }

  const closeEditor = () => {
    setActivePage(undefined)
  }

  const onSave = (button: PagedModalButton) => {
    if (button.id === 'save') {
      dispatch(
        generatorSlice.actions.setGeneratorConfig({
          // This should be a proper Generator config, if validators pass.
          ...(config as GeneratorConfig),
          timeStamp: Date.now(),
        }),
      )
    }
    closeMenu()
  }

  useEffect(() => setActivePage(undefined), [isSettingsOpen])

  return (
    <>
      <MenuPage
        isOpen={isSettingsOpen}
        buttons={buttons}
        pages={pages}
        onClick={setActivePage}
        onClose={closeMenu}
        onButtonClick={onSave}
      />
      <EditorPage
        page={activePage}
        config={config}
        issues={issues}
        onBack={closeEditor}
        onChange={setConfig}
      />
    </>
  )
}
