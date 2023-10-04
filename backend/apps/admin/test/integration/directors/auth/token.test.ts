import { AppModule } from '@admin/app.module';
import { JwtService } from '@nestjs/jwt';
import { ITokenService, TOKEN_SERVICE } from '@shared/modules/token';
import {
  createDirector,
  deleteDirector,
  getDirectorAccessToken,
} from '@test/admin/director';
import { getStudies } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import { TEST_DIRECTOR } from '@test/testData';

describe('Access Token', () => {
  let app: IApp;
  let accessToken: string;
  let tokenService: ITokenService;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    tokenService = await app.get(TOKEN_SERVICE);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fail because token payload has wrong topic', async () => {
    const director = await createDirector(app);
    const wrongAccessToken = tokenService.sign({ topic: 'Not-Admin' });
    return deleteDirector(app, {
      accessToken: wrongAccessToken,
      directorId: director.id,
      data: { hardDelete: true },
    }).expect(401);
  });

  it('should fail because token payload directorId is wrong type', async () => {
    const wrongAccessToken = tokenService.sign({
      topic: 'Director',
      directorId: 123,
    });
    return getStudies(app, { accessToken: wrongAccessToken }).expect(401);
  });

  it('should fail because token payload topic is wrong type', async () => {
    const wrongAccessToken = tokenService.sign({
      topic: 123,
      directorId: TEST_DIRECTOR.MAX.ID,
    });
    return getStudies(app, { accessToken: wrongAccessToken }).expect(401);
  });

  it('should fail because token payload is invalid', async () => {
    const tokenService = new JwtService({ secret: 'WRONG_SECRET' });
    const wrongAccessToken = tokenService.sign({
      topic: 'Director',
      directorId: TEST_DIRECTOR.MAX.ID,
    });
    return getStudies(app, { accessToken: wrongAccessToken }).expect(401);
  });
});
