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
    formId = await createForm(app, accessToken, studyId, fakeData.form());

    for (let i = 0; i < 3; i++) {
      const formConfigId = await createFormConfig(
        app,
        accessToken,
        studyId,
        formId,
        fakeData.formConfig(groupId),
      );
      groupForms.push(formConfigId);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get an empty list', async () => {
    const groupId = await createGroup(
      app,
      accessToken,
      studyId,
      fakeData.group(),
    );
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${groupId}/forms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(0);
      });
  });

  it('should a get list of forms', () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${groupId}/forms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((form) => {
          expect(groupForms.includes(form.id)).toBeTruthy();
        });
      });
  });

  it('should fail because director is not member of study', async () => {
    const accessToken = await getDirectorAccessToken(app, TEST_DIRECTOR.JOHN.EMAIL, TEST_DIRECTOR.JOHN.PASSWORD)

    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${groupId}/forms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401)
  });
});
