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

  test('smart constructor is really smart', () => {
    expect(N.decimal(NaN)).toBe(Nothing);
    expect(N.decimal(Infinity)).toBe(Nothing);
    expect(N.decimal(-Infinity)).toBe(Nothing);
    expect(N.decimal('NaN')).toBe(Nothing);
    expect(N.decimal('Infinity')).toBe(Nothing);
    expect(N.decimal('-Infinity')).toBe(Nothing);
    expect(N.decimal('')).toBe(Nothing);
    expect(N.decimal(' ')).toBe(Nothing);
    expect(N.decimal(' \n\t\r \n\t\r ')).toBe(Nothing);

    expect(N.decimal(1)).toStrictEqual(Just(N.one));
    expect(N.decimal('1')).toStrictEqual(Just(N.one));
    expect(N.decimal(' \n\t\r 1 \n\t\r ')).toStrictEqual(Just(N.one));
  });

  test('tolerating smart constructor is also smart', () => {
    expect(N.decimalFromNullable(NaN)).toBe(Nothing);
    expect(N.decimalFromNullable(Infinity)).toBe(Nothing);
    expect(N.decimalFromNullable(-Infinity)).toBe(Nothing);
    expect(N.decimalFromNullable('NaN')).toBe(Nothing);
    expect(N.decimalFromNullable('Infinity')).toBe(Nothing);
    expect(N.decimalFromNullable('-Infinity')).toBe(Nothing);
    expect(N.decimalFromNullable('')).toBe(Nothing);
    expect(N.decimalFromNullable(' ')).toBe(Nothing);
    expect(N.decimalFromNullable(' \n\t\r \n\t\r ')).toBe(Nothing);
    expect(N.decimalFromNullable(null)).toBe(Nothing);
    expect(N.decimalFromNullable(undefined)).toBe(Nothing);

    expect(N.decimalFromNullable(1)).toStrictEqual(Just(N.one));
    expect(N.decimalFromNullable('1')).toStrictEqual(Just(N.one));
    expect(N.decimalFromNullable(' \n\t\r 1 \n\t\r ')).toStrictEqual(Just(N.one));
  });

  test('unsafe constructor tries to be smart', () => {
    expect(() => N.unsafeDecimal(NaN)).toThrow(/^Not a valid, finite numeric value: NaN$/);
    expect(() => N.unsafeDecimal(Infinity)).toThrow(/^Not a valid, finite numeric value: Infinity$/);
    expect(() => N.unsafeDecimal(-Infinity)).toThrow(/^Not a valid, finite numeric value: -Infinity$/);
    expect(() => N.unsafeDecimal('NaN')).toThrow(/^Not a valid, finite numeric value: NaN$/);
    expect(() => N.unsafeDecimal('Infinity')).toThrow(/^Not a valid, finite numeric value: Infinity$/);
    expect(() => N.unsafeDecimal('-Infinity')).toThrow(/^Not a valid, finite numeric value: -Infinity$/);
    expect(() => N.unsafeDecimal('')).toThrow(/^Not a valid, finite numeric value: $/);
    expect(() => N.unsafeDecimal(' ')).toThrow(/^Not a valid, finite numeric value: {2}$/);
    // eslint-disable-next-line no-regex-spaces
    expect(() => N.unsafeDecimal(' \n\t\r \n\t\r ')).toThrow(/^Not a valid, finite numeric value:  \n\t\r \n\t\r $/);

    expect(N.unsafeDecimal(1)).toStrictEqual(N.one);
    expect(N.unsafeDecimal('1')).toStrictEqual(N.one);
    expect(N.unsafeDecimal(' \n\t\r 1 \n\t\r ')).toStrictEqual(N.one);
  });
});

describe('Fixed and arbitrary precision arithmetic', () => {
  test('safe-division works on primitive numbers', () => {
    expect(N.safeDiv(8, 0)).toBe(Nothing);
    expect(N.safeDiv(8, 4)).toStrictEqual(Just(2));
  });

  test('safe-division works on arbitrary precision numbers', () => {
    expect(N.safeDiv(N.unsafeDecimal(8), N.zero)).toBe(Nothing);
    expect(N.safeDiv(N.unsafeDecimal(8), N.unsafeDecimal(4))).toStrictEqual(Just(N.unsafeDecimal(2)));
  });

  test('can compute the sum of a list of arbitrary precision numbers', () => {
    expect(N.sumDecimals([])).toStrictEqual(N.zero);
    expect(N.sumDecimals([N.zero])).toStrictEqual(N.zero);
    expect(N.sumDecimals([N.one])).toStrictEqual(N.one);
    expect(N.sumDecimals([N.zero, N.one, N.hundred, N.thousand])).toStrictEqual(N.unsafeDecimal(1101));
  });
});
