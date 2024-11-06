import Fraction from 'fraction.js'
import { Duration } from '../../common/duration'

export const DURATION_VALUES: Record<Duration, Fraction> = {
  [Duration.WHOLE]: new Fraction(1, 1),
  [Duration.DOTTED_WHOLE]: new Fraction(3, 2),
  [Duration.HALF]: new Fraction(1, 2),
  [Duration.DOTTED_HALF]: new Fraction(3, 4),
  [Duration.QUARTER]: new Fraction(1, 4),
  [Duration.DOTTED_QUARTER]: new Fraction(3, 8),
  [Duration.EIGHTH]: new Fraction(1, 8),
  [Duration.DOTTED_EIGHT]: new Fraction(3, 16),
  [Duration.SIXTEENTH]: new Fraction(1, 16),
  [Duration.DOTTED_SIXTEENTH]: new Fraction(3, 32),
}

export function asFraction(duration: Duration, amount: number = 1): Fraction {
  const value = DURATION_VALUES[duration]
  return amount === 1 ? value : value.mul(amount)
}
