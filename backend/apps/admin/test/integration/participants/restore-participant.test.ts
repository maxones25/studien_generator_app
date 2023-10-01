import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createParticipantId } from '@test/participants/createParticipant';
import { getParticipantById } from '@test/participants/getParticipantById';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import { deleteParticipant } from '@test/participants/deleteParticipant';
import { createTaskId } from '@test/tasks/createTask';
import { createFormId } from '@test/forms/createForm';
import { getTasksByParticipant } from '@test/tasks/getTasksByParticipant';
import { restoreParticipant } from '@test/participants/restoreParticipant';

describe('restore participant', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;

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

    formId = await createFormId(app, { accessToken, studyId });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should soft delete participant', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await createTaskId(app, {
      accessToken,
      studyId,
      participantId,
      formId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    await getParticipantById(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);

    await getTasksByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);

    await restoreParticipant(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(200);

    await getParticipantById(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(200);

    await getTasksByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(200);
  });

  it('should fail because unauthorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken: undefined,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    const adminAccessToken = await getAdminAccessToken(app);

    return await restoreParticipant(app, {
      accessToken: adminAccessToken,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId: undefined,
      participantId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId: 'undefined123',
      participantId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId: fakeData.id(),
      participantId,
    }).expect(401);
  });

  it('should fail because participantId is missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId,
      participantId: undefined,
    }).expect(400);
  });

  it('should fail because participantId is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId,
      participantId: 'invalid-123',
    }).expect(401);
  });

  it('should fail because participantId is unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: false,
    }).expect(200);

    return await restoreParticipant(app, {
      accessToken,
      studyId,
      participantId: fakeData.id(),
    }).expect(401);
  });
});
