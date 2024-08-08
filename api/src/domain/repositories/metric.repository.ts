import { MetricEntry } from '../entities/metric-entry.entity';
import { Metric } from '../entities/metric.entity';
import { Period } from '../enum/period.enum';

export abstract class MetricRepository {
  public abstract findById(id: string): Promise<Metric>;
  public abstract findByIdAndPeriod(
    id: string,
    period: Period,
  ): Promise<Metric>;
  public abstract findByName(name: string): Promise<Metric>;
  public abstract save(metric: Metric): Promise<void>;
  public abstract addEntry(metricEntry: MetricEntry): Promise<void>;
}
