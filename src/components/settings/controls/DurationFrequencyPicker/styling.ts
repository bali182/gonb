import { css, cx } from '@emotion/css'
import { SelectComponentsConfig, ClassNamesConfig } from 'react-select'
import { smallTextStyle } from '../../../constants'

export const durationFrequencyPickerClassNames: ClassNamesConfig<
  any,
  any,
  any
> = {
  input: () => inputStyle,
  singleValue: () => singleValueStyle,
  menuList: () => menuListStyle,
  valueContainer: () => valueContainerStyle,
  indicatorsContainer: () => indicatorsContainerStyle,
  dropdownIndicator: () => dropdownIndicatorStyle,
  placeholder: () => placeholderStyle,
  control: () => controlStyle,
  menu: () => menuStyle,
  option: ({ isSelected, isFocused }) =>
    cx({
      [optionStyle]: true,
      [optionFocusedStyle]: isFocused,
      [optionSelectedStyle]: isSelected,
    }),
}

export const durationFrequencyPickerComponents: SelectComponentsConfig<
  any,
  any,
  any
> = {
  IndicatorSeparator: () => null,
}

export const inputStyle = cx(
  smallTextStyle,
  css`
    && {
      color: #000000;
    }
  `,
)

export const singleValueStyle = cx(
  smallTextStyle,
  css`
    && {
      color: #000000;
      overflow: visible;
    }
  `,
)

export const menuListStyle = cx(
  smallTextStyle,
  css`
    && {
      color: #000000;
      background-color: #ffffff;
    }
  `,
)

export const valueContainerStyle = css`
  && {
    padding-right: 0px;
    margin-right: 0px;
  }
`

export const indicatorsContainerStyle = css`
  && {
    padding: 0px !important;
    margin: 0px !important;
  }
`

export const dropdownIndicatorStyle = css`
  && {
    padding-left: 0px;
    margin-left: 0px;
  }
`

export const placeholderStyle = cx(
  smallTextStyle,
  css`
    && {
      color: #000000;
    }
  `,
)

export const controlStyle = css`
  && {
    height: 45px;
    border-width: 0px;
    box-shadow: none;
    padding: 0px;
    border-radius: 0px;
    background-color: transparent;

    &:hover {
      background-color: #00000015;
    }

    &:focus {
      background-color: #00000020;
    }
  }
`

export const optionStyle = css`
  && {
    color: #000000;

    &:active {
      background-color: #00000030;
    }
  }
`

export const optionSelectedStyle = css`
  && {
    background-color: #00000015;
  }
`

export const optionFocusedStyle = css`
  && {
    background-color: #00000020;
  }
`

export const menuStyle = css`
  && {
    min-width: 60px;
  }
`
