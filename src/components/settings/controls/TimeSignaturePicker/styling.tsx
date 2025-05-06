import { css, cx } from '@emotion/css'
import { ClassNamesConfig, SelectComponentsConfig } from 'react-select'
import { bodyTextStyle } from '../../../constants'

export const lowerClassNames: ClassNamesConfig<any, any, any> = {
  input: () => inputStyle,
  singleValue: () => singleValueStyle,
  menuList: () => menuListStyle,
  valueContainer: () => valueContainerStyle,
  dropdownIndicator: () => dropdownIndicatorStyle,
  placeholder: () => placeholderStyle,
  control: () => controlStyle,
  menu: () => menuStyle,
  container: () => containerStyle,
  option: ({ isSelected, isFocused }) =>
    cx({
      [optionStyle]: true,
      [optionFocusedStyle]: isFocused,
      [optionSelectedStyle]: isSelected,
    }),
}

const inputStyle = cx(
  bodyTextStyle,
  css`
    && {
      /* no extra rules */
    }
  `,
)

const singleValueStyle = cx(
  bodyTextStyle,
  css`
    && {
      overflow: visible;
    }
  `,
)

const menuListStyle = cx(
  bodyTextStyle,
  css`
    && {
      background-color: #ffffff;
    }
  `,
)

const valueContainerStyle = css`
  && {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
    margin-right: 0px;
  }
`

const dropdownIndicatorStyle = css`
  && {
    padding-left: 0px;
    margin-left: 0px;
  }
`

const placeholderStyle = cx(
  bodyTextStyle,
  css`
    && {
      /* no extra rules */
    }
  `,
)

const controlStyle = css`
  && {
    border-width: 0px;
    box-shadow: none;
    padding: 0px;
    min-height: 0px;
    border-radius: 6px;
    background-color: #00000010;

    &:hover {
      background-color: #00000015;
    }

    &:focus {
      background-color: #00000020;
    }
  }
`

const optionStyle = css`
  && {
    color: #000000;
    background-color: transparent;

    &:active {
      background-color: #00000030;
    }
  }
`

const optionSelectedStyle = css`
  && {
    background-color: #00000015;
  }
`

const optionFocusedStyle = css`
  && {
    background-color: #00000020;
  }
`

const menuStyle = css`
  && {
    width: 55px;
  }
`

const containerStyle = css`
  && {
    padding: 0px;
    min-height: 0px;
    width: 60px;
  }
`

export const lowerComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
}
