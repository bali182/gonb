import Fraction from 'fraction.js'

export function lt(a: Fraction, b: Fraction): boolean {
  return a.compare(b) < 0
}
export function gt(a: Fraction, b: Fraction): boolean {
  return a.compare(b) > 0
}
export function lte(a: Fraction, b: Fraction): boolean {
  return a.compare(b) <= 0
}
export function gte(a: Fraction, b: Fraction): boolean {
  return a.compare(b) >= 0
}
