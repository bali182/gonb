import { FC } from 'react'
import { NotesGrid } from '../controls/NotesGrid/NotesGrid'
import { NotePresetPicker } from '../controls/NotePresetPicker/NotePresetPicker'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'
import { SettingsPageProps } from '../types'

export const PageNotes: FC<SettingsPageProps> = ({
  value,
  issues,
  onChange,
}) => {
  const { t } = useTranslation()
  const setNotes = (notes: string[]) => onChange({ ...value, notes })

  return (
    <>
      <Section>
        <Label>{t('Settings.NotesPreset')}</Label>
        <Description>{t('Settings.NotesPresetDescription')}</Description>
        <NotePresetPicker value={value.notes} onChange={setNotes} />
      </Section>
      <Section>
        <Label>{t('Settings.Notes')}</Label>
        <Description issue={issues.notes}>
          {t('Settings.NotesDescription')}
        </Description>
        <NotesGrid value={value.notes} onChange={setNotes} />
      </Section>
    </>
  )
}
