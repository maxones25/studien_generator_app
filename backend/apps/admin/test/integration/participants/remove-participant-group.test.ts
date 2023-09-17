import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createParticipantId } from '@test/participants/createParticipant';
import { getParticipantById } from '@test/participants/getParticipantById';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';
import { createGroupId } from '@test/groups/createGroup';
import { removeParticipantGroup } from '@test/participants/removeParticipantGroup';
import { getAdminAccessToken } from '@test/auth/loginAdmin';

describe('remove participant group', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let groupData: any;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    groupData = fakeData.group();

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
      data: groupData,
    });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should remove group', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    await removeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(200);

    return getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;

        expect(participant.id).toBe(participantId);
        expect(participant.group).toBeNull();
      });
  });

  it('should fail because unauthorized', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken: undefined,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    return await removeParticipantGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because director is member of study', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId: undefined,
      participantId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId: '123avb',
      participantId,
    }).expect(401);
  });

  it('should fail because studyId is unkown', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      participantId,
    }).expect(401);
  });

  it('should fail because participantId is missing', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId: undefined,
      participantId,
    }).expect(400);
  });

  it('should fail because participantId is invalid', async () => {
    const data = fakeData.participant(groupId);

    await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId: '123avb',
    }).expect(401);
  });

  it('should fail because participantId is unkown', async () => {
    const data = fakeData.participant(groupId);

    await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return await removeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId: fakeData.id(),
    }).expect(401);
  });
});
