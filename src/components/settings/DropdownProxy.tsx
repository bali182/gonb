import { useMemo } from 'react'
import Select, {
  CSSObjectWithLabel,
  SelectComponentsConfig,
  StylesConfig,
} from 'react-select'
import { SelectItem } from './types'

export type DropdownProxyProps<T> = {
  id?: string
  value: T | undefined
  values: T[]
  placeholder?: string
  autoFocus?: boolean
  styles?: StylesConfig
  components?: SelectComponentsConfig<any, any, any>
  onChange: (value: T) => void
  getLabel?: (value: T) => string
}

export function DropdownProxy<T>({
  id,
  value,
  values,
  styles,
  components,
  autoFocus,
  placeholder,
  onChange,
  getLabel,
}: DropdownProxyProps<T>) {
  const _onChange = (e: SelectItem<T>) => {
    onChange(e.value)
  }

  const wrappedValues = useMemo(
    () =>
      values.map(
        (value): SelectItem<T> => ({
          label: getLabel ? getLabel(value) : (value as string),
          value,
        }),
      ),
    [values, getLabel],
  )

  const wrappedValue = useMemo(
    () => wrappedValues.find((v) => v.value === value),
    [wrappedValues, value],
  )

  return (
    <Select
      inputId={id}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={wrappedValue}
      options={wrappedValues}
      styles={styles}
      components={components}
      onChange={_onChange as any}
    />
  )
}

const fontChangeProps = (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
  ...provided,
  fontSize: '1em',
  color: '#ffffff',
})

export const defaultStyles: StylesConfig = {
  input: fontChangeProps,
  singleValue: fontChangeProps,
  menuList: (provided): CSSObjectWithLabel => ({
    ...fontChangeProps(provided),
    backgroundColor: '#181818',
  }),
  placeholder: fontChangeProps,
  control: (provided): CSSObjectWithLabel => ({
    ...provided,
    borderWidth: '0px',
    boxShadow: 'none',
    padding: '3px 6px',
    borderRadius: '6px',
    backgroundColor: '#ffffff10',
    ':hover': {
      backgroundColor: '#ffffff30',
    },
    ':focus': {
      backgroundColor: '#ffffff50',
    },
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    backgroundColor: isSelected
      ? '#ffffff40'
      : isFocused
      ? '#ffffff30'
      : 'transparent',
    ':active': {
      backgroundColor: '#ffffff30',
    },
  }),
  menu: (provided): CSSObjectWithLabel => ({
    ...provided,
    minWidth: '60px',
  }),
}

export const defaultComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
}
