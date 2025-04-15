import { FC, useMemo } from 'react'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { useDurationFrequencies } from './getDurationFrequencies'
import { isNil } from '../../../../common/utils'
import { DurationFrequency } from '../../../../common/durationFrequency'
import {
  durationFrequencyPickerClassNames,
  durationFrequencyPickerComponents,
} from './styling'

export type DurationFrequencyPickerProps = {
  value: DurationFrequency
  onChange: (value: DurationFrequency) => void
}

export const DurationFrequencyPicker: FC<DurationFrequencyPickerProps> = ({
  value,
  onChange: _onChange,
}) => {
  const frequencies = useDurationFrequencies()

  const selectedFrequency = useMemo(
    () => frequencies.find((item) => item.value === value),
    [value, frequencies],
  )

  const onChange = (item: SelectItem<DurationFrequency> | null) => {
    if (!isNil(item)) {
      _onChange(item.value)
    }
  }

  return (
    <Select<SelectItem<DurationFrequency>>
      inputId="duration-frequency-picker"
      menuPosition="fixed"
      value={selectedFrequency}
      options={frequencies}
      classNames={durationFrequencyPickerClassNames}
      components={durationFrequencyPickerComponents}
      onChange={onChange}
    />
  )
}
