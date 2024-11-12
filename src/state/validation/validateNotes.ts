import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { matchesPitchClass } from '../../common/utils'
import { get } from '@tonaljs/scale'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { NO_ISSUES } from './utils'

export function validateNotes(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
): ReadonlyArray<Issue> {
  if (config.notes.length === 0) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.EmptyNotes'),
      },
    ]
  }
  const scale = get(`${config.keySignature} major`).notes
  const hasScaleNote = config.notes.some((n) =>
    scale.some((s) => matchesPitchClass(s, n)),
  )
  if (!hasScaleNote) {
    return [
      {
        id: undefined,
        type: IssueType.ERROR,
        label: t('Validation.NoScaleNotes', {
          scale: config.keySignature,
          scaleNotes: scale.join(', '),
        }),
      },
    ]
  }
  return NO_ISSUES
}
