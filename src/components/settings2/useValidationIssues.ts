import { TFunction } from 'i18next'
import { useMemoizedTranslation1 } from '../../model/useMemoizedTranslation'
import { GeneratorConfig2 } from '../../state/types'
import { ConfigIssues, Issue } from './types'
import { Clef } from '../../model/common'

function validateBars(
  t: TFunction,
  config: GeneratorConfig2,
): Issue | undefined {
  if (config.bars <= 0) {
    return { type: 'error', label: t('Validation.ZeroBars') }
  }
  return undefined
}

function validateBpm(
  t: TFunction,
  config: GeneratorConfig2,
): Issue | undefined {
  if (config.bpm < 10 || config.bpm > 400) {
    return { type: 'error', label: t('Validation.WrongBpm') }
  }
  return undefined
}

function validateClef(
  t: TFunction,
  config: GeneratorConfig2,
): Issue | undefined {
  if (config.clef === Clef.PERCUSSION) {
    return { type: 'error', label: t('Validation.PercussionClef') }
  }
  return undefined
}

function validateKeySignature(
  _t: TFunction,
  _config: GeneratorConfig2,
): Issue | undefined {
  return undefined
}

function validateNoteDurations(
  t: TFunction,
  config: GeneratorConfig2,
): Issue | undefined {
  if (config.noteDurations.length === 0) {
    return { type: 'error', label: t('Validation.EmptyRhytms') }
  }
  return undefined
}

function validateRestDurations(
  _t: TFunction,
  _config: GeneratorConfig2,
): Issue | undefined {
  return undefined
}

function validateNotes(
  t: TFunction,
  config: GeneratorConfig2,
): Issue | undefined {
  if (config.notes.length === 0) {
    return { type: 'error', label: t('Validation.EmptyNotes') }
  }
  return undefined
}

function validateConfiguration(
  t: TFunction,
  config: GeneratorConfig2,
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

export function useValidationIssues(config: GeneratorConfig2): ConfigIssues {
  return useMemoizedTranslation1(validateConfiguration, config)
}
