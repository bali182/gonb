import { FC, useEffect, useMemo, useState } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { PagedModal, PagedModalButton } from '../PagedModal'
import { NumberSafeGeneratorConfig, SettingsPageProps } from './types'
import { useValidationIssues } from './useValidationIssues'
import { useSettingsPages } from './useSettingsPages'
import { useSettingsButtons } from './useSettingsButtons'
import { useDispatch, useSelector } from 'react-redux'
import { generatorSlice } from '../../state/generatorSlice'
import { AppDispatch } from '../../state/store'
import { SettingsPageId } from './SettingsPageId'
import { pagesSlice } from '../../state/pagesSlice'
import { GeneratorConfig } from '../../state/types'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const activePageId = useSelector(pagesSlice.selectors.selectSettingsPage)
  const configInState = useSelector(generatorSlice.selectSlice)
  const [config, setConfig] = useState<NumberSafeGeneratorConfig>(
    () => configInState,
  )

  const issues = useValidationIssues(config)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)

  const setActivePage = (page: SettingsPageId) =>
    dispatch(pagesSlice.actions.setSettingsPage(page))

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
          // This should be a proper Generator config, if validators pass.
          ...(config as GeneratorConfig),
          timeStamp: Date.now(),
        }),
      )
      onClose()
    }
  }

  return (
    <PagedModal<SettingsPageId, SettingsPageProps>
      icon={PiGearBold}
      title={t('Settings.Settings')}
      pages={pages}
      activePageId={activePageId}
      pageProps={pageProps}
      setActivePage={setActivePage}
      buttons={buttons}
      onClick={onSave}
      onClose={onClose}
    />
  )
}
