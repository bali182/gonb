import { css } from '@emotion/css'
import { ModalPage, PagedModalButton } from '../../types'

const menuStyle = css`
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  min-width: 245px;
`

const menuContainerStyle = css`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`

const menuItemStlye = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000cc;
  font-size: 1.8rem;
  gap: 20px;
  padding: 30px 40px;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #00000010;
  }
`

const menuItemNameStyle = css`
  flex: 1;
`

export type DrilldownMenuProps<P extends string, T> = {
  pages: ModalPage<P, T>[]
  onClick: (page: ModalPage<P, T>) => void
}

export function DrilldownMenu<P extends string, T>({
  pages,
  onClick,
}: DrilldownMenuProps<P, T>) {
  return (
    <div className={menuStyle}>
      <div className={menuContainerStyle}>
        {pages.map((e) => {
          const { id, name, Icon, Badge } = e
          return (
            <div key={id} className={menuItemStlye} onClick={() => onClick(e)}>
              <Icon />
              <span className={menuItemNameStyle}>{name}</span>
              {Badge && <Badge />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export type _DrilldownMenuProps<P extends string, T> = {
  activePageId: P | undefined
  pageProps: T
  pages: ModalPage<P, T>[]
  buttons?: PagedModalButton[]
  onClick?: (button: PagedModalButton, props: T) => void
  setActivePage: (pageId: P) => void
}
