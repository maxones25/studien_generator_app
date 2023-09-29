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
import { createFormEntityId } from '@test/forms/entities/addFormEntity';

describe('create Text form component', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let entityId: string;
  let startFieldId: string;
  let endFieldId: string;
  let formId: string;
  let pageId: string;
  let formEntityId: string;

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
    startFieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.DateTime },
    });
    endFieldId = await createFieldId(app, {
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

  it('should add HIIT form component', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
    ];
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
        expect(formComponent.formFields.length).toBe(2);

        expect(
          formComponent.formFields.some(
            (formField) => formField.entityField.id === startFieldId,
          ),
        ).toBe(true);

        expect(
          formComponent.formFields.some(
            (formField) => formField.entityField.id === endFieldId,
          ),
        ).toBe(true);
      });
  });

  it('should fail because warm up missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      //   warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because warm up has wrong type', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 'test',
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because warm up is zero', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 0,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because rounds missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      //   rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because rounds has wrong type', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: true,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because rounds is zero', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 0,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because highIntensity missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      //   highIntensity: 5,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because highIntensity has wrong type', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: [],
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because highIntensity is zero', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 0,
      lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because lowIntensity missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      //   lowIntensity: 5,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because lowIntensity has wrong type', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 'test',
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because lowIntensity is zero', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 0,
      coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because coolDown missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      //   coolDown: 5,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because coolDown has wrong type', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 5,
      coolDown: false,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because coolDown is zero', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 6,
      coolDown: 0,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because formFields is missing', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 6,
      coolDown: 6,
    };
    // const formFields = [
    //   {
    //     fieldId: startFieldId,
    //     entityId: formEntityId,
    //   },
    //   {
    //     fieldId: endFieldId,
    //     entityId: formEntityId,
    //   },
    // ];

    return addFormComponent(app, {
      accessToken,
      studyId,
      pageId,
      type,
      attributes,
      formFields: undefined,
    }).expect(400);
  });

  it('should fail because formFields is empty', async () => {
    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 6,
      coolDown: 6,
    };
    const formFields = [
      //   {
      //     fieldId: startFieldId,
      //     entityId: formEntityId,
      //   },
      //   {
      //     fieldId: endFieldId,
      //     entityId: formEntityId,
      //   },
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

  it('should fail because formFields has invalid field', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.Number },
    });

    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 6,
      coolDown: 6,
    };
    const formFields = [
      {
        fieldId: fieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },
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

  it('should fail because formFields is too long', async () => {
    const fieldId = await createFieldId(app, {
      accessToken,
      studyId,
      entityId,
      data: { name: fakeData.text(), type: FieldType.DateTime },
    });

    const type = ComponentType.HIIT;
    const attributes = {
      required: true,
      warmUp: 5,
      rounds: 5,
      highIntensity: 5,
      lowIntensity: 6,
      coolDown: 6,
    };
    const formFields = [
      {
        fieldId: startFieldId,
        entityId: formEntityId,
      },
      {
        fieldId: endFieldId,
        entityId: formEntityId,
      },

      {
        fieldId: fieldId,
        entityId: formEntityId,
      },
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
