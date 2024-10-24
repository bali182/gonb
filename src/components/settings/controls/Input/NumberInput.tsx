import { ChangeEvent, FC } from 'react'
import { Input } from './Input'

export type NumberInputProps = {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

export const NumberInput: FC<NumberInputProps> = ({
  value,
  min,
  max,
  step,
  onChange: _onChange,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange(e.target.valueAsNumber)
  }
  return (
    <Input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  )
}
