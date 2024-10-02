import { json } from '@coderline/alphatab'

const core: json.CoreSettingsJson = {
  tex: true,
  fontDirectory: 'font/',
  engine: 'svg',
}

const display: json.DisplaySettingsJson = {
  staveProfile: 'Default',
  // justifyLastSystem: true,
  // barsPerRow: 4,
  resources: {
    staffLineColor: '#ffffff80',
    barSeparatorColor: '#fff',
    mainGlyphColor: '#fff',
    secondaryGlyphColor: '#fff',
    scoreInfoColor: '#fff',
    barNumberColor: '#fff',
  },
}

const player = (scrollElement: HTMLElement): json.PlayerSettingsJson => ({
  scrollElement,
  enableCursor: true,
  enableAnimatedBeatCursor: true,
  enableElementHighlighting: true,
  enablePlayer: true,
  enableUserInteraction: true,
  soundFont: 'soundfont/sonivox.sf2',
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
): json.SettingsJson => ({
  core,
  display,
  notation,
  player: player(scrollElement),
})
