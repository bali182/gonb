import { Issue } from './types'

const IssueWeights: Record<Issue['type'], number> = {
  error: 1,
  warning: 2,
}

export function issueComparator(a: Issue, b: Issue): number {
  return IssueWeights[a.type] - IssueWeights[b.type]
}
