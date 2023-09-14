import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { CONFIG_SERVICE } from '../config/IConfigService';

async function bootstrap(AppModule: any) {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(CONFIG_SERVICE);
  const origin = configService.get('ORIGIN');
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: [origin, 'http://192.168.8.109:3000'],
  });

  await app.listen(port);
}

export default bootstrap;
