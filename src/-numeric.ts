/**
 * This module provides definitions for working with fixed and arbitrary
 * precision numbers.
 *
 * @module
 */

import { Decimal } from 'decimal.js';
import { Just, Maybe, Nothing } from './-functional';
import { sanitizeText } from './-textual';

export * from 'decimal.js';

/**
 * Errors this module can throw.
 */
export class NumericError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NumericError.prototype);
  }

  public static throw(msg: string): never {
    throw new NumericError(msg);
  }
}

/**
 * Convenience definition of the constant value of `0` as a
 * {@link Decimal:class} value.
 */
export const zero = new Decimal(0);

/**
 * Convenience definition of the constant value of `1` as a
 * {@link Decimal:class} value.
 */
export const one = new Decimal(1);

/**
 * Convenience definition of the constant value of `100` as a
 * {@link Decimal:class} value.
 */
export const hundred = new Decimal(100);

/**
 * Convenience definition of the constant value of `1,000` as a
 * {@link Decimal:class} value.
 */
export const thousand = new Decimal(1000);

/**
 * Smart constructor for valid arbitrary precision numeric values.
 *
 * In our context, a valid arbitrary precision number is a finite numeric value
 * represented as a {@link Decimal:class} value.
 *
 * In general, the given value will be converted into a {@link Decimal:class} value if:
 *
 * 1. the value is valid number excluding `NaN`, `Infinity` and `-Infinity`, and
 * 2. the value is a string value and its sanitized representation can be parsed
 *    into a valid number excluding `NaN`, `Infinity` and `-Infinity`.
 *
 * @param x The value to convert to {@link Decimal:class}.
 * @returns {@link functional!Just} finite {@link Decimal:class} value if
 * argument is a valid, finite numeric value, {@link functional!Nothing}
 * otherwise.
 */
export function decimal(x: number | string): Maybe<Decimal> {
  const attempt = () => new Decimal(typeof x === 'string' ? sanitizeText(x) : x);
  return Maybe.encase(attempt).filter((d) => !d.isNaN() && d.isFinite());
}

/**
 * Smart constructor that allows `undefined` and `null` as argument.
 *
 * @param x The value to convert to {@link Decimal:class}.
 * @returns {@link functional!Just} finite {@link Decimal:class} value if
 * argument is a valid, finite numeric value, {@link functional!Nothing}
 * otherwise.
 */
export function decimalFromNullable(x: number | string | undefined | null): Maybe<Decimal> {
  return Maybe.fromNullable(x).chain(decimal);
}

/**
 * Unsafe constructor for arbitrary precision numeric values.
 *
 * This uses {@link decimal} function underneath and throws a
 * {@link NumericError} if the given value could not be converted into a valid
 * arbitrary precision numeric value.
 *
 * The usage is recommended only if call-site knows that the given argument is a
 * value that can be safely converted into a valid arbitrary precision number.
 *
 * @param x A value to convert to {@link Decimal:class}.
 * @returns A finite {@link Decimal:class} value.
 * @throws {@link NumericError} if given argument is not a valid, finite numeric
 * value.
 */
export function unsafeDecimal(x: number | string): Decimal {
  return decimal(x).caseOf({
    Nothing: () => NumericError.throw(`Not a valid, finite numeric value: ${x}`),
    Just: (x) => x,
  });
}

/* Signature for safeDiv function specialized over number arguments. */
export function safeDiv(x: number, y: number): Maybe<number>;

/* Signature for safeDiv function specialized over Decimal arguments. */
export function safeDiv(x: Decimal, y: Decimal): Maybe<Decimal>;

/**
 * Provides safe division operation.
 *
 * @param x Dividend.
 * @param y Divisor.
 * @returns {@link functional!Just} quotient if divisor is non-zero,
 * {@link functional!Nothing} otherwise.
 */
export function safeDiv(x: any, y: any): Maybe<any> {
  if (typeof x === 'number') {
    return y === 0 ? Nothing : Just(x / y);
  } else {
    return y.isZero() ? Nothing : Just(x.dividedBy(y));
  }
}

/**
 * Returns the sum of a given array {@link Decimal:class} values.
 *
 * @param x An array of {@link Decimal:class} values.
 * @returns The sum of given {@link Decimal:class} values.
 */
export function sumDecimals(x: Decimal[]): Decimal {
  return x.reduce((x, y) => x.add(y), zero);
}
