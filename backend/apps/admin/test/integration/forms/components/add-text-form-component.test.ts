import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
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

describe('create Text form component', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let entityId: string;
  let fieldId: string;
  let formId: string;
  let pageId: string;

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
    fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.Text },
    });

    formId = await createFormId(app, { accessToken, studyId });
    pageId = await createFormPage(app, { accessToken, studyId, formId });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add Text form component', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];
    const formComponentId = await createFormComponentId(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    });

    return getFormComponents(app, { accessToken, studyId, pageId })
      .expect(200)
      .then((res) => {
        const formComponents = res.body;

        const formComponent = formComponents.find(
          (c) => c.id === formComponentId,
        );

        expect(formComponent.id).toBe(formComponentId);
        expect(formComponent.type).toBe(type);
        expect(formComponent.attributes).toEqual(attributes);
        expect(formComponent.formFields).toEqual(formFields);
      });
  });

  it('should fail because text is missing', async () => {
    const type = ComponentType.Text;
    const attributes = {};
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because text is empty', async () => {
    const type = ComponentType.Text;
    const attributes = { text: '' };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because text is wrong type', async () => {
    const type = ComponentType.Text;
    const attributes = { text: 123 };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because formFields has empty object', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [{}];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because entityId has wrong type', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [{ entityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because entityId is unknown', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [{ entityId: fakeData.id(), fieldId: fakeData.id() }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken: undefined,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    const adminAccessToken = await getAdminAccessToken(app);

    return addFormComponent(app, {
      accessToken: adminAccessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken: otherAccessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId: undefined,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId: fakeData.text(),
      pageId,
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId: fakeData.id(),
      pageId,
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because pageId is missing', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId: undefined,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because pageId is invalid', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId: fakeData.text(),
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because pageId is unknown', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId: fakeData.id(),
      type,
      attributes,
      formFields,
    }).expect(401);
  });

  it('should fail because type is invalid', async () => {
    const type = ComponentType.Text;
    const attributes = { text: fakeData.text() };
    const formFields = [];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type: fakeData.text(),
      attributes,
      formFields,
    }).expect(400);
  });
});
