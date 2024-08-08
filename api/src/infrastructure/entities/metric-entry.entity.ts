import { MetricEntry as IMetricEntry } from 'src/domain/entities/metric-entry.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Metric } from './metric.entity';

@Entity()
export class MetricEntry implements IMetricEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: Date;

  @Column()
  value: number;

  @Column({ type: 'uuid' })
  metricId: string;

  @ManyToOne(() => Metric, (metric: Metric) => metric.entries)
  metric: Metric;
}
