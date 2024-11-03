import { ComponentType } from 'react'
import { Duration } from '../../../../common/duration'
import { DurationFrequency } from '../../../../common/durationFrequency'
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

export type DurationItem = {
  Component: ComponentType
  type: DurationType
  duration: Duration
  name: string
  isEnabled: boolean
  maxCluster: number
  frequency: DurationFrequency
  cluster?: number
}
