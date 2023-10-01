import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { createGroupId } from '@test/groups/createGroup';
import { deleteGroup } from '@test/groups/deleteGroup';
import { getGroupById } from '@test/groups/getGroupById';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { createParticipantId } from '@test/participants/createParticipant';
import fakeData from '@test/fakeData';
import { getParticipantById } from '@test/participants/getParticipantById';
import { getParticipants } from '@test/participants/getParticipants';

describe('delete group', () => {
  let app: IApp;
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

  it('should hard delete a group and not delete group participants', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data: fakeData.participant(groupId),
    });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: true,
      deleteRelated: false,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;
        expect(participant.deletedAt).toBeNull();
        expect(participant.group).toBeNull();
      });
  });

  it('should hard delete a group and hard delete group participants', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data: fakeData.participant(groupId),
    });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: true,
      deleteRelated: true,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await getParticipantById(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should soft delete a group and not delete group participants', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data: fakeData.participant(groupId),
    });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
      deleteRelated: false,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;
        expect(participant.deletedAt).toBeNull();
        expect(participant.group).toBeNull();
      });
  });

  it('should soft delete a group and soft delete group participants', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data: fakeData.participant(groupId),
    });

    await deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
      hardDelete: false,
      deleteRelated: true,
    })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getGroupById(app, { accessToken, studyId, groupId }).expect(401);

    await getParticipants(app, { accessToken, studyId, deleted: true })
      .expect(200)
      .then((res) => {
        const participants = res.body;
        expect(Array.isArray(participants)).toBeTruthy();
        const participant = participants.find(
          (participant) => participant.id === participantId,
        );

        expect(participant).toBeTruthy();
        expect(participant.deletedAt).not.toBeNull();
      });
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
    const studyId = await createStudyId(app, { accessToken: johnAccessToken });
    const groupId = await createGroupId(app, {
      accessToken: johnAccessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId: 'undefined',
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId missing', async () => {
    await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId invalid', async () => {
    await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId,
      groupId: 'undefined',
    }).expect(401);
  });

  it('should fail because groupId unknown', async () => {
    await createGroupId(app, {
      accessToken,
      studyId,
    });

    return deleteGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
