/**
 * This module re-exports `dayjs` definition and provides definitions for
 * working with temporal values.
 *
 * @module
 */

import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isoWeek from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Extend dayjs:
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isoWeek);
dayjs.extend(minMax);
dayjs.extend(quarterOfYear);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

// TODO: Check how we can export Day.js type and functionality.
export const PDateTime = dayjs;

/**
 * Type alias for ISO-formatted date values as strings.
 */
export type SDate = string;

/**
 * Type alias for ISO-formatted date/time values as strings.
 */
export type SDateTime = string;

/**
 * Type definition for date range.
 */
export interface SDateRange {
  start: SDate;
  until: SDate;
}

/**
 * ISO date/time format used in the library.
 */
export const isoFormatDateTime = 'YYYY-MM-DDTHH:MM:SS';

/**
 * ISO date format used in the library.
 */
export const isoFormatDate = 'YYYY-MM-DD';

/**
 * Enum that encodes some known pivotal dates.
 */
export enum PivotDate {
  LAST_YEAR_END = 'last year end',
  THIS_YEAR_START = 'this year start',
  LAST_MONTH_END = 'last month end',
  THIS_MONTH_START = 'this month start',
  LAST_WEEK_END = 'last week end',
  THIS_WEEK_START = 'this week start',
  YESTERDAY = 'yesterday',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  THIS_WEEK_END = 'this week end',
  NEXT_WEEK_START = 'next week start',
  NEXT_WEEK_END = 'next week end',
  THIS_MONTH_END = 'this month end',
  NEXT_MONTH_START = 'next month start',
  NEXT_MONTH_END = 'next month end',
  THIS_YEAR_END = 'this year end',
  NEXT_YEAR_START = 'next year start',
  NEXT_YEAR_END = 'next year end',
}

/* Signature of getPivotDate specialized over Dayjs argument. */
export function getPivotDate(p: PivotDate, x: Dayjs): Dayjs;

/* Signature of getPivotDate specialized over optional SDate argument. */
export function getPivotDate(p: PivotDate, x?: SDate): SDate;

/**
 * Returns the date as per given pivotal reference and as of given date.
 *
 * @param p Pivotal reference.
 * @param x Date as of.
 * @returns A new date.
 */
export function getPivotDate(p: PivotDate, x?: Dayjs | SDate): Dayjs | SDate {
  // Get the reference date as a Dayjs value.
  const asof = dayjs(dayjs.isDayjs(x) ? x.format(isoFormatDate) : x);

  // Compute the pivot date and return:
  let pivot;
  switch (p) {
    case PivotDate.LAST_YEAR_END:
      pivot = asof.subtract(1, 'year').endOf('year');
      break;
    case PivotDate.THIS_YEAR_START:
      pivot = asof.startOf('year');
      break;
    case PivotDate.LAST_MONTH_END:
      pivot = asof.subtract(1, 'month').endOf('month');
      break;
    case PivotDate.THIS_MONTH_START:
      pivot = asof.startOf('month');
      break;
    case PivotDate.LAST_WEEK_END:
      pivot = asof.subtract(1, 'week').endOf('isoWeek');
      break;
    case PivotDate.THIS_WEEK_START:
      pivot = asof.startOf('isoWeek');
      break;
    case PivotDate.YESTERDAY:
      pivot = asof.subtract(1, 'day');
      break;
    case PivotDate.TODAY:
      pivot = asof;
      break;
    case PivotDate.TOMORROW:
      pivot = asof.add(1, 'day');
      break;
    case PivotDate.THIS_WEEK_END:
      pivot = asof.endOf('isoWeek');
      break;
    case PivotDate.NEXT_WEEK_START:
      pivot = asof.add(1, 'week').startOf('isoWeek');
      break;
    case PivotDate.NEXT_WEEK_END:
      pivot = asof.add(1, 'week').endOf('isoWeek');
      break;
    case PivotDate.THIS_MONTH_END:
      pivot = asof.endOf('month');
      break;
    case PivotDate.NEXT_MONTH_START:
      pivot = asof.add(1, 'month').startOf('month');
      break;
    case PivotDate.NEXT_MONTH_END:
      pivot = asof.add(1, 'month').endOf('month');
      break;
    case PivotDate.THIS_YEAR_END:
      pivot = asof.endOf('year');
      break;
    case PivotDate.NEXT_YEAR_START:
      pivot = asof.add(1, 'year').startOf('year');
      break;
    case PivotDate.NEXT_YEAR_END:
      pivot = asof.add(1, 'year').endOf('year');
      break;
    default:
      throw Error('Unreachable case');
  }

  return dayjs.isDayjs(x) ? pivot.endOf('day') : pivot.format(isoFormatDate);
}

/* Signature of getLastWeekday specialized over Dayjs argument. */
export function getLastWeekday(x: Dayjs): Dayjs;

/* Signature of getLastWeekday specialized over optional SDate argument. */
export function getLastWeekday(x?: SDate): SDate;

/**
 * Returns the last weekday as of the given date.
 *
 * @param x Date as of we need the last weekday.
 * @returns Last weekday.
 */
export function getLastWeekday(x?: Dayjs | SDate): Dayjs | SDate {
  // Get the reference date as a Dayjs value.
  const asof = dayjs(x);

  // Get the day of week:
  const day = asof.day();

  // Compute the difference:
  const diff = day === 0 ? 2 : day === 1 ? 3 : 1;

  // Compute the new date:
  const date = asof.subtract(diff, 'days');

  // Done, return as per the type of the argument:
  return dayjs.isDayjs(x) ? date : date.format(isoFormatDate);
}

/**
 * Returns today.
 */
export function getToday(): SDate {
  return getPivotDate(PivotDate.TODAY);
}
