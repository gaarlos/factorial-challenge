import { v4 as uuidv4 } from 'uuid';
import { MetricEntry } from './metric-entry.entity';

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
}
