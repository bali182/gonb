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
      name: t('ClefsPrimary.Treble'),
      alternateName: t('ClefsAlternate.Treble'),
      isEnabled: true,
      style: css`
        top: 16px;
      `,
    },
    {
      clef: Clef.BASS,
      icon: String.fromCodePoint(0xe062),
      name: t('ClefsPrimary.Bass'),
      alternateName: t('ClefsAlternate.Bass'),
      isEnabled: true,
      style: css`
        top: 8px;
      `,
    },
    {
      clef: Clef.SOPRANO,
      icon: String.fromCodePoint(0xe05c),
      name: t('ClefsPrimary.Soprano'),
      alternateName: t('ClefsAlternate.Soprano'),
      isEnabled: true,
      style: css`
        top: 11px;
      `,
    },
    {
      clef: Clef.PERCUSSION,
      icon: String.fromCodePoint(0xe069),
      name: t('ClefsPrimary.Percussion'),
      alternateName: t('ClefsAlternate.Percussion'),
      isEnabled: false,
      style: css`
        top: 12px;
      `,
    },
  ]
}

export function useClefModel() {
  return useMemoizedTranslation(getClefModel)
}
