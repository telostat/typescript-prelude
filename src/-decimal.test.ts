import { Just, Nothing } from 'purify-ts';
import * as D from './-decimal';

describe('Arbitrary precision numbers', () => {
  test('constant values are expected values', () => {
    expect(D.zero).toStrictEqual(new D.Decimal(0));
    expect(D.zero).toStrictEqual(new D.Decimal(0.0));

    expect(D.one).toStrictEqual(new D.Decimal(1));
    expect(D.one).toStrictEqual(new D.Decimal(1.0));

    expect(D.hundred).toStrictEqual(new D.Decimal(100));
    expect(D.hundred).toStrictEqual(new D.Decimal(100.0));

    expect(D.thousand).toStrictEqual(new D.Decimal(1000));
    expect(D.thousand).toStrictEqual(new D.Decimal(1000.0));
  });

  test('asDecimal converts primitive numbers to arbitrary precision numbers', () => {
    expect(D.asDecimal(0)).toStrictEqual(D.zero);
    // TODO: following is wrong and requires breaking change (throw Error?).
    expect(D.asDecimal(NaN)).toStrictEqual(new D.Decimal(NaN));
  });

  test('smart constructors are not stupid', () => {
    expect(D.maybeDecimal(null)).toBe(Nothing);
    expect(D.maybeDecimal(undefined)).toBe(Nothing);
    expect(D.maybeDecimal(1)).toStrictEqual(Just(D.one));
    // TODO: following must return Nothing, not Just not-a-number.
    expect(D.maybeDecimal(NaN)).toStrictEqual(Just(new D.Decimal(NaN)));
  });
});

describe('Fixed and arbitrary precision arithmetic', () => {
  test('safe-division works on primitive numbers', () => {
    expect(D.safeDiv(8, 0)).toBe(Nothing);
    expect(D.safeDiv(8, 4)).toStrictEqual(Just(2));
  });

  test('safe-division works on arbitrary precision numbers', () => {
    expect(D.safeDiv(D.asDecimal(8), D.zero)).toBe(Nothing);
    expect(D.safeDiv(D.asDecimal(8), D.asDecimal(4))).toStrictEqual(Just(D.asDecimal(2)));
  });

  test('can compute the sum of a list of arbitrary precision numbers', () => {
    expect(D.sumDecimals([])).toStrictEqual(D.zero);
    expect(D.sumDecimals([D.zero])).toStrictEqual(D.zero);
    expect(D.sumDecimals([D.one])).toStrictEqual(D.one);
    expect(D.sumDecimals([D.zero, D.one, D.hundred, D.thousand])).toStrictEqual(D.asDecimal(1101));
  });
});
