import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createGroup,
  createStudy,
  getAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';

describe('delete group', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp();

    const study = fakeData.study();

    accessToken = await getAccessToken(TEST_DIRECTOR.MAX.EMAIL);

    studyId = await createStudy(app, accessToken, study);
  });

  it('should delete a group', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
