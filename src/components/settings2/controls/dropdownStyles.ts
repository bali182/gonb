import {
  CSSObjectWithLabel,
  SelectComponentsConfig,
  StylesConfig,
} from 'react-select'

const fontChangeProps = (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
  ...provided,
  fontSize: '1em',
  color: '#000000',
})

export const defaultStyles: StylesConfig = {
  input: fontChangeProps,
  singleValue: fontChangeProps,
  menuList: (provided): CSSObjectWithLabel => ({
    ...fontChangeProps(provided),
    backgroundColor: '#00000010',
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
    borderWidth: '0px',
    boxShadow: 'none',
    padding: '3px 6px',
    borderRadius: '6px',
    backgroundColor: '#00000010',
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

export const defaultComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
}
