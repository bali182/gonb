import { ComponentType } from 'react'
import { Duration } from '../../../../common/duration'

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

export type DurationItem = {
  Component: ComponentType
  type: DurationType
  duration: Duration
  name: string
  isSelected: boolean
  cluster?: number
}

export type DurationConfig = Partial<Record<Duration, number>>
