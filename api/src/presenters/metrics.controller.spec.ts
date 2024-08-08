import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from '../application/metrics.service';
import supertest from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { assert } from 'console';

describe('MetricsController', () => {
  let app: INestApplication;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [MetricsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    metricsService = module.get<MetricsService>(MetricsService);
  });

  describe('GET /api/metrics', () => {
    it('should call metricsService.getMetrics and return an array', async () => {
      jest.spyOn(metricsService, 'getMetrics').mockResolvedValueOnce([]);

      const response = await supertest(app.getHttpServer())
        .get('/api/metrics')
        .send()
        .expect(HttpStatus.OK);

      assert(Array.isArray(response.body), true);
      expect(metricsService.getMetrics).toHaveBeenCalled();
    });
  });
});
