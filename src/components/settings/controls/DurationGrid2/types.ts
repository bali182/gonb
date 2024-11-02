import { ComponentType } from 'react'
import { Duration } from '../../../../common/duration'
import { DurationFrequency } from '../../../../common/durationFrequency'

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
  isEnabled: boolean
  maxCluster: number
  frequency: DurationFrequency
  cluster?: number
}

export type DurationData = {
  f: DurationFrequency
  c: number
}

export type DurationConfig = Partial<Record<Duration, DurationData>>
