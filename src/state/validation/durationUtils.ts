import Fraction from 'fraction.js'
import { Duration } from '../../common/duration'
import { DURATION_VALUES as DV } from '../../generator/rhythm/asFraction'
import { DurationIssue, Issue, IssueType } from './types'
import { DurationConfig, GeneratorConfig, TimeSignature } from '../types'
import { isDotted, isNil, negate } from '../../common/utils'
import { TFunction } from 'i18next'

const DURATIONS = Object.keys(DV) as Duration[]

const NORMAL_DURATIONS = DURATIONS.filter(negate(isDotted))
const DOTTED_DURATIONS = DURATIONS.filter(isDotted)

const ZERO = new Fraction(0, 1)

function getDurationIssue(
  timeSignature: Fraction,
  selected: Duration[],
  duration: Duration,
): DurationIssue | undefined {
  const value = DV[duration]
  // Time signature is divisible by the duration, all good
  if (timeSignature.mod(value).equals(ZERO)) {
    return undefined
  }

  // All the durations that make it possible to finish a bar
  const solutions = DURATIONS.filter((d) => {
    const dv = DV[d]
    const sum = value.add(dv)
    return timeSignature.mod(sum).equals(ZERO)
  }).flatMap((s) =>
    DURATIONS.filter((d) => {
      const sv = DV[s]
      const dv = DV[d]
      return sv.mod(dv).equals(ZERO)
    }),
  )

  // No solution, what do?
  if (solutions.length === 0) {
    return { cause: duration, solutions: [] }
  }

  // If we have any of the possible solutions selected, no issues.
  if (solutions.some((s) => selected.includes(s))) {
    return undefined
  }

  const sortedSolutions = Array.from(solutions).sort((a, b) =>
    DV[b].compare(DV[a]),
  )

  return { cause: duration, solutions: sortedSolutions }
}

function getDurationsIssue(
  { upper, lower }: TimeSignature,
  selected: Duration[],
  display: Duration[],
): DurationIssue | undefined {
  const timeSignature = new Fraction(upper, lower)
  for (const duration of selected) {
    const issue = getDurationIssue(timeSignature, selected, duration)
    if (isNil(issue)) {
      continue
    }
    if (!display.some((d) => issue.solutions.includes(d))) {
      continue
    }
    return issue
  }
  return undefined
}

function getSelectedDurations(config: DurationConfig): Duration[] {
  const keys = Object.keys(config) as Duration[]
  return keys.filter((key) => !isNil(config[key]))
}

export function validateIfBarCanComplete(
  t: TFunction,
  language: string,
  config: GeneratorConfig,
  dotted: boolean,
): Issue | undefined {
  const selected = [
    ...getSelectedDurations(config.noteDurations),
    ...getSelectedDurations(config.restDurations),
  ].sort((a, b) => DV[b].compare(DV[a]))

  // This is not our job
  if (selected.length === 0) {
    return undefined
  }

  const display = dotted ? DOTTED_DURATIONS : NORMAL_DURATIONS

  const issue = getDurationsIssue(config.timeSignature, selected, display)

  if (isNil(issue)) {
    return undefined
  }

  // No possible solution, this should not happen
  if (issue.solutions.length === 0) {
    throw new Error(`Should not get here!`)
  }

  const arrayFormat = new Intl.ListFormat(language, {
    style: 'short',
    type: 'disjunction',
  })

  const solutions = issue.solutions.map((s) => t(`Durations.${s}`))

  return {
    type: IssueType.ERROR,
    label: t('Validation.DottedRhytms', {
      dotted: t(`Durations.${issue.cause}`),
      required: arrayFormat.format(solutions),
    }),
  }
}
