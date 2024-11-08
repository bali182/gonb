import { FC, useMemo, useState } from 'react'
import { useAlphaTab } from '../../alphaTex/useAlphaTab'
import { ScoreView } from '../ScoreView'
import { AtSong } from '../../alphaTex/alphaTex'
import { toAlphaTex } from '../../alphaTex/toAlphaTex'
import { useHelpTrack } from './useHelpTrack'
import { css } from '@emotion/css'
import { noPlayer } from '../../alphaTex/alphaTabConfig'
import { Clef } from '../../common/clef'

type BaseHelpPageProps = {
  track: AtSong
}

const pageStyle = css`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const viewPortStyle = css`
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
`

const BaseHelpPage: FC<BaseHelpPageProps> = ({ track }) => {
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()

  const tex = useMemo(() => toAlphaTex(track), [track])

  useAlphaTab({
    tex,
    root,
    scrollArea,
    player: noPlayer(scrollArea!),
  })

  return (
    <div id="help-page" className={pageStyle}>
      <ScoreView
        viewPortStyle={viewPortStyle}
        setRootCallback={setRoot}
        setScrollAreaCallback={setScrollArea}
      />
    </div>
  )
}

export const TrebleClefHelpPage: FC = () => {
  const trebleClefTrack = useHelpTrack('E2', 'E5', Clef.TREBLE)
  return <BaseHelpPage track={trebleClefTrack} />
}

export const BassClefHelpPage: FC = () => {
  const bassClefTrack = useHelpTrack('B0', 'G3', Clef.BASS)
  return <BaseHelpPage track={bassClefTrack} />
}
