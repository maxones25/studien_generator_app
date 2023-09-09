import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap(AppModule: any) {
  initializeTransactionalContext();
  
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const origin = configService.get('ORIGIN');
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: [origin],
  });

  await app.listen(port);
}

export default bootstrap;
