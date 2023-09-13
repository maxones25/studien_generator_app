import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createEntityId } from '@test/entities/createEntity';
import { createFieldId } from '@test/entities/fields/createField';
import { getFields } from '@test/entities/fields/getFields';
import { removeField } from '@test/entities/fields/removeField';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('remove field', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let entityId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    entityId = await createEntityId(app, { accessToken, studyId });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should remove field', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    await removeField(app, { accessToken, studyId, fieldId }).expect(200);

    return getFields(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        const fields = res.body;

        expect(Array.isArray(fields)).toBeTruthy();
        expect(fields.every((f) => f.id !== fieldId));
      });
  });

  it('should fail because unauthorized', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken: undefined,
      studyId,
      fieldId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken: adminAccessToken,
      studyId,
      fieldId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken: otherAccessToken,
      studyId,
      fieldId,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId: undefined,
      fieldId,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId: 'undsdfsdfefined',
      fieldId,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId: fakeData.id(),
      fieldId,
    }).expect(401);
  });

  it('should fail because fieldId missing', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId,
      fieldId: undefined,
    }).expect(400);
  });

  it('should fail because fieldId invalid', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId,
      fieldId: 'iadnvndvi',
    }).expect(401);
  });

  it('should fail because fieldId unknown', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return await removeField(app, {
      accessToken,
      studyId,
      fieldId: fakeData.id(),
    }).expect(401);
  });
});
