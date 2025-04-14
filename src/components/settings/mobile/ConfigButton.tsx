import { css } from '@emotion/css'
import { FC, useState } from 'react'
import { PiGear } from 'react-icons/pi'
import { useSettingsPages } from '../useSettingsPages'
import { NumberSafeGeneratorConfig, SettingsPage } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { generatorSlice } from '../../../state/generatorSlice'
import { useValidationIssues } from '../useValidationIssues'
import { useSettingsButtons } from '../useSettingsButtons'
import { MenuPage } from './MenuPage'
import { EditorPage } from './EditorPage'
import { PagedModalButton } from '../../types'
import { AppDispatch } from '../../../state/store'
import { GeneratorConfig } from '../../../state/types'

const containerStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const gearIconStyle = css`
  font-size: clamp(1.8rem, 1.2vw, 2.5rem);
`

export const ConfigButton: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const configInState = useSelector(generatorSlice.selectSlice)

  const [isOpen, setOpen] = useState(false)
  const [activePage, setActivePage] = useState<SettingsPage | undefined>(
    undefined,
  )
  const [config, setConfig] = useState<NumberSafeGeneratorConfig>(
    () => configInState,
  )

  const issues = useValidationIssues(config)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)

  const onGearClick = () => {
    setOpen(!isOpen)
    setActivePage(undefined)
  }

  const closeMenu = () => {
    setOpen(false)
    setActivePage(undefined)
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

  return (
    <div className={containerStyle}>
      <PiGear onClick={onGearClick} className={gearIconStyle} />
      <MenuPage
        isOpen={isOpen}
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
    </div>
  )
}
