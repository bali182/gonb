import { css, cx } from '@emotion/css'
import {
  ClassNamesConfig,
  OptionProps,
  SelectComponentsConfig,
  SingleValueProps,
  components,
} from 'react-select'
import { FC } from 'react'
import { SelectItem } from '../../types'
import { Language } from '../../../../state/types'

import huFlag from '../../../svg/hu.svg?base64-data-uri'
import ukFlag from '../../../svg/gb.svg?base64-data-uri'
import { bodyTextStyle } from '../../../constants'

export const languagePickerClassNames: ClassNamesConfig<any, any, any> = {
  input: () => inputStyle,
  singleValue: () => singleValueStyle,
  container: () => containerStyle,
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

const containerStyle = cx(
  bodyTextStyle,
  css`
    && {
      width: 100%;
    }
  `,
)

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
    padding-left: 0px;
    margin-left: 0px;
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
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }

    &:focus {
      background-color: transparent;
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

const flagStyle = css`
  width: 24px;
  height: 18px;
`

const ukFlagStyle = cx(
  flagStyle,
  css`
    background-image: url('${ukFlag}');
  `,
)

const huFlagStyle = cx(
  flagStyle,
  css`
    background-image: url('${huFlag}');
  `,
)

const optionContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const singleValueContainerStyle = cx(
  optionContainerStyle,
  css`
    padding: 10px 3px;
  `,
)

const SingleValue: FC<SingleValueProps<SelectItem<Language>>> = ({
  children,
  ...props
}) => {
  const { value, label } = props.getValue()[0]!
  return (
    <components.SingleValue {...props}>
      <div className={singleValueContainerStyle}>
        <div
          className={value === Language.English ? ukFlagStyle : huFlagStyle}
        />
        {label}
      </div>
    </components.SingleValue>
  )
}

const Option: FC<OptionProps<SelectItem<Language>>> = ({
  children,
  ...props
}) => {
  const { value, label } = props.data
  return (
    <components.Option {...props}>
      <div className={optionContainerStyle}>
        <div
          className={value === Language.English ? ukFlagStyle : huFlagStyle}
        />
        {label}
      </div>
    </components.Option>
  )
}

export const languagePickerComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
  SingleValue,
  Option,
}
