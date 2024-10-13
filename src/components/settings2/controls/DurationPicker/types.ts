import { ComponentType } from 'react'
import { Duration } from '../../../../model/common'

export type DurationType = 'REST' | 'NOTE'

export type TypeHeader = {
  label: string
  type: DurationType
  dotted: boolean
}

export type DurationHeader = {
  label: string
  durations: Duration[]
}

export type ConstDurationItem = {
  Component: ComponentType
  type: DurationType
  duration: Duration
}

export type DurationItem = ConstDurationItem & { isSelected: boolean }
