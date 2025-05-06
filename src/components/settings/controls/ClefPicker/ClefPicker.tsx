import { FC } from 'react'
import { useClefModel } from './useClefModel'
import { Clef } from '../../../../common/clef'
import Select from 'react-select'
import { ClefModel } from './types'
import { clefPickerComponents } from './styling'
import { SelectItem } from '../../types'
import { defaultClassNames } from '../dropdownStyles'

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
      isSearchable={false}
      menuPosition="fixed"
      value={selectedClef}
      options={clefs}
      classNames={defaultClassNames}
      components={clefPickerComponents}
      onChange={_onChange}
    />
  )
}
