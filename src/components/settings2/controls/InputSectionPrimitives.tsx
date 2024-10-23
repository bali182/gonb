import { css } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { Issue } from '../types'
import { PiWarningBold, PiWarningCircleBold } from 'react-icons/pi'

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

const issueLabelStyle = css`
  font-size: 0.8em;
  margin-bottom: 2px;
  pointer-events: auto;
  &:nth-last-child(2) {
    margin-bottom: 14px;
  }
`

type IssueLabelProps = {
  issue: Issue
}

const WARNING_COLOR = '#ec942c'
const ERROR_COLOR = '#cc3300'

export const IssueLabel: FC<IssueLabelProps> = ({ issue }) => {
  return (
    <div
      className={issueLabelStyle}
      style={{ color: issue.type === 'error' ? ERROR_COLOR : WARNING_COLOR }}
    >
      {issue.label}
    </div>
  )
}

const descriptionStyle = css`
  font-size: 0.8em;
  color: #000000aa;
  margin-bottom: 2px;
  &:nth-last-child(2) {
    margin-bottom: 14px;
  }
`

export const Description: FC<PropsWithChildren> = ({ children }) => {
  return <div className={descriptionStyle}>{children}</div>
}

export const ExampleWithError: FC = () => {
  return (
    <Section>
      <Label>Hello</Label>
      <Description>Description of hello</Description>
      <IssueLabel issue={{ type: 'error', label: 'Hello is not good' }} />
      <input />
    </Section>
  )
}

export const ExampleWithNoError: FC = () => {
  return (
    <Section>
      <Label>Hello</Label>
      <Description>Description of hello</Description>
      <IssueLabel issue={{ type: 'error', label: 'Hello is not good' }} />
      <input />
    </Section>
  )
}

export const WarningIcon: FC = () => <PiWarningBold color={WARNING_COLOR} />
export const ErrorIcon: FC = () => <PiWarningCircleBold color={ERROR_COLOR} />
