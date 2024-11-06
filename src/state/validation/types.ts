export enum IssueType {
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
