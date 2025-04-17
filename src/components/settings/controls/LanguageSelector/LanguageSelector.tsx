import { FC } from 'react'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { Language } from '../../../../state/types'
import { useAppContext } from '../../../../context/useAppContext'
import { isNil } from '../../../../common/utils'
import { languagePickerClassNames, languagePickerComponents } from './styles'
import { css, cx } from '@emotion/css'
import { bodyTextStyle } from '../../../constants'

const languageItemStyle = cx(
  bodyTextStyle,
  css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000000cc;
    border-bottom: 1px solid #ccc;
  `,
)

const LANGUAGES: SelectItem<Language>[] = [
  { label: 'English', value: Language.English },
  { label: 'Magyar', value: Language.Hungarian },
]

export const LanguagePicker: FC = () => {
  const { language, setLanguage } = useAppContext()
  const selectedLang =
    LANGUAGES.find(({ value }) => value === language) ?? LANGUAGES[0]

  const _onChange = (item: SelectItem<Language> | null) => {
    if (!isNil(item)) {
      setLanguage(item.value)
    }
  }

  return (
    <div className={languageItemStyle}>
      <Select<SelectItem<Language>>
        inputId="language-picker"
        menuPosition="fixed"
        isSearchable={false}
        value={selectedLang}
        options={LANGUAGES}
        classNames={languagePickerClassNames}
        components={languagePickerComponents}
        onChange={_onChange}
      />
    </div>
  )
}
