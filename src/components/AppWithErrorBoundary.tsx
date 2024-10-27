import { FC } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { App } from './App'

export const AppWithErrorBoundary: FC = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
