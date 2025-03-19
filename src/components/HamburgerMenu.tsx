import { css } from '@emotion/css'
import { FC } from 'react'
import { PiListBold } from 'react-icons/pi'

const menuContainerStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 3rem;
`

export const HamburgerMenu: FC = () => {
  return (
    <div className={menuContainerStyle}>
      <PiListBold />
    </div>
  )
}
