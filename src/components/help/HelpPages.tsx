import { FC, useMemo, useState } from 'react'
import { useAlphaTab } from '../../model/useAlphaTab'
import { ScoreView } from '../ScoreView'
import { AtTrack } from '../../model/alphaTex'
import { toAlphaTex } from '../../model/toAlphaTex'
import { getHelpTrack } from './getHelpTrack'
import { Clef } from '../../model/common'
import { css } from '@emotion/css'
import { noPlayer } from '../../model/alphaTabConfig'

type BaseHelpPageProps = {
  track: AtTrack
}

const pageStyle = css`
  width: 100%;
  height: 100%;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const BaseHelpPage: FC<BaseHelpPageProps> = ({ track }) => {
  const [scrollArea, setScrollArea] = useState<HTMLElement>()
  const [root, setRoot] = useState<HTMLElement>()

  const tex = toAlphaTex(track) //useMemo(() => toAlphaTex(track), [track])

  useAlphaTab({
    tex,
    root,
    scrollArea,
    player: noPlayer(scrollArea!),
  })

  return (
    <div id="help-page" className={pageStyle}>
      <ScoreView
        viewPortLeft={0}
        viewPortRight={0}
        viewPortTop={0}
        viewPortBottom={0}
        padding={10}
        setRootCallback={setRoot}
        setScrollAreaCallback={setScrollArea}
      />
    </div>
  )
}

const trebleClefTrack = getHelpTrack('E2', 'E5', Clef.TREBLE)
const bassClefTrack = getHelpTrack('E1', 'G3', Clef.BASS)

export const TrebleClefHelpPage: FC = () => {
  return <BaseHelpPage track={trebleClefTrack} />
}

export const BassClefHelpPage: FC = () => {
  return <BaseHelpPage track={bassClefTrack} />
}
