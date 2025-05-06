import { json } from '@coderline/alphatab'
import { isNil } from '../common/utils'

const core: json.CoreSettingsJson = {
  tex: true,
  fontDirectory: 'font/',
  engine: 'svg',
}

const display: json.DisplaySettingsJson = {
  staveProfile: 'Default',
  padding: [10, 20],
  scale: 1,
}

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
  display,
  notation,
  player: isNil(overrides) ? player(scrollElement) : overrides,
})
