import { KeySignature } from '../../../../model/common'
import { Accidental } from './types'

export function getAccidental(
  keySignature: KeySignature,
): Accidental | undefined {
  switch (keySignature) {
    case KeySignature.C_MAJOR_A_MINOR:
      return undefined
    case KeySignature.G_MAJOR_E_MINOR_1_SHARP:
    case KeySignature.D_MAJOR_B_MINOR_2_SHARPS:
    case KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS:
    case KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS:
    case KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS:
    case KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS:
    case KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS:
      return '#'
    case KeySignature.F_MAJOR_D_MINOR_1_FLAT:
    case KeySignature.Bb_MAJOR_G_MINOR_2_FLATS:
    case KeySignature.Eb_MAJOR_C_MINOR_3_FLATS:
    case KeySignature.Ab_MAJOR_F_MINOR_4_FLATS:
    case KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS:
    case KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS:
    case KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS:
      return 'b'
  }
}

export function getAccidentalAmount(keySignature: KeySignature): number {
  switch (keySignature) {
    case KeySignature.C_MAJOR_A_MINOR:
      return 0
    case KeySignature.G_MAJOR_E_MINOR_1_SHARP:
    case KeySignature.F_MAJOR_D_MINOR_1_FLAT:
      return 1
    case KeySignature.D_MAJOR_B_MINOR_2_SHARPS:
    case KeySignature.Bb_MAJOR_G_MINOR_2_FLATS:
      return 2
    case KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS:
    case KeySignature.Eb_MAJOR_C_MINOR_3_FLATS:
      return 3
    case KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS:
    case KeySignature.Ab_MAJOR_F_MINOR_4_FLATS:
      return 4
    case KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS:
    case KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS:
      return 5
    case KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS:
    case KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS:
      return 6
    case KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS:
    case KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS:
      return 7
  }
}

export function getAccidentalSymbol(
  accidental: Accidental | undefined,
): string {
  switch (accidental) {
    case '#':
      return '♯'
    case 'b':
      return '♭'
    default:
      return ''
  }
}
