import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createGroupId,
  addFormToGroup,
  getFormsByGroup,
  createGroupFormId,
} from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('add form to group', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let groupData: any;

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

    groupData = fakeData.group();

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
      data: groupData,
    });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should add form to group as time dependent', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.body.id)).toBeTruthy();
        expect(res.body.group.id).toBe(groupId);
        expect(res.body.group.name).toBe(groupData.name);
        expect(res.body.form.id).toBe(formId);
        expect(res.body.form.name).toBe(formData.name);
      });

    return await getFormsByGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();
        expect(forms.length).toBeGreaterThan(0);

        const form = forms.find((form) => form.form.id === formId);

        expect(form.form.id).toBe(formId);
        expect(form.form.name).toBe(formData.name);
        expect(form.isActive).toBe(false);
        expect(form.type).toBe('TimeDependent');
      });
  });

  it('should add the second form as time independent', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await getFormsByGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();
        expect(forms.length).toBeGreaterThan(0);

        const form = forms.find((form) => form.id === groupFormId);

        expect(form.form.id).toBe(formId);
        expect(form.form.name).toBe(formData.name);
        expect(form.isActive).toBe(false);
        expect(form.type).toBe('TimeIndependent');
      });
  });

  it('should fail because form is already 2 times group form', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken: undefined,
      studyId,
      groupId,
      formId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    await addFormToGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId: undefined,
      groupId,
      formId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
      formId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId: undefined,
      formId,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await addFormToGroup(app, {
      accessToken,
      studyId,
      groupId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
