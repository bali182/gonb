import { ChangeEvent, MouseEvent, FC } from 'react'
import { TimeSignature } from '../../../../state/types'
import { Input } from '../Input/Input'
import { css, cx } from '@emotion/css'

export type TimeSignaturePickerProps = {
  value: TimeSignature
  onChange: (value: TimeSignature) => void
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  padding: 5px 7px;
  gap: 8px;
  background-color: #00000010;
`

const inputStyle = css`
  max-width: 60px;
  padding: 5px 7px;
`

const upperStyle = cx(inputStyle, css``)

const lowerStyle = cx(inputStyle, css``)

function getLowerStep(value: number): number {
  switch (value) {
    case 1:
      return 1
    case 2:
      return 2
    case 4:
      return 4
    default:
      return 0
  }
}

export const TimeSignaturePicker: FC<TimeSignaturePickerProps> = ({
  value,
  onChange,
}) => {
  const onUpperChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, upper: e.target.valueAsNumber })
  }
  const onLowerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, lower: e.target.valueAsNumber })
  }

  return (
    <div className={containerStyle}>
      <Input
        className={upperStyle}
        value={value.upper}
        onChange={onUpperChange}
        type="number"
        step={1}
        min={1}
        max={30}
      />
      /
      <Input
        className={lowerStyle}
        value={value.lower}
        onChange={onLowerChange}
        type="number"
        step={1}
        min={1}
        max={8}
      />
    </div>
  )
}
