import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createParticipantId,
  createTaskId,
  deleteParticipant,
  getParticipantById,
  getTasksByParticipant,
  restoreParticipant,
} from '@test/admin/participants';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

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
