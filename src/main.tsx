import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import { HashRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './languages/i18n'
import { globalStyles } from './components/globalStyles'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { AppWithErrorBoundary } from './components/AppWithErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HashRouter>
      <Global styles={globalStyles} />
      <I18nextProvider i18n={i18n}>
        <AppWithErrorBoundary />
      </I18nextProvider>
    </HashRouter>
  </Provider>,
)
