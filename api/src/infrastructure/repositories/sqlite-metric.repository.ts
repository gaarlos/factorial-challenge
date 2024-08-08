import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { Period } from 'src/domain/enum/period.enum';
import { MetricRepository } from 'src/domain/repositories/metric.repository';
import { MetricNotFound } from 'src/domain/errors/metric-not-found.error';
import { Metric } from 'src/domain/entities/metric.entity';
import { MetricEntry } from 'src/domain/entities/metric-entry.entity';
import { Metric as MetricEntity } from '../entities/metric.entity';
import { MetricEntry as MetricEntryEntity } from '../entities/metric-entry.entity';
import { MetricMapper } from '../mappers/metric.mapper';
import { MetricEntryMapper } from '../mappers/metric-entry.mapper';

@Injectable()
export class SQLiteMetricRepository implements MetricRepository {
  constructor(
    @InjectRepository(MetricEntity)
    private readonly metricRepository: Repository<MetricEntity>,
    @InjectRepository(MetricEntryEntity)
    private readonly metricEntryRepository: Repository<MetricEntryEntity>,
    private readonly metricMapper: MetricMapper,
    private readonly metricEntryMapper: MetricEntryMapper,
  ) {}

  private getFilterDateByPeriod(period: Period): Date {
    const now = dayjs();

    if (period === Period.MINUTE) return now.subtract(1, 'hour').toDate();
    if (period === Period.HOUR) return now.subtract(1, 'day').toDate();
    if (period === Period.DAY) return now.subtract(1, 'week').toDate();

    throw new Error('Invalid Period, must be one of "minute", "hour" or "day"');
  }

  public async findAll(): Promise<Metric[]> {
    const metricEntities = await this.metricRepository.find();
    return metricEntities.map(this.metricMapper.toDomain);
  }

  public async findById(id: string): Promise<Metric> {
    const metricEntity = await this.metricRepository.findOne({
      where: { id },
      relations: { entries: true },
    });

    if (!metricEntity) throw new MetricNotFound(id);

    return this.metricMapper.toDomain(metricEntity);
  }

  public async findByIdAndPeriod(id: string, period: Period): Promise<Metric> {
    const filterPeriod = this.getFilterDateByPeriod(period);
    const metricEntity = await this.metricRepository.findOne({
      where: {
        id,
        entries: {
          timestamp: MoreThan(filterPeriod),
        },
      },
      relations: { entries: true },
    });

    if (!metricEntity) throw new MetricNotFound(id);

    return this.metricMapper.toDomain(metricEntity);
  }

  public async findByName(name: string): Promise<Metric> {
    const metricEntity = await this.metricRepository.findOne({
      where: { name },
      relations: { entries: true },
    });

    if (!metricEntity) throw new MetricNotFound(name);

    return this.metricMapper.toDomain(metricEntity);
  }

  public async save(metric: Metric): Promise<void> {
    const metricEntity = this.metricMapper.toEntity(metric);
    await this.metricRepository.save(metricEntity);
  }

  public async addEntry(metricEntry: MetricEntry): Promise<void> {
    // Check if Metric exists
    await this.findById(metricEntry.getMetricId());

    const metricEntryEntity = this.metricEntryMapper.toEntity(metricEntry);
    await this.metricEntryRepository.save(metricEntryEntity);
  }
}
