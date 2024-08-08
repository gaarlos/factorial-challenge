import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from '../application/metrics.service';

describe('MetricsController', () => {
  let metricsController: MetricsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [MetricsService],
    }).compile();

    metricsController = app.get<MetricsController>(MetricsController);
  });
});
