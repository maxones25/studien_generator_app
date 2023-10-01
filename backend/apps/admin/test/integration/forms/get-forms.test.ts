import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createForm, createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import { getFormById } from '@test/forms/getFormById';
import { getFormPages } from '@test/forms/pages/getFormPages';
import { getForms } from '@test/forms/getForms';

describe('get forms by study', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let otherStudyId: string;
  let studyForms: any[];
  let otherStudyForms: any[];

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

    studyForms = [];

    for (let i = 0; i < 3; i++) {
      const data = fakeData.form();
      const id = await createFormId(app, { accessToken, studyId, data });
      studyForms.push({ id, ...data });
    }

    otherStudyId = await createStudyId(app, { accessToken });

    otherStudyForms = [];

    for (let i = 0; i < 3; i++) {
      const data = fakeData.form();
      const id = await createFormId(app, {
        accessToken,
        studyId: otherStudyId,
        data,
      });
      otherStudyForms.push({ id, ...data });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get forms', async () => {
    return getForms(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBe(true);
        expect(forms.length).toBe(3);

        forms.forEach((form) => {
          const foundForm = studyForms.find((sf) => sf.id === form.id);

          expect(foundForm).toEqual({
            id: form.id,
            name: form.name,
          });
        });
      });
  });

  it('should get other forms', async () => {
    return getForms(app, { accessToken, studyId: otherStudyId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBe(true);
        expect(forms.length).toBe(3);

        forms.forEach((form) => {
          expect(otherStudyForms.some((sf) => sf.id === form.id)).toBe(true);
          expect(studyForms.some((sf) => sf.id === form.id)).toBe(false);
        });
      });
  });

  it('should because unauthorized', async () => {
    return getForms(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    return getForms(app, { accessToken: adminAccessToken, studyId }).expect(
      401,
    );
  });

  it('should because director is not member of study', async () => {
    return getForms(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );
  });

  it('should because studyId is missing', async () => {
    return getForms(app, { accessToken, studyId: undefined }).expect(400);
  });

  it('should because studyId is invalid', async () => {
    return getForms(app, { accessToken, studyId: fakeData.text() }).expect(401);
  });

  it('should because studyId is unknown', async () => {
    return getForms(app, { accessToken, studyId: fakeData.id() }).expect(401);
  });
});
