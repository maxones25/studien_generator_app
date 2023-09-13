import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createEntityId } from '@test/entities/createEntity';
import { createFieldId } from '@test/entities/fields/createField';
import { getFields } from '@test/entities/fields/getFields';
import { updateField } from '@test/entities/fields/updateField';
import fakeData from '@test/fakeData';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('update field', () => {
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

  it('should update field', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    const data = fakeData.entityField();

    await updateField(app, { accessToken, studyId, fieldId, data }).expect(200);

    return getFields(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        const fields = res.body;

        expect(Array.isArray(fields)).toBeTruthy();

        const updatedField = fields.find((f) => f.id === fieldId);

        expect(updatedField).not.toBeNull();
        expect(updatedField.name).toBe(data.name);
        expect(updatedField.type).toBe(data.type);
      });
  });

  it('should fail because unauthorized', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });
    const data = fakeData.entityField();
    return updateField(app, {
      accessToken: undefined,
      studyId,
      fieldId,
      data,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });
    const data = fakeData.entityField();

    return updateField(app, {
      accessToken: adminAccessToken,
      studyId,
      fieldId,
      data,
    }).expect(401);
  });

  it('should fail because director is not part of study', async () => {
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
    const data = fakeData.entityField();

    return updateField(app, {
      accessToken: otherAccessToken,
      studyId,
      fieldId,
      data,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });
    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId: undefined,
      fieldId,
      data,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });
    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId: 'undefidsfsdfned',
      fieldId,
      data,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });
    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId: fakeData.id(),
      fieldId,
      data,
    }).expect(401);
  });

  it('should fail because fieldId missing', async () => {
    await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId,
      fieldId: undefined,
      data,
    }).expect(400);
  });

  it('should fail because fieldId invalid', async () => {
    await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId,
      fieldId: 'undefin7sdf87s8dfed',
      data,
    }).expect(401);
  });

  it('should fail because fieldId unknown', async () => {
    await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    const data = fakeData.entityField();

    return updateField(app, {
      accessToken,
      studyId,
      fieldId: fakeData.id(),
      data,
    }).expect(401);
  });

  it('should fail because data undefined', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return updateField(app, {
      accessToken,
      studyId,
      fieldId,
      data: undefined,
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return updateField(app, {
      accessToken,
      studyId,
      fieldId,
      data: {
        name: ""
      },
    }).expect(400);
  });

  it('should fail because name has wrong type', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return updateField(app, {
      accessToken,
      studyId,
      fieldId,
      data: {
        name: false
      },
    }).expect(400);
  });

  it('should fail because name type is wrong type', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return updateField(app, {
      accessToken,
      studyId,
      fieldId,
      data: {
        type: 123
      },
    }).expect(400);
  });

  it('should fail because name type i invalid type', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
    });

    return updateField(app, {
      accessToken,
      studyId,
      fieldId,
      data: {
        type: "Type"
      },
    }).expect(400);
  });
});
