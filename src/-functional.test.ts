import { Just as PurifyJust, Nothing as PurifyNothing } from 'purify-ts';
import { Just, Nothing } from './-functional';

describe('re-export purify.ts', () => {
  test('imports and exports purify.ts definitions properly', () => {
    expect(Nothing).toBe(PurifyNothing);
    expect(Just(1)).toStrictEqual(PurifyJust(1));
  });
});
