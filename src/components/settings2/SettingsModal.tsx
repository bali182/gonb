import { FC, useMemo, useState } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { useSettingsButtons, useSettingsPages } from './settingsModalData'
import { PagedModal, PagedModalButton } from '../PagedModal'
import { SettingsPageProps } from './types'
import { Clef, Duration, KeySignature } from '../../model/common'
import { SIX_STRING_GUITAR } from './controls/NotePresetPicker/presets'
import { GeneratorConfig2 } from '../../state/types'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const pages = useSettingsPages()
  const buttons = useSettingsButtons()
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)
  const { t } = useTranslation()

  const [value, setValue] = useState<GeneratorConfig2>(() => ({
    bars: 4,
    bpm: 60,
    clef: Clef.TREBLE,
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    noteDurations: [Duration.QUARTER],
    restDurations: [Duration.QUARTER],
    notes: SIX_STRING_GUITAR,
  }))

  const pageProps = useMemo(
    (): SettingsPageProps => ({
      onChange: setValue,
      onClose: onClose,
      value,
    }),
    [value, setValue, onClose],
  )

  // TODO write to store, in state for now
  const onSave = (button: PagedModalButton) => {
    if (button.id === 'save') {
      console.log('Saving', value)
    } else {
      console.log('Testing', value)
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
