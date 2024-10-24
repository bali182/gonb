import { TFunction } from 'i18next'
import { KeySignature } from '../../../../common/common'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import { SelectItem } from '../../types'

function getKeySignatures(t: TFunction): SelectItem<KeySignature>[] {
  const signatures: Record<KeySignature, boolean> = {
    [KeySignature.C_MAJOR_A_MINOR]: false,
    [KeySignature.G_MAJOR_E_MINOR_1_SHARP]: false,
    [KeySignature.D_MAJOR_B_MINOR_2_SHARPS]: false,
    [KeySignature.A_MAJOR_F_SHARP_MINOR_3_SHARPS]: false,
    [KeySignature.E_MAJOR_C_SHARP_MINOR_4_SHARPS]: false,
    [KeySignature.B_MAJOR_G_SHARP_MINOR_5_SHARPS]: false,
    [KeySignature.F_SHARP_MAJOR_D_SHARP_MINOR_6_SHARPS]: false,
    [KeySignature.C_SHARP_MAJOR_A_SHARP_MINOR_7_SHARPS]: false,
    [KeySignature.F_MAJOR_D_MINOR_1_FLAT]: false,
    [KeySignature.Bb_MAJOR_G_MINOR_2_FLATS]: false,
    [KeySignature.Eb_MAJOR_C_MINOR_3_FLATS]: false,
    [KeySignature.Ab_MAJOR_F_MINOR_4_FLATS]: false,
    [KeySignature.Db_MAJOR_Bb_MINOR_5_FLATS]: false,
    [KeySignature.Gb_MAJOR_Eb_MINOR_6_FLATS]: false,
    [KeySignature.Cb_MAJOR_Ab_MINOR_7_FLATS]: false,
  }
  return (Object.keys(signatures) as KeySignature[]).map(
    (signature): SelectItem<KeySignature> => ({
      label: t(`KeySignatures.${signature}`),
      value: signature,
    }),
  )
}

export function useKeySignatures() {
  return useMemoizedTranslation(getKeySignatures)
}
