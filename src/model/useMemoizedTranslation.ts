import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useMemoizedTranslation<T>(producer: (t: TFunction) => T): T {
  const { t, i18n } = useTranslation()
  const data = useMemo(() => producer(t), [t, i18n.language, producer])
  return data
}
