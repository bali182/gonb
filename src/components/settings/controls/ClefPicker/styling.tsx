import { css, cx } from '@emotion/css'
import {
  SelectComponentsConfig,
  ClassNamesConfig,
  SingleValueProps,
  components,
  OptionProps,
} from 'react-select'
import { smallTextStyle } from '../../../constants'
import { ClefModel } from './types'
import { SelectItem } from '../../types'
import { FC } from 'react'
import { ClefItem } from './ClefItem'
import { noop } from '../../../../common/utils'

export const clefPickerClassNames: ClassNamesConfig<
  SelectItem<ClefModel>,
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

const SingleValue: FC<SingleValueProps<SelectItem<ClefModel>>> = ({
  children,
  ...props
}) => {
  const value = props.getValue()[0]!.value
  return (
    <components.SingleValue {...props}>
      <ClefItem isSelected={false} model={value} onClick={noop} />
    </components.SingleValue>
  )
}

const Option: FC<OptionProps<SelectItem<ClefModel>>> = ({
  children,
  ...props
}) => {
  const value = props.data.value
  return (
    <components.Option {...props}>
      <ClefItem isSelected={props.isSelected} model={value} onClick={noop} />
    </components.Option>
  )
}

export const clefPickerComponents: SelectComponentsConfig<
  SelectItem<ClefModel>,
  any,
  any
> = {
  IndicatorSeparator: () => null,
  SingleValue,
  Option,
}

export const inputStyle = cx(
  smallTextStyle,
  css`
    && {
      padding: 0px;
    }
  `,
)

export const singleValueStyle = cx(
  smallTextStyle,
  css`
    && {
      overflow: visible;
    }
  `,
)

export const menuListStyle = cx(
  smallTextStyle,
  css`
    && {
      background-color: #00000010;
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
    padding-left: 0px;
    margin-left: 0px;
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
    }
  `,
)

export const controlStyle = css`
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

export const optionStyle = css`
  && {
    color: #000000;
    background-color: transparent;

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
