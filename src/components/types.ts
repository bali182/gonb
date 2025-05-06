import { ComponentType } from 'react'
import { IconType } from 'react-icons'

export type ModalPage<P extends string, T = any> = {
  id: P
  name: string
  Icon: ComponentType
  Badge?: ComponentType
  Component: ComponentType<T>
}

export type PagedModalButton = {
  id: string
  label: string
  enabled: boolean
  icon: IconType
}
