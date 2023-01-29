/**
 * This module provides definitions for working with fixed and arbitrary
 * precision numbers.
 *
 * @module
 */

import { Decimal } from 'decimal.js';
import { Just, Maybe, Nothing } from './-purify';

export * from 'decimal.js';

/**
 * Convenience definition of the constant value of `0` as a
 * {@link decimal!Decimal:class} value.
 */
export const zero = new Decimal(0);

/**
 * Convenience definition of the constant value of `1` as a
 * {@link decimal!Decimal:class} value.
 */
export const one = new Decimal(1);

/**
 * Convenience definition of the constant value of `100` as a
 * {@link decimal!Decimal:class} value.
 */
export const hundred = new Decimal(100);

/**
 * Convenience definition of the constant value of `1,000` as a
 * {@link decimal!Decimal:class} value.
 */
export const thousand = new Decimal(1000);

/* Signature for safeDiv function specialized over number arguments. */
export function safeDiv(x: number, y: number): Maybe<number>;

/* Signature for safeDiv function specialized over Decimal arguments. */
export function safeDiv(x: Decimal, y: Decimal): Maybe<Decimal>;

/**
 * Provides safe division operation.
 *
 * @param x Dividend.
 * @param y Divisor.
 * @returns {@link purify!Just} quotient if divisor is non-zero,
 * {@link purify!Nothing} otherwise.
 */
export function safeDiv(x: any, y: any): Maybe<any> {
  if (typeof x === 'number') {
    return y === 0 ? Nothing : Just(x / y);
  } else {
    return y.isZero() ? Nothing : Just(x.dividedBy(y));
  }
}

/**
 * Convenience function to convert a numeric value to a
 * {@link decimal!Decimal:class} value.
 *
 * @param x A value to convert to {@link decimal!Decimal:class}.
 * @returns A {@link decimal!Decimal:class} value.
 */
export function asDecimal(x: number): Decimal {
  return new Decimal(x);
}

/**
 * Convenience function to convert an optional numeric value to a
 * {@link decimal!Decimal:class} value.
 *
 * @param x A nullable-value to convert to {@link decimal!Decimal:class}.
 * @returns {@link purify!Just} {@link decimal!Decimal:class} if argument is a
 * valid numeric value, {@link purify!Nothing} otherwise.
 */
export function maybeDecimal(x: number | undefined | null): Maybe<Decimal> {
  return Maybe.fromNullable(x).map((n) => new Decimal(n));
}

/**
 * Returns the sum of a given array {@link decimal!Decimal:class} values.
 *
 * @param x An array of {@link decimal!Decimal:class} values.
 * @returns The sum of given {@link decimal!Decimal:class} values.
 */
export function sumDecimals(x: Decimal[]): Decimal {
  return x.reduce((x, y) => x.add(y), zero);
}
