import { Issue, IssueType } from '../../state/validation/types'

const IssueWeights: Record<IssueType, number> = {
  [IssueType.WARNING]: 2,
  [IssueType.ERROR]: 1,
}

export function issueComparator(a: Issue, b: Issue): number {
  return IssueWeights[a.type] - IssueWeights[b.type]
}
