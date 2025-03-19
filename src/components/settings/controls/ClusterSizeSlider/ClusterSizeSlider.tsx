import { css, cx } from '@emotion/css'
import { FC, ReactNode, useMemo } from 'react'
import { Range, getTrackBackground } from 'react-range'
import { IMarkProps, IThumbProps, ITrackProps } from 'react-range/lib/types'

export type ClusterSizeSliderProps = {
  value: number
  max: number
  onChange: (value: number) => void
}

export const ClusterSizeSlider: FC<ClusterSizeSliderProps> = ({
  max,
  onChange,
  value,
}) => {
  const values = useMemo(() => [value], [value])
  const _onChange = ([v]: number[]) => {
    const newValue = Math.max(1, v!)
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  return (
    <Range
      values={values}
      step={1}
      min={0}
      max={max}
      onChange={_onChange}
      renderMark={({ index, props }) => {
        if (index === 0 || index === max) {
          return null
        }
        return (
          <Mark index={index} props={props} value={value} key={props.key} />
        )
      }}
      renderTrack={({ props, children }) => (
        <Track props={props} children={children} max={max} values={values} />
      )}
      renderThumb={({ props, isDragged }) => (
        <Thumb props={props} isDragged={isDragged} key={props.key} />
      )}
    />
  )
}

type MarkProps = {
  index: number
  props: IMarkProps
  value: number
}

const markStyle = css`
  width: 2px;
  height: 2px;
  border-radius: 1px;
`

const Mark: FC<MarkProps> = ({ props, index, value }) => {
  const backgroundColor = index < value ? '#ffffffdd' : '#00000099'
  return (
    <div
      {...props}
      className={markStyle}
      style={{ ...props.style, backgroundColor }}
    />
  )
}

type TrackProps = {
  props: ITrackProps
  children: ReactNode
  max: number
  values: number[]
}

const trackOuterStyle = css`
  height: 33px;
  display: flex;
  width: 100%;
`

const trackInnerStyle = css`
  height: 6px;
  width: 100%;
  border-radius: 3px;
  align-self: center;
`

const Track: FC<TrackProps> = ({ props, children, max, values }) => {
  const trackBackround = getTrackBackground({
    values: values,
    colors: ['#777', '#cfcfcf'],
    min: 0,
    max: max,
  })
  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      className={trackOuterStyle}
      style={props.style}
    >
      <div
        ref={props.ref}
        className={trackInnerStyle}
        style={{ background: trackBackround }}
      >
        {children}
      </div>
    </div>
  )
}

type ThumbProps = {
  props: IThumbProps
  isDragged: boolean
}

const thumbStlye = css`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background-color: #777;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: outline 0.5s ease;
  outline: 0px solid #00000020;
`

const draggedThumbShadow = css`
  outline: 6px solid #00000020;
`

const Thumb: FC<ThumbProps> = ({ props, isDragged }) => {
  const fullStyle = cx({
    [thumbStlye]: true,
    [draggedThumbShadow]: isDragged,
  })
  return (
    <div {...props} key={props.key} className={fullStyle} style={props.style}>
      {props['aria-valuenow']}
    </div>
  )
}
