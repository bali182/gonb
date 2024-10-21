import { ChordsHarmonicFunction } from './types'

export const fourChordTemplates: ChordsHarmonicFunction[][] = [
  // 1-5-6-4 - C, G, Am, F
  ['Tonic', 'Dominant', 'Tonic', 'SubDominant'],
  // 6-4-1-5 - Am, F, C, G
  ['Tonic', 'SubDominant', 'Tonic', 'Dominant'],
  // 1-4-5-4 - C, F, G, F
  ['Tonic', 'SubDominant', 'Dominant', 'SubDominant'],
  // 1-6-4-5 - C, Am, F, G
  ['Tonic', 'Tonic', 'SubDominant', 'Dominant'],

  // With secondary dominants
  ['Tonic', 'SubDominant', 'SecondaryDominant', 'Tonic'],
  ['Tonic', 'SubDominant', 'SecondaryDominant', 'Dominant'],
  ['Tonic', 'SubDominant', 'SecondaryDominant', 'SubDominant'],
]

export const threeChordTemplates: ChordsHarmonicFunction[][] = [
  ['Tonic', 'SubDominant', 'Dominant'],
  ['Tonic', 'SecondaryDominant', 'Dominant'],
  ['Tonic', 'SecondaryDominant', 'SubDominant'],
  ['Tonic', 'Dominant', 'SubDominant'],
  ['Tonic', 'Tonic', 'SubDominant'],
  ['Tonic', 'Tonic', 'Dominant'],
]

export const twoChordTemplates: ChordsHarmonicFunction[][] = [
  // 1-5 - C, G
  ['Tonic', 'Dominant'],
  // 1-4 - C, G
  ['Tonic', 'SubDominant'],
]

export const oneChordTemplates: ChordsHarmonicFunction[][] = [
  // 1 - C
  ['Tonic'],
  // 4 - F
  ['SubDominant'],
  // 5 - G
  ['Dominant'],
]

export const deafultTemplates: ChordsHarmonicFunction[][] = [
  ...fourChordTemplates,
  ...threeChordTemplates,
  ...twoChordTemplates,
  ...oneChordTemplates,
]
