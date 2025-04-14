import { css } from '@emotion/css'
import { FC } from 'react'
import { Logo } from './Logo'
import { Language } from '../state/types'
import { IS_MOBILE_QUERY, useIsMobile } from './useIsMobile'
import { ToolbarMenuDesktop } from './ToolbarMenu'
import { ConfigButton } from './settings/mobile/ConfigButton'
import { DESKTOP_TOOLBAR_HEIGHT, MOBILE_TOOLBAR_HEIGHT } from './constants'

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${DESKTOP_TOOLBAR_HEIGHT}px;
  padding: 20px 200px;
  @media ${IS_MOBILE_QUERY} {
    padding: 10px;
    height: ${MOBILE_TOOLBAR_HEIGHT}px;
  }
`

export type ToolbarProps = {
  language: Language
  onRegenerate: () => void
  onOpenSettings: () => void
  onOpenHelp: () => void
  onLanguageChange: (language: Language) => void
}

export const Toolbar: FC<ToolbarProps> = (props) => {
  const isMobile = useIsMobile()
  return (
    <div className={toolbarStyle}>
      <Logo />
      {!isMobile && <ToolbarMenuDesktop {...props} />}
      {isMobile && <ConfigButton />}
    </div>
  )
}
