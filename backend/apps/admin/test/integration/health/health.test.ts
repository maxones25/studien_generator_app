import request from 'supertest';
import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';

describe('App Heath', () => {
  let app: IApp;

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
