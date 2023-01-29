import { Just, Nothing } from 'purify-ts';
import { customError } from './-error';

describe('custom error', () => {
  test('constructor works with and without optional error', () => {
    expect(customError('msg')).toStrictEqual({ msg: 'msg', err: Nothing });
    expect(customError('msg', new Error('exc'))).toStrictEqual({ msg: 'msg', err: Just(new Error('exc')) });
  });
});
