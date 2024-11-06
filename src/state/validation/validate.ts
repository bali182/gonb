import { TFunction } from 'i18next'
import { GeneratorConfig } from '../../state/types'
import { ConfigIssues, Issue, IssueType } from './types'
import { Duration } from '../../common/duration'
import { get } from '@tonaljs/scale'
import { isDotted, isNil, matchesPitchClass } from '../../common/utils'
import { ok } from './ok'
import { validateBars } from './validateBars'
import { validateBpm } from './validateBpm'
import { validateNotes } from './validateNotes'

const DottedPairs: [Duration, Duration][] = [
  [Duration.DOTTED_HALF, Duration.QUARTER],
  [Duration.DOTTED_QUARTER, Duration.EIGHTH],
  [Duration.DOTTED_EIGHT, Duration.SIXTEENTH],
]

function validateDottedPairs(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  for (const [dotted, required] of DottedPairs) {
    if (
      (!isNil(config.noteDurations[dotted]) ||
        !isNil(config.restDurations[dotted])) &&
      isNil(config.noteDurations[required]) &&
      isNil(config.restDurations[required])
    ) {
      return {
        type: IssueType.ERROR,
        label: t('Validation.DottedRhytms', {
          dotted: t(`Durations.${dotted}`),
          required: t(`Durations.${required}`),
        }),
      }
    }
  }
  return undefined
}

function validateNoteDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  const durations = (Object.keys(config.noteDurations) as Duration[]).filter(
    (d) => !isDotted(d),
  )
  if (durations.length === 0) {
    return { type: IssueType.ERROR, label: t('Validation.EmptyRhytms') }
  }
  return validateDottedPairs(t, config)
}

function validateRestDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  return validateDottedPairs(t, config)
}

export function validate(t: TFunction, config: GeneratorConfig): ConfigIssues {
  return {
    bars: validateBars(t, config),
    bpm: validateBpm(t, config),
    clef: ok(),
    keySignature: ok(),
    notes: validateNotes(t, config),
    noteDurations: validateNoteDurations(t, config),
    restDurations: validateRestDurations(t, config),
    dottedNoteDurations: ok(),
    dottedRestDurations: ok(),
  }
}
