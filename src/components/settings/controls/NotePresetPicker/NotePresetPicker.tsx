import { FC, useMemo } from 'react'
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select'
import { SelectItem } from '../../types'
import { defaultComponents, defaultStyles } from '../dropdownStyles'
import { useNotePresets } from './useNotePresets'
import { arraysEqual, isNil, matchesPitchClass } from '../../../../common/utils'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/css'
import { Button } from '../../../Button'
import { PiMusicNotesBold } from 'react-icons/pi'
import { KeySignature } from '../../../../common/keySignature'
import { get } from '@tonaljs/scale'

export type NotePresetPicker = {
  keySignature: KeySignature
  value: string[]
  onChange: (value: string[]) => void
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
`

const buttonStyle = css`
  border-radius: 0px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  height: auto;
  background-color: #00000010;
  color: #000;
  font-size: 1rem;
  border-left: 1px solid #00000020;
  &:hover {
    color: #000;
    background-color: #00000020;
  }
`

export const notePresetStyles: StylesConfig<any, any, any> = {
  ...defaultStyles,
  control: (provided, props): CSSObjectWithLabel => ({
    ...defaultStyles?.control?.(provided, props),
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  }),
  container: (provided): CSSObjectWithLabel => ({
    ...provided,
    flex: 1,
  }),
}

export const NotePresetPicker: FC<NotePresetPicker> = ({
  value,
  keySignature,
  onChange: _onChange,
}) => {
  const { t } = useTranslation()
  const presets = useNotePresets()

  const selectedPreset = useMemo(
    () =>
      presets.find(({ value: preset }) => arraysEqual(preset, value)) ?? null,
    [value, presets],
  )

  const onChange = (item: SelectItem<string[]> | null) => {
    if (!isNil(item)) {
      _onChange(item.value)
    }
  }

  const onScaleOnlyClick = () => {
    const scale = get(`${keySignature} major`).notes
    const scaleOnlyNotes = value.filter((note) =>
      scale.some((sNote) => matchesPitchClass(sNote, note)),
    )
    _onChange(scaleOnlyNotes)
  }

  return (
    <div className={containerStyle}>
      <Select<SelectItem<string[]>>
        inputId="note-preset-picker"
        value={selectedPreset}
        options={presets}
        styles={notePresetStyles}
        placeholder={t('NotePresets.Custom')}
        components={defaultComponents}
        onChange={onChange}
      />
      <Button onClick={onScaleOnlyClick} className={buttonStyle}>
        <PiMusicNotesBold />
        {t('Settings.ScaleOnly')}
      </Button>
    </div>
  )
}
