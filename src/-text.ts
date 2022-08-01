import { Maybe } from './-purify';

/**
 * Sanitizes given `string` value.
 *
 * @param x `string` value to sanitize.
 * @returns Sanitized `string` value.
 */
export function sanitizeText(x: string): string {
  return x.trim(); // TODO: replace consecutive whitespace chars with single whitespace char.
}

/**
 * Returns a non-empty `string` value for the given nullable `string` argument.
 *
 * @param x A nullable `string` value.
 * @returns `Just` `string` value if the argument is non-null and non-empty,
 * `Nothing` otherwise.
 */
export function nonEmptyText(x: string | null | undefined): Maybe<string> {
  return Maybe.fromNullable(x).filter((t) => t !== '');
}

/**
 * Returns a non-empty, sanitized `string` value for the given nullable `string`
 * argument.
 *
 * @param x A nullable `string` value.
 * @returns `Just` sanitized `string` value if the argument is non-null and
 * non-empty (after sanitization), `Nothing` otherwise.
 */
export function sanitizedNonEmptyText(x: string | null | undefined): Maybe<string> {
  return Maybe.fromNullable(x)
    .map(sanitizeText)
    .filter((t) => t !== '');
}
