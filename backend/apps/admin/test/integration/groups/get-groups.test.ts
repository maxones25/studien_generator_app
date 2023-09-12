import { INestApplication } from '@nestjs/common';
import { createApp,  } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createDirector } from '@test/director/signUpDirector';
import { createGroupId } from '@test/groups/createGroup';
import { getGroups } from '@test/groups/getGroups';
import { getDirectorAccessToken } from '@test/auth/loginDirector';

describe('get groups', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let johnStudyId: string;
  let groupIds: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyId = await createStudyId(app, { accessToken });

    groupIds = [];
    groupIds.push(await createGroupId(app, { accessToken, studyId }));
    groupIds.push(await createGroupId(app, { accessToken, studyId }));
    groupIds.push(await createGroupId(app, { accessToken, studyId }));

    const johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    johnStudyId = await createStudyId(app, { accessToken: johnAccessToken });

    await createGroupId(app, {
      accessToken: johnAccessToken,
      studyId: johnStudyId,
    });
    await createGroupId(app, {
      accessToken: johnAccessToken,
      studyId: johnStudyId,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all groups', async () => {
    return getGroups(app, { accessToken, studyId })
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
    return getGroups(app, { accessToken, studyId: johnStudyId }).expect(401);
  });
});
