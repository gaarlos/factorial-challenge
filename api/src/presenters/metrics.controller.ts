import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MetricsService } from '../application/metrics.service';
import { Period } from 'src/domain/enum/period.enum';
import { CreateMetricRequestDto } from './dto/create-metric-request.dto';
import { AddEntryRequestDto } from './dto/add-entry-request.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics() {
    const metrics = await this.metricsService.getMetrics();
    return metrics;
  }

  @Get('/:id')
  async getMetric(@Param('id') metricId: string) {
    const metrics = await this.metricsService.getMetric(metricId);
    return metrics;
  }

  @Get('/:id/:period')
  async getMetricByPeriod(
    @Param('id') metricId: string,
    @Param('period') period: Period,
  ) {
    const metrics = await this.metricsService.getMetricByPeriod(
      metricId,
      period,
    );

    return metrics;
  }

  @Post()
  async createMetric(@Body() createMetricRequestDto: CreateMetricRequestDto) {
    await this.metricsService.create(createMetricRequestDto);
  }

  @Patch(':id')
  async addEntryToMetric(
    @Param('id') metricId: string,
    @Body() addEntryDto: AddEntryRequestDto,
  ) {
    await this.metricsService.addMetric(metricId, addEntryDto);
  }
}
