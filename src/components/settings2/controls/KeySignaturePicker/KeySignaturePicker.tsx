import { FC, useMemo } from 'react'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { defaultComponents, defaultStyles } from '../dropdownStyles'
import { KeySignature } from '../../../../model/common'
import { useKeySignatures } from './useKeySignatures'
import { isNil } from '../../../../model/utils'

export type KeySignaturePickerProps = {
  value: KeySignature
  onChange: (value: KeySignature) => void
}

export const KeySignaturePicker: FC<KeySignaturePickerProps> = ({
  value,
  onChange: _onChange,
}) => {
  const keySignatures = useKeySignatures()

  const selectedKeySignature = useMemo(
    () => keySignatures.find((item) => item.value === value),
    [value, keySignatures],
  )

  const onChange = (item: SelectItem<KeySignature> | null) => {
    if (!isNil(item)) {
      _onChange(item.value)
    }
  }

  return (
    <Select<SelectItem<KeySignature>>
      inputId="key-signature-picker"
      value={selectedKeySignature}
      options={keySignatures}
      styles={defaultStyles}
      components={defaultComponents}
      onChange={onChange}
    />
  )
}
