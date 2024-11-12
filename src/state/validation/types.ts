import { Duration } from '../../common/duration'
import { TimeSignature } from '../types'

export const enum IssueType {
  WARNING = 'warning',
  ERROR = 'error',
}

export type Issue<Id = any> = {
  type: IssueType
  label: string
  id: Id
}

export type ConfigIssues = {
  bars: ReadonlyArray<Issue>
  bpm: ReadonlyArray<Issue>
  clef: ReadonlyArray<Issue>
  timeSignature: ReadonlyArray<Issue<keyof TimeSignature>>
  keySignature: ReadonlyArray<Issue>
  showChordsStaff: ReadonlyArray<Issue>
  showChordSymbols: ReadonlyArray<Issue>
  useSeventhChords: ReadonlyArray<Issue>
  notes: ReadonlyArray<Issue>
  noteDurations: ReadonlyArray<Issue<Duration | undefined>>
  dottedNoteDurations: ReadonlyArray<Issue<Duration | undefined>>
  restDurations: ReadonlyArray<Issue<Duration | undefined>>
  dottedRestDurations: ReadonlyArray<Issue<Duration | undefined>>
}

export type DurationIssue = {
  cause: Duration
  solutions: Duration[]
}
