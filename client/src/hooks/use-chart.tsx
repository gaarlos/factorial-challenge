import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Period } from '../enums/period';
import { MetricEntry } from '../interfaces/metric-entry';
import { formats } from '../constants/date-formats.constants';

const now = dayjs();
const generateTimeAxis = (
  length: number,
  unit: 'm' | 'h' | 'd',
  format: string,
) =>
  Array.from({ length }, (_, index) =>
    now.subtract(index, unit).format(format),
  ).toReversed();

const domains = {
  [Period.MINUTE]: generateTimeAxis(60, 'm', formats[Period.MINUTE]),
  [Period.HOUR]: generateTimeAxis(24, 'h', formats[Period.HOUR]),
  [Period.DAY]: generateTimeAxis(7, 'd', formats[Period.DAY]),
};

const getAverage = (entries: MetricEntry[] = []) => {
  if (!entries.length) return 0;

  const total = entries.reduce((acc, { value }) => acc + value, 0);
  return Math.round(total / entries.length);
};

const aggregateEntries = (
  entries: MetricEntry[],
  domain: string[],
  period: Period,
) => {
  const entriesByTime = Object.groupBy(entries, ({ timestamp }) =>
    dayjs(timestamp).format(formats[period]),
  );

  return domain.map((time) => ({
    time,
    value: getAverage(entriesByTime[time]),
  }));
};

export const useChart = (entries: MetricEntry[] = [], period = Period.DAY) => {
  const average = useMemo(() => getAverage(entries), [entries]);
  const domain = useMemo(() => {
    const domain = domains[period];

    if (!domain) {
      throw new Error(
        'Invalid Period, must be one of "minute", "hour" or "day"',
      );
    }

    return domain;
  }, [period]);

  const data = useMemo(
    () => aggregateEntries(entries, domain, period),
    [entries, domain, period],
  );

  return { data, average, domain };
};
