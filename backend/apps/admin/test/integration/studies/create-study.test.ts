import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import { createApp, getDirectorAccessToken } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { Roles } from '@admin/roles/roles.enum';

describe('Create Study', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
  });

  it('should create a study', async () => {
    const study = fakeData.study();
    await request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201)
      .then(async (res) => {
        expect(validateUUID(res.text)).toBeTruthy();

        const studyId = res.text;

        await request(app.getHttpServer())
          .get(`/studies/${studyId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(study)
          .expect(200)
          .then((res) => {
            expect(res.body.role).toBe(Roles.admin);
          });
      });
  });

  it('should fail because name is missing', () => {
    const study = fakeData.study();
    delete study.name;
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(400);
  });

  it('should fail because name is empty', () => {
    const study = fakeData.study();
    study.name = '';
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(400);
  });

  it('should fail because name already exists', async () => {
    const study = fakeData.study();
    await request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201);

    return await request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(422);
  });

  afterAll(async () => {
    await app.close();
  });
});
