import { chromatic } from '@tonaljs/range'

export const SIX_STRING_GUITAR = chromatic(['E2', 'E5'], { sharps: true })
export const SEVEN_STRING_GUITAR = chromatic(['B1', 'E5'], {
  sharps: true,
})
export const FOUR_STRING_BASS = chromatic(['E1', 'G3'], { sharps: true })
export const FIVE_STRING_BASS = chromatic(['B0', 'G3'], { sharps: true })

export const SIX_STRING_GUITAR_UNFRETTED = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
export const SEVEN_STRING_GUITAR_UNFRETTED = [
  'B0',
  'E2',
  'A2',
  'D3',
  'G3',
  'B3',
  'E4',
]
export const FOUR_STRING_BASS_UNFRETTED = ['E1', 'A1', 'D2', 'G2']
export const FIVE_STRING_BASS_UNFRETTED = ['B0', 'E1', 'A1', 'D2', 'G2']
