import { Maybe } from './-purify';

/**
 * Type definition for custom, non-throwable errors.
 *
 * This is a useful type for the `Left` of an `Either` value.
 */
export interface CustomError {
  msg: string;
  err: Maybe<Error>;
}

/**
 * Convenience function to build [[CustomError]] values.
 *
 * @param msg Message.
 * @param err Underlying `Error`, if any.
 * @returns A [[CustomError]] value.
 */
export function customError(msg: string, err?: Error): CustomError {
  return { msg, err: Maybe.fromNullable(err) };
}

/**
 * Convenience function for throwing `Error`s indicating that a definition is
 * not implemented yet.
 *
 * This is useful during development. Production  code should not contain calls
 * to this function.
 */
export function notImplemented(): never {
  throw new Error('not implemented');
}
