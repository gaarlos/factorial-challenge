import { Metric as IMetric } from 'src/domain/entities/metric.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MetricEntry } from './metric-entry.entity';

@Entity()
export class Metric implements IMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => MetricEntry,
    (metricEntry: MetricEntry) => metricEntry.metric,
  )
  entries: MetricEntry[];
}
