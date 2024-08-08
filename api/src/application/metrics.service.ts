import { Injectable } from '@nestjs/common';
import { MetricRepository } from 'src/domain/repositories/metric.repository';
import { Metric } from 'src/domain/entities/metric.entity';
import { MetricEntry } from 'src/domain/entities/metric-entry.entity';
import { Period } from 'src/domain/enum/period.enum';
import { CreateMetricDto } from './dto/create-metric.dto';
import { AddEntryDto } from './dto/add-entry.dto';

@Injectable()
export class MetricsService {
  constructor(private readonly metricRepository: MetricRepository) {}

  public async getMetrics() {
    return this.metricRepository.findAll();
  }

  public async getMetric(id: string) {
    return this.metricRepository.findById(id);
  }

  public async getMetricByPeriod(id: string, period: Period) {
    return this.metricRepository.findByIdAndPeriod(id, period);
  }

  public async create(createMetricDto: CreateMetricDto) {
    const metric = Metric.create(createMetricDto.name, []);
    const entries = createMetricDto.entries.map((entry) => {
      return MetricEntry.create(metric.getId(), entry.timestamp, entry.value);
    });

    metric.setEntries(entries);

    await this.metricRepository.save(metric);
  }

  public async addMetric(metricId: string, addEntryDto: AddEntryDto) {
    await this.metricRepository.findById(metricId);

    const metricEntry = MetricEntry.create(
      metricId,
      addEntryDto.timestamp,
      addEntryDto.value,
    );

    await this.metricRepository.addEntry(metricEntry);
  }
}
