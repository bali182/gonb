import { FC, useMemo } from 'react'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { defaultComponents, defaultStyles } from '../dropdownStyles'
import { useNotePresets } from './useNotePresets'
import { arraysEqual, isNil } from '../../../../model/utils'

export type NotePresetPicker = {
  value: string[]
  onChange: (value: string[]) => void
}

export const NotePresetPicker: FC<NotePresetPicker> = ({
  value,
  onChange: _onChange,
}) => {
  const presets = useNotePresets()

  const selectedPreset = useMemo(
    () =>
      presets.find(({ value: preset }) => arraysEqual(preset, value)) ?? null,
    [value, presets],
  )

  const onChange = (item: SelectItem<string[]> | null) => {
    if (!isNil(item)) {
      _onChange(item.value)
    }
  }

  return (
    <Select<SelectItem<string[]>>
      inputId="note-preset-picker"
      value={selectedPreset}
      options={presets}
      styles={defaultStyles}
      components={defaultComponents}
      onChange={onChange}
    />
  )
}
