import { INestApplication } from '@nestjs/common';
import { createApp, getDirectorAccessToken } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { createGroupId } from '@test/groups/createGroup';
import { deleteGroup } from '@test/groups/deleteGroup';
import { getGroupById } from '@test/groups/getGroupById';

describe('delete group', () => {
  let app: INestApplication;
  let accessToken: string;
  let johnAccessToken: string;
  let studyId: string;

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

    studyId = await createStudyId(app, { accessToken });

    await addMember(app, {
      accessToken,
      studyId,
      directorId: TEST_DIRECTOR.JOHN.ID,
      role: 'employee',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should delete a group', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    await deleteGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);
  });

  it('should fail because director is not an admin', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    return deleteGroup(app, {
      accessToken: johnAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not a member of study', async () => {
    const studyId = await createStudyId(app, { accessToken: johnAccessToken })
    const groupId = await createGroupId(app, { accessToken: johnAccessToken, studyId });

    return deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
    }).expect(401);
  });
});
