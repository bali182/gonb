import { Duration } from './common'
import {
  FragmentBar,
  FragmentInterval,
  FragmentItem,
  FragmentNote,
  FragmentRest,
} from './melodyFragment'

export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function noop() {}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null || input !== undefined
}

export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
