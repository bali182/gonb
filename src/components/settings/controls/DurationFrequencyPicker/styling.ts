import {
  CSSObjectWithLabel,
  SelectComponentsConfig,
  StylesConfig,
} from 'react-select'

const fontChangeProps = (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
  ...provided,
  fontSize: '0.9rem',
  color: '#000000',
})

export const durationFrequencyPickerStyles: StylesConfig<any, any, any> = {
  input: fontChangeProps,
  singleValue: (provided): CSSObjectWithLabel => ({
    ...fontChangeProps(provided),
    overflow: 'visible',
  }),
  menuList: (provided): CSSObjectWithLabel => ({
    ...fontChangeProps(provided),
    backgroundColor: '#ffffff',
  }),
  valueContainer: (provided): CSSObjectWithLabel => ({
    ...provided,
    paddingRight: '0px',
    marginRight: '0px',
  }),
  indicatorsContainer: (provided): CSSObjectWithLabel => ({
    ...provided,
    paddingLeft: '0px',
    marginLeft: '0px',
  }),
  dropdownIndicator: (provided): CSSObjectWithLabel => ({
    ...provided,
    paddingLeft: '0px',
    marginLeft: '0px',
  }),
  placeholder: fontChangeProps,
  control: (provided): CSSObjectWithLabel => ({
    ...provided,
    height: '45px',
    borderWidth: '0px',
    boxShadow: 'none',
    padding: '0px',
    borderRadius: '0px',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: '#00000015',
    },
    ':focus': {
      backgroundColor: '#00000020',
    },
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    color: '#000000',
    backgroundColor: isSelected
      ? '#00000015'
      : isFocused
      ? '#00000020'
      : 'transparent',
    ':active': {
      backgroundColor: '#00000030',
    },
  }),
  menu: (provided): CSSObjectWithLabel => ({
    ...provided,
    minWidth: '60px',
  }),
}

export const durationFrequencyPickerComponents: SelectComponentsConfig<
  any,
  any,
  any
> = {
  IndicatorSeparator: () => null,
}
