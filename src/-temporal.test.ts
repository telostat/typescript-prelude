import { PDateTime } from './-temporal';

describe('PDateTime is dayjs', () => {
  test('today is today', () => {
    expect(PDateTime().format('YYYY-MM-DD')).toBe(new Date().toISOString().slice(0, 10));
  });
});
