import { TFunction } from 'i18next'
import { useMemoizedTranslation1 } from '../../common/useMemoizedTranslation'
import { GeneratorConfig } from '../../state/types'
import { ConfigIssues, Issue } from './types'
import { Clef } from '../../common/clef'
import { Duration } from '../../common/duration'
import { get } from '@tonaljs/scale'
import { matchesPitchClass } from '../../common/utils'

function validateBars(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.bars <= 0) {
    return { type: 'error', label: t('Validation.ZeroBars') }
  }
  return undefined
}

function validateBpm(t: TFunction, config: GeneratorConfig): Issue | undefined {
  if (config.bpm < 10 || config.bpm > 400) {
    return { type: 'error', label: t('Validation.WrongBpm') }
  }
  return undefined
}

function validateClef(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.clef === Clef.PERCUSSION) {
    return { type: 'error', label: t('Validation.PercussionClef') }
  }
  return undefined
}

function validateKeySignature(
  _t: TFunction,
  _config: GeneratorConfig,
): Issue | undefined {
  return undefined
}

const DottedPairs: [Duration, Duration][] = [
  [Duration.DOTTED_HALF, Duration.QUARTER],
  [Duration.DOTTED_QUARTER, Duration.EIGHTH],
  [Duration.DOTTED_EIGHT, Duration.SIXTEENTH],
]

function validateNoteDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.noteDurations.length === 0) {
    return { type: 'error', label: t('Validation.EmptyRhytms') }
  }
  for (const [dotted, required] of DottedPairs) {
    if (
      config.noteDurations.includes(dotted) &&
      !config.noteDurations.includes(required) &&
      !config.restDurations.includes(required)
    ) {
      return {
        type: 'error',
        label: t('Validation.DottedRhytms', {
          dotted: t(`Durations.${dotted}`),
          required: t(`Durations.${required}`),
        }),
      }
    }
  }
  return undefined
}

function validateRestDurations(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  for (const [dotted, required] of DottedPairs) {
    if (
      config.restDurations.includes(dotted) &&
      !config.noteDurations.includes(required) &&
      !config.restDurations.includes(required)
    ) {
      return {
        type: 'error',
        label: t('Validation.DottedRhytms', {
          dotted: t(`Durations.${dotted}`),
          required: t(`Durations.${required}`),
        }),
      }
    }
  }
  return undefined
}

function validateNotes(
  t: TFunction,
  config: GeneratorConfig,
): Issue | undefined {
  if (config.notes.length === 0) {
    return { type: 'error', label: t('Validation.EmptyNotes') }
  }
  const scale = get(`${config.keySignature} major`).notes
  const hasScaleNote = config.notes.some((n) =>
    scale.some((s) => matchesPitchClass(s, n)),
  )
  if (!hasScaleNote) {
    return {
      type: 'error',
      label: t('Validation.NoScaleNotes', {
        scale: config.keySignature,
        scaleNotes: scale.join(', '),
      }),
    }
  }
  return undefined
}

function validateConfiguration(
  t: TFunction,
  config: GeneratorConfig,
): ConfigIssues {
  return {
    bars: validateBars(t, config),
    bpm: validateBpm(t, config),
    clef: validateClef(t, config),
    keySignature: validateKeySignature(t, config),
    noteDurations: validateNoteDurations(t, config),
    notes: validateNotes(t, config),
    restDurations: validateRestDurations(t, config),
  }
}

export function useValidationIssues(config: GeneratorConfig): ConfigIssues {
  return useMemoizedTranslation1(validateConfiguration, config)
}
