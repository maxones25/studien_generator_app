import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
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
import datetime from '@shared/modules/datetime/datetime';

describe('create DateTimePicker form component', () => {
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
      data: { name: fakeData.text(), type: FieldType.DateTime },
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

  it('should add DateTimePicker form component', async () => {
    const type = ComponentType.DateTimePicker;
    const attributes = {
      required: true,
      defaultValue: datetime.formatDateTime(fakeData.futureDate()),
      label: fakeData.text(),
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

  it('should add with defaultValue CurrentDateTime', async () => {
    const type = ComponentType.DateTimePicker;
    const attributes = {
      required: true,
      defaultValue: 'CurrentDateTime',
      label: fakeData.text(),
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
    const type = ComponentType.DateTimePicker;
    const attributes = {};
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
    const type = ComponentType.DateTimePicker;
    const attributes = { required: 123 };
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
    const type = ComponentType.DateTimePicker;
    const attributes = { required: false, defaultValue: 123 };
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
    const type = ComponentType.DateTimePicker;
    const attributes = { required: false, label: 123 };
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

    const type = ComponentType.DateTimePicker;
    const attributes = { required: false };
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
    const type = ComponentType.DateTimePicker;
    const attributes = { required: true };
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

    const type = ComponentType.DateTimePicker;
    const attributes = { required: true };
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
