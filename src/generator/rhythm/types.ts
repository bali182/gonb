import Fraction from 'fraction.js'
import { Duration } from '../../common/duration'
import { DurationType } from '../../common/durationType'

export type RhythmItem = {
  duration: Duration
  type: DurationType
}

export type DurationCluster = {
  type: DurationType
  duration: Duration
  cluster: number
  length: Fraction
}
