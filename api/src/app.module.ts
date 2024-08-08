import { Module } from '@nestjs/common';
import { MetricsController } from './presenters/metrics.controller';
import { MetricsService } from './application/metrics.service';

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class AppModule {}
