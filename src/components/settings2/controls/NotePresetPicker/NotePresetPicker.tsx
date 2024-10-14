import { FC, useMemo } from 'react'
import Select from 'react-select'
import { EditorProps, SelectItem } from '../../types'
import { defaultComponents, defaultStyles } from '../dropdownStyles'
import { useNotePresets } from './useNotePresets'
import { arraysEqual } from '../../../../model/utils'

export const NotePresetPicker: FC<EditorProps<string[], void>> = ({
  id,
  value,
  onChange: _onChange,
}) => {
  const presets = useNotePresets()

  const selectedPreset = useMemo(
    () =>
      presets.find(({ value: preset }) => arraysEqual(preset, value)) ?? null,
    [value, presets],
  )

  const onChange = (item: SelectItem<string[]>) => _onChange(item.value)

  return (
    <Select
      inputId={id}
      value={selectedPreset}
      options={presets}
      styles={defaultStyles}
      components={defaultComponents}
      onChange={onChange as any}
    />
  )
}
