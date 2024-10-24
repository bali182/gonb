import { FC, useEffect, useMemo, useState } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { PagedModal, PagedModalButton } from '../PagedModal'
import { SettingsPageProps } from './types'
import { useValidationIssues } from './useValidationIssues'
import { useSettingsPages } from './useSettingsPages'
import { useSettingsButtons } from './useSettingsButtons'
import { useDispatch, useSelector } from 'react-redux'
import { generatorSlice } from '../../state/generatorSlice'
import { AppDispatch } from '../../state/store'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const configInState = useSelector(generatorSlice.selectSlice)
  const [config, setConfig] = useState(() => configInState)

  const issues = useValidationIssues(config)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)

  useEffect(() => setConfig(configInState), [configInState])

  const pageProps = useMemo(
    (): SettingsPageProps => ({
      onChange: setConfig,
      onClose: onClose,
      value: config,
      issues,
    }),
    [setConfig, onClose, config, issues],
  )

  const onSave = (button: PagedModalButton) => {
    if (button.id === 'save') {
      dispatch(
        generatorSlice.actions.setGeneratorConfig({
          ...config,
          timeStamp: Date.now(),
        }),
      )
      onClose()
    }
  }

  return (
    <PagedModal<SettingsPageProps>
      icon={PiGearBold}
      title={t('Settings.Settings')}
      pages={pages}
      activePage={activePage}
      pageProps={pageProps}
      setActivePage={setActivePage}
      buttons={buttons}
      onClick={onSave}
      onClose={onClose}
    />
  )
}
