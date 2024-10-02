export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null || input !== undefined
}
