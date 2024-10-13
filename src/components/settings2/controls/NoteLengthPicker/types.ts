import { ComponentType } from 'react'
import { Duration } from '../../../../model/common'

export type NoteOrRest = 'REST' | 'NOTE'

export type NoteAndRestHeader = {
  label: string
  type: NoteOrRest
  dotted: boolean
}

export type DurationHeader = {
  label: string
  durations: Duration[]
}

export type NoteLengthItem = {
  Component: ComponentType
  type: NoteOrRest
  duration: Duration
}

export type SelectableNoteLengthItem = NoteLengthItem & { isSelected: boolean }
