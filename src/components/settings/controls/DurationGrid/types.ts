import { ComponentType } from 'react'
import { Duration } from '../../../../common/duration'
import { DurationFrequency } from '../../../../common/durationFrequency'
import { DurationType } from '../../../../common/durationType'
import { TimeSignature } from '../../../../state/types'

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
  isEnabled: boolean
  maxCluster: number
  frequency: DurationFrequency
  timeSignature: Partial<TimeSignature>
  cluster?: number
}
