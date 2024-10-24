import { Duration } from '../../common/common'
import {
  FragmentBar,
  FragmentInterval,
  FragmentItem,
  FragmentNote,
  FragmentRest,
} from './types'

export function bar(...items: FragmentItem[]): FragmentBar {
  return {
    items,
  }
}

export function note(
  duration: Duration,
  steps: FragmentInterval,
  shift?: number,
): FragmentNote {
  return {
    type: 'note',
    duration,
    steps,
    shift,
  }
}

export function rest(duration: Duration): FragmentRest {
  return {
    type: 'rest',
    duration,
  }
}
