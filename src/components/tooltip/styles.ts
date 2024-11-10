import { css } from '@emotion/css'
import { Position } from './types'

const background = '#333'

export const tooltipStyle = css`
  position: fixed;
  color: white;
  background-color: ${background};
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  visibility: hidden;
  transition: opacity 0.01s ease;
`

export const arrowStyle = css`
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
`

const tooltipPositions: Record<Position, string> = {
  top: css`
    transform: translate(-50%, -100%);
    margin-bottom: 10px;
  `,
  bottom: css`
    transform: translate(-50%, 10px);
    margin-top: 10px;
  `,
  left: css`
    transform: translate(-100%, -50%);
    margin-right: 10px;
  `,
  right: css`
    transform: translate(10px, -50%);
    margin-left: 10px;
  `,
}

const arrowPositions: Record<Position, string> = {
  top: css`
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: ${background};
  `,
  bottom: css`
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: ${background};
  `,
  left: css`
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: ${background};
  `,
  right: css`
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: ${background};
  `,
}

export const positions = {
  tooltip: tooltipPositions,
  arrow: arrowPositions,
}
