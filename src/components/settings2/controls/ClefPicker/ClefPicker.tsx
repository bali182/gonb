import { FC } from 'react'
import { ClefButton } from './ClefButton'
import { Clef } from '../../../../model/common'
import { css } from '@emotion/css'

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const ClefPicker: FC = ({}) => {
  return (
    <div className={wrapperStyle}>
      <ClefButton clef={Clef.TREBLE} />
      <ClefButton clef={Clef.BASS} />
      <ClefButton clef={Clef.SOPRANO} />
      <ClefButton clef={Clef.PERCUSSION} />
    </div>
  )
}
