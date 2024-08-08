import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../application/metrics.service';

@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}
}
