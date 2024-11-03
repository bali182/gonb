import { ComponentType } from 'react'
import { Duration } from '../../../../common/duration'
import { DurationType } from '../../../../common/durationType'

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
