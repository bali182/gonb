import { TFunction } from 'i18next'
import { GeneratorConfig } from '../../state/types'
import { ConfigIssues } from './types'
import { ok } from './ok'
import { validateBars } from './validateBars'
import { validateBpm } from './validateBpm'
import { validateNotes } from './validateNotes'
import { validateNoteDurations } from './validateNoteDurations'
import { validateRestDurations } from './validateRestDurations'
import { validateDottedNoteDurations } from './validateDottedNoteDurations'
import { validateDottedRestDurations } from './validateDottedRestDurations'
import { validateTimeSignature } from './validateTimeSignature'

export function validate(
  t: TFunction,
  language: string,
  config: GeneratorConfig,
): ConfigIssues {
  return {
    bars: validateBars(t, config),
    bpm: validateBpm(t, config),
    clef: ok(),
    keySignature: ok(),
    timeSignature: validateTimeSignature(t, language, config),
    notes: validateNotes(t, config),
    noteDurations: validateNoteDurations(t, language, config),
    restDurations: validateRestDurations(t, language, config),
    dottedNoteDurations: validateDottedNoteDurations(t, language, config),
    dottedRestDurations: validateDottedRestDurations(t, language, config),
  }
}
