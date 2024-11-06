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

export function validate(t: TFunction, config: GeneratorConfig): ConfigIssues {
  return {
    bars: validateBars(t, config),
    bpm: validateBpm(t, config),
    clef: ok(),
    keySignature: ok(),
    notes: validateNotes(t, config),
    noteDurations: validateNoteDurations(t, config),
    restDurations: validateRestDurations(t, config),
    dottedNoteDurations: validateDottedNoteDurations(t, config),
    dottedRestDurations: validateDottedRestDurations(t, config),
  }
}
