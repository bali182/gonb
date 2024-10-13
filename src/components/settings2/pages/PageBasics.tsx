import { FC, useState } from 'react'
import { NotesGrid } from '../controls/NotesGrid/NotesGrid'
import { NotePresetPicker } from '../controls/NotePresetPicker/NotePresetPicker'
import { useTranslation } from 'react-i18next'
import { Section, Description, Label } from '../controls/InputSectionPrimitives'

export const PageBasics: FC = () => {
  const { t } = useTranslation()
  const [notes, setNotes] = useState(() => ['C2', 'D2', 'E3', 'G4'])
  return (
    <>
      <Section>
        <Label>{t('Settings.NotesPreset')}</Label>
        <Description>{t('Settings.NotesPresetDescription')}</Description>
        <NotePresetPicker value={notes} onChange={setNotes} id="presets" />
      </Section>
      <Section>
        <Label>{t('Settings.Notes')}</Label>
        <Description>{t('Settings.NotesDescription')}</Description>
        <NotesGrid value={notes} onChange={setNotes} />
      </Section>
    </>
  )
}
