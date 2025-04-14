import { FC } from 'react'
import { Score } from './Score'
import { Toolbar } from './Toolbar'
import { TooltipManager } from './tooltip/TooltipManager'
import { AppContext } from '../context/AppContext'
import { useCreateAppContext } from '../context/useCreateAppContext'
import { Settings } from './settings/Settings'
import { Help } from './help/Help'

export const App: FC = () => {
  const context = useCreateAppContext()

  return (
    <AppContext.Provider value={context}>
      <TooltipManager disabled={false} />
      <Toolbar />
      <Score />
      <Help />
      <Settings />
    </AppContext.Provider>
  )
}
