import { AppModule } from '@admin/app.module';
import { ComponentType } from '@admin/components/component-type.enum';
import { FieldType } from '@entities/core/entity';
import { getDirectorAccessToken } from '@test/admin/director';
import { createEntityId, createFieldId } from '@test/admin/entities';
import {
  createFormId,
  createFormPage,
  createFormEntityId,
  createFormComponentId,
  getFormComponents,
  addFormComponent,
} from '@test/admin/forms';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('create Select form component', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let formEntityId: string;
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

  it('should add Select form component', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = {
      required: true,
      label: fakeData.text(),
      defaultValue: options[0],
      options,
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

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
        expect(Array.isArray(formComponent.formFields)).toBe(true);
        expect(formComponent.formFields.length).toBe(1);

        formComponent.formFields.forEach((formField) => {
          expect(formField.entityField).toEqual({ id: fieldId });
        });
      });
  });

  it('should fail because required is missing', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { options };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because required has wrong type', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: 123, options };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because defaultValue has wrong type', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: false, defaultValue: 123, options };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because defaultValue is not an option', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = {
      required: false,
      defaultValue: fakeData.text(),
      options,
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because options is missing', async () => {
    const type = ComponentType.Select;
    const attributes = {
      required: false,
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because options has wrong type', async () => {
    const type = ComponentType.Select;
    const attributes = {
      required: false,
      options: { 1: "test" },
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because options has wrong option type', async () => {
    const type = ComponentType.Select;
    const attributes = {
      required: false,
      options: [123],
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because options is not distinct', async () => {
    const type = ComponentType.Select;
    const attributes = {
      required: false,
      options: [fakeData.text(), 'test', 'test'],
    };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because label has wrong type', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: false, label: 123, options };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because fieldId has wrong type', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.Number },
    });

    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: false, options };
    const formFields = [{ entityId: formEntityId, fieldId }];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });

  it('should fail because formFields is empty', async () => {
    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: true, options };
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

  it('should fail because formFields is too long', async () => {
    const otherFieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.DateTime },
    });

    const type = ComponentType.Select;
    const options = fakeData.options();
    const attributes = { required: true, options };
    const formFields = [
      { entityId: formEntityId, fieldId },
      { entityId: formEntityId, fieldId: otherFieldId },
    ];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields,
    }).expect(400);
  });
});
