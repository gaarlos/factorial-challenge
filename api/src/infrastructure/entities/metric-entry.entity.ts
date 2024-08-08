import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Metric } from './metric.entity';

@Entity()
export class MetricEntry {
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
