import { AtBar, AtItem, AtNote, Track } from './alphaTex'
import { Duration } from './common'

// Predefined scales
const C_MAJOR_SCALE = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Define the states for our melody generation
const enum MelodyState {
  INTRODUCTION,
  BUILD_UP,
  CLIMAX,
  RESOLUTION,
}

// Function to get a random element from an array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

// Function to get a random note duration (with rhythmic restrictions for simplicity)
function getRandomDuration(): Duration {
  const durations = [Duration.QUARTER, Duration.EIGHT] // Stick to common durations
  return getRandomElement(durations)
}

// Function to get the next note in a contour, adjusting for octave changes
function getNextNoteInContour(
  lastNote: AtNote,
  direction: 'up' | 'down' | 'arch',
  scale: string[],
  minOctave: number,
  maxOctave: number,
): AtNote {
  const noteIndex = scale.indexOf(lastNote.name)
  let newOctave = lastNote.octave
  let newNoteName: string | undefined = lastNote.name

  if (direction === 'up') {
    if (noteIndex < scale.length - 1) {
      newNoteName = scale[noteIndex + 1] // Ascend within the scale
    } else if (newOctave < maxOctave) {
      // If we've reached the top of the scale, move to the next octave
      newNoteName = scale[0]
      newOctave++
    }
  } else if (direction === 'down') {
    if (noteIndex > 0) {
      newNoteName = scale[noteIndex - 1] // Descend within the scale
    } else if (newOctave > minOctave) {
      // If we've reached the bottom of the scale, move to the lower octave
      newNoteName = scale[scale.length - 1]
      newOctave--
    }
  } else {
    // Arch - ascend first, then descend after reaching a peak (middle of scale)
    const peak = Math.floor(scale.length / 2)
    if (noteIndex < peak) {
      newNoteName = scale[noteIndex + 1] // Ascending part of the arch
    } else {
      newNoteName = scale[noteIndex - 1] // Descending part of the arch
    }
  }

  return {
    type: 'note',
    name: newNoteName!,
    octave: newOctave,
    duration: getRandomDuration(),
  }
}

// Function to generate a bar following a specific contour pattern, considering octaves
function generateBarWithContour(
  scale: string[],
  lastNote: AtNote,
  direction: 'up' | 'down' | 'arch',
  minOctave: number,
  maxOctave: number,
  allowRest = false,
): AtBar {
  const items: AtItem[] = []
  let totalDuration = 0
  let currentNote = lastNote

  // while (totalDuration < Duration.WHOLE) {
  //   if (allowRest && Math.random() < 0.2) {
  //     const rest: Rest = { type: 'rest', duration: getRandomDuration() }
  //     items.push(rest)
  //     totalDuration += Duration.WHOLE / rest.duration
  //   } else {
  //     currentNote = getNextNoteInContour(
  //       currentNote,
  //       direction,
  //       scale,
  //       minOctave,
  //       maxOctave,
  //     )
  //     items.push(currentNote)
  //     totalDuration += Duration.WHOLE / currentNote.duration
  //   }
  // }

  return { items }
}

// Melody generation function with octaves and state transitions
function getRandomMelody(
  scale: string[],
  numBars: number,
  minOctave: number,
  maxOctave: number,
): AtBar[] {
  const bars: AtBar[] = []
  let state = MelodyState.INTRODUCTION
  let currentNote: AtNote = {
    type: 'note',
    name: getRandomElement(scale),
    octave: getRandomElement([minOctave, minOctave + 1]),
    duration: Duration.QUARTER,
  }
  let contour: 'up' | 'down' | 'arch' = 'up' // Start with an ascending contour

  for (let i = 0; i < numBars; i++) {
    let newBar: AtBar

    switch (state) {
      case MelodyState.INTRODUCTION:
        // Introduce a simple ascending phrase
        newBar = generateBarWithContour(
          scale,
          currentNote,
          contour,
          minOctave,
          maxOctave,
          true,
        )
        state = MelodyState.BUILD_UP
        break

      case MelodyState.BUILD_UP:
        // Build tension with a mix of ascending and arch-like contours
        contour = 'arch'
        newBar = generateBarWithContour(
          scale,
          currentNote,
          contour,
          minOctave,
          maxOctave,
          true,
        )
        state = MelodyState.CLIMAX
        break

      case MelodyState.CLIMAX:
        // Highest point of the melody, reaching a peak note
        contour = 'up'
        newBar = generateBarWithContour(
          scale,
          currentNote,
          contour,
          minOctave,
          maxOctave,
          false,
        ) // No rests during climax
        state = MelodyState.RESOLUTION
        break

      case MelodyState.RESOLUTION:
        // Descend and resolve the tension
        contour = 'down'
        newBar = generateBarWithContour(
          scale,
          currentNote,
          contour,
          minOctave,
          maxOctave,
          true,
        )
        state = MelodyState.BUILD_UP // Loop back to build-up for more variation
        break
    }

    // Add the new bar to the melody
    bars.push(newBar)

    // Update the current note for the next bar based on the last note generated
    const lastBar = bars[bars.length - 1]!
    const lastNoteInBar = lastBar.items[lastBar.items.length - 1]!
    if (lastNoteInBar.type === 'note') {
      currentNote = lastNoteInBar
    }
  }

  return bars
}

export function getRandomTrack(
  scale: string[] = C_MAJOR_SCALE,
  bars: number = 4,
  minOctave: number = 1,
  maxOctave: number = 4,
): Track {
  return {
    clef: 'Bass',
    instrument: 'AcousticBass',
    keySignature: 'C',
    name: 'Example',
    shortName: 'ex',
    bars: getRandomMelody(scale, bars, minOctave, maxOctave),
    timeSignature: {
      bottom: 4,
      top: 4,
    },
  }
}
