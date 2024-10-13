import { css } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  padding: 14px;
  pointer-events: auto;
`

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <div className={sectionStyle}>{children}</div>
}

const labelStyle = css`
  font-size: 1em;
  color: #000000;
  margin-bottom: 2px;
  pointer-events: auto;
`

export const Label: FC<PropsWithChildren> = ({ children }) => {
  return <div className={labelStyle}>{children}</div>
}

const descriptionStyle = css`
  font-size: 0.8em;
  margin-bottom: 10px;
  color: #000000aa;
`

export const Description: FC<PropsWithChildren> = ({ children }) => {
  return <div className={descriptionStyle}>{children}</div>
}
