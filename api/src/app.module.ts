import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsController } from './presenters/metrics.controller';
import { MetricsService } from './application/metrics.service';
import { MetricMapper } from './infrastructure/mappers/metric.mapper';
import { MetricEntryMapper } from './infrastructure/mappers/metric-entry.mapper';
import { SQLiteMetricRepository } from './infrastructure/repositories/sqlite-metric.repository';
import { Metric } from './infrastructure/entities/metric.entity';
import { MetricEntry } from './infrastructure/entities/metric-entry.entity';
import { MetricRepository } from './domain/repositories/metric.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/../db/database.db',
      entities: [Metric, MetricEntry],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Metric, MetricEntry]),
  ],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    MetricMapper,
    MetricEntryMapper,
    { provide: MetricRepository, useClass: SQLiteMetricRepository },
  ],
})
export class AppModule {}
