import { AppModule } from '@admin/app.module';
import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';
import {
  createApp,
  createGroup,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import request from 'supertest';

describe('update group', () => {
  let app: INestApplication;
  let accessToken: string;
  let johnAccessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const study = fakeData.study();

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudy(app, accessToken, study);
  });

  it('should update group successfully', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    const updatedGroup = fakeData.group();

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedGroup)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(groupId);
        expect(res.body.name).toEqual(updatedGroup.name);
      });
  });

  it('should fail because name is empty', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: '' })
      .expect(400);
  });

  it('should fail because name already exists', async () => {
    const group = fakeData.group();
    await createGroup(app, accessToken, studyId, group);
    const groupId = await createGroup(
      app,
      accessToken,
      studyId,
      fakeData.group(),
    );

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(422);
  });

  it('should fail because name already exists', async () => {
    const studyId = await createStudy(app, johnAccessToken, fakeData.study());
    const groupId = await createGroup(
      app,
      johnAccessToken,
      studyId,
      fakeData.group(),
    );

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.group())
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
