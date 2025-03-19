import { useMediaQuery } from 'react-responsive'

export const IS_MOBILE_QUERY = 'screen and (pointer: coarse) and (hover: none)'

export const useIsMobile = () =>
  useMediaQuery({
    query: IS_MOBILE_QUERY,
  })

export function isMobile() {
  return matchMedia(IS_MOBILE_QUERY).matches
}
