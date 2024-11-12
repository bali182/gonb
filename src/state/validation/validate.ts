import { TFunction } from 'i18next'
import { ConfigIssues } from './types'
import { ok } from './utils'
import { validateBars } from './validateBars'
import { validateBpm } from './validateBpm'
import { validateNotes } from './validateNotes'
import { validateTimeSignature } from './validateTimeSignature'
import { NumberSafeGeneratorConfig } from '../../components/settings/types'
import { createDurationValidator } from './durationUtils'
import { DurationType } from '../../common/durationType'

const validateNoteDurations = createDurationValidator(DurationType.NOTE, false)
const validateRestDurations = createDurationValidator(DurationType.REST, false)
const validateDottedNoteDurations = createDurationValidator(
  DurationType.NOTE,
  true,
)
const validateDottedRestDurations = createDurationValidator(
  DurationType.REST,
  true,
)

export function validate(
  t: TFunction,
  language: string,
  config: NumberSafeGeneratorConfig,
): ConfigIssues {
  return {
    bars: validateBars(t, config),
    bpm: validateBpm(t, config),
    timeSignature: validateTimeSignature(t, language, config),
    notes: validateNotes(t, config),
    noteDurations: validateNoteDurations(t, language, config),
    restDurations: validateRestDurations(t, language, config),
    dottedNoteDurations: validateDottedNoteDurations(t, language, config),
    dottedRestDurations: validateDottedRestDurations(t, language, config),

    clef: ok(),
    keySignature: ok(),
    showChordsStaff: ok(),
    showChordSymbols: ok(),
    useSeventhChords: ok(),
  }
}
