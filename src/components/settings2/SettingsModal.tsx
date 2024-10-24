import { FC, useMemo, useState } from 'react'
import { PiGearBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { PagedModal, PagedModalButton } from '../PagedModal'
import { SettingsPageProps } from './types'
import { KeySignature } from '../../common/keySignature'
import { Duration } from '../../common/duration'
import { Clef } from '../../common/clef'
import { GeneratorConfig2 } from '../../state/types'
import { useValidationIssues } from './useValidationIssues'
import { useSettingsPages } from './useSettingsPages'
import { useSettingsButtons } from './useSettingsButtons'
import { FOUR_STRING_BASS_UNFRETTED } from './controls/NotePresetPicker/presets'
import { getSong } from '../../generator/getSong'

export type SettingsModalProps = {
  onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation()

  const [value, setValue] = useState<GeneratorConfig2>(() => ({
    bars: 4,
    bpm: 60,
    clef: Clef.TREBLE,
    keySignature: KeySignature.C_MAJOR_A_MINOR,
    noteDurations: [Duration.QUARTER],
    restDurations: [Duration.QUARTER],
    notes: FOUR_STRING_BASS_UNFRETTED,
    timeStamp: Date.now(),
  }))

  const issues = useValidationIssues(value)
  const buttons = useSettingsButtons(issues)
  const pages = useSettingsPages(issues)
  const [activePage, setActivePage] = useState<string>(pages[0]!.id)

  const pageProps = useMemo(
    (): SettingsPageProps => ({
      onChange: setValue,
      onClose: onClose,
      value,
      issues,
    }),
    [value, setValue, onClose],
  )

  // TODO write to store, in state for now
  const onSave = (button: PagedModalButton) => {
    if (button.id === 'save') {
      console.log('Saving', value)
    } else {
      getSong(value)
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
