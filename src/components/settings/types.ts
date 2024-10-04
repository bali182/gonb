import { ComponentType } from 'react'
import { IconType } from 'react-icons'

export type EditorProps<T, D = void> = {
  id: string
  value: T
  data?: D
  onChange: (value: T) => void
}

export type PageProps = {
  onClose: () => void
}

export type SettingsPage = {
  id: string
  name: string
  Icon: IconType
  Component: ComponentType<PageProps>
}

export type SelectItem<T> = {
  label: string
  value: T
}
