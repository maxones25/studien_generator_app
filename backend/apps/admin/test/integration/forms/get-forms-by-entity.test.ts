import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { createFormEntityId } from '@test/forms/entities/addFormEntity';
import { createEntityId } from '@test/entities/createEntity';
import { getFormsByEntity } from '@test/forms/getFormsByEntity';
import { getAdminAccessToken } from '@test/auth/loginAdmin';

describe('get forms by entity', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let entityId: string;
  let studyForms: any[];

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

    entityId = await createEntityId(app, { accessToken, studyId });

    studyForms = [];

    for (let i = 0; i < 3; i++) {
      const data = fakeData.form();
      const formId = await createFormId(app, { accessToken, studyId, data });

      const formEntities = [];

      for (let k = 0; k < 2; k++) {
        const name = fakeData.text();

        const formEntityId = await createFormEntityId(app, {
          accessToken,
          studyId,
          formId,
          entityId,
          name,
        });

        formEntities.push({
          id: formEntityId,
          name,
        });
      }

      studyForms.push({ id: formId, ...data, formEntities });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get forms', async () => {
    return getFormsByEntity(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBe(true);
        expect(forms.length).toBe(3);

        studyForms.forEach((studyForm) => {
          const form = forms.find((f) => f.id === studyForm.id);

          expect(form.id).toBe(studyForm.id);
          expect(form.name).toBe(studyForm.name);
          expect(Array.isArray(form.formEntities)).toBe(true);
          expect(form.formEntities.length).toBe(2);

          form.formEntities.forEach((formEntity) => {
            const studyFormEntity = studyForm.formEntities.find(
              (sfe) => sfe.id === formEntity.id,
            );

            expect(studyFormEntity.id).toBe(formEntity.id);
            expect(studyFormEntity.name).toBe(formEntity.name);
          });
        });
      });
  });

  it('should get not get forms of other study', async () => {
    const studyId = await createStudyId(app, { accessToken });
    const entityId = await createEntityId(app, { accessToken, studyId });

    return getFormsByEntity(app, { accessToken, studyId, entityId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBe(true);
        expect(forms.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
    return getFormsByEntity(app, {
      accessToken: undefined,
      studyId,
      entityId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getFormsByEntity(app, {
      accessToken: adminAccessToken,
      studyId,
      entityId,
    }).expect(401);
  });

  it('should fail because director is member of study', async () => {
    return getFormsByEntity(app, {
      accessToken: otherAccessToken,
      studyId,
      entityId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId: undefined,
      entityId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId: fakeData.text(),
      entityId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId: fakeData.id(),
      entityId,
    }).expect(401);
  });

  it('should fail because entityId is missing', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId,
      entityId: undefined,
    }).expect(400);
  });

  it('should fail because entityId is invalid', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId,
      entityId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because entityId is unknown', async () => {
    return getFormsByEntity(app, {
      accessToken,
      studyId,
      entityId: fakeData.id(),
    }).expect(401);
  });
});
