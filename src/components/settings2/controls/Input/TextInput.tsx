import { ChangeEvent, FC } from 'react'
import { Input } from './Input'

export type TextInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TextInput: FC<TextInputProps> = ({
  value,
  onChange: _onChange,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange(e.target.value)
  }
  return <Input value={value} onChange={onChange} type="text" />
}
