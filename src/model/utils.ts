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

export function findMin<T>(arr: T[], transform: (item: T) => number): T {
  if (arr.length === 0) {
    throw new TypeError(`Can't find the minimum in an empty array!`)
  }

  let minValue = arr[0]
  let minTransformed = transform(arr[0]!)

  for (let i = 1; i < arr.length; i++) {
    const transformedValue = transform(arr[i]!)
    if (transformedValue < minTransformed) {
      // Compare the transformed values
      minValue = arr[i]
      minTransformed = transformedValue
    }
  }

  return minValue!
}
