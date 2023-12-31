import { AppModule } from '@admin/app.module';
import { IApp, createApp, getHealth } from '@test/app';

describe('App Heath', () => {
  let app: IApp;

  beforeAll(async () => {
    app = await createApp(AppModule);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be healthy', () => {
    return getHealth(app).expect(200);
  });
});
