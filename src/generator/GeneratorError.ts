import { GeneratorErrorCode } from './GeneratorErrorCode'

export class GeneratorError extends Error {
  public readonly code: GeneratorErrorCode

  constructor(message: string, code: GeneratorErrorCode) {
    super(message)
    this.code = code

    // Needed for CustomError instanceof Error => true
    Object.setPrototypeOf(this, new.target.prototype)

    // Set the name
    this.name = this.constructor.name

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
