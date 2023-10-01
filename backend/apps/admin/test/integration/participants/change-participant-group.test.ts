import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createGroupId } from '@test/admin/groups';
import {
  createParticipantId,
  changeParticipantGroup,
  getParticipantById,
} from '@test/admin/participants';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('change participant group', () => {
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

  it('should change group', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
      groupId,
    }).expect(200);

    return getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;

        expect(participant.id).toBe(participantId);
        expect(participant.group.id).toBe(groupId);
        expect(participant.group.name).toBe(groupData.name);
      });
  });

  it('should fail because unauthorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken: undefined,
      studyId,
      participantId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    return await changeParticipantGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      participantId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId: undefined,
      participantId,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId: 'undef123ined',
      participantId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      participantId,
      groupId,
    }).expect(401);
  });

  it('should fail because participantId is missing', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because participantId is invalid', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId: 'undef123ined',
      groupId,
    }).expect(401);
  });

  it('should fail because participantId is unknown', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
      groupId: '1234po',
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
      groupId: fakeData.id(),
    }).expect(401);
  });

  it('should fail because groupId is null', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantGroup(app, {
      accessToken,
      studyId,
      participantId,
      groupId: null,
    }).expect(401);
  });
});
