import { json } from '@coderline/alphatab'
import { isNil } from '../common/utils'
import { isMobile } from '../components/useIsMobile'

const core: json.CoreSettingsJson = {
  tex: true,
  fontDirectory: 'font/',
  engine: 'svg',
}

const display = (mobile: boolean): json.DisplaySettingsJson => ({
  staveProfile: 'Default',
  scale: mobile ? 1.8 : 1,
  // justifyLastSystem: true,
  // barsPerRow: 4,
  // resources: {
  //   staffLineColor: '#ffffff80',
  //   barSeparatorColor: '#fff',
  //   mainGlyphColor: '#fff',
  //   secondaryGlyphColor: '#fff',
  //   scoreInfoColor: '#fff',
  //   barNumberColor: '#fff',
  // },
})
export const player = (
  scrollElement: HTMLElement,
): json.PlayerSettingsJson => ({
  scrollElement,
  enableCursor: true,
  enableAnimatedBeatCursor: true,
  enableElementHighlighting: true,
  enablePlayer: true,
  enableUserInteraction: true,
  soundFont: 'soundfont/sonivox.sf2',
})

export const noPlayer = (
  scrollElement: HTMLElement,
): json.PlayerSettingsJson => ({
  scrollElement,
  enableCursor: false,
  enableAnimatedBeatCursor: false,
  enableElementHighlighting: false,
  enablePlayer: false,
  enableUserInteraction: false,
})

// For now it's untyped
const elements: any = {
  guitarTuning: false,
  trackNames: false,
}

const notation: json.NotationSettingsJson = {
  elements,
}

export const alphaTabConfig = (
  scrollElement: HTMLElement,
  overrides?: Partial<json.PlayerSettingsJson>,
): json.SettingsJson => ({
  core,
  display: display(isMobile()),
  notation,
  player: isNil(overrides) ? player(scrollElement) : overrides,
})
