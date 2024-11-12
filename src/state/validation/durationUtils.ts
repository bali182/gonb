import Fraction from 'fraction.js'
import { Duration } from '../../common/duration'
import { DURATION_VALUES as DV } from '../../generator/rhythm/asFraction'
import { DurationIssue, Issue, IssueType } from './types'
import { DurationConfig, DurationData, TimeSignature } from '../types'
import { isDotted, isNil, negate } from '../../common/utils'
import { TFunction } from 'i18next'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { DurationType } from '../../common/durationType'
import { getDurationItemName } from '../../components/settings/controls/DurationGrid/utils'
import { isCompleteTimeSignature, NO_ISSUES } from './utils'

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

function getDurationIssues(
  { upper, lower }: TimeSignature,
  selected: Duration[],
  display: Duration[],
): DurationIssue[] {
  const timeSignature = new Fraction(upper, lower)
  const issues: DurationIssue[] = []
  for (const duration of selected) {
    const issue = getDurationIssue(timeSignature, selected, duration)
    if (isNil(issue)) {
      continue
    }
    if (!display.some((d) => issue.solutions.includes(d))) {
      continue
    }
    issues.push(issue)
  }
  return issues
}

function getSelectedDurations(config: DurationConfig): Duration[] {
  const keys = Object.keys(config) as Duration[]
  return keys.filter((key) => !isNil(config[key]))
}

export function validateIfBarCanComplete(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
  dotted: boolean,
): ReadonlyArray<Issue<Duration>> {
  const { timeSignature, noteDurations, restDurations } = config

  // Not our job
  if (!isCompleteTimeSignature(timeSignature)) {
    return NO_ISSUES
  }

  const selected = [
    ...getSelectedDurations(noteDurations),
    ...getSelectedDurations(restDurations),
  ].sort((a, b) => DV[b].compare(DV[a]))

  // Not our job
  if (selected.length === 0) {
    return NO_ISSUES
  }

  const display = dotted ? DOTTED_DURATIONS : NORMAL_DURATIONS

  const durationIssues = getDurationIssues(
    timeSignature as TimeSignature,
    selected,
    display,
  )

  if (durationIssues.length === 0) {
    return NO_ISSUES
  }

  return durationIssues.map((durationIssue) => {
    // No possible solution, this should not happen
    if (durationIssue.solutions.length === 0) {
      throw new Error(`Should not get here!`)
    }

    const arrayFormat = new Intl.ListFormat(language, {
      style: 'short',
      type: 'disjunction',
    })

    const solutions = durationIssue.solutions.map((s) => t(`Durations.${s}`))

    return {
      id: durationIssue.cause,
      type: IssueType.ERROR,
      label: t('Validation.DottedRhytms', {
        dotted: t(`Durations.${durationIssue.cause}`),
        required: arrayFormat.format(solutions),
      }),
    }
  })
}

function getSelectedDurationsOfType(
  { noteDurations, restDurations }: NumberSafeGeneratorConfig,
  dotted: boolean | undefined,
  type: DurationType | undefined,
): Duration[] {
  const durationsConfig =
    type === undefined
      ? { ...noteDurations, ...restDurations }
      : type === DurationType.NOTE
      ? noteDurations
      : restDurations

  const durationTuples = Object.entries(durationsConfig) as [
    Duration,
    DurationData,
  ][]
  return durationTuples
    .filter(([d, v]) => !isNil(v) && (isNil(dotted) || isDotted(d) === dotted))
    .map(([duration]) => duration)
    .sort((a, b) => DV[b].sub(DV[a]).valueOf())
}

export function validateIfAllFitsBar(
  t: TFunction,
  _language: string,
  config: NumberSafeGeneratorConfig,
  dotted: boolean,
  type: DurationType,
): ReadonlyArray<Issue<Duration | undefined>> {
  const { timeSignature } = config
  if (!isCompleteTimeSignature(timeSignature)) {
    return NO_ISSUES
  }
  const barLength = new Fraction(timeSignature.upper, timeSignature.lower)
  const tsString = `${timeSignature.upper}/${timeSignature.lower}`

  if (type === DurationType.NOTE) {
    const durations = getSelectedDurationsOfType(config, undefined, type)
    const fitsBar = durations.filter((d) => DV[d].lte(barLength))
    if (fitsBar.length === 0) {
      return [
        {
          id: undefined,
          label: t('Validation.EmptyDurations', {
            timeSignature: tsString,
          }),
          type: IssueType.ERROR,
        },
      ]
    }
  }

  const durations = getSelectedDurationsOfType(config, dotted, type)
  return durations
    .filter((d) => DV[d].gt(barLength))
    .map((duration) => ({
      id: duration,
      label: t('Validation.DurationLongerThanBar', {
        duration: getDurationItemName(type, duration, t, false),
        timeSignature: tsString,
      }),
      type: IssueType.WARNING,
    }))
}

export const createDurationValidator =
  (type: DurationType, dotted: boolean) =>
  (
    t: TFunction,
    language: string,
    config: NumberSafeGeneratorConfig,
  ): ReadonlyArray<Issue> => {
    return [
      ...validateIfAllFitsBar(t, language, config, dotted, type),
      ...validateIfBarCanComplete(t, language, config, dotted),
    ]
  }
