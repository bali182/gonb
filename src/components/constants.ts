import { css } from '@emotion/css'

export const MOBILE_TOOLBAR_HEIGHT = 80
export const DESKTOP_TOOLBAR_HEIGHT = 120

export const headerStyle = css`
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* ~24px → 40px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
`

export const subHeaderStyle = css`
  font-size: clamp(1.25rem, 3vw, 1.75rem); /* ~20px → 28px */
  font-weight: 600;
  line-height: 1.3;
`

export const bodyTextStyle = css`
  font-size: clamp(0.6rem, 1.2vw, 1rem); /* ~12px → 16px */
  font-weight: 400;
  line-height: 1.6;
`

export const smallTextStyle = css`
  font-size: clamp(0.625rem, 0.9vw, 0.875rem); /* ~10px → 14px */
  font-weight: 400;
  line-height: 1.4;
`
