import { ChangeEvent, FC } from 'react'
import { Input } from './Input'
import { isNil } from '../../../../common/utils'

export type NumberInputProps = {
  value: number | undefined
  min: number
  max: number
  step: number
  onChange: (value: number | undefined) => void
}

export const NumberInput: FC<NumberInputProps> = ({
  value,
  min,
  max,
  step,
  onChange: _onChange,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.valueAsNumber
    _onChange(isNil(num) || Number.isNaN(num) ? undefined : num)
  }
  return (
    <Input
      type="number"
      value={value ?? ''}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  )
}
