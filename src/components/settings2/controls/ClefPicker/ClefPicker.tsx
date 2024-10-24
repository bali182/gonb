import { FC } from 'react'
import { ClefButton } from './ClefButton'
import { Clef } from '../../../../common/common'
import { css } from '@emotion/css'
import { useClefModel } from './useClefModel'

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
export type ClefPickerProps = {
  value: Clef
  onChange: (clef: Clef) => void
}

export const ClefPicker: FC<ClefPickerProps> = ({ value, onChange }) => {
  const clefs = useClefModel()

  return (
    <div className={wrapperStyle}>
      {clefs.map((model) => (
        <ClefButton
          key={model.clef}
          model={model}
          isSelected={model.clef === value}
          onClick={() => onChange(model.clef)}
        />
      ))}
    </div>
  )
}
