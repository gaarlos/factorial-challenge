import { v4 as uuidv4 } from 'uuid';

interface MetricEntryPrimitives {
  id: string;
  metricId: string;
  timestamp: Date;
  value: number;
}

export class MetricEntry {
  constructor(
    protected readonly id: string,
    protected readonly metricId: string,
    protected readonly timestamp: Date,
    protected readonly value: number,
  ) {}

  public getId() {
    return this.id;
  }

  public getMetricId() {
    return this.metricId;
  }

  public getTimestamp() {
    return this.timestamp;
  }

  public getValue() {
    return this.value;
  }

  public static generateId(): string {
    return uuidv4();
  }

  public static create(metricId, timestamp, value) {
    const id = this.generateId();
    return new MetricEntry(id, metricId, timestamp, value);
  }

  public static fromPrimitives(props: MetricEntryPrimitives): MetricEntry {
    return new MetricEntry(
      props.id,
      props.metricId,
      props.timestamp,
      props.value,
    );
  }
}
