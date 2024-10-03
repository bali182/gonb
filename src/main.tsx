import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import { HashRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './languages/i18n'
import { globalStyles } from './components/globalStyles'
import { Score } from './components/Score'
import { getRandomMelody } from './model/getRandomMelody'
import { Clef, KeySignature } from './model/common'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Global styles={globalStyles} />
    <I18nextProvider i18n={i18n}>
      <Score />
    </I18nextProvider>
  </HashRouter>,
)

const melody = getRandomMelody({
  bars: 4,
  clef: Clef.BASS,
  keySignature: KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS,
  type: 'QUARTER_NOTES',
})

console.log(melody)
