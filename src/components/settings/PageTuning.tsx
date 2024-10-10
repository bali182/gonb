import { css } from '@emotion/css'
import { FC, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../state/store'
import { lerp, moveDown, moveUp, removeByIndex } from '../../model/utils'
import {
  PiArrowDownBold,
  PiArrowUpBold,
  PiMusicNoteSimple,
  PiPlusBold,
  PiX,
} from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { generatorSlice } from '../../state/generatorSlice'
import { Dropdown } from './Dropdown'
import { SelectItem } from './types'
import { Note } from 'tonal'

const DEFAULT_4_STRING_BASS_TUNING = ['G2', 'D2', 'A1', 'E1']
const DEFAULT_5_STRING_BASS_TUNING = ['G2', 'D2', 'A1', 'E1', 'B0']

const NOTES = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
].map((note): SelectItem<string> => ({ label: note, value: note }))

const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (octave): SelectItem<number> => ({ label: octave.toString(), value: octave }),
)

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  padding: 14px;
  pointer-events: auto;
`

const labelStyle = css`
  font-size: 1em;
  color: #000000;
  margin-bottom: 2px;
  pointer-events: auto;
`

const descriptionStyle = css`
  font-size: 0.8em;
  margin-bottom: 10px;
  color: #000000aa;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const rowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const stringStyle = css`
  background-color: #000000aa;
  flex: 1 1 1px;
`

const dropdownContainer = css`
  width: 85px;
`

const buttonsContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  color: #000000dd;
  padding: 8px 16px;
  gap: 6px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 6px;
  background-color: transparent;
  background-color: #00000010;
  &:hover {
    color: #000000;
    background-color: #00000020;
  }
  &:disabled {
    background-color: transparent;
    color: #00000050;
    cursor: not-allowed;
  }
`

const buttonsContainer = css`
  display: flex;
  flex-direction: row;
`

const leftButtons = css`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 10px;
`
const hrStyle = css`
  border-color: #00000066;
  margin: 20px 0px;
`

type StringTuning = {
  note: SelectItem<string>
  octave: SelectItem<number>
}

export const PageTuning: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const generatorConfig = useSelector(generatorSlice.selectSlice)
  const { tuning } = generatorConfig

  const tuningRepr = useMemo(
    (): StringTuning[] =>
      tuning.map((pitchedNote) => {
        const note = Note.pitchClass(pitchedNote)!
        const octave = Note.octave(pitchedNote)!
        return {
          note: { label: note, value: note },
          octave: { label: octave.toString(), value: octave },
        }
      }),
    [tuning],
  )

  function updateTuning(tuning: string[]) {
    dispatch(
      generatorSlice.actions.setGeneratorConfig({
        ...generatorConfig,
        tuning,
      }),
    )
  }

  const updateStringTuning = (index: number, note: string, octave: number) => {
    const newNote = `${note}${octave}`
    updateTuning(tuning.map((note, i) => (i === index ? newNote : note)))
  }

  const moveStringUp = (index: number) => () => {
    updateTuning(moveUp(tuning, index))
  }

  const moveStringDown = (index: number) => () => {
    updateTuning(moveDown(tuning, index))
  }

  const removeString = (index: number) => () => {
    updateTuning(removeByIndex(tuning, index))
  }

  const addString = () => {
    updateTuning([...tuning, 'B0'])
  }

  const set4StringStandard = () => {
    updateTuning(DEFAULT_4_STRING_BASS_TUNING)
  }

  const set5StringStandard = () => {
    updateTuning(DEFAULT_5_STRING_BASS_TUNING)
  }

  return (
    <div className={sectionStyle}>
      <label className={labelStyle}>{t('Settings.TuningName')}</label>
      <span className={descriptionStyle}>
        {t('Settings.TuningDescription')}
      </span>
      <div className={containerStyle}>
        {tuningRepr.map(({ note, octave }, i) => {
          const height = lerp(6, 18, i / tuning.length)
          const borderRadius = height / 2
          const rowId = `${note.value}-${octave.value}-${i}`
          return (
            <div className={rowStyle} key={rowId}>
              <div className={dropdownContainer}>
                <Dropdown
                  id={`${rowId}-note`}
                  value={note}
                  data={{ values: NOTES }}
                  onChange={({ value }) =>
                    updateStringTuning(i, value, octave.value)
                  }
                />
              </div>
              <div className={dropdownContainer}>
                <Dropdown
                  id={`${rowId}-octave`}
                  value={octave}
                  data={{ values: OCTAVES }}
                  onChange={({ value }) =>
                    updateStringTuning(i, note.value, value)
                  }
                />
              </div>
              <div className={stringStyle} style={{ borderRadius, height }} />
              <div className={buttonsContainerStyle}>
                <button
                  className={buttonStyle}
                  disabled={i === 0}
                  onClick={moveStringUp(i)}
                >
                  <PiArrowUpBold />
                </button>

                <button
                  className={buttonStyle}
                  disabled={i === tuning.length - 1}
                  onClick={moveStringDown(i)}
                >
                  <PiArrowDownBold />
                </button>
                <button className={buttonStyle} onClick={removeString(i)}>
                  <PiX />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <hr className={hrStyle} />
      <div className={buttonsContainer}>
        <div className={leftButtons}>
          <button className={buttonStyle} onClick={set4StringStandard}>
            <PiMusicNoteSimple /> E A D G
          </button>
          <button className={buttonStyle} onClick={set5StringStandard}>
            <PiMusicNoteSimple /> B E A D G
          </button>
        </div>
        <button className={buttonStyle} onClick={addString}>
          <PiPlusBold /> {t('Settings.TuningAddString')}
        </button>
      </div>
    </div>
  )
}
