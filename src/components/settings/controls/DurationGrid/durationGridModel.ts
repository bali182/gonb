import { Duration } from '../../../../common/duration'
import {
  NoteDottedEighth,
  NoteDottedHalf,
  NoteDottedQuarter,
  NoteDottedSixteenth,
  NoteDottedWhole,
  NoteEighth,
  NoteHalf,
  NoteQuarter,
  NoteSixteenth,
  NoteWhole,
  RestDottedEighth,
  RestDottedHalf,
  RestDottedQuarter,
  RestDottedSixteenth,
  RestDottedWhole,
  RestEighth,
  RestHalf,
  RestQuarter,
  RestSixteenth,
  RestWhole,
} from './Notes'
import { ConstDurationItem } from './types'

export const NOTE_DURATIONS: ConstDurationItem[] = [
  {
    Component: NoteWhole,
    type: 'NOTE',
    duration: Duration.WHOLE,
  },
  {
    Component: NoteHalf,
    type: 'NOTE',
    duration: Duration.HALF,
  },
  {
    Component: NoteQuarter,
    type: 'NOTE',
    duration: Duration.QUARTER,
  },
  {
    Component: NoteEighth,
    type: 'NOTE',
    duration: Duration.EIGHTH,
  },
  {
    Component: NoteSixteenth,
    type: 'NOTE',
    duration: Duration.SIXTEENTH,
  },
]

export const REST_DURATIONS: ConstDurationItem[] = [
  {
    Component: RestWhole,
    type: 'REST',
    duration: Duration.WHOLE,
  },
  {
    Component: RestHalf,
    type: 'REST',
    duration: Duration.HALF,
  },
  {
    Component: RestQuarter,
    type: 'REST',
    duration: Duration.QUARTER,
  },
  {
    Component: RestEighth,
    type: 'REST',
    duration: Duration.EIGHTH,
  },
  {
    Component: RestSixteenth,
    type: 'REST',
    duration: Duration.SIXTEENTH,
  },
]

export const DOTTED_NOTE_DURATIONS: ConstDurationItem[] = [
  {
    Component: NoteDottedWhole,
    type: 'NOTE',
    duration: Duration.DOTTED_WHOLE,
  },
  {
    Component: NoteDottedHalf,
    type: 'NOTE',
    duration: Duration.DOTTED_HALF,
  },
  {
    Component: NoteDottedQuarter,
    type: 'NOTE',
    duration: Duration.DOTTED_QUARTER,
  },
  {
    Component: NoteDottedEighth,
    type: 'NOTE',
    duration: Duration.DOTTED_EIGHT,
  },
  {
    Component: NoteDottedSixteenth,
    type: 'NOTE',
    duration: Duration.DOTTED_SIXTEENTH,
  },
]

export const DOTTED_REST_DURATIONS: ConstDurationItem[] = [
  {
    Component: RestDottedWhole,
    type: 'REST',
    duration: Duration.DOTTED_WHOLE,
  },
  {
    Component: RestDottedHalf,
    type: 'REST',
    duration: Duration.DOTTED_HALF,
  },
  {
    Component: RestDottedQuarter,
    type: 'REST',
    duration: Duration.DOTTED_QUARTER,
  },
  {
    Component: RestDottedEighth,
    type: 'REST',
    duration: Duration.DOTTED_EIGHT,
  },
  {
    Component: RestDottedSixteenth,
    type: 'REST',
    duration: Duration.DOTTED_SIXTEENTH,
  },
]

export const DURATION_ROWS: ConstDurationItem[][] = NOTE_DURATIONS.map(
  (_, i) => [
    NOTE_DURATIONS[i]!,
    DOTTED_NOTE_DURATIONS[i]!,
    REST_DURATIONS[i]!,
    DOTTED_REST_DURATIONS[i]!,
  ],
)
