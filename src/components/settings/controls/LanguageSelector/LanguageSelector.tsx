import { FC } from 'react'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { Language } from '../../../../state/types'
import { useAppContext } from '../../../../context/useAppContext'
import { isNil } from '../../../../common/utils'
import { languagePickerClassNames, languagePickerComponents } from './styles'

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
    <Select<SelectItem<Language>>
      inputId="language-picker"
      menuPosition="fixed"
      value={selectedLang}
      options={LANGUAGES}
      classNames={languagePickerClassNames}
      components={languagePickerComponents}
      onChange={_onChange}
    />
  )
}
