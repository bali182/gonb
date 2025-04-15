import { FC } from 'react'
import { useClefModel } from './useClefModel'
import { Clef } from '../../../../common/clef'
import Select from 'react-select'
import { ClefModel } from './types'
import { clefPickerClassNames, clefPickerComponents } from './styling'
import { SelectItem } from '../../types'

export type ClefPickerProps = {
  value: Clef
  onChange: (clef: Clef) => void
}

export const ClefPicker: FC<ClefPickerProps> = ({ value, onChange }) => {
  const clefs = useClefModel().map(
    (model): SelectItem<ClefModel> => ({ label: model.label, value: model }),
  )
  const selectedClef = clefs.find((item) => item.value.clef === value)!

  const _onChange = (item: SelectItem<ClefModel> | null) => {
    onChange(item?.value?.clef!)
  }

  return (
    <Select<SelectItem<ClefModel>>
      inputId="duration-frequency-picker"
      menuPosition="fixed"
      value={selectedClef}
      options={clefs}
      classNames={clefPickerClassNames}
      components={clefPickerComponents}
      onChange={_onChange}
    />
  )
}
