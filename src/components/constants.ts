import { css } from '@emotion/css'

export const MOBILE_TOOLBAR_HEIGHT = 70
export const DESKTOP_TOOLBAR_HEIGHT = 120

export const MOBILE_SELECTOR = 'screen and (max-width: 479px)'
export const TABLET_SELECTOR =
  'screen and (min-width: 480px) and (max-width: 1024px)'
export const DESKTOP_SELECTOR = 'min-width: 1025px'

export const headerStyle = css`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media ${TABLET_SELECTOR} {
    font-size: 1.4rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 1.1rem;
  }
`

export const subHeaderStyle = css`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.02em;

  @media ${TABLET_SELECTOR} {
    font-size: 1.1rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 1rem;
  }
`

export const bodyTextStyle = css`
  font-size: 1rem;
  font-weight: 400;

  @media ${TABLET_SELECTOR} {
    font-size: 0.9rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 0.8rem;
  }
`

export const extraSmallTextStyle = css`
  font-size: 0.9rem;
  font-weight: 400;

  @media ${TABLET_SELECTOR} {
    font-size: 0.65rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 0.55rem;
  }
`

export const smallTextStyle = css`
  font-size: 0.875rem;
  font-weight: 400;

  @media ${TABLET_SELECTOR} {
    font-size: 0.75rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 0.625rem;
  }
`

export const smallIconStyle = css`
  font-size: 1rem;

  @media ${TABLET_SELECTOR} {
    font-size: 0.9rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 0.8rem;
  }
`

export const actionIconStyle = css`
  font-size: 2.5rem;

  @media ${TABLET_SELECTOR} {
    font-size: 2.2rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 1.8rem;
  }
`

export const menuIconStyle = css`
  font-size: 1.5rem;

  @media ${TABLET_SELECTOR} {
    margin-top: 3px;
    font-size: 1.1rem;
  }

  @media ${MOBILE_SELECTOR} {
    margin-top: 3px;
    font-size: 0.8rem;
  }
`

export const volumeIconSizeStyle = css`
  font-size: 2.3rem;

  @media ${TABLET_SELECTOR} {
    font-size: 0.9rem;
  }

  @media ${MOBILE_SELECTOR} {
    font-size: 1.1rem;
  }
`
