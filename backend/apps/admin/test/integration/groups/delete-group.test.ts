import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import {
  addMember,
  createApp,
  createGroup,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { Roles } from '@admin/roles/roles.enum';
import { AppModule } from '@admin/app.module';

describe('delete group', () => {
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

    await addMember(app, accessToken, studyId, {
      directorId: TEST_DIRECTOR.JOHN.ID,
      role: Roles.employee,
    });
  });

  it('should delete a group', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because director is not an admin', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${johnAccessToken}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
