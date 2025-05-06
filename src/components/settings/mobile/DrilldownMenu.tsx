import { css, cx } from '@emotion/css'
import { ModalPage } from '../../types'
import { bodyTextStyle } from '../../constants'

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

const menuItemStlye = cx(
  bodyTextStyle,
  css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000000dd;
    gap: 10px;
    padding: 15px 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &:hover {
      color: #000000;
      background-color: #00000010;
    }
  `,
)

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
