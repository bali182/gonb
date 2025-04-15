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
      label: t('ClefsPrimary.G2'),
      alternateName: t('ClefsAlternate.G2'),
      isEnabled: true,
      iconStyle: css`
        top: 6px;
        transform: scale(0.95);
      `,
    },
    {
      clef: Clef.BASS,
      icon: String.fromCodePoint(0xe062),
      label: t('ClefsPrimary.F4'),
      alternateName: t('ClefsAlternate.F4'),
      isEnabled: true,
      iconStyle: css`
        top: -1px;
      `,
    },
    {
      clef: Clef.TENOR,
      icon: String.fromCodePoint(0xe05c),
      label: t('ClefsPrimary.C3'),
      alternateName: t('ClefsAlternate.C3'),
      isEnabled: true,
      iconStyle: css`
        top: 4px;
      `,
    },
    {
      clef: Clef.ALTO,
      icon: String.fromCodePoint(0xe05c),
      label: t('ClefsPrimary.C4'),
      alternateName: t('ClefsAlternate.C4'),
      isEnabled: true,
      iconStyle: css`
        top: 4px;
      `,
    },
    // Disabling for now
    // {
    //   clef: Clef.PERCUSSION,
    //   icon: String.fromCodePoint(0xe069),
    //   name: t('ClefsPrimary.N'),
    //   alternateName: t('ClefsAlternate.N'),
    //   isEnabled: false,
    //   iconStyle: css`
    //     top: 12px;
    //   `,
    // },
  ]
}

export function useClefModel() {
  return useMemoizedTranslation(getClefModel)
}
