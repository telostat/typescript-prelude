/**
 * This module provides definitions for working with textual values.
 *
 * @module
 */

import { Maybe } from './-functional';

/**
 * Sanitizes given text value.
 *
 * @param x Text value to sanitize.
 * @returns Sanitized text value.
 */
export function sanitizeText(x: string): string {
  return x.trim(); // TODO: replace consecutive whitespace chars with single whitespace char.
}

/**
 * Returns a non-empty text value for the given nullable textual argument.
 *
 * @param x A nullable text value.
 * @returns {@link functional!Just} text value if the argument is non-null and
 * non-empty, {@link functional!Nothing} otherwise.
 */
export function nonEmptyText(x: string | null | undefined): Maybe<string> {
  return Maybe.fromNullable(x).filter((t) => t !== '');
}

/**
 * Returns a non-empty, sanitized text value for the given nullable textual
 * argument.
 *
 * @param x A nullable text value.
 * @returns {@link functional!Just} sanitized text value if the argument is
 * non-null and non-empty after sanitization, {@link functional!Nothing}
 * otherwise.
 */
export function sanitizedNonEmptyText(x: string | null | undefined): Maybe<string> {
  return Maybe.fromNullable(x)
    .map(sanitizeText)
    .filter((t) => t !== '');
}
