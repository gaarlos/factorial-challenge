import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:4200'], credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);

  Logger.log(`🚀 Application is running on: http://localhost:3000/api`);
}

bootstrap();
