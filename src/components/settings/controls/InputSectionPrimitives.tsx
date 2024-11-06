import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { PiWarningBold, PiWarningCircleBold } from 'react-icons/pi'
import { isNil } from '../../../common/utils'
import { Issue, IssueType } from '../../../state/validation/types'

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
  color: #000000aa;
  margin-bottom: 14px;
`

const warningStyle = css`
  font-weight: bold;
  color: #ec942c;
`

const errorStyle = css`
  font-weight: bold;
  color: #cc3300;
`

type DescriptionProps = PropsWithChildren & {
  issue?: Issue
}

export const Description: FC<DescriptionProps> = ({ children, issue }) => {
  const style = cx({
    [descriptionStyle]: true,
    [warningStyle]: issue?.type === IssueType.WARNING,
    [errorStyle]: issue?.type === IssueType.ERROR,
  })

  return <div className={style}>{isNil(issue) ? children : issue.label}</div>
}

export const WarningIcon: FC = () => <PiWarningBold color="#ec942c" />
export const ErrorIcon: FC = () => <PiWarningCircleBold color="#cc3300" />
