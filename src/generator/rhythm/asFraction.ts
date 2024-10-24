import Fraction from 'fraction.js'
import { Duration } from '../../common/common'

export function asFraction(duration: Duration, amount: number = 1): Fraction {
  switch (duration) {
    case Duration.WHOLE:
      return new Fraction(1, 1).mul(amount)
    case Duration.DOTTED_WHOLE:
      return new Fraction(3, 2).mul(amount)
    case Duration.HALF:
      return new Fraction(1, 2).mul(amount)
    case Duration.DOTTED_HALF:
      return new Fraction(3, 4).mul(amount)
    case Duration.QUARTER:
      return new Fraction(1, 4).mul(amount)
    case Duration.DOTTED_QUARTER:
      return new Fraction(3, 8).mul(amount)
    case Duration.EIGHTH:
      return new Fraction(1, 8).mul(amount)
    case Duration.DOTTED_EIGHT:
      return new Fraction(3, 16).mul(amount)
    case Duration.SIXTEENTH:
      return new Fraction(1, 16).mul(amount)
    case Duration.DOTTED_SIXTEENTH:
      return new Fraction(3, 32).mul(amount)
  }
}
