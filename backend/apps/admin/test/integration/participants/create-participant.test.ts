import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createGroupId } from '@test/admin/groups';
import {
  createParticipantId,
  getParticipantById,
  createParticipant,
} from '@test/admin/participants';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('create participant', () => {
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

  it('should create a participant without group', async () => {
    const data = fakeData.participant();

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;

        expect(participant.id).toBe(participantId);
        expect(participant.number).toBe(data.number);
        expect(participant.group).toBeNull();
      });
  });

  it('should create a participant with group', async () => {
    const data = fakeData.participant(groupId);

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    return getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;

        expect(participant.id).toBe(participantId);
        expect(participant.number).toBe(data.number);
        expect(participant.group.id).toBe(groupId);
        expect(participant.group.name).toBe(groupData.name);
      });
  });

  it('should fail because unauthorized', async () => {
    return await createParticipant(app, {
      accessToken: undefined,
      studyId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const accessToken = await getAdminAccessToken(app);

    return await createParticipant(app, {
      accessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return await createParticipant(app, {
      accessToken: otherAccessToken,
      studyId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId: undefined,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId: 'invalid-123',
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId: fakeData.id(),
    }).expect(401);
  });

  it('should fail because number is missing', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId,
      data: {},
    }).expect(400);
  });

  it('should fail because number is empty', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId,
      data: {
        number: '',
      },
    }).expect(400);
  });

  it('should fail because number is invalid', async () => {
    return await createParticipant(app, {
      accessToken,
      studyId,
      data: {
        number: 123,
      },
    }).expect(400);
  });

  it('should fail because number already exists', async () => {
    const data = fakeData.participant();

    await createParticipantId(app, { accessToken, studyId, data });

    const data2 = fakeData.participant();

    data2.number = data.number;

    return await createParticipant(app, {
      accessToken,
      studyId,
      data: data2,
    }).expect(422);
  });

  it('should fail because groupId is invalid', async () => {
    const data = fakeData.participant('invalid-123');

    return await createParticipant(app, {
      accessToken,
      studyId,
      data: data,
    }).expect(400);
  });

  it('should fail because groupId is unknown', async () => {
    const data = fakeData.participant(fakeData.id());

    return await createParticipant(app, {
      accessToken,
      studyId,
      data: data,
    }).expect(400);
  });

  it('should fail because group is not part of study', async () => {
    const otherStudyId = await createStudyId(app, {
      accessToken: otherAccessToken,
    });

    const groupId = await createGroupId(app, {
      accessToken: otherAccessToken,
      studyId: otherStudyId,
    });

    const data = fakeData.participant(groupId);

    return await createParticipant(app, {
      accessToken,
      studyId,
      data: data,
    }).expect(400);
  });
});
