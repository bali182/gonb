// EditorProps<string[], { values: string[] | undefined }>

import { FC, useMemo } from 'react'
import { EditorProps, SelectItem } from '../../types'
import { Dropdown } from '../Dropdown'
import { useNotePresets } from './useNotePresets'
import { arraysEqual } from '../../../../model/utils'

export const NotePresetPicker: FC<EditorProps<string[], void>> = ({
  id,
  value,
  onChange: _onChange,
}) => {
  const values = useNotePresets()

  const selectedPreset = useMemo(
    () => values.find((v) => arraysEqual(v.value, value)),
    [value, values],
  )

  const onChange = (item: SelectItem<string[]>) => _onChange(item.value)

  return (
    <Dropdown
      id={id}
      value={selectedPreset!}
      data={{ values }}
      onChange={onChange}
    />
  )
}
