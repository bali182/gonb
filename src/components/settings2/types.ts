export type EditorProps<T, D = void> = {
  id: string
  value: T
  data?: D
  onChange: (value: T) => void
}

export type SelectItem<T> = {
  label: string
  value: T
}
