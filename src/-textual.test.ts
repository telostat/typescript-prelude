import { Just, Nothing } from 'purify-ts';
import { nonEmptyText, sanitizedNonEmptyText, sanitizeText } from './-textual';

describe('sanitize text', () => {
  test('empty sanitized text is empty text', () => {
    expect(sanitizeText('')).toBe('');
  });

  test('sanitize all-whitespace text to empty text', () => {
    expect(sanitizeText(' \n\t\r ')).toBe('');
  });

  test('sanitize leading whitespace', () => {
    expect(sanitizeText(' \n\t\r a')).toBe('a');
  });

  test('sanitize trailing whitespace', () => {
    expect(sanitizeText('a \n\t\r ')).toBe('a');
  });

  test('sanitize leading and trailing whitespace', () => {
    expect(sanitizeText(' \n\t\r a \n\t\r ')).toBe('a');
  });

  test('do not sanitize non-leading/non-trailing whitespace', () => {
    expect(sanitizeText(' \n\t\r a \n\t\r b \n\t\r ')).toBe('a \n\t\r b');
  });
});

describe('non-empty text', () => {
  test('null is not a non-empty text', () => {
    expect(nonEmptyText(null)).toBe(Nothing);
  });

  test('undefined is not a non-empty text', () => {
    expect(nonEmptyText(undefined)).toBe(Nothing);
  });

  test('empty text is not a non-empty text', () => {
    expect(nonEmptyText('')).toBe(Nothing);
  });

  test('all-whitespace text is non-empty text', () => {
    expect(nonEmptyText(' ')).toStrictEqual(Just(' '));
  });

  test('some non-empty text is non-empty text', () => {
    expect(nonEmptyText('a')).toStrictEqual(Just('a'));
  });
});

describe('sanitized non-empty text', () => {
  test('null is not a sanitized non-empty text', () => {
    expect(sanitizedNonEmptyText(null)).toBe(Nothing);
  });

  test('undefined is not a sanitized non-empty text', () => {
    expect(sanitizedNonEmptyText(undefined)).toBe(Nothing);
  });

  test('empty text is not a sanitized non-empty text', () => {
    expect(sanitizedNonEmptyText('')).toBe(Nothing);
  });

  test('all-whitespace text is not a sanitized non-empty text', () => {
    expect(sanitizedNonEmptyText(' \n\t\r ')).toStrictEqual(Nothing);
  });

  test('some text with additional leading/trailing whitespace is non-empty text', () => {
    expect(sanitizedNonEmptyText(' \n\t\r a \n\t\r ')).toStrictEqual(Just('a'));
  });
});
