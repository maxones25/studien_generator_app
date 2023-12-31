import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createParticipantId,
  createTaskId,
  deleteParticipant,
  getTasksByParticipant,
  getParticipantById,
  getParticipants,
} from '@test/admin/participants';
import { createStudyId, addMember } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('delete participant', () => {
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

  it('should hard delete participant', async () => {
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
      hardDelete: true,
    }).expect(200);

    await getTasksByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);

    return await getParticipantById(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);
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

    await getTasksByParticipant(app, {
      accessToken,
      studyId,
      participantId,
    }).expect(401);

    return await getParticipants(app, {
      accessToken,
      studyId,
      deleted: true,
    })
      .expect(200)
      .then((res) => {
        const participants = res.body;

        expect(Array.isArray(participants)).toBeTruthy();

        const participant = participants.find(
          (participant) => participant.id === participantId,
        );

        expect(participant).not.toBeUndefined();
        expect(participant.deletedAt).not.toBeNull();
      });
  });

  it('should fail because unauthorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken: undefined,
      studyId,
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because admin authorized', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    await deleteParticipant(app, {
      accessToken: adminAccessToken,
      studyId,
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because director is not an admin member', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await deleteParticipant(app, {
      accessToken: otherAccessToken,
      studyId,
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId: undefined,
      participantId,
      hardDelete: true,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId: 'u234ndefined',
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId: fakeData.id(),
      participantId,
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because participantId missing', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId: undefined,
      hardDelete: true,
    }).expect(400);
  });

  it('should fail because participantId invalid', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId: 'undefined34',
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because participantId unknown', async () => {
    await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId: fakeData.id(),
      hardDelete: true,
    }).expect(401);
  });

  it('should fail because hardDelete is invalid', async () => {
    const participantId = await createParticipantId(app, {
      accessToken,
      studyId,
    });

    await deleteParticipant(app, {
      accessToken,
      studyId,
      participantId,
      hardDelete: 'true',
    }).expect(400);
  });
});
