import { css, cx } from '@emotion/css'
import { FC, useState } from 'react'
import { PiGear, PiX } from 'react-icons/pi'
import { DrilldownMenu } from './DrilldownMenu'
import { useSettingsPages } from '../useSettingsPages'
import { NumberSafeGeneratorConfig } from '../types'
import { useSelector } from 'react-redux'
import { generatorSlice } from '../../../state/generatorSlice'
import { useValidationIssues } from '../useValidationIssues'
import { useSettingsButtons } from '../useSettingsButtons'
import { noop } from '../../../common/utils'
import { useTranslation } from 'react-i18next'
import { MobileSettingsPage } from './MobileSettingsPage'
import { VolumeControls } from '../../VolumeControls'

const headerButtonContainerStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 3rem;
`

export const HamburgerMenu: FC = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={headerButtonContainerStyle}>
      <PiGear onClick={() => setOpen(!isOpen)} />
      <Menu isOpen={isOpen} setOpen={setOpen} />
    </div>
  )
}

type MenuProps = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const Menu: FC<MenuProps> = ({ isOpen, setOpen }) => {
  const { t } = useTranslation()
  const configInState = useSelector(generatorSlice.selectSlice)
  const [config, setConfig] = useState<NumberSafeGeneratorConfig>(
    () => configInState,
  )
  const issues = useValidationIssues(config)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)

  const onClose = () => setOpen(false)

  return (
    <MobileSettingsPage
      titles={[t('Settings.Settings'), 'Basic Settings']}
      isOpen={isOpen}
      buttons={buttons}
      onBack={noop}
      onClose={onClose}
      onClick={noop}
    >
      <DrilldownMenu pages={pages} onClick={noop} />
      <VolumeControls />
    </MobileSettingsPage>
  )
}
