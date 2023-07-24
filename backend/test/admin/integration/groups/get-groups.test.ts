import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createGroup,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';

describe('get groups', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let johnStudyId: string;
  let groupIds: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudy(app, accessToken, fakeData.study());

    groupIds = [];
    groupIds.push(
      await createGroup(app, accessToken, studyId, fakeData.group()),
    );
    groupIds.push(
      await createGroup(app, accessToken, studyId, fakeData.group()),
    );
    groupIds.push(
      await createGroup(app, accessToken, studyId, fakeData.group()),
    );

    const johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    johnStudyId = await createStudy(app, johnAccessToken, fakeData.study());

    await createGroup(app, johnAccessToken, johnStudyId, fakeData.group());
    await createGroup(app, johnAccessToken, johnStudyId, fakeData.group());
  });

  it('should get all groups', async () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(3);
        res.body.forEach((group) => {
          expect(groupIds.includes(group.id)).toBeTruthy();
          expect(typeof group.name).toBe('string');
        });
      });
  });

  it('should fail because director is not member of study', async () => {
    return request(app.getHttpServer())
      .get(`/studies/${johnStudyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
