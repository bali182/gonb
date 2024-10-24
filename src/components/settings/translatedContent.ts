import { TFunction } from 'i18next'
import { Clef, KeySignature } from '../../common/common'
import { useMemoizedTranslation } from '../../common/useMemoizedTranslation'
import { MelodyType } from '../../legacy/melodies/types'

function getClefTranslations(t: TFunction): Map<Clef, string> {
  const clefs = [Clef.TREBLE, Clef.BASS]
  return new Map(
    clefs.map((clef): [Clef, string] => [clef, t(`Clefs.${clef}`)]),
  )
}

export function useClefTranslations() {
  return useMemoizedTranslation(getClefTranslations)
}

function getKeySignatureTranslations(t: TFunction): Map<KeySignature, string> {
  const signatures = [
    KeySignature.C_MAJOR_A_MINOR,
    KeySignature.G_MAJOR_E_MINOR_1_SHARP,
    KeySignature.D_MAJOR_B_MINOR_2_SHARPS,
    KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS,
    KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS,
    KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS,
    KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS,
    KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS,
    KeySignature.F_MAJOR_D_MINOR_1_FLAT,
    KeySignature.Bb_MAJOR_G_MINOR_2_FLATS,
    KeySignature.Eb_MAJOR_C_MINOR_3_FLATS,
    KeySignature.Ab_MAJOR_F_MINOR_4_FLATS,
    KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS,
    KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS,
    KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS,
  ]
  return new Map(
    signatures.map((signature): [KeySignature, string] => [
      signature,
      t(`KeySignatures.${signature}`),
    ]),
  )
}

export function useKeySignatureTranslations() {
  return useMemoizedTranslation(getKeySignatureTranslations)
}

function getMelodyTypes(t: TFunction): Map<MelodyType, string> {
  const melodyTypes: MelodyType[] = [
    'WHOLE_NOTES',
    'HALF_NOTES',
    'QUARTER_NOTES',
    'MELODY',
  ]
  return new Map(
    melodyTypes.map((type): [MelodyType, string] => [
      type,
      t(`MelodyTypes.${type}`),
    ]),
  )
}

export function useMelodyTypeTranslations() {
  return useMemoizedTranslation(getMelodyTypes)
}
