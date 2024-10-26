import { css, cx } from '@emotion/css'
import { FC, MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type ModalProps = {
  onBackdropClick?: () => void
  children: string | ReactNode
  modalClassName?: string
  backdropClassName?: string
}

const backdropStyle = css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  @supports (height: 100dvh) {
    height: min(100vh, 100dvh);
  }
  z-index: 10001;
  backdrop-filter: blur(30px);
  background-color: #00000099;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`

const modalStyle = css`
  background-color: #efefef;
  border-radius: 14px;
  user-select: text;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`

const MODAL_ROOT = document.getElementById('modal')!

export const Modal: FC<ModalProps> = ({
  onBackdropClick,
  modalClassName,
  backdropClassName,
  children,
}) => {
  const stopPropagation = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return createPortal(
    <div
      className={cx(backdropStyle, backdropClassName)}
      onClick={onBackdropClick}
    >
      <div onClick={stopPropagation} className={cx(modalStyle, modalClassName)}>
        {children}
      </div>
    </div>,
    MODAL_ROOT,
  )
}
