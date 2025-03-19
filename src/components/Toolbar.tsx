import { css } from '@emotion/css'
import { FC } from 'react'
import { Logo } from './Logo'
import { Language } from '../state/types'
import { IS_MOBILE_QUERY, useIsMobile } from './useIsMobile'
import { ToolbarMenuDesktop } from './ToolbarMenu'
import { HamburgerMenu } from './HamburgerMenu'

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  padding: 20px 200px;
  @media ${IS_MOBILE_QUERY} {
    padding: 40px;
    height: 150px;
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
      {isMobile && <HamburgerMenu />}
    </div>
  )
}
