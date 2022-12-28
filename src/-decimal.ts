import { Decimal } from 'decimal.js';
import { Just, Maybe, Nothing } from './-purify';

export * from 'decimal.js';

/**
 * Convenience definition of the constant value of `0` as a `Decimal` value.
 */
export const zero = new Decimal(0);

/**
 * Convenience definition of the constant value of `1` as a `Decimal` value.
 */
export const one = new Decimal(1);

/**
 * Convenience definition of the constant value of `100` as a `Decimal` value.
 */
export const hundred = new Decimal(100);

/**
 * Convenience definition of the constant value of `1,000` as a `Decimal` value.
 */
export const thousand = new Decimal(1000);

export function safeDiv(x: number, y: number): Maybe<number>;
export function safeDiv(x: Decimal, y: Decimal): Maybe<Decimal>;

/**
 * Provides safe division operation.
 *
 * @param x Dividend.
 * @param y Divisor.
 * @returns `Just` quotient if divisor is non-zero, `Nothing` otherwise.
 */
export function safeDiv(x: any, y: any): Maybe<any> {
  if (typeof x === 'number') {
    return y === 0 ? Nothing : Just(x / y);
  } else {
    return y.isZero() ? Nothing : Just(x.dividedBy(y));
  }
}

/**
 * Convenience function to convert a `number` to a `Decimal` value.
 *
 * @param x A `number`.
 * @returns A `Decimal`
 */
export function asDecimal(x: number): Decimal {
  return new Decimal(x);
}

/**
 * Convenience function to convert an optional `number` to a `Decimal` value.
 *
 * @param x A `number`, `undefined` or `null`.
 * @returns `Just` `Decimal` if argument is non-null, `Nothing` otherwise.
 */
export function maybeDecimal(x: number | undefined | null): Maybe<Decimal> {
  return Maybe.fromNullable(x).map((n) => new Decimal(n));
}

/**
 * Returns the sum of a given array `Decimal`s.
 *
 * @param x An array of `Decimal`s.
 * @returns The sum of `Decimal`s.
 */
export function sumDecimals(x: Decimal[]): Decimal {
  return x.reduce((x, y) => x.add(y), zero);
}
