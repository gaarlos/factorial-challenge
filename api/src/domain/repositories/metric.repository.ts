import { MetricEntry } from '../entities/metric-entry.entity';
import { Metric } from '../entities/metric.entity';

export abstract class MetricRepository {
  public abstract findAll(): Promise<Metric[]>;
  public abstract findById(id: string): Promise<Metric>;
  public abstract findByName(name: string): Promise<Metric>;
  public abstract save(metric: Metric): Promise<void>;
  public abstract addEntry(metricEntry: MetricEntry): Promise<void>;
}
