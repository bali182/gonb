import { TFunction } from 'i18next'
import { ClefModel } from './types'
import { css } from '@emotion/css'
import { useMemoizedTranslation } from '../../../../common/useMemoizedTranslation'
import { Clef } from '../../../../common/clef'

function getClefModel(t: TFunction): ClefModel[] {
  return [
    {
      clef: Clef.TREBLE,
      icon: String.fromCodePoint(0xe050),
      name: t('ClefsPrimary.G2'),
      alternateName: t('ClefsAlternate.G2'),
      isEnabled: true,
      iconStyle: css`
        top: 16px;
      `,
    },
    {
      clef: Clef.BASS,
      icon: String.fromCodePoint(0xe062),
      name: t('ClefsPrimary.F4'),
      alternateName: t('ClefsAlternate.F4'),
      isEnabled: true,
      iconStyle: css`
        top: 8px;
      `,
    },
    {
      clef: Clef.TENOR,
      icon: String.fromCodePoint(0xe05c),
      name: t('ClefsPrimary.C3'),
      alternateName: t('ClefsAlternate.C3'),
      isEnabled: true,
      iconStyle: css`
        top: 11px;
      `,
    },
    {
      clef: Clef.ALTO,
      icon: String.fromCodePoint(0xe05c),
      name: t('ClefsPrimary.C4'),
      alternateName: t('ClefsAlternate.C4'),
      isEnabled: true,
      iconStyle: css`
        top: 11px;
      `,
    },

    {
      clef: Clef.PERCUSSION,
      icon: String.fromCodePoint(0xe069),
      name: t('ClefsPrimary.N'),
      alternateName: t('ClefsAlternate.N'),
      isEnabled: false,
      iconStyle: css`
        top: 12px;
      `,
    },
  ]
}

export function useClefModel() {
  return useMemoizedTranslation(getClefModel)
}
