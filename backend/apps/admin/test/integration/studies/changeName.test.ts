import { AppModule } from '@admin/app.module';
import { Roles } from '@admin/roles/roles.enum';
import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { changeStudyName } from '@test/studies/changeStudyName';
import { createStudy, createStudyId } from '@test/studies/createStudy';
import { getStudyById } from '@test/studies/getStudyById';
import { TEST_DIRECTOR } from '@test/testData';
import { createApp, getDirectorAccessToken } from '@test/utils';
import request from 'supertest';

describe('Change Study Name', () => {
  let app: INestApplication;
  let accessToken: string;
  let johnAccessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update study successfully', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    const updatedStudy = fakeData.study();

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: updatedStudy,
    }).expect(200);

    await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(studyId);
        expect(res.body.name).toEqual(updatedStudy.name);
        expect(res.body.role).toEqual(Roles.admin);
      });
  });

  it('should fail because name is empty', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: { name: '' },
    }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.study();

    await createStudy(app, {
      accessToken,
      data,
    });

    const studyId = await createStudyId(app, {
      accessToken,
      data: fakeData.study(),
    });

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: { name: data.name },
    }).expect(422);
  });

  it('should fail because user is not an admin', async () => {
    const studyId = await createStudyId(app, {
      accessToken: johnAccessToken,
      data: fakeData.study(),
    });

    await changeStudyName(app, {
      accessToken,
      studyId,
      data: fakeData.study(),
    }).expect(401);
  });
});
