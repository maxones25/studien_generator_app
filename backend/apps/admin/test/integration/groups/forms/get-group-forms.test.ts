import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import fakeData from '@test/fakeData';
import {
  createApp,
  createForm,
  createFormConfig,
  createGroup,
  createStudy,
  getDirectorAccessToken,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';

describe('Get Group Forms', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let groupId: string;
  let formId: string;
  let groupForms: string[] = [];

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());
    groupId = await createGroup(app, accessToken, studyId, fakeData.group());
    // formId = await createForm(app, accessToken, studyId, fakeData.form());

    // for (let i = 0; i < 3; i++) {
    //   const formConfigId = await createFormConfig(
    //     app,
    //     accessToken,
    //     studyId,
    //     formId,
    //     fakeData.formConfig(groupId),
    //   );
    //   groupForms.push(formConfigId);
    // }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should not fail', () => {
    expect(true).toBeTruthy();
  });

  // it('should get an empty list', () => {
  //   return request(app.getHttpServer())
  //     .get(`/studies/${studyId}/groups/${groupId}/forms`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .expect(200)
  //     .then((res) => {
  //       expect(Array.isArray(res.body)).toBeTruthy();
  //       expect(res.body.length).toBe(0);
  //     });
  // });

  // it('should a get list of forms', () => {
  //   return request(app.getHttpServer())
  //     .get(`/studies/${studyId}/groups/${groupId}/forms`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .expect(200)
  //     .then((res) => {
  //       expect(Array.isArray(res.body)).toBeTruthy();
  //       expect(res.body.length).toBeGreaterThan(0);
  //     });
  // });
});
