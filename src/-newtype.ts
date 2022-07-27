/**
 * This module provides definitions for simulating
 * [newtype](https://wiki.haskell.org/Newtype)s.
 *
 * @module
 */

/**
 * Type encoding of a newtype.
 *
 * This type definition uses [fake boxed type
 * pattern](https://kubyshkin.name/posts/newtype-in-typescript/).
 *
 * **Note:** Beware of the pitfalls of the structural type system!
 */
export type NewType<V> = { value: V; readonly __tag: unique symbol };

/**
 * Makes a newtype value from the given argument `x` as long as the type of `x`
 * is the value type of the desired newtype.
 *
 * @param value Value to be *wrapped* by the newtype.
 * @returns A value of desired newtype.
 */
export function mk<
  T extends {
    value: any;
    readonly __tag: symbol;
  } = {
    value: never;
    readonly __tag: unique symbol;
  }
>(value: T['value']): T {
  return value as T;
}

/**
 * Extracts the *wrapped* value from a given newtype.
 *
 * @param value The newtype to extract the value from.
 * @returns Extracted value from the newtype.
 */
export function un<
  T extends {
    value: any;
    readonly __tag: symbol;
  }
>(value: T): T['value'] {
  return value as T['value'];
}

declare const Unique: unique symbol;

/**
 * Type encoding of a newtype with phantom type variable to discriminate value
 * spaces of same underlying type.
 */
export type NewTypeWithPhantom<P, V> = { value: V; readonly __tag: unique symbol; [Unique]: P };

/**
 * Makes a newtype value (tagged with phantom type) from the given argument `x`
 * as long as the type of `x` is the value type of the desired newtype.
 *
 * @param value Value to be *wrapped* by the newtype.
 * @returns A value of desired newtype.
 */
export function mkPhantom<
  T extends {
    value: any;
    readonly __tag: symbol;
    [Unique]: any;
  } = {
    value: never;
    readonly __tag: unique symbol;
    [Unique]: any;
  }
>(value: T['value']): T {
  return value as T;
}

/**
 * Extracts the *wrapped* value from a given newtype (tagged with phantom type).
 *
 * @param value The newtype to extract the value from.
 * @returns Extracted value from the newtype.
 */
export function unPhantom<
  T extends {
    value: any;
    readonly __tag: symbol;
    [Unique]: any;
  }
>(value: T): T['value'] {
  return value as T['value'];
}
