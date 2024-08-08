import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from 'src/domain/enum/period.enum';
import { MetricRepository } from 'src/domain/repositories/metric.repository';
import { Metric } from '../entities/metric.entity';
import { MoreThan, Repository } from 'typeorm';
import { MetricNotFound } from 'src/domain/errors/metric-not-found.error';
import * as dayjs from 'dayjs';

@Injectable()
export class SQLiteMetricRepository implements MetricRepository {
  constructor(
    @InjectRepository(Metric)
    private readonly metricRepository: Repository<Metric>,
  ) {}

  private getFilterDateByPeriod(period: Period): Date {
    const now = dayjs();

    if (period === Period.MINUTE) return now.subtract(1, 'hour').toDate();
    if (period === Period.HOUR) return now.subtract(1, 'day').toDate();
    if (period === Period.DAY) return now.subtract(1, 'week').toDate();

    throw new Error('Invalid Period, must be one of "minute", "hour" or "day"');
  }

  public async findById(id: string): Promise<Metric> {
    const metricEntity = await this.metricRepository.findOne({
      where: { id },
      relations: { entries: true },
    });

    if (!metricEntity) throw new MetricNotFound(id);

    return metricEntity;
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

    return metricEntity;
  }

  public async findByName(name: string): Promise<Metric> {
    const metricEntity = await this.metricRepository.findOne({
      where: { name },
      relations: { entries: true },
    });

    if (!metricEntity) throw new MetricNotFound(name);

    return metricEntity;
  }
}
