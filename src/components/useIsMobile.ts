import { useEffect, useLayoutEffect, useState } from 'react'

export const IS_MOBILE_QUERY = 'screen and (pointer: coarse) and (hover: none)'

export const useIsMobile = () => {
  const [_isMobile, setIsMobile] = useState(isMobile())
  useLayoutEffect(() => {
    const query = matchMedia(IS_MOBILE_QUERY)
    setIsMobile(query.matches)

    const listener = (e: MediaQueryListEvent): void => {
      setIsMobile(e.matches)
    }
    query.addEventListener('change', listener)
    return () => {
      query.removeEventListener('change', listener)
    }
  }, [])

  return _isMobile
}

export function isMobile() {
  return matchMedia(IS_MOBILE_QUERY).matches
}
