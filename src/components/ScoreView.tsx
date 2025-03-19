import { FC } from 'react'
import { css, cx } from '@emotion/css'
import { IS_MOBILE_QUERY } from './useIsMobile'

export type ScoreViewProps = {
  setRootCallback: (root: HTMLDivElement) => void
  setScrollAreaCallback: (area: HTMLDivElement) => void
  viewPortStyle?: string
}

const contentStyle = css`
  // .at-content
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
`

const baseViewportStyle = css`
  // .at-viewport
  overflow-y: auto;
  position: absolute;
  top: 0px;
  bottom: 30px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #ffffff;

  @media ${IS_MOBILE_QUERY} {
    background-color: #ffffff;
    border-radius: 40px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 30px 29px 0px;
  }
`

export const ScoreView: FC<ScoreViewProps> = ({
  setRootCallback,
  setScrollAreaCallback,
  viewPortStyle,
}) => {
  return (
    <div className={contentStyle}>
      <div
        className={cx(baseViewportStyle, viewPortStyle)}
        ref={setScrollAreaCallback}
      >
        <div ref={setRootCallback}></div>
      </div>
    </div>
  )
}
