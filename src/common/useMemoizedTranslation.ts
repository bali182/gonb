import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useMemoizedTranslation<T>(
  producer: (t: TFunction, language: string) => T,
): T {
  const { t, i18n } = useTranslation()
  const data = useMemo(
    () => producer(t, i18n.language),
    [t, i18n.language, producer],
  )
  return data
}

export function useMemoizedTranslation1<T, P>(
  producer: (t: TFunction, language: string, param1: P) => T,
  param1: P,
): T {
  const { t, i18n } = useTranslation()
  const data = useMemo(
    () => producer(t, i18n.language, param1),
    [t, param1, i18n.language, producer],
  )
  return data
}
