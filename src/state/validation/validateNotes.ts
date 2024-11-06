import { TFunction } from 'i18next'
import { GeneratorConfig } from '../../state/types'
import { Issue, IssueType } from './types'
import { matchesPitchClass } from '../../common/utils'
import { get } from '@tonaljs/scale'

export function validateNotes(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.notes.length === 0) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyNotes') }
  }
  const scale = get(`${config.keySignature} major`).notes
  const hasScaleNote = config.notes.some((n) =>
    scale.some((s) => matchesPitchClass(s, n)),
  )
  if (!hasScaleNote) {
    return {
      type: IssueType.ERROR,
      label: t('Validation.NoScaleNotes', {
        scale: config.keySignature,
        scaleNotes: scale.join(', '),
      }),
    }
  }
  return undefined
}
