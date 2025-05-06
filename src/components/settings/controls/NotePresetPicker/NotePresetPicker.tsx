import { FC, useMemo } from 'react'
import Select, { ClassNamesConfig } from 'react-select'
import { SelectItem } from '../../types'
import { defaultComponents, defaultClassNames } from '../dropdownStyles'
import { useNotePresets } from './useNotePresets'
import { arraysEqual, isNil, matchesPitchClass } from '../../../../common/utils'
import { useTranslation } from 'react-i18next'
import { css, cx } from '@emotion/css'
import { Button } from '../../../Button'
import { PiMusicNotesBold } from 'react-icons/pi'
import { KeySignature } from '../../../../common/keySignature'
import { get } from '@tonaljs/scale'
import { bodyTextStyle } from '../../../constants'

export type NotePresetPicker = {
  keySignature: KeySignature
  value: string[]
  onChange: (value: string[]) => void
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
`

const buttonStyle = cx(
  bodyTextStyle,
  css`
    && {
      flex-shrink: 0;
      border-radius: 0px 6px 6px 0px;
      height: auto;
      background-color: #00000010;
      color: #000;
      border-left: 1px solid #00000020;
      &:hover {
        color: #000;
        background-color: #00000020;
      }
    }
  `,
)

const placeholderStyle = cx(
  bodyTextStyle,
  css`
    && {
      white-space: nowrap;
    }
  `,
)

const controlStyle = css`
  && {
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
  }
`

const singleValueStyle = css`
  && {
    overflow: hidden;
  }
`

const contStyle = css`
  && {
    flex: 1;
  }
`
const notePresetClassNames: ClassNamesConfig<any, any, any> = {
  ...defaultClassNames,
  control: (props) => cx(defaultClassNames?.control?.(props), controlStyle),
  singleValue: (props) =>
    cx(defaultClassNames?.singleValue?.(props), singleValueStyle),
  container: () => contStyle,
  placeholder: () => placeholderStyle,
}

export const NotePresetPicker: FC<NotePresetPicker> = ({
  value,
  keySignature,
  onChange: _onChange,
}) => {
  const { t } = useTranslation()
  const presetGroups = useNotePresets()
  const presets = useMemo(
    () => presetGroups.flatMap((group) => group.options),
    [presetGroups],
  )
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
        options={presetGroups}
        classNames={notePresetClassNames}
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
