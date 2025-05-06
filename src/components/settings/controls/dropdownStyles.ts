import { css, cx } from '@emotion/css'
import { ClassNamesConfig, SelectComponentsConfig } from 'react-select'
import { bodyTextStyle } from '../../constants'

export const defaultClassNames: ClassNamesConfig<any, any, any> = {
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

const inputStyle = cx(
  bodyTextStyle,
  css`
    && {
      padding: 0px;
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
      background-color: #00000010;
    }
  `,
)

const valueContainerStyle = css`
  && {
    padding-right: 0px;
    margin-right: 0px;
  }
`

const indicatorsContainerStyle = css`
  && {
    padding-left: 0px;
    margin-left: 0px;
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
    }
  `,
)

const controlStyle = css`
  && {
    border-width: 0px;
    box-shadow: none;
    padding: 3px 6px;
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
    min-width: 60px;
  }
`

export const defaultComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
}
