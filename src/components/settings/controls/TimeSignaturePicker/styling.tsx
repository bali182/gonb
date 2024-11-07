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

export const lowerStyles: StylesConfig<any, any, any> = {
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
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingRight: '0px',
    marginRight: '0px',
  }),
  // indicatorsContainer: (provided): CSSObjectWithLabel => ({
  //   ...provided,
  //   padding: '0px',
  // }),
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
    padding: '0px',
    minHeight: '0px',
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
    width: '55px',
  }),
  container: (provided): CSSObjectWithLabel => ({
    ...provided,
    padding: '0px',
    minHeight: '0px',
    width: '60px',
  }),
}

export const lowerComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
}
