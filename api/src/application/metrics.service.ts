import { Injectable } from '@nestjs/common';
import { MetricRepository } from 'src/domain/repositories/metric.repository';
import { CreateMetricDto } from './dto/create-metric.dto';
import { AddEntryDto } from './dto/add-entry.dto';
import { Metric } from 'src/domain/entities/metric.entity';
import { MetricEntry } from 'src/domain/entities/metric-entry.entity';

@Injectable()
export class MetricsService {
  constructor(private readonly metricRepository: MetricRepository) {}

  public async create(createMetricDto: CreateMetricDto) {
    const metric = Metric.create(createMetricDto.name, []);
    const entries = createMetricDto.entries.map((entry) => {
      return MetricEntry.create(metric.getId(), entry.timestamp, entry.value);
    });

    metric.setEntries(entries);

    await this.metricRepository.save(metric);
  }

  public async addMetric(addEntryDto: AddEntryDto) {
    await this.metricRepository.findById(addEntryDto.metricId);

    const metricEntry = MetricEntry.create(
      addEntryDto.metricId,
      addEntryDto.timestamp,
      addEntryDto.value,
    );

    await this.metricRepository.addEntry(metricEntry);
  }
}
