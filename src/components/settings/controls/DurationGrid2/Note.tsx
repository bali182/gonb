import { css } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'

const noteStyle = css`
  font-family: 'Bravura';
  font-size: 28px;
  line-height: 28px;
  pointer-events: none;
  letter-spacing: 5px;
  position: relative;
`

export const Note: FC<PropsWithChildren & { top?: number }> = ({
  children,
  top,
}) => {
  return (
    <span className={noteStyle} style={{ top }}>
      {children}
    </span>
  )
}
