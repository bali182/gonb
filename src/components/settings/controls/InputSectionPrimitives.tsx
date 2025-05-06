import { css, cx } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'
import { PiWarningBold, PiWarningCircleBold } from 'react-icons/pi'
import { isNil } from '../../../common/utils'
import { Issue, IssueType } from '../../../state/validation/types'
import { useHighestSeverity } from '../../../state/validation/utils'
import {
  bodyTextStyle,
  smallTextStyle,
  MOBILE_SELECTOR,
  TABLET_SELECTOR,
} from '../../constants'

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  padding: 14px;
  pointer-events: auto;

  @media ${MOBILE_SELECTOR} {
    padding: 10px;
  }
  @media ${TABLET_SELECTOR} {
    padding: 10px;
  }
`

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <div className={sectionStyle}>{children}</div>
}

const labelStyle = cx(
  bodyTextStyle,
  css`
    color: #000000dd;
    margin-bottom: 2px;
    pointer-events: auto;
  `,
)

export const Label: FC<PropsWithChildren> = ({ children }) => {
  return <div className={labelStyle}>{children}</div>
}

const descriptionStyle = cx(
  smallTextStyle,
  css`
    color: #000000aa;
    margin-bottom: 14px;
  `,
)

const warningStyle = css`
  font-weight: bold;
  color: #ec942c;
`

const errorStyle = css`
  font-weight: bold;
  color: #cc3300;
`

type DescriptionProps = PropsWithChildren & {
  issues: ReadonlyArray<Issue>
}

export const Description: FC<DescriptionProps> = ({ children, issues }) => {
  const highestSeverity = useHighestSeverity(issues)

  const style = cx({
    [descriptionStyle]: true,
    [warningStyle]: highestSeverity?.type === IssueType.WARNING,
    [errorStyle]: highestSeverity?.type === IssueType.ERROR,
  })

  return (
    <div className={style}>
      {isNil(highestSeverity) ? children : highestSeverity.label}
    </div>
  )
}

export const WarningIcon: FC = () => <PiWarningBold color="#ec942c" />
export const ErrorIcon: FC = () => <PiWarningCircleBold color="#cc3300" />
