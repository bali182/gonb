import { FC, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Tooltip } from './Tooltip'
import { Position, PositionData } from './types'
import { useActiveElement } from './useActiveElement'
import { getTooltipCoordinates, getTooltipPosition } from './utils'
import { MessageKey } from '../../languages/types'
import { isNil } from '../../common/utils'

const TOOLTIP_ROOT = document.getElementById('tooltip')!
const TOOLTIP_APPEAR_DELAY = 500
const TOOLTIP_DISAPPEAR_DELAY = 300

type TooltipManagerProps = {
  disabled?: boolean
}

export const TooltipManager: FC<TooltipManagerProps> = ({ disabled }) => {
  const measureRef = useRef<HTMLDivElement>(null)
  const element = useActiveElement()
  const [messageKey, setMessageKey] = useState<MessageKey>()
  const [visible, setVisible] = useState(false)

  const [{ position, x, y, width, height }, setPositionData] =
    useState<PositionData>({
      position: 'bottom',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (!isNil(element) && !disabled) {
      setMessageKey(element.getAttribute('data-tooltip') as MessageKey)
      timeoutId = setTimeout(() => setVisible(true), TOOLTIP_APPEAR_DELAY)
      return () => clearTimeout(timeoutId)
    } else {
      timeoutId = setTimeout(() => setVisible(false), TOOLTIP_DISAPPEAR_DELAY)
      return () => clearTimeout(timeoutId)
    }
  }, [element])

  useLayoutEffect(() => {
    if (isNil(measureRef.current) || isNil(element) || disabled) {
      return
    }
    const tooltipRect = measureRef.current.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const position: Position = getTooltipPosition(elementRect, tooltipRect)
    const [x, y] = getTooltipCoordinates(position, elementRect, tooltipRect)
    setPositionData({
      position,
      x,
      y,
      width: tooltipRect.width,
      height: tooltipRect.height,
    })
  }, [element, messageKey])

  return createPortal(
    <>
      {/* The real tooltip */}
      <Tooltip
        messageKey={messageKey}
        visible={visible}
        position={position}
        x={x}
        y={y}
        width={width}
        height={height}
      />
      {/* Used for measuring text without position based distortion */}
      <Tooltip
        ref={measureRef}
        messageKey={messageKey}
        visible={false}
        x={1}
        y={1}
      />
    </>,

    TOOLTIP_ROOT,
  )
}
