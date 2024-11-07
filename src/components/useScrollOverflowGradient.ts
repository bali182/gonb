import { RefObject, useCallback, useRef, UIEvent, useState } from 'react'
import { isNil } from '../common/utils'

export type OverflowScrollGradientResult = {
  ref: RefObject<HTMLDivElement>
  needsTopGradient: boolean
  needsBottomGradient: boolean
  onScroll: (e: UIEvent<HTMLDivElement, any>) => void
  setScrollTop: (position: number) => void
}

export function useScrollOverflowGradient(): OverflowScrollGradientResult {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState<number>(0)

  const onScroll = useCallback((e: UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop)
  }, [])

  const setScrollTopFromOutside = (scrollY: number) => {
    if (isNil(ref.current)) {
      return
    }
    if (ref.current.scrollTop !== scrollY) {
      ref.current.scrollTo({ top: scrollY, behavior: 'smooth' })
    }
  }

  const scrollHeight = ref.current?.scrollHeight ?? 0
  const clientHeight = ref.current?.clientHeight ?? 0

  return {
    ref,
    needsTopGradient: scrollTop > 0,
    needsBottomGradient: scrollTop < scrollHeight - clientHeight,
    onScroll,
    setScrollTop: setScrollTopFromOutside,
  }
}
