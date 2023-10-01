import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createParticipantId } from '@test/participants/createParticipant';
import { changeParticipantNumber } from '@test/participants/changeParticipantNumber';
import { getParticipantById } from '@test/participants/getParticipantById';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('change participant number', () => {
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

  it('should change number', async () => {
    const data = fakeData.participant();

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    const number = fakeData.participant().number;

    await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId,
      data: { number },
    }).expect(200);

    return getParticipantById(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const participant = res.body;

        expect(participant.id).toBe(participantId);
        expect(participant.number).toBe(number);
      });
  });

  it('should fail because unauthorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken: undefined,
      studyId,
      participantId,
      data: { number },
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken: adminAccessToken,
      studyId,
      participantId,
      data: { number },
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
      data: { number },
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId: undefined,
      participantId,
      data: { number },
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId: '123undefined',
      participantId,
      data: { number },
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId: fakeData.id(),
      participantId,
      data: { number },
    }).expect(401);
  });

  it('should fail because participantId is missing', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId: undefined,
      data: { number },
    }).expect(400);
  });

  it('should fail because participantId is invalid', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId: 'und123efined',
      data: { number },
    }).expect(401);
  });

  it('should fail because participantId is unknown', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const number = fakeData.participant().number;

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId: fakeData.id(),
      data: { number },
    }).expect(401);
  });

  it('should fail because number is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId,
      data: {},
    }).expect(400);
  });

  it('should fail because number is empty', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId,
      data: { number: '' },
    }).expect(400);
  });

  it('should fail because number is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId,
      data: { number: 456 },
    }).expect(400);
  });

  it('should fail because number exists already', async () => {
    const data = fakeData.participant();

    await createParticipantId(app, {
      accessToken,
      studyId,
      data,
    });

    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    return await changeParticipantNumber(app, {
      accessToken,
      studyId,
      participantId,
      data: { number: data.number },
    }).expect(422);
  });
});
