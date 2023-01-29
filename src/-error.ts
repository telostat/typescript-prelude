/**
 * This module provides definitions for custom errors and some convenience
 * `Error` propagation and handling.
 *
 * @module
 */

import { Maybe } from './-functional';

/**
 * Type definition for custom, non-throwable errors.
 *
 * This is a useful type for the {@link functional!Left} of an
 * {@link functional!Either} value.
 */
export interface CustomError {
  msg: string;
  err: Maybe<Error>;
}

/**
 * Convenience function to build {@link CustomError} values.
 *
 * @param msg Message.
 * @param err Underlying error, if any.
 * @returns A {@link CustomError} value.
 */
export function customError(msg: string, err?: Error): CustomError {
  return { msg, err: Maybe.fromNullable(err) };
}

/**
 * Convenience function for throwing errors indicating that a definition is not
 * implemented yet.
 *
 * This is useful during development. Production code should not contain calls
 * to this function.
 */
export function notImplemented(): never {
  throw new Error('not implemented');
}
