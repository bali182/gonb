import { useEffect, useState } from 'react'

export const IS_MOBILE_QUERY = 'screen and (pointer: coarse) and (hover: none)'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
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

  return isMobile
}

export function isMobile() {
  return matchMedia(IS_MOBILE_QUERY).matches
}
