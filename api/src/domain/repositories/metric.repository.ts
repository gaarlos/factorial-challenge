import { Metric } from '../entities/metric.entity';
import { Period } from '../enum/period.enum';

export abstract class MetricRepository {
  public abstract findById(id: string): Promise<Metric>;
  public abstract findById(id: string, period: Period): Promise<Metric>;
  public abstract save(metric: Metric): Promise<void>;
}
