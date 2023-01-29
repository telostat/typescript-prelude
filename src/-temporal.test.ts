import dayjs from 'dayjs';
import { getLastWeekday, getPivotDate, getToday, isoFormatDate, PDateTime, PivotDate } from './-temporal';

describe('PDateTime is dayjs', () => {
  test('today is today', () => {
    expect(PDateTime().format('YYYY-MM-DD')).toBe(new Date().toISOString().slice(0, 10));
  });
});

describe('PivotDate queries', () => {
  const asofDjs = dayjs('2022-07-15');
  const asofStr = asofDjs.format(isoFormatDate);

  test('over SDate values', () => {
    expect(getPivotDate(PivotDate.LAST_YEAR_END, asofStr)).toBe('2021-12-31');
    expect(getPivotDate(PivotDate.THIS_YEAR_START, asofStr)).toBe('2022-01-01');
    expect(getPivotDate(PivotDate.LAST_MONTH_END, asofStr)).toBe('2022-06-30');
    expect(getPivotDate(PivotDate.THIS_MONTH_START, asofStr)).toBe('2022-07-01');
    expect(getPivotDate(PivotDate.LAST_WEEK_END, asofStr)).toBe('2022-07-10');
    expect(getPivotDate(PivotDate.THIS_WEEK_START, asofStr)).toBe('2022-07-11');
    expect(getPivotDate(PivotDate.YESTERDAY, asofStr)).toBe('2022-07-14');
    expect(getPivotDate(PivotDate.TODAY, asofStr)).toBe('2022-07-15');
    expect(getPivotDate(PivotDate.TOMORROW, asofStr)).toBe('2022-07-16');
    expect(getPivotDate(PivotDate.THIS_WEEK_END, asofStr)).toBe('2022-07-17');
    expect(getPivotDate(PivotDate.NEXT_WEEK_START, asofStr)).toBe('2022-07-18');
    expect(getPivotDate(PivotDate.NEXT_WEEK_END, asofStr)).toBe('2022-07-24');
    expect(getPivotDate(PivotDate.THIS_MONTH_END, asofStr)).toBe('2022-07-31');
    expect(getPivotDate(PivotDate.NEXT_MONTH_START, asofStr)).toBe('2022-08-01');
    expect(getPivotDate(PivotDate.NEXT_MONTH_END, asofStr)).toBe('2022-08-31');
    expect(getPivotDate(PivotDate.THIS_YEAR_END, asofStr)).toBe('2022-12-31');
    expect(getPivotDate(PivotDate.NEXT_YEAR_START, asofStr)).toBe('2023-01-01');
    expect(getPivotDate(PivotDate.NEXT_YEAR_END, asofStr)).toBe('2023-12-31');
  });

  test('over Dayjs values', () => {
    expect(getPivotDate(PivotDate.LAST_YEAR_END, asofDjs)).toStrictEqual(dayjs('2021-12-31').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_YEAR_START, asofDjs)).toStrictEqual(dayjs('2022-01-01').endOf('day'));
    expect(getPivotDate(PivotDate.LAST_MONTH_END, asofDjs)).toStrictEqual(dayjs('2022-06-30').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_MONTH_START, asofDjs)).toStrictEqual(dayjs('2022-07-01').endOf('day'));
    expect(getPivotDate(PivotDate.LAST_WEEK_END, asofDjs)).toStrictEqual(dayjs('2022-07-10').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_WEEK_START, asofDjs)).toStrictEqual(dayjs('2022-07-11').endOf('day'));
    expect(getPivotDate(PivotDate.YESTERDAY, asofDjs)).toStrictEqual(dayjs('2022-07-14').endOf('day'));
    expect(getPivotDate(PivotDate.TODAY, asofDjs)).toStrictEqual(dayjs('2022-07-15').endOf('day'));
    expect(getPivotDate(PivotDate.TOMORROW, asofDjs)).toStrictEqual(dayjs('2022-07-16').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_WEEK_END, asofDjs)).toStrictEqual(dayjs('2022-07-17').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_WEEK_START, asofDjs)).toStrictEqual(dayjs('2022-07-18').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_WEEK_END, asofDjs)).toStrictEqual(dayjs('2022-07-24').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_MONTH_END, asofDjs)).toStrictEqual(dayjs('2022-07-31').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_MONTH_START, asofDjs)).toStrictEqual(dayjs('2022-08-01').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_MONTH_END, asofDjs)).toStrictEqual(dayjs('2022-08-31').endOf('day'));
    expect(getPivotDate(PivotDate.THIS_YEAR_END, asofDjs)).toStrictEqual(dayjs('2022-12-31').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_YEAR_START, asofDjs)).toStrictEqual(dayjs('2023-01-01').endOf('day'));
    expect(getPivotDate(PivotDate.NEXT_YEAR_END, asofDjs)).toStrictEqual(dayjs('2023-12-31').endOf('day'));
  });

  test('over empty values', () => {
    expect(getPivotDate(PivotDate.TODAY)).toBe(dayjs().format(isoFormatDate));
  });
});

describe('last weekday', () => {
  test('over SDate values', () => {
    expect(getLastWeekday('2022-07-30')).toBe('2022-07-29');
    expect(getLastWeekday('2022-07-31')).toBe('2022-07-29');
    expect(getLastWeekday('2022-08-01')).toBe('2022-07-29');
    expect(getLastWeekday('2022-08-02')).toBe('2022-08-01');
  });

  test('over Dayjs values', () => {
    expect(getLastWeekday(dayjs('2022-07-30'))).toStrictEqual(dayjs('2022-07-29'));
    expect(getLastWeekday(dayjs('2022-07-31'))).toStrictEqual(dayjs('2022-07-29'));
    expect(getLastWeekday(dayjs('2022-08-01'))).toStrictEqual(dayjs('2022-07-29'));
    expect(getLastWeekday(dayjs('2022-08-02'))).toStrictEqual(dayjs('2022-08-01'));
  });
});

describe('other definitions', () => {
  test('today is today', () => {
    expect(getToday()).toBe(dayjs().format(isoFormatDate));
  });
});
