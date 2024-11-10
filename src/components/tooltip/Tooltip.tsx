import { css, cx } from '@emotion/css'
import { Position } from './types'
import { CSSProperties, forwardRef } from 'react'
import { Trans } from 'react-i18next'
import { MessageKey } from '../../languages/types'
import { isNil } from '../../common/utils'

const color = '#111'
const arrowSize = 8
const arrowSizeShift = arrowSize * 2 - 2

export const baseTooltipStyle = css`
  position: fixed;
  max-width: 400px;
  background-color: ${color};
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 6px;
  pointer-events: none;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  /* transition: opacity 0.1s ease, visibility 0.1s ease; */
`

export const baseArrowStyle = css`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${arrowSize}px;
  border-color: transparent;
`

const tooltipPositions: Record<Position, string> = {
  top: css`
    transform: translate(-50%, -100%);
  `,
  bottom: css`
    transform: translate(-50%, 10px);
  `,
  left: css`
    transform: translate(-100%, -50%);
  `,
  right: css`
    transform: translate(10px, -50%);
  `,
}

const arrowPositions: Record<Position, string> = {
  top: css`
    bottom: -${arrowSizeShift}px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: ${color} !important;
  `,
  bottom: css`
    top: -${arrowSizeShift}px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: ${color} !important;
  `,
  left: css`
    right: -${arrowSizeShift}px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: ${color} !important;
  `,
  right: css`
    left: -${arrowSizeShift}px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: ${color} !important;
  `,
}

export type TooltipProps = {
  messageKey?: MessageKey
  x: number
  y: number
  width?: number
  height?: number
  position?: Position
  visible: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ messageKey, x, y, width, height, visible, position }, ref) => {
    const styles: CSSProperties = {
      top: y,
      left: x,
      visibility: visible ? 'visible' : 'hidden',
      opacity: visible ? 1 : 0,
    }

    if (!isNil(width) && width > 0) {
      styles.width = width
    }
    if (!isNil(height) && height > 0) {
      styles.height = height
    }

    const tooltipStyle = cx(
      baseTooltipStyle,
      isNil(position) ? undefined : tooltipPositions[position],
    )

    const arrowStyle = cx(
      baseArrowStyle,
      isNil(position) ? undefined : arrowPositions[position],
    )

    return (
      <div ref={ref} className={tooltipStyle} style={styles}>
        <div className={arrowStyle}></div>
        <Trans i18nKey={messageKey} />
      </div>
    )
  },
)
