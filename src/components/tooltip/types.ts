export type Position = 'top' | 'bottom' | 'left' | 'right'

export type PositionData = {
  x: number
  y: number
  width: number
  height: number
  position: Position
}

export type Spaces = {
  spaceAbove: number
  spaceBelow: number
  spaceRight: number
  spaceLeft: number
}

export type CanFitFn = (rect: DOMRect, space: Spaces) => boolean
