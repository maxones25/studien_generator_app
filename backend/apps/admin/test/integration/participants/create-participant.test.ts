import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import {
  createParticipant,
  createParticipantId,
} from '@test/participants/createParticipant';
import { getParticipantById } from '@test/participants/getParticipantById';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('create participant', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;

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
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should create a participant', async () => {
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
});
