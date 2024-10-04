import { FC, useMemo } from 'react'
import { EditorProps, SelectItem } from './types'
import Select from 'react-select'
import { defaultComponents, defaultStyles } from './DropdownProxy'

function wrap(input: string): SelectItem<string> {
  return { label: input, value: input }
}

export const MultiDropdown: FC<
  EditorProps<string[], { values: string[] | undefined }>
> = ({ id, value, data, onChange }) => {
  const _onChange = (e: SelectItem<string>[]) => {
    onChange(e.map(({ value }) => value))
  }
  const wrappedValues = useMemo(
    () => (data?.values ?? []).map(wrap),
    [data?.values],
  )
  const selectedValues = useMemo(() => (value ?? []).map(wrap), [value])

  return (
    <Select
      isMulti={true}
      inputId={id}
      value={selectedValues}
      options={wrappedValues}
      styles={defaultStyles}
      components={defaultComponents}
      onChange={_onChange as any}
    />
  )
}

export const Dropdown: FC<
  EditorProps<string, { values: string[] | undefined }>
> = ({ id, value, data, onChange }) => {
  const _onChange = (e: SelectItem<string>) => {
    onChange(e.value)
  }
  const wrappedValues = useMemo(
    () => (data?.values ?? []).map(wrap),
    [data?.values],
  )
  const wrappedValue = useMemo(() => {
    return wrappedValues.find((v) => v.value === value)
  }, [wrappedValues, value])

  return (
    <Select
      inputId={id}
      value={wrappedValue}
      options={wrappedValues}
      styles={defaultStyles}
      components={defaultComponents}
      onChange={_onChange as any}
    />
  )
}
