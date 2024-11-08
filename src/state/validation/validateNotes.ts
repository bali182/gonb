import { TFunction } from 'i18next'
import { Issue, IssueType } from './types'
import { matchesPitchClass } from '../../common/utils'
import { get } from '@tonaljs/scale'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'

export function validateNotes(
  t: TFunction,
  config: NumberSafeGeneratorConfig,
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
