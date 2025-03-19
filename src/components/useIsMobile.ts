import { useMediaQuery } from 'react-responsive'

export const useIsMobile = () =>
  useMediaQuery({
    query: 'screen and (pointer: coarse) and (hover: none)',
  })
