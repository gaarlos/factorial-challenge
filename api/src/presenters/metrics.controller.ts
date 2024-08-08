import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Period } from 'src/domain/enum/period.enum';
import { MetricsService } from '../application/metrics.service';
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
  async getMetric(@Param('id', ParseUUIDPipe) metricId: string) {
    const metric = await this.metricsService.getMetric(metricId);
    return metric;
  }

  @Get('/:id/:period')
  async getMetricByPeriod(
    @Param('id', ParseUUIDPipe) metricId: string,
    @Param('period', new ParseEnumPipe(Period)) period: Period,
  ) {
    const metric = await this.metricsService.getMetricByPeriod(
      metricId,
      period,
    );

    return metric;
  }

  @Post()
  async createMetric(@Body() createMetricRequestDto: CreateMetricRequestDto) {
    await this.metricsService.create(createMetricRequestDto);
  }

  @Patch(':id')
  async addEntryToMetric(
    @Param('id', ParseUUIDPipe) metricId: string,
    @Body() addEntryDto: AddEntryRequestDto,
  ) {
    await this.metricsService.addMetric(metricId, addEntryDto);
  }
}
