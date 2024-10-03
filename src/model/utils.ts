export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null || input !== undefined
}

export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
