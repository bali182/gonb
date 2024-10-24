import { Duration } from '../../common/duration'

export type FragmentInterval = 'RANDOM_SCALE' | number

export type FragmentItem = FragmentNote | FragmentRest

export type FragmentRest = {
  type: 'rest'
  duration: Duration
}

export type FragmentNote = {
  type: 'note'
  duration: Duration
  steps: FragmentInterval
  shift?: number
}

export type FragmentBar = {
  items: FragmentItem[]
}

export type MelodyType =
  | 'WHOLE_NOTES'
  | 'HALF_NOTES'
  | 'QUARTER_NOTES'
  | 'MELODY'
