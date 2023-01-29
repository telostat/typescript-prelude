import { PDateTime } from './-zeitgeist';

describe('PDateTime is dayjs', () => {
  test('today is today', () => {
    expect(PDateTime().format('YYYY-MM-DD')).toBe(new Date().toISOString().slice(0, 10));
  });
});
