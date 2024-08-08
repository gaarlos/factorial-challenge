import { Injectable } from '@nestjs/common';
import { MetricEntry as MetricEntryEntity } from '../entities/metric-entry.entity';
import { MetricEntry } from 'src/domain/entities/metric-entry.entity';

@Injectable()
export class MetricEntryMapper {
  public toDomain(entity: MetricEntryEntity): MetricEntry {
    return MetricEntry.fromPrimitives({
      id: entity.id,
      metricId: entity.metricId,
      timestamp: entity.timestamp,
      value: entity.value,
    });
  }

  public toEntity(domain: MetricEntry): MetricEntryEntity {
    const entity = new MetricEntryEntity();

    entity.id = domain.getId();
    entity.metricId = domain.getMetricId();
    entity.timestamp = domain.getTimestamp();
    entity.value = domain.getValue();

    return entity;
  }
}
