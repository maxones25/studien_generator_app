import { AppModule } from '@admin/app.module';
import { IApp, createApp, getHealth } from '@test/app';
//12
describe('F23: create study', () => {
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
