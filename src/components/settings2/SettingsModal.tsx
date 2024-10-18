import { FC, useMemo, useState } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { useSettingsPages } from './useSettingsPages'
import { PagedModal } from '../PagedModal'
import { FullConfig, SettingsPageProps } from './types'
import { Clef, Duration, KeySignature } from '../../model/common'
import { SIX_STRING_GUITAR } from './controls/NotePresetPicker/presets'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const pages = useSettingsPages()
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)
  const { t } = useTranslation()
  const [value, setValue] = useState<FullConfig>(() => ({
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
  const onSave = () => {
    console.log(value)
  }

  return (
    <PagedModal<SettingsPageProps>
      onSave={onSave}
      icon={PiGearBold}
      activePage={activePage}
      title={t('Settings.Settings')}
      setActivePage={setActivePage}
      pages={pages}
      onClose={onClose}
      pageProps={pageProps}
    />
  )
}
