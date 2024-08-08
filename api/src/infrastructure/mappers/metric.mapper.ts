import { Injectable } from '@nestjs/common';
import { Metric as MetricEntity } from '../entities/metric.entity';
import { Metric } from 'src/domain/entities/metric.entity';
import { MetricEntryMapper } from './metric-entry.mapper';

@Injectable()
export class MetricMapper {
  constructor(private readonly metricEntryMapper: MetricEntryMapper) {}

  public toDomain(entity: MetricEntity): Metric {
    return Metric.fromPrimitives({
      id: entity.id,
      name: entity.name,
      entries: entity.entries.map(this.metricEntryMapper.toDomain),
    });
  }

  public toEntity(domain: Metric): MetricEntity {
    const entity = new MetricEntity();

    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.entries = domain.getEntries().map(this.metricEntryMapper.toEntity);

    return entity;
  }
}
