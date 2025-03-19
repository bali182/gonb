import { css, cx } from '@emotion/css'
import { FC, useState } from 'react'
import { PiGear, PiX } from 'react-icons/pi'

const headerButtonContainerStyle = css`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 3rem;
`

export const HamburgerMenu: FC = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={headerButtonContainerStyle}>
      <PiGear onClick={() => setOpen(!isOpen)} />
      <Menu isOpen={isOpen} setOpen={setOpen} />
    </div>
  )
}

const menuContainerStyle = css`
  position: fixed;
  top: 0px;
  left: 100vw;
  height: 100vh;
  width: 100vw;
  z-index: 1001;
  transition: 0.2s ease;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 2px 29px 0px;

  @supports (height: 100dvh) {
    height: min(100vh, 100dvh);
  }
`

const openMenuContainerStyle = css`
  left: 0px;
`

const headerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 40px;
  height: 150px;
`

const menuLabelStyle = css`
  font-size: 2rem;
`

const closeIconStyle = css`
  font-size: 3rem;
`

type MenuProps = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const Menu: FC<MenuProps> = ({ isOpen, setOpen }) => {
  const style = cx({
    [menuContainerStyle]: true,
    [openMenuContainerStyle]: isOpen,
  })
  const onClose = () => setOpen(false)
  return (
    <div className={style}>
      <div className={headerStyle}>
        <div className={menuLabelStyle}>Menu</div>
        <PiX className={closeIconStyle} onClick={onClose} />
      </div>
    </div>
  )
}
