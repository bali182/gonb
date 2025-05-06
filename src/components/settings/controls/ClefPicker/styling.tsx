import {
  SelectComponentsConfig,
  SingleValueProps,
  components,
  OptionProps,
} from 'react-select'
import { ClefModel } from './types'
import { SelectItem } from '../../types'
import { FC } from 'react'
import { ClefItem } from './ClefItem'
import { noop } from '../../../../common/utils'

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
