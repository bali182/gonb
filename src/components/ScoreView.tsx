import { FC } from 'react'
import { css } from '@emotion/css'

export type ScoreViewProps = {
  viewPortLeft?: number
  viewPortRight?: number
  viewPortTop?: number
  viewPortBottom?: number
  padding?: number
  setRootCallback: (root: HTMLDivElement) => void
  setScrollAreaCallback: (area: HTMLDivElement) => void
}

const contentStyle = css`
  // .at-content
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
`

const viewportStyle = css`
  // .at-viewport
  overflow-y: auto;
  position: absolute;
  top: 0px;
  bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const ScoreView: FC<ScoreViewProps> = ({
  setRootCallback,
  setScrollAreaCallback,
  viewPortLeft,
  viewPortRight,
  viewPortBottom,
  viewPortTop,
  padding,
}) => {
  return (
    <div className={contentStyle}>
      <div
        className={viewportStyle}
        style={{
          left: viewPortLeft,
          right: viewPortRight,
          top: viewPortTop,
          bottom: viewPortBottom,
          padding,
        }}
        ref={setScrollAreaCallback}
      >
        <div ref={setRootCallback}></div>
      </div>
    </div>
  )
}
