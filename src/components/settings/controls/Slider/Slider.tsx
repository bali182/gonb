import { FC, ReactNode, useMemo } from 'react'
import { Range, getTrackBackground } from 'react-range'
import { IMarkProps, IThumbProps, ITrackProps } from 'react-range/lib/types'

const SELECTED_COLOR = '#238636'

export type SliderProps = {
  value: number
  max: number
  onChange: (value: number) => void
}

export const Slider: FC<SliderProps> = ({ max, onChange, value }) => {
  const values = useMemo(() => [value], [value])
  const _onChange = ([value]: number[]) => onChange(value!)

  return (
    <Range
      values={values}
      step={1}
      min={0}
      max={max}
      onChange={_onChange}
      renderMark={({ index, props }) => (
        <Mark index={index} props={props} value={value} />
      )}
      renderTrack={({ props, children }) => (
        <Track props={props} children={children} max={max} values={values} />
      )}
      renderThumb={({ props, isDragged }) => (
        <Thumb props={props} isDragged={isDragged} />
      )}
    />
  )
}

type MarkProps = {
  index: number
  props: IMarkProps
  value: number
}

const Mark: FC<MarkProps> = ({ props }) => {
  return (
    <div
      {...props}
      key={props.key}
      style={{
        ...props.style,
        height: '3px',
        width: '3px',
        borderRadius: '2px',
        backgroundColor: '#00000080',
      }}
    />
  )
}

type TrackProps = {
  props: ITrackProps
  children: ReactNode
  max: number
  values: number[]
}

const Track: FC<TrackProps> = ({ props, children, max, values }) => {
  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: '34px',
        display: 'flex',
        width: '100%',
      }}
    >
      <div
        ref={props.ref}
        style={{
          height: '6px',
          width: '100%',
          borderRadius: '2px',
          background: getTrackBackground({
            values: values,
            colors: ['#00000080', '#00000030'],
            min: 0,
            max: max,
          }),
          alignSelf: 'center',
        }}
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

const Thumb: FC<ThumbProps> = ({ props, isDragged }) => {
  return (
    <div
      {...props}
      key={props.key}
      style={{
        ...props.style,
        height: '26px',
        width: '26px',
        borderRadius: '50%',
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'box-shadow 0.2s ease',
        boxShadow: isDragged ? '0px 2px 14px #aaa' : '0px 2px 6px #AAA',
      }}
    />
  )
}
