import { useMemo } from 'react'
import { isNotNil } from '../../common/utils'
import { TimeSignature } from '../types'
import { Issue, IssueType } from './types'

export const NO_ISSUES: ReadonlyArray<Issue> = Object.freeze<Issue[]>([])

export function ok(): ReadonlyArray<Issue> {
  return NO_ISSUES
}

export function isCompleteTimeSignature(
  input: Partial<TimeSignature>,
): input is TimeSignature {
  return isNotNil(input.lower) && isNotNil(input.upper)
}

const SEVERITY_MAP: Record<IssueType, number> = {
  [IssueType.WARNING]: 2,
  [IssueType.ERROR]: 1,
}

export function issueComparator(a: Issue, b: Issue): number {
  return SEVERITY_MAP[a.type] - SEVERITY_MAP[b.type]
}

export function getHighestSeverity(
  issues: ReadonlyArray<Issue>,
): Issue | undefined {
  return Array.from(issues).sort(issueComparator)[0]
}

export function useHighestSeverity(
  issues: ReadonlyArray<Issue>,
): Issue | undefined {
  return useMemo(() => getHighestSeverity(issues), [issues])
}
