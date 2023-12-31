import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createGroupId,
  createGroupFormId,
  activateForm,
  deactivateForm,
  getFormsByGroup,
} from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('deactivate form', () => {
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

  it('should deactivate form', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await activateForm(app, {
      accessToken,
      studyId,
      formId: groupFormId,
    }).expect(200);

    await deactivateForm(app, {
      accessToken,
      studyId,
      formId: groupFormId,
    }).expect(200);

    return await getFormsByGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();
        expect(forms.length).toBeGreaterThan(0);

        const form = forms.find((form) => form.id === groupFormId);

        expect(form.isActive).toBe(false);
      });
  });

  it('should fail because form is already deactivated', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await deactivateForm(app, {
      accessToken,
      studyId,
      formId: groupFormId,
    }).expect(400);
  });

  it('should fail because unauthenticated', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken: undefined,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because admin is authenticated', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    return await deactivateForm(app, {
      accessToken: adminAccessToken,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken: otherAccessToken,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId: undefined,
      formId: groupFormId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId: fakeData.text(),
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId: fakeData.id(),
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await deactivateForm(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
