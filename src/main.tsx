import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import { HashRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './languages/i18n'
import { globalStyles } from './globalStyles'
import { Score } from './Score'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Global styles={globalStyles} />
    <I18nextProvider i18n={i18n}>
      <Score />
    </I18nextProvider>
  </HashRouter>,
)
