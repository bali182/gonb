import { FC } from 'react'
import { EditorProps } from '../types'
import { RangePicker, RangePickerProps } from './RangePicker'

export const RangeInput: FC<
  EditorProps<[number, number], Pick<RangePickerProps, 'min' | 'max' | 'step'>>
> = ({ id, value, onChange, data }) => {
  const _onChange = (rangeStart: number, rangeEnd: number) => {
    onChange([rangeStart, rangeEnd])
  }
  const [rangeStart, rangeEnd] = value
  return (
    <RangePicker
      id={id}
      max={data?.max!}
      min={data?.min!}
      step={data?.step!}
      onChange={_onChange}
      rangeEnd={rangeEnd}
      rangeStart={rangeStart}
    />
  )
}
