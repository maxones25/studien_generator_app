import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { createFormPage } from '@test/forms/pages/addFormPage';
import {
  addFormComponent,
  createFormComponentId,
} from '@test/forms/components/addFormComponent';
import { ComponentType } from '@admin/components/component-type.enum';
import { getFormComponents } from '@test/forms/components/getFormComponents';
import { createEntityId } from '@test/entities/createEntity';
import { createFieldId } from '@test/entities/fields/createField';
import { FieldType } from '@entities/core/entity';
import { createFormEntityId } from '@test/forms/entities/addFormEntity';
import { removeFormComponent } from '@test/forms/components/removeFormComponent';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { createDirector } from '@test/director/signUpDirector';
import { addMember } from '@test/studies/members/addMember';

describe('create CheckBox form component', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let formEntityId: string;
  let fieldId: string;
  let formId: string;
  let pageId: string;
  let formComponentId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    formId = await createFormId(app, { accessToken, studyId });
    pageId = await createFormPage(app, { accessToken, studyId, formId });

    entityId = await createEntityId(app, { accessToken, studyId });
    fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.Text },
    });

    formEntityId = await createFormEntityId(app, {
      accessToken,
      studyId,
      formId,
      entityId,
      name: fakeData.text(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const type = ComponentType.TextField;
    const attributes = {
      required: true,
      defaultValue: fakeData.text(),
      label: fakeData.text(),
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    formComponentId = await createFormComponentId(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    });
  });

  it('should remove form component', async () => {
    await removeFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      formComponentId,
    }).expect(200);

    return getFormComponents(app, { accessToken, studyId, pageId })
      .expect(200)
      .then((res) => {
        const formComponents = res.body;
        expect(Array.isArray(formComponents)).toBe(true);
        expect(formComponents.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
    return removeFormComponent(app, {
      accessToken: undefined,
      studyId,
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return removeFormComponent(app, {
      accessToken: adminAccessToken,
      studyId,
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );
    return removeFormComponent(app, {
      accessToken: otherAccessToken,
      studyId,
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return removeFormComponent(app, {
      accessToken: otherAccessToken,
      studyId,
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId: undefined,
      pageId,
      formComponentId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId: fakeData.text(),
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId: fakeData.id(),
      pageId,
      formComponentId,
    }).expect(401);
  });

  it('should fail because pageId is missing', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId: undefined,
      formComponentId,
    }).expect(400);
  });

  it('should fail because pageId is invalid', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId: fakeData.text(),
      formComponentId,
    }).expect(401);
  });

  it('should fail because pageId is unknown', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId: fakeData.id(),
      formComponentId,
    }).expect(401);
  });

  it('should fail because formComponentId is missing', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      formComponentId: undefined,
    }).expect(400);
  });

  it('should fail because formComponentId is invalid', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      formComponentId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formComponentId is unknown', async () => {
    return removeFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      formComponentId: fakeData.id(),
    }).expect(401);
  });
});
