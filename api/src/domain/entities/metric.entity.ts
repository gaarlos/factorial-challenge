import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { MetricEntry } from './metric-entry.entity';
import { Period } from '../enum/period.enum';

interface MetricPrimitives {
  id: string;
  name: string;
  entries: MetricEntry[];
}

export class Metric {
  constructor(
    protected readonly id: string,
    protected readonly name: string,
    protected entries: MetricEntry[],
  ) {}

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEntries() {
    return this.entries;
  }

  public setEntries(entries: MetricEntry[]) {
    this.entries = entries;
  }

  public filterEntriesByPeriod(period: Period) {
    const filterDate = this.getFilterDateByPeriod(period);

    this.entries = this.entries.filter((entry) =>
      dayjs(entry.getTimestamp()).isAfter(filterDate),
    );
  }

  public static generateId(): string {
    return uuidv4();
  }

  public static create(name: string, entries: MetricEntry[]) {
    const id = this.generateId();
    return new Metric(id, name, entries);
  }

  public static fromPrimitives(props: MetricPrimitives): Metric {
    return new Metric(props.id, props.name, props.entries);
  }

  public fillWithFakeData() {
    this.entries = [];
  }

  private getFilterDateByPeriod(period: Period): Date {
    const now = dayjs();

    if (period === Period.MINUTE) return now.subtract(1, 'hour').toDate();
    if (period === Period.HOUR) return now.subtract(1, 'day').toDate();
    if (period === Period.DAY) return now.subtract(1, 'week').toDate();

    throw new Error('Invalid Period, must be one of "minute", "hour" or "day"');
  }
}
