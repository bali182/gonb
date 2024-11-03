import { Duration } from '../../../../common/duration'
import { DurationType } from '../../../../common/durationType'
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
    type: DurationType.NOTE,
    duration: Duration.WHOLE,
  },
  {
    Component: NoteHalf,
    type: DurationType.NOTE,
    duration: Duration.HALF,
  },
  {
    Component: NoteQuarter,
    type: DurationType.NOTE,
    duration: Duration.QUARTER,
  },
  {
    Component: NoteEighth,
    type: DurationType.NOTE,
    duration: Duration.EIGHTH,
  },
  {
    Component: NoteSixteenth,
    type: DurationType.NOTE,
    duration: Duration.SIXTEENTH,
  },
]

export const REST_DURATIONS: ConstDurationItem[] = [
  {
    Component: RestWhole,
    type: DurationType.REST,
    duration: Duration.WHOLE,
  },
  {
    Component: RestHalf,
    type: DurationType.REST,
    duration: Duration.HALF,
  },
  {
    Component: RestQuarter,
    type: DurationType.REST,
    duration: Duration.QUARTER,
  },
  {
    Component: RestEighth,
    type: DurationType.REST,
    duration: Duration.EIGHTH,
  },
  {
    Component: RestSixteenth,
    type: DurationType.REST,
    duration: Duration.SIXTEENTH,
  },
]

export const DOTTED_NOTE_DURATIONS: ConstDurationItem[] = [
  {
    Component: NoteDottedWhole,
    type: DurationType.NOTE,
    duration: Duration.DOTTED_WHOLE,
  },
  {
    Component: NoteDottedHalf,
    type: DurationType.NOTE,
    duration: Duration.DOTTED_HALF,
  },
  {
    Component: NoteDottedQuarter,
    type: DurationType.NOTE,
    duration: Duration.DOTTED_QUARTER,
  },
  {
    Component: NoteDottedEighth,
    type: DurationType.NOTE,
    duration: Duration.DOTTED_EIGHT,
  },
  {
    Component: NoteDottedSixteenth,
    type: DurationType.NOTE,
    duration: Duration.DOTTED_SIXTEENTH,
  },
]

export const DOTTED_REST_DURATIONS: ConstDurationItem[] = [
  {
    Component: RestDottedWhole,
    type: DurationType.REST,
    duration: Duration.DOTTED_WHOLE,
  },
  {
    Component: RestDottedHalf,
    type: DurationType.REST,
    duration: Duration.DOTTED_HALF,
  },
  {
    Component: RestDottedQuarter,
    type: DurationType.REST,
    duration: Duration.DOTTED_QUARTER,
  },
  {
    Component: RestDottedEighth,
    type: DurationType.REST,
    duration: Duration.DOTTED_EIGHT,
  },
  {
    Component: RestDottedSixteenth,
    type: DurationType.REST,
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
