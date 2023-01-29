import { Just, Nothing } from 'purify-ts';
import * as N from './-numeric';

describe('Arbitrary precision numbers', () => {
  test('constant values are expected values', () => {
    expect(N.zero).toStrictEqual(new N.Decimal(0));
    expect(N.zero).toStrictEqual(new N.Decimal(0.0));

    expect(N.one).toStrictEqual(new N.Decimal(1));
    expect(N.one).toStrictEqual(new N.Decimal(1.0));

    expect(N.hundred).toStrictEqual(new N.Decimal(100));
    expect(N.hundred).toStrictEqual(new N.Decimal(100.0));

    expect(N.thousand).toStrictEqual(new N.Decimal(1000));
    expect(N.thousand).toStrictEqual(new N.Decimal(1000.0));
  });

  test('asDecimal converts primitive numbers to arbitrary precision numbers', () => {
    expect(N.asDecimal(0)).toStrictEqual(N.zero);
    // TODO: following is wrong and requires breaking change (throw Error?).
    expect(N.asDecimal(NaN)).toStrictEqual(new N.Decimal(NaN));
  });

  test('smart constructors are not stupid', () => {
    expect(N.maybeDecimal(null)).toBe(Nothing);
    expect(N.maybeDecimal(undefined)).toBe(Nothing);
    expect(N.maybeDecimal(1)).toStrictEqual(Just(N.one));
    // TODO: following must return Nothing, not Just not-a-number.
    expect(N.maybeDecimal(NaN)).toStrictEqual(Just(new N.Decimal(NaN)));
  });
});

describe('Fixed and arbitrary precision arithmetic', () => {
  test('safe-division works on primitive numbers', () => {
    expect(N.safeDiv(8, 0)).toBe(Nothing);
    expect(N.safeDiv(8, 4)).toStrictEqual(Just(2));
  });

  test('safe-division works on arbitrary precision numbers', () => {
    expect(N.safeDiv(N.asDecimal(8), N.zero)).toBe(Nothing);
    expect(N.safeDiv(N.asDecimal(8), N.asDecimal(4))).toStrictEqual(Just(N.asDecimal(2)));
  });

  test('can compute the sum of a list of arbitrary precision numbers', () => {
    expect(N.sumDecimals([])).toStrictEqual(N.zero);
    expect(N.sumDecimals([N.zero])).toStrictEqual(N.zero);
    expect(N.sumDecimals([N.one])).toStrictEqual(N.one);
    expect(N.sumDecimals([N.zero, N.one, N.hundred, N.thousand])).toStrictEqual(N.asDecimal(1101));
  });
});
