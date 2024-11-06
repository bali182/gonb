import { Duration } from '../../common/duration'

export const enum IssueType {
  WARNING = 'warning',
  ERROR = 'error',
}

export type Issue = {
  type: IssueType
  label: string
}

type _ConfigIssues = {
  bars: Issue
  bpm: Issue
  clef: Issue
  timeSignature: Issue
  keySignature: Issue
  showChordsStaff: Issue
  showChordSymbols: Issue
  useSeventhChords: Issue
  notes: Issue
  noteDurations: Issue
  dottedNoteDurations: Issue
  restDurations: Issue
  dottedRestDurations: Issue
}

export type ConfigIssues = Partial<_ConfigIssues>

export type DurationIssue = {
  cause: Duration
  solutions: Duration[]
}
