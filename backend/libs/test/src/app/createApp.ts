import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';

export const createApp = async (AppModule: any) => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return app;
};
