import { TFunction } from 'i18next'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import { SelectItem } from '../../types'
import { DurationFrequency } from '../../../../common/durationFrequency'

function getDurationFrequencies(t: TFunction): SelectItem<DurationFrequency>[] {
  return [
    {
      value: DurationFrequency.INFREQUENT,
      label: t(`Frequency.${DurationFrequency.INFREQUENT}`),
    },
    {
      value: DurationFrequency.MODERATE,
      label: t(`Frequency.${DurationFrequency.MODERATE}`),
    },
    {
      value: DurationFrequency.FREQUENT,
      label: t(`Frequency.${DurationFrequency.FREQUENT}`),
    },
  ]
}

export function useDurationFrequencies() {
  return useMemoizedTranslation(getDurationFrequencies)
}
