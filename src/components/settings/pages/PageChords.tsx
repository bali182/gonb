import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'
import { Switch } from '../controls/Switch'

export const PageChords: FC<SettingsPageProps> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const onShowSymbolsChanged = (showChordSymbols: boolean) => {
    onChange({ ...value, showChordSymbols })
  }

  const onShowChordsStaffChanged = (showChordsStaff: boolean) => {
    onChange({ ...value, showChordsStaff })
  }

  const onUseSeventhChordsChanged = (useSeventhChords: boolean) => {
    onChange({ ...value, useSeventhChords })
  }

  return (
    <>
      <Section>
        <Label>{t('Settings.ShowChordLabels')}</Label>
        <Description>{t('Settings.ShowChordLabelsDescription')}</Description>
        <Switch
          id="show-chords"
          value={Boolean(value.showChordSymbols)}
          onChange={onShowSymbolsChanged}
        />
      </Section>
      <Section>
        <Label>{t('Settings.ShowChordsStaff')}</Label>
        <Description>{t('Settings.ShowChordsStaffDescription')}</Description>
        <Switch
          id="show-chords"
          value={Boolean(value.showChordsStaff)}
          onChange={onShowChordsStaffChanged}
        />
      </Section>
      <Section>
        <Label>{t('Settings.SeventhChords')}</Label>
        <Description>{t('Settings.SeventhChordsDescription')}</Description>
        <Switch
          id="seventh-chords"
          value={Boolean(value.useSeventhChords)}
          onChange={onUseSeventhChordsChanged}
        />
      </Section>
    </>
  )
}
