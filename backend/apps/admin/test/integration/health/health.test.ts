import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createApp } from '@test/utils';
import { AppModule } from '@admin/app.module';

describe('App Heath', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp(AppModule);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be healthy', () => {
    return request(app.getHttpServer()).get(`/health`).expect(200);
  });
});
